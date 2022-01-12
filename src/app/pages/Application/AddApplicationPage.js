import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm, getFormValues } from "redux-form";
import * as auth from "../../modules/Auth/_redux/authRedux";
import { Link, Redirect } from "react-router-dom";
import "../custom.css";
import SweetAlert from "react-bootstrap-sweetalert";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const renderFields = ({
  input,
  label,
  type,
  data,
  placeholder,
  meta: { asyncValidating, touched, error },
}) => (
  <div className="form-group">
    <label>{label}</label>
    <input
      {...input}
      type={type}
      placeholder={placeholder}
      className="form-control"
      style={{ marginTop: "-3%" }}
    />
    {touched && error && (
      <small className="error-msg text-danger form-text">{error}</small>
    )}
  </div>
);

const renderCheckboxField = ({
  input,
  label,
  type,
  checked,
  id,
  txtId,
  data,
  onClick,
  meta: { asyncValidating, touched, error },
}) => (
  <div className="form-check form-check-inline">
    {/* style={{ marginTop: 33 }} */}
    <input
      {...input}
      type={type}
      checked={data}
      className="form-check-input"
      style={{ cursor: "pointer" }}
    ></input>
    <label className="form-check-label">{label}</label>
  </div>
);
const validate = (values) => {
  const errors = {};
  const requiredFields = ["stApplication"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = field.substring(2) + " is required.";
    }
  });
  if (values.stApplication && values.stApplication.trim() == "") {
    errors["stApplication"] = "Application is required.";
  }
  return errors;
};

class AddApplicationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      currentUserData: {},
      categoryData: [],
      isChecked: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.props.GetCategory("");
    this.state.currentUserData = JSON.parse(
      JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
    ).data;
  }
  // onSubmit = (formValues) => {
  //     debugger
  //     let indexOfItem = this.state.categoryData.filter(tag => tag.Checked === true)
  //     console.log(indexOfItem);
  //     this.setState({ isLoading: true });
  //     indexOfItem.forEach(element => {
  //         var data = {
  //             inApplicationId: formValues.inApplicationId == undefined || formValues.inApplicationId == "" ? 0 : formValues.inApplicationId,
  //             stApplicationName: formValues.stApplication,
  //             inCreatedBy: this.state.currentUserData.inUserID,
  //             applicationID: element
  //         }
  //         console.log(data,"LLLLL");
  //         // this.props.AddApplication(data);
  //     });
  //     debugger
  // }
  onSubmit = (formValues) => {
    this.setState({ isLoading: true });
    if (formValues.stApplication.trim() != "") {
      var data = {
        inApplicationId:
          formValues.inApplicationId == undefined ||
          formValues.inApplicationId == ""
            ? 0
            : formValues.inApplicationId,
        stApplicationName: formValues.stApplication.trim(),
        inCreatedBy: this.state.currentUserData.inAdminUserId,
      };
      this.props.AddApplication(data);
    }
  };

  hideModel = () => {
    this.setState({
      alert: "",
      showModal: false,
    });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.getApplicationInfoByIdResponse) {
      if (
        nextProps.getApplicationInfoByIdResponse &&
        nextProps.getApplicationInfoByIdResponse !=
          this.props.getApplicationInfoByIdResponse
      ) {
        if (nextProps.getApplicationInfoByIdResponse.statusCode == 200) {
        } else if (nextProps.getApplicationInfoByIdResponse.Code == 200) {
        } else this.SuccessFailSweetAlert("getting error", "error");
      }
    }
    if (nextProps.applicationResponse) {
      if (
        nextProps.applicationResponse &&
        nextProps.applicationResponse != this.props.applicationResponse
      ) {
        if (nextProps.applicationResponse.statusCode == 200) {
          this.setState({ isLoading: false, isRedirect: true });
        } else if (nextProps.applicationResponse.status == "Error") {
          this.setState({ Message: "Application is already exist." });
          this.setState({ showModal: true });
          this.setState({ isLoading: false });
        } else {
          this.setState({ isLoading: false, isRedirect: false });
        }
      }
    }
    if (nextProps.GetCategoryResponse) {
      if (
        nextProps.GetCategoryResponse &&
        nextProps.GetCategoryResponse != this.props.GetCategoryResponse
      ) {
        if (nextProps.GetCategoryResponse.data.length > 0) {
          this.setState({ isGettingTags: false });
          this.setState({ categoryData: nextProps.GetCategoryResponse.data });
        }
      }
    }
  }
  hideModel = () => {
    this.setState({
      alert: "",
      showModal: false,
    });
  };

  componentDidMount() {
    var id = window.location.href.split("/").pop();
    if (id != "Application") this.props.GetApplicationInfoById(id);
    else {
      var data = {
        inApplicationId: "",
        stAppplicationName: "",
        inCreatedBy: "",
        Code: 200,
      };
      this.props.ResetTag(data);
    }
  }

  SuccessFailSweetAlert(msg, type) {
    let getAlert = "";
    if (type == "success") {
      getAlert = () => (
        <SweetAlert
          success
          title={msg}
          onConfirm={() => this.hideAlert(true)}
        ></SweetAlert>
      );
    } else {
      getAlert = () => (
        <SweetAlert
          error
          title={msg}
          onConfirm={() => this.hideAlert(false)}
        ></SweetAlert>
      );
    }

    this.setState({
      alert: getAlert(),
    });
  }
  onChangesTagName = (e, index) => {
    // this.setState({ isChecked: this.state.categoryData[index].Checked ? false : true })
    this.state.categoryData[index].Checked = !this.state.isChecked
      ? !this.state.categoryData[index].Checked
      : false;
    this.setState({ categoryData: this.state.categoryData });
  };
  render() {
    var $this = this;
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      formValues,
      change,
    } = this.props;
    if (this.state.isRedirect) {
      return <Redirect to="/ManageApplication" />;
    }
    return (
      <div className="card card-custom gutter-b example example-compact">
        {this.state.alert}
        <div className="card-body">
          <form
            className="form-horizontal"
            onSubmit={handleSubmit(this.onSubmit)}
          >
            <input type="hidden" name="inApplicationId" />
            <div className="row">
              <div className="col-sm-6">
                <h6 style={{ marginBottom: 10 }}>
                  Application Name <span className="text-danger">*</span>
                </h6>
                {/* <label style={{opacity : this.isError ? 1 : 0}}>Application is required.</label> */}
                <Field
                  type="text"
                  name="stApplication"
                  placeholder="Enter Application Name"
                  component={renderFields}
                />
              </div>
            </div>
            {/* <div className="row">
                            <div className="col-sm-8">
                                <h6 >Category</h6><br></br>
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
                        </div> */}
            <div className="row mt-3 mb-3">
              <div className="col-sm-9 text-left userprofile-btn">
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>Submit</Tooltip>}
                >
                  <button
                    style={{ width: 120, marginRight: 10 }}
                    id="kw_dtn_add_carrier"
                    type="submit"
                    disabled={this.state.isLoading}
                    className={`btn btn-primary`}
                  >
                    Submit
                    {this.state.isLoading && (
                      <span className="ml-3 spinner spinner-white"></span>
                    )}
                  </button>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>Cancel</Tooltip>}
                >
                  <Link
                    style={{ width: 120 }}
                    className="btn btn-danger"
                    id="kw_lnk_cancel_carrier"
                    to="/ManageApplication"
                  >
                    Cancel
                  </Link>
                </OverlayTrigger>
              </div>
            </div>
            {this.state.showModal && (
              <SweetAlert
                info
                title={this.state.Message}
                onConfirm={() => this.hideModel()}
              ></SweetAlert>
            )}
            {this.state.showModal && (
              <SweetAlert
                error
                title={this.state.Message}
                onConfirm={() => this.hideModel()}
              ></SweetAlert>
            )}
          </form>
        </div>
      </div>
    );
  }
}

AddApplicationPage = reduxForm({
  form: "Application",
  validate,
  enableReinitialize: true,
  destroyOnUnmount: true,
})(AddApplicationPage);
function mapStateToProps(state) {
  return {
    initialValues: {
      inApplicationId:
        state.auth.GetApplicationInfoByIdResponse != undefined &&
        state.auth.GetApplicationInfoByIdResponse.data != undefined
          ? state.auth.GetApplicationInfoByIdResponse.data[0]?.inApplicationId
          : "",
      stApplication:
        state.auth.GetApplicationInfoByIdResponse != undefined &&
        state.auth.GetApplicationInfoByIdResponse.data != undefined
          ? state.auth.GetApplicationInfoByIdResponse.data[0]
              ?.stAppplicationName
          : "",
    },
    // insuranceTypeResponse: state.auth.insuranceTypeResponse,
    applicationResponse: state.auth.applicationResponse,
    GetApplicationInfoByIdResponse: state.auth.GetApplicationInfoByIdResponse,
    randomNumbers: state.auth.randomNumbers,
    GetCategoryResponse: state.auth.GetCategoryResponse,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    ResetTag: (data) => dispatch(auth.actions.ResetInsuranceType(data)),
    GetApplicationInfoById: (data) =>
      dispatch(auth.actions.GetApplicationInfoById(data)),
    //SaveTag: (data) => dispatch(auth.actions.SaveInsuranceType(data)),
    AddApplication: (data) => dispatch(auth.actions.AddApplication(data)),
    GetCategory: (data) => dispatch(auth.actions.GetCategory(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddApplicationPage);
