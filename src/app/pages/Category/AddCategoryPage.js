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
        'stCategoryName'
    ]
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = field.substring(2) + ' is required.'
        }
    })
    return errors
}

class AddCategoryPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isError: false,
            currentUserData: {}
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.state.currentUserData = JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).data
    }
    onSubmit = (formValues) => {
        this.setState({ isLoading: true });
        var data = {
            inCategoryId: formValues.inCategoryId == undefined || formValues.inCategoryId == "" ? 0 : formValues.inCategoryId,
            stCategoryName: formValues.stCategoryName,
            inCreatedBy: this.state.currentUserData.inUserID
        }
        //this.props.SaveTag(data);
        this.props.AddCategory(data);
    }

    hideModel = () => {
        this.setState({
            alert: '',
            showModal: false,
        })
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.getCategoryInfoByIDResponse) {
            if (nextProps.getCategoryInfoByIDResponse && nextProps.getCategoryInfoByIDResponse != this.props.getCategoryInfoByIDResponse) {
                if (nextProps.getCategoryInfoByIDResponse.statusCode == 200) {

                }
                else if (nextProps.getCategoryInfoByIDResponse.Code == 200) {

                }
                else
                    this.SuccessFailSweetAlert("getting error", "error");
            }
        }
        if (nextProps.categoryResponse) {
            if (nextProps.categoryResponse && nextProps.categoryResponse != this.props.categoryResponse) {
                if (nextProps.categoryResponse.statusCode == 200) {
                    this.setState({ isLoading: false, isRedirect: true });
                }
                else if (nextProps.categoryResponse.status == "Error") {
                    this.setState({ Message: nextProps.categoryResponse.errorMessage });
                    this.setState({ showModal: true });
                    this.setState({ isLoading: false });
                }
                else {
                    this.setState({ isLoading: false, isRedirect: false });
                }
            }
        }

    }
    hideModel = () => {
        this.setState({
            alert: '',
            showModal: false,
        })
    }
    componentDidMount() {
        var id = window.location.href.split("/").pop();
        if (id != "Category")
            this.props.GetCategoryInfoByID(id)
        else {
            var data = {
                inCategoryId: "",
                stCategoryName: "",
                inCreatedBy: "",
                Code: 200
            }
            this.props.ResetTag(data);
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
    render() {
        var $this = this;
        const { handleSubmit, pristine, reset, submitting, formValues, change } = this.props;
        if (this.state.isRedirect) {
            return <Redirect to="/ManageCategory" />
        }
        return (
            <div className="card card-custom gutter-b example example-compact">
                {this.state.alert}
                <div className="card-body">
                    <form className="form-horizontal" onSubmit={handleSubmit(this.onSubmit)}>
                        <input type="hidden" name="inCategoryId" />
                        <div className="row">
                            <div className="col-sm-6">
                                <label >Category Name <span className="text-danger">*</span></label>
                                <Field
                                    type="text"
                                    name="stCategoryName"
                                    placeholder="Enter Category Name"
                                    component={renderFields}
                                />
                            </div>
                        </div>

                        <div className="row mt-3 mb-3" >
                            <div className="col-sm-9 text-left userprofile-btn">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Tooltip>Submit</Tooltip>}>
                                    <button style={{ width: 120, marginRight: 10 }}
                                        id="kw_dtn_add_carrier"
                                        type="submit"
                                        disabled={this.state.isLoading}
                                        className={`btn btn-primary`}>
                                        Submit
                                        {this.state.isLoading && <span className="ml-3 spinner spinner-white"></span>}
                                    </button>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Tooltip>Cancel</Tooltip>}>
                                    <Link className="btn btn-danger" id="kw_lnk_cancel_carrier" to="/Tags">
                                        Cancel
                                    </Link>
                                </OverlayTrigger>
                            </div>


                        </div>
                        {this.state.showModal &&
                            <SweetAlert
                                info
                                title={this.state.Message}
                                onConfirm={() => this.hideModel()}>
                            </SweetAlert>
                        }
                        {this.state.showModal &&
                            <SweetAlert
                                error
                                title={this.state.Message}
                                onConfirm={() => this.hideModel()}>
                            </SweetAlert>
                        }
                    </form>
                </div>
            </div>
        )
    }
}

AddCategoryPage = reduxForm({
    form: 'Category',
    validate,
    enableReinitialize: true,
    destroyOnUnmount: true
})(AddCategoryPage);

function mapStateToProps(state) {
    return {
        initialValues: {
            inCategoryId: state.auth.GetCategoryInfoByIDResponse != undefined && state.auth.GetCategoryInfoByIDResponse.data != undefined ? state.auth.GetCategoryInfoByIDResponse.data[0]?.inCategoryId : "",
            stCategoryName: state.auth.GetCategoryInfoByIDResponse != undefined && state.auth.GetCategoryInfoByIDResponse.data != undefined ? state.auth.GetCategoryInfoByIDResponse.data[0]?.stCategoryName : ""

        },
        // insuranceTypeResponse: state.auth.insuranceTypeResponse,
        categoryResponse: state.auth.categoryResponse,
        GetCategoryInfoByIDResponse: state.auth.GetCategoryInfoByIDResponse,
        randomNumbers: state.auth.randomNumbers

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        ResetTag: (data) => dispatch(auth.actions.ResetInsuranceType(data)),
        GetCategoryInfoByID: (data) => dispatch(auth.actions.GetCategoryInfoByID(data)),
        //SaveTag: (data) => dispatch(auth.actions.SaveInsuranceType(data)),
        AddCategory: (data) => dispatch(auth.actions.AddCategory(data)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddCategoryPage);