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
        'stApplication'
    ]
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = field.substring(2) + ' is required.'
        }
    })
    return errors
}

class AddApplicationPage extends Component {
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
            inApplicationId: formValues.inApplicationId == undefined || formValues.inApplicationId == "" ? 0 : formValues.inApplicationId,
            stApplicationName: formValues.stApplication,
            inCreatedBy: this.state.currentUserData.inUserID
        }
        //this.props.SaveTag(data);
        this.props.AddApplication(data);
    }

    hideModel = () => {
        this.setState({
            alert: '',
            showModal: false,
        })
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.getApplicationInfoByIdResponse) {
            if (nextProps.getApplicationInfoByIdResponse && nextProps.getApplicationInfoByIdResponse != this.props.getApplicationInfoByIdResponse) {
                if (nextProps.getApplicationInfoByIdResponse.statusCode == 200) {

                }
                else if (nextProps.getApplicationInfoByIdResponse.Code == 200) {

                }
                else
                    this.SuccessFailSweetAlert("getting error", "error");
            }
        }
        if (nextProps.applicationResponse) {
            if (nextProps.applicationResponse && nextProps.applicationResponse != this.props.applicationResponse) {
                if (nextProps.applicationResponse.statusCode == 200) {
                    this.setState({ isLoading: false, isRedirect: true });
                }
                else if (nextProps.applicationResponse.status == "Error") {
                    this.setState({ Message: nextProps.applicationResponse.errorMessage });
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
        if (id != "Application")
            this.props.GetApplicationInfoById(id)
        else {
            var data = {
                inApplicationId: "",
                stAppplicationName: "",
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
            return <Redirect to="/ManageApplication" />
        }
        return (
            <div className="card card-custom gutter-b example example-compact">
                {this.state.alert}
                <div className="card-body">
                    <form className="form-horizontal" onSubmit={handleSubmit(this.onSubmit)}>
                        <input type="hidden" name="inApplicationId" />
                        <div className="row">
                            <div className="col-sm-6">
                                <label >Application Name <span className="text-danger">*</span></label>
                                <Field
                                    type="text"
                                    name="stApplication"
                                    placeholder="Enter Application Name"
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
                                    </button></OverlayTrigger>
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

AddApplicationPage = reduxForm({
    form: 'Application',
    validate,
    enableReinitialize: true,
    destroyOnUnmount: true
})(AddApplicationPage);
function mapStateToProps(state) {
    return {
        initialValues: {
            inApplicationId: state.auth.GetApplicationInfoByIdResponse != undefined && state.auth.GetApplicationInfoByIdResponse.data != undefined ? state.auth.GetApplicationInfoByIdResponse.data[0]?.inApplicationId : "",
            stApplication: state.auth.GetApplicationInfoByIdResponse != undefined && state.auth.GetApplicationInfoByIdResponse.data != undefined ? state.auth.GetApplicationInfoByIdResponse.data[0]?.stAppplicationName : ""

        },
        // insuranceTypeResponse: state.auth.insuranceTypeResponse,
        applicationResponse: state.auth.applicationResponse,
        GetApplicationInfoByIdResponse: state.auth.GetApplicationInfoByIdResponse,
        randomNumbers: state.auth.randomNumbers

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        ResetTag: (data) => dispatch(auth.actions.ResetInsuranceType(data)),
        GetApplicationInfoById: (data) => dispatch(auth.actions.GetApplicationInfoById(data)),
        //SaveTag: (data) => dispatch(auth.actions.SaveInsuranceType(data)),
        AddApplication: (data) => dispatch(auth.actions.AddApplication(data)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddApplicationPage);