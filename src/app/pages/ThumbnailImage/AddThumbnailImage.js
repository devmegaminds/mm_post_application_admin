import React, { Component } from 'react'
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm, getFormValues } from 'redux-form'
import * as auth from "../../modules/Auth/_redux/authRedux";
import { Link, Redirect } from "react-router-dom";
import "../custom.css";
import SweetAlert from 'react-bootstrap-sweetalert';
import { OverlayTrigger, Tooltip } from "react-bootstrap";

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

class AddThumbnailImage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isError: false,
            currentUserData: {},
            subCategoryId: "",
            baseImage: "",
        }
        // this.onSubmit = this.onSubmit.bind(this);
        this.state.currentUserData = JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).data
    }
    onSubmit = (formValues) => {
        this.setState({ isLoading: true });
        var data = {
            // inSubCategoryThumbnailImageId:3,
            inSubCategoryThumbnailImageId: formValues.inSubCategoryThumbnailImageId == undefined || formValues.inSubCategoryThumbnailImageId == "" ? 0 : formValues.inSubCategoryThumbnailImageId,
            stImageDatabase64: this.state.baseImage.split(',')[1],
            inSubCategoryId: this.state.subCategoryId,
        }
        this.props.AddSubCategoryThumbnailImage(data);
    }

    // hideModel = () => {
    //     this.setState({
    //         alert: '',
    //         showModal: false,
    //     })
    // }

    // hideModel = () => {
    //     this.setState({
    //         alert: '',
    //         showModal: false,
    //     })
    // }
    componentDidMount() {
        var id = window.location.href.split("/").pop();
        this.setState({ subCategoryId: id })
    }
    // SuccessFailSweetAlert(msg, type) {
    //     let getAlert = '';
    //     if (type == 'success') {
    //         getAlert = () => (
    //             <SweetAlert
    //                 success
    //                 title={msg}
    //                 onConfirm={() => this.hideAlert(true)}
    //             >
    //             </SweetAlert>
    //         );

    //     }
    //     else {
    //         getAlert = () => (
    //             <SweetAlert
    //                 error
    //                 title={msg}
    //                 onConfirm={() => this.hideAlert(false)}
    //             >
    //             </SweetAlert>
    //         );
    //     }

    //     this.setState({
    //         alert: getAlert()
    //     });
    // }

    uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await this.convertBase64(file);
        // const base = base64.split(',')[1];
        // initialValues.baseimg = base64;
        this.setState({ baseImage: base64 })
        // this.setState(base64);
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

    render() {
        var $this = this;
        const { handleSubmit, pristine, reset, submitting, formValues, change } = this.props;
        if (this.state.isRedirect) {
            return <Redirect to="/ManageSubCategory" />
        }
        return (
            <div className="card card-custom gutter-b example example-compact">
                <div className="card-header">
                    <div className="card-title">
                        <h3 className="card-label">Upload Thumbnail Image</h3>
                    </div>
                    <div className="card-toolbar">
                    </div>
                </div>
                <form className="form-horizontal" onSubmit={(this.onSubmit)}>
                    <div style={{ margin: 25 }} className="form-group fv-plugins-icon-container">
                        <div className="col-sm-4">
                            <h6>Image Upload</h6>
                            <input
                                type="file"
                                onChange={(e) => {
                                    this.uploadImage(e);
                                }}
                            />
                        </div>
                        <br></br>
                    </div>

                    <div style={{ margin: 20 }}>
                        <img src={this.state.baseImage} height="200px" />
                    </div>
                    <div style={{ margin: 20 }}>
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip>Add Thumbnaul Image</Tooltip>}>
                            <button style={{ width: 120, marginRight: 10 }}
                                id="kw_dtn_add_carrier"
                                type="submit"
                                //   disabled={!baseImage}
                                className={`btn btn-primary`}>
                                Submit
                                {/* {this.state.isLoading && <span className="ml-3 spinner spinner-white"></span>} */}
                            </button>
                        </OverlayTrigger>
                    </div>
                </form>
            </div>
        )
    }
}

// AddSubCategoryPage = reduxForm({
//     form: 'SubCategory',
//     validate,
//     enableReinitialize: true,
//     destroyOnUnmount: true
// })(AddSubCategoryPage);

function mapStateToProps(state) {
    return {
        initialValues: {
            inSubCategoryId: state.auth.GetSubCategoryInfoByIdResponse != undefined && state.auth.GetSubCategoryInfoByIdResponse.data != undefined ? state.auth.GetSubCategoryInfoByIdResponse.data[0]?.inSubCategoryId : "",
            stSubCategoryName: state.auth.GetSubCategoryInfoByIdResponse != undefined && state.auth.GetSubCategoryInfoByIdResponse.data != undefined ? state.auth.GetSubCategoryInfoByIdResponse.data[0]?.stSubCategoryName : ""

        },
        // insuranceTypeResponse: state.auth.insuranceTypeResponse,
        subCategoryResponse: state.auth.subCategoryResponse,
        GetSubCategoryInfoByIdResponse: state.auth.GetSubCategoryInfoByIdResponse,
        randomNumbers: state.auth.randomNumbers

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        AddSubCategoryThumbnailImage: (data) => dispatch(auth.actions.AddSubCategoryThumbnailImage(data)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddThumbnailImage);