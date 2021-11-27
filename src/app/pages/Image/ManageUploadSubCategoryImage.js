import React, { Component } from 'react'
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm, getFormValues } from 'redux-form'
import * as auth from "../../modules/Auth/_redux/authRedux";
import { Link, Redirect } from "react-router-dom";
import "../custom.css";
import SweetAlert from 'react-bootstrap-sweetalert';
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import DemoPage from '../Extra/demo'
import { imagesubcriber } from '../Extra/subBehaviour';
import 'bootstrap/dist/css/bootstrap.min.css';
const renderFields = ({
    input,
    label,
    type,
    data,
    placeholder,
    meta: { asyncValidating, touched, error }
}) => (
    <div className="form-group">
        <label>{label}</label>
        <input {...input} type={type} placeholder={placeholder} className="form-control" style={{ marginTop: '-3%' }} />
        {touched && error && <small className="error-msg text-danger form-text">{error}</small>}
    </div>
)

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


class ManageUploadSubCategoryImage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isError: false,
            currentUserData: {},
            subCategoryId: "",
            baseImage: "",
            subCategoryData: [],
            categoryData: [],
            baseImage: [],
            imageData: []
        }
        this.props.GetSubCategory("");
        this.state.currentUserData = JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).data

    }


    hideModel = () => {
        this.setState({
            alert: '',
            showModal: false,
        })
    }

    hideModel = () => {
        this.setState({
            alert: '',
            showModal: false,
        })
    }
    // componentDidMount() {
    //     var id = window.location.href.split("/").pop();
    //     this.setState({ subCategoryId: id })
    // }
    componentDidMount() {
        debugger
        imagesubcriber.subscribe((x) => {
            debugger
            this.setState({ image: x })
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.GetSubCategoryResponse) {
            if (nextProps.GetSubCategoryResponse && nextProps.GetSubCategoryResponse != this.props.GetSubCategoryResponse) {
                if (nextProps.GetSubCategoryResponse.data.length > 0) {
                    this.setState({ isGettingTags: false });
                    this.setState({ subCategoryData: nextProps.GetSubCategoryResponse.data })
                }
            }
        }
    }
    SuccessFailSweetAlert(msg, type) {
        let getAlert = '';
        if (type == 'success') {
            getAlert = () => (
                <SweetAlert
                    success
                    title={msg}
                    onConfirm={() => this.hideAlert(true)}
                >
                </SweetAlert>
            );

        }
        else {
            getAlert = () => (
                <SweetAlert
                    error
                    title={msg}
                    onConfirm={() => this.hideAlert(false)}
                >
                </SweetAlert>
            );
        }

        this.setState({
            alert: getAlert()
        });
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
    uploadImage = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const newImagesPromises = []
            for (let i = 0; i < e.target.files.length; i++) {
                newImagesPromises.push(this.fileToDataUri(e.target.files[i]))
            }
            const newImages = await Promise.all(newImagesPromises)
            this.setState({ baseImage: [...newImages] })
        }
        //#region Single Image Upload
        // const file = e.target.files[0];
        // const base64 = await this.convertBase64(file);
        // this.setState({ baseImage: base64 })
        //#endregion
    };

    onSubmit = async (formValues) => {
        //#region Split Base64 Data
        const data = []
        var base64Data = this.state.baseImage
        for (let index = 0; index < base64Data.length; index++) {
            data.push(base64Data[index].base64.split(',')[1])
        }
        const newImagess = await Promise.all(data)
        this.setState({ imageData: [...newImagess] })
        //-------------------------------//
        let indexOfItem = this.state.subCategoryData.filter(tag => tag.Checked === true)
        if (indexOfItem.length == 0) {
            this.SuccessFailSweetAlert("Please select at least one SubCategory", "error");
            this.setState({ isLoading: false });
        }
        else {
            let x = this.state.image
            console.log(x, "PLPLPLPLPLPLPLPLPLPLP");
            var subCategoryId = indexOfItem[0].inSubCategoryId
            this.setState({ isLoading: true });
            for (var i = 0; i < x.length; i++) {
                const fd = new FormData();
                var subCategoryId = subCategoryId
                var SubCategoryImageId = 0

                fd.append('image', x[i]['file']);
                fd.append('inSubCategoryImageId', SubCategoryImageId);   //Image Id
                fd.append('stImageDatabase64', x[i]['data_url'].split(',')[1]);  // Imaeg Data base64
                fd.append('inSubCategoryId', subCategoryId); // Sub Caetgory Id
                fd.append('inCreatedBy', this.state.currentUserData.inUserID); // user Id
                this.props.AddSubCategoryImage(fd);
                this.setState({ isLoading: true });
            }
            // var subCategoryId = indexOfItem[0].inSubCategoryId
            // this.setState({ isLoading: true });
            // this.state.imageData.forEach(element => {
            //     var data = {
            //         inSubCategoryImageId: formValues.inSubCategoryImageId == undefined || formValues.inSubCategoryImageId == "" ? 0 : formValues.inSubCategoryImageId,
            //         // stImageDatabase64: this.state.baseImage.split(',')[1],
            //         stImageDatabase64: element,
            //         inSubCategoryId: subCategoryId,
            //         inCreatedBy: this.state.currentUserData.inUserID
            //     }
            //     console.log(data, "SUB CATEGORY IMAGE SCREEN");
            //     this.props.AddSubCategoryImage(data);
            //     debugger
            // })

        }
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
    onChangesTagName = (e, index) => {
        this.setState({ isChecked: this.state.subCategoryData[index].Checked ? false : true })
        this.state.subCategoryData[index].Checked = !this.state.isChecked ? !this.state.subCategoryData[index].Checked : false;
        this.setState({ subCategoryData: this.state.subCategoryData });
    }
    render() {
        var $this = this;
        const { handleSubmit, pristine, reset, submitting, formValues, change } = this.props;
        if (this.state.isRedirect) {
            return <Redirect to="/ManageSubCategory" />
        }
        let x = this.state.baseImage
        return (
            <div className="card card-custom gutter-b example example-compact">
                <div className="card-header">
                    <div className="card-title">
                        <h3 className="card-label">Sub Category Image</h3>
                    </div>
                    <div className="card-toolbar">
                    </div>
                </div>
                {/* <form className="form-horizontal" onSubmit={(this.onSubmit)}> */}
                <div style={{ margin: 25 }} className="form-group fv-plugins-icon-container">
                    {/* <div className="col-sm-4">
                            <h6>Image Upload</h6>
                            <input
                                type="file"
                                multiple
                                onChange={(e) => {
                                    this.uploadImage(e);
                                }}
                            />
                        </div> */}
                    <div className="col-sm-12">
                        <h6>Image Upload</h6>
                        <DemoPage />
                        {/* <input
                                type="file"
                                multiple
                                onChange={(e) => {
                                    this.uploadImage(e);
                                }}
                            /> */}
                    </div>
                    <br></br>
                    <div className="col-sm-8">
                        <h6 >Sub Category</h6>
                        {this.state.subCategoryData != null && this.state.subCategoryData != "" && this.state.subCategoryData != undefined && this.state.subCategoryData.map(function (tag, i) {
                            return (
                                <Field
                                    type="checkbox"
                                    name={tag.stSubCategoryName}
                                    label={tag.stSubCategoryName}
                                    data={tag.Checked}
                                    onChange={(evt) => $this.onChangesTagName(evt, i)}
                                    component={renderCheckboxField} />
                            )
                        })}
                    </div>
                    {
                        x.length > 0
                            ? x.map((imageObj, i) => {
                                return (
                                    <div className="form-group multi-preview">
                                        <img
                                            width="75px"
                                            height="75px"
                                            src={imageObj.base64}
                                            alt=''
                                        />
                                        <div>
                                            <span>{imageObj.size ? imageObj.size : '-'}</span>
                                            <span>{imageObj.name ? imageObj.name : '-'}</span>
                                        </div>
                                    </div>
                                )
                            })
                            : null
                    }
                </div>
                {/* <div style={{ margin: 20 }}>
                        <img src={this.state.baseImage} height="200px" />
                    </div> */}
                <div style={{ margin: 20 }}>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip>Add SubCategory Image</Tooltip>}>
                        {/* <button style={{ width: 120, marginRight: 10 }}
                                id="kw_dtn_add_carrier"
                                type="submit"
                                className={`btn btn-primary`}>
                                Submit
                            </button> */}
                        <button style={{ width: 120, marginRight: 0 }}
                            id="kw_dtn_add_carrier"
                            type="submit"
                            className="btn btn-primary"
                            onClick={(this.onSubmit)}>Submit
                        </button>
                    </OverlayTrigger>
                </div>
                {/* </form> */}
            </div>
        )
    }
}
ManageUploadSubCategoryImage = reduxForm({
    form: 'ManageUploadSubCategoryImage',
    validate,
    enableReinitialize: true,
    destroyOnUnmount: true
})(ManageUploadSubCategoryImage);
function mapStateToProps(state) {
    return {
        initialValues: {
            inSubCategoryId: state.auth.GetSubCategoryInfoByIdResponse != undefined && state.auth.GetSubCategoryInfoByIdResponse.data != undefined ? state.auth.GetSubCategoryInfoByIdResponse.data[0]?.inSubCategoryId : "",
            stSubCategoryName: state.auth.GetSubCategoryInfoByIdResponse != undefined && state.auth.GetSubCategoryInfoByIdResponse.data != undefined ? state.auth.GetSubCategoryInfoByIdResponse.data[0]?.stSubCategoryName : ""

        },
        subCategoryResponse: state.auth.subCategoryResponse,
        GetSubCategoryInfoByIdResponse: state.auth.GetSubCategoryInfoByIdResponse,
        randomNumbers: state.auth.randomNumbers,
        GetSubCategoryResponse: state.auth.GetSubCategoryResponse,


    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        AddSubCategoryImage: (data) => dispatch(auth.actions.AddSubCategoryImage(data)),
        GetSubCategory: (data) => dispatch(auth.actions.GetSubCategory(data)),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageUploadSubCategoryImage);