import React, { Component } from 'react'
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm, getFormValues } from 'redux-form'
import * as auth from "../../modules/Auth/_redux/authRedux";
import { Link, Redirect } from "react-router-dom";
import "../custom.css";
import SweetAlert from 'react-bootstrap-sweetalert';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import FileBase64 from 'react-file-base64';
import ImageUploadPreviewComponent from "../ImageUploadPreviewComponent"

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


class ManageUploadCategoryImage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isError: false,
            currentUserData: {},
            subCategoryId: "",
            files: [],
            // baseImage: "",
            categoryData: [],
        }
        this.props.CheckSubCategory("");
        this.state.currentUserData = JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).data

    }
    onSubmit = (formValues) => {
        debugger
        let indexOfItem = this.state.categoryData.filter(tag => tag.Checked === true)
        if (indexOfItem.length == 0) {
            this.SuccessFailSweetAlert("Please select at least one Category", "error");
            this.setState({ isLoading: false });
        }
        else {
            var categoryId = indexOfItem[0].inCategoryId
            this.setState({ isLoading: true });
            var data = {
                inCategoryImageId: formValues.inCategoryImageId == undefined || formValues.inCategoryImageId == "" ? 0 : formValues.inCategoryImageId,
                stImageDatabase64: this.state.baseImage.split(',')[1],
                inCategoryId: categoryId,
                // inCategoryId: "2",
            }
            this.props.AddImage(data);
            // dispatch(auth.actions.AddImage(data))
            debugger
        }

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
    //#region Single image upoad 
    uploadImage = async (e) => {
        debugger
        const file = e.target.files[0];
        const base64 = await this.convertBase64(file);
        this.setState({ baseImage: base64 })
    };
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
        return (
            <div className="card card-custom gutter-b example example-compact">
                <div className="card-header">
                    <div className="card-title">
                        <h3 className="card-label"> Image</h3>
                    </div>
                    <div className="card-toolbar">
                    </div>
                </div>
                <form className="form-horizontal" onSubmit={(this.onSubmit)}>
                    <div style={{ margin: 25 }} className="form-group fv-plugins-icon-container">
                        <div className="col-sm-4">
                            <h6>Image Upload</h6>
                            {/* //#region multiple image upload component */}
                            {/* <ImageUploadPreviewComponent />   */}
 
                            {/* Signle Imaeg Uplaod  */}
                            <input
                                type="file"
                                onChange={(e) => {
                                    this.uploadImage(e);
                                }}
                            />
                        </div>
                        <br></br>
                        <div className="col-sm-8">
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
                        </div>
                    </div>
                    <div style={{ margin: 20 }}>
                        <img src={this.state.baseImage} height="200px" />
                    </div>
                    <div style={{ margin: 20 }}>
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip>Add category Image</Tooltip>}>
                            <button style={{ width: 120, marginRight: 10 }}
                                id="kw_dtn_add_carrier"
                                type="submit"
                                className={`btn btn-primary`}>
                                Submit
                            </button>
                        </OverlayTrigger>
                    </div>
                </form>
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
    return {
        AddImage: (data) => dispatch(auth.actions.AddImage(data)),
        CheckSubCategory: (data) => dispatch(auth.actions.CheckSubCategory(data)),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageUploadCategoryImage);