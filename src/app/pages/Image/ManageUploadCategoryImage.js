import React, { Component } from 'react'
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm, getFormValues } from 'redux-form'
import * as auth from "../../modules/Auth/_redux/authRedux";
import { Link, Redirect } from "react-router-dom";
import "../custom.css";
import SweetAlert from 'react-bootstrap-sweetalert';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import FileBase64 from 'react-file-base64';

import ImageUplaodComponents from '../../components/ImageUplaod'
import { imagesubcriber } from '../../env/subBehaviour';
import 'bootstrap/dist/css/bootstrap.min.css';
import { idsubcriber } from '../../env/categoryId';

const renderCheckboxField = ({
    input, label, type, checked, id, txtId, data, onClick, meta: { asyncValidating, touched, error } }) => (
    <div className="form-check form-check-inline">
        {/* style={{ marginTop: 33 }} */}
        <input  {...input} type={type} checked={data} className="form-check-input" style={{ cursor: 'pointer' }}></input>
        <label className="form-check-label">{label}</label>
    </div>
)

const validate = values => {
    const errors = {}
    const requiredFields = [
        'stSubCategoryName'
    ]
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = field.substring(2) + ' is required.'
        }
    })
    return errors
}

class ManageUploadCategoryImage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isError: false,
            currentUserData: {},
            subCategoryId: "",
            files: [],
            categoryData: [],
            baseImage: [],
            imageData: [],
            showModal: false,
            message: ''
        }
        this.props.CheckSubCategory("");
        this.state.currentUserData = JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).data
    }
    componentDidMount() {
        idsubcriber.subscribe((Id) => {
            var categoryId = Id
            this.setState({ categoryId: categoryId })
        })
        imagesubcriber.subscribe((x) => {
            this.setState({ image: x })
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.CheckSubCategoryResponse) {
            if (nextProps.CheckSubCategoryResponse && nextProps.CheckSubCategoryResponse != this.props.CheckSubCategoryResponse) {
                if (nextProps.CheckSubCategoryResponse.data.length > 0) {
                    this.setState({ isGettingTags: false });
                    this.setState({ categoryData: nextProps.CheckSubCategoryResponse.data })
                }
            }
        }
    }

    hideModelError = () => {
        this.setState({
            message: '',
            showModal: false,
        })
    }

    hideModelSuccess = () => {
        this.setState({
            alert: '',
            showModal: false,
            isRedirect: true
        })
    }

    SuccessFailSweetAlert(msg, type) {
        this.setState({ showModal: true, message: msg, alertType: type })
    }

    fileToDataUri = (image) => {
        return new Promise((res) => {
            const reader = new FileReader();
            const { type, name, size } = image;
            reader.addEventListener('load', () => {
                res({
                    base64: reader.result,
                    name: name,
                    type,
                    size: size,
                })
            });
            // console.log();
            reader.readAsDataURL(image);
        })
    };
    //#region image upoad 
    uploadImage = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const newImagesPromises = []
            for (let i = 0; i < e.target.files.length; i++) {
                newImagesPromises.push(this.fileToDataUri(e.target.files[i]))
            }
            const newImages = await Promise.all(newImagesPromises)
            // console.log(newImages[1].base64, ":><:><:><:><:>");
            this.setState({ baseImage: [...newImages] })
            //#region Signle Image Upload
            // const file = e.target.files[0];
            // const base64 = await this.convertBase64(file);
            // this.setState({ baseImage: base64 })
            //#endregion
        }
    };

    onSubmit = async (formValues) => {
        // let indexOfItem = this.state.categoryData.filter(tag => tag.Checked === true)
        // if (indexOfItem.length != 0) {
            let image = this.state.image
            if (this.state.image.length > 0) {
                // var categoryId = indexOfItem[0].inCategoryId
                var categoryId = parseInt(this.state.categoryId)
                for (var i = 0; i < image.length; i++) {
                    const fd = new FormData();
                    var categoryId = categoryId
                    var categoryImageId = formValues.inCategoryImageId == undefined || formValues.inCategoryImageId == "" ? 0 : formValues.inCategoryImageId
                    fd.append('inCategoryImageId', categoryImageId);   //Image Id
                    fd.append('image', image[i]['file']);
                    fd.append('inCategoryId', categoryId); // Caetgory Id
                    this.props.AddImage(fd);
                }
                this.SuccessFailSweetAlert("Image has been saved successfully!", "success");
                this.setState({ isLoading: false });
            } else {
                this.SuccessFailSweetAlert("Please upload at least one Image", "error");
                this.setState({ isLoading: false });
            }

        // }
        // else {
        //     this.SuccessFailSweetAlert("Please select at least one Category", "error");
        //     this.setState({ isLoading: false });
        // }
    }
    convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };


    // ------------------------------

    onChangesTagName = (e, index) => {
        this.setState({ isChecked: this.state.categoryData[index].Checked ? false : true })
        this.state.categoryData[index].Checked = !this.state.isChecked ? !this.state.categoryData[index].Checked : false;
        this.setState({ categoryData: this.state.categoryData });
    }

    render() {
        var $this = this;
        const { handleSubmit, pristine, reset, submitting, formValues, change } = this.props;
        if (this.state.isRedirect) {
            return <Redirect to="/ManageCategory" />
        }
        let base64ImageData = this.state.baseImage
        return (
            <div className="card card-custom gutter-b example example-compact">
                <div className="card-header">
                    <div className="card-title">
                        <h3 className="card-label">Category Image</h3>
                    </div>
                    <div className="card-toolbar">
                    </div>
                </div>
                {/* <form className="form-horizontal" onSubmit={(this.onSubmit)}> */}
                <div style={{ margin: 25 }} className="form-group fv-plugins-icon-container">
                    <div className="col-sm-12">
                        <h6>Image Upload</h6>
                        {/* Imaeg Uplaod  */}
                        <ImageUplaodComponents />
                        {/* <div className="form-group">
                                <input
                                    className="form-control"
                                    type="file"
                                    multiple
                                    onChange={(e) => {
                                        this.uploadImage(e);
                                    }}
                                />
                            </div> */}
                    </div>
                    <br></br>
                    {/* <div className="col-sm-8">
                        <h6 >Category</h6>
                        {this.state.categoryData != null && this.state.categoryData != "" && this.state.categoryData != undefined && this.state.categoryData.map(function (tag, i) {
                            return (
                                <Field
                                    type="checkbox"
                                    name={tag.stCategoryName}
                                    label={tag.stCategoryName}
                                    data={tag.Checked}
                                    onChange={(evt) => $this.onChangesTagName(evt, i)}
                                    component={renderCheckboxField} />
                            )
                        })}
                    </div> */}
                    {/* {
                            base64ImageData.length > 0
                                ? base64ImageData.map((imageObj, i) => {
                                    return (
                                        <div >
                                            <img
                                                width="75px"
                                                height="75px"
                                                src={imageObj.base64}
                                                alt=''
                                            />
                                        </div>
                                    )
                                })
                                : null
                        } */}
                </div>
                {/* <div style={{ margin: 20 }}>
                        <img src={this.state.baseImage} height="200px" />
                    </div> */}
                <div style={{ margin: 20 }}>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip>Add category Image</Tooltip>}>
                        {/* <button style={{ width: 120, marginRight: 10 }}
                                id="kw_dtn_add_carrier"
                                type="submit"
                                className={`btn btn-primary`}>
                                Submit
                            </button> */}
                        <button style={{ width: 150, marginRight: 10 }}
                            id="kw_dtn_add_carrier"
                            type="submit"
                            className="btn btn-primary"
                            onClick={(this.onSubmit)}>Upload Image
                        </button>
                    </OverlayTrigger>
                    {/* <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip>Cancel</Tooltip>}>
                        <Link style={{ width: 120 }} className="btn btn-danger" id="kw_lnk_cancel_carrier" to="/ManageCategory">
                            Cancel
                        </Link>
                    </OverlayTrigger> */}
                </div>
                {this.state.showModal && this.state.alertType == 'error' ?
                    <SweetAlert
                        error
                        title={this.state.message}
                        onConfirm={() => this.hideModelError()}>
                    </SweetAlert>
                    :
                    this.state.showModal &&
                    <SweetAlert
                        success
                        title={this.state.message}
                        onConfirm={() => this.hideModelSuccess()}>
                    </SweetAlert>
                }
                {/* </form> */}
            </div>
        )
    }
}
ManageUploadCategoryImage = reduxForm({
    form: 'ManageUploadCategoryImage',
    validate,
    enableReinitialize: true,
    destroyOnUnmount: true
})(ManageUploadCategoryImage);
function mapStateToProps(state) {
    return {
        initialValues: {
            // inSubCategoryId: state.auth.GetSubCategoryInfoByIdResponse != undefined && state.auth.GetSubCategoryInfoByIdResponse.data != undefined ? state.auth.GetSubCategoryInfoByIdResponse.data[0].inSubCategoryId : "",
            // stSubCategoryName: state.auth.GetSubCategoryInfoByIdResponse != undefined && state.auth.GetSubCategoryInfoByIdResponse.data != undefined ? state.auth.GetSubCategoryInfoByIdResponse.data[0].stSubCategoryName : ""

        },
        // subCategoryResponse: state.auth.subCategoryResponse,
        // GetSubCategoryInfoByIdResponse: state.auth.GetSubCategoryInfoByIdResponse,
        randomNumbers: state.auth.randomNumbers,
        CheckSubCategoryResponse: state.auth.CheckSubCategoryResponse,


    }
}
const mapDispatchToProps = (dispatch) => {
    debugger
    return {
        AddImage: (data) => dispatch(auth.actions.AddImage(data)),
        CheckSubCategory: (data) => dispatch(auth.actions.CheckSubCategory(data)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageUploadCategoryImage);