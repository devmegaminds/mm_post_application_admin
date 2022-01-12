import React, { Component } from "react";
import { connect } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import * as auth from "../../../modules/Auth/_redux/authRedux";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import Spinner from "react-bootstrap/Spinner";
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import Overlay from "react-bootstrap/Overlay";
import { Texture } from "@material-ui/icons";
import { Field, reduxForm } from "redux-form";

import { OverlayTrigger, Tooltip } from "react-bootstrap";
const renderField = ({
  input,
  label,
  type,
  placeholder,
  meta: { asyncValidating, touched, error },
}) => (
  <div className="form-group col-sm-10" style={{ padding: 0 }}>
    <label>{label}</label>
    <input
      {...input}
      type={type}
      placeholder={placeholder}
      className="form-control "
    />
    {touched && error && (
      <small className="error-msg text-danger form-text">{error}</small>
    )}
  </div>
);

const renderdisableField = ({
  input,
  label,
  type,
  placeholder,
  meta: { asyncValidating, touched, error },
}) => (
  <div className="form-group col-sm-10" style={{ padding: 0 }}>
    <label>{label}</label>
    <input
      {...input}
      type={type}
      placeholder={placeholder}
      className="form-control "
      disabled={true}
    />
    {touched && error && (
      <small className="error-msg text-danger form-text">{error}</small>
    )}
  </div>
);

const validate = (values) => {
  const errors = {};
  const requiredFields = [
    "Firstname",
    "Lastname",
    "Email",
    "Contact",
    "Password",
    "Confirmpassword",
  ];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = field + " is required.";
    }
  });

  return errors;
};
class ViewUserPage extends Component {
  constructor(props) {
    super();
    this.state = {
      pageNumber: 1,
      ViewUserVideos: [],
      isGettingTags: false,
      userCoverDetails: [],
      userCoverPaymentDetails: [],
      invitedUserContactList: [],
      isGettingdata: true,
      showUserDetails: false,
      isError: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.getAdminUserByIdResponse) {
      if (
        nextProps.getAdminUserByIdResponse &&
        nextProps.getAdminUserByIdResponse !=
          this.props.getAdminUserByIdResponse
      ) {
        if (nextProps.getAdminUserByIdResponse.statusCode == 200) {
          // this.setState({ isGettingTags: false });
          // this.setState({ isLoading: false })
          // this.setState({ totalno: nextProps.getAdminUserByIdResponse.data.length })
          // this.setState({ ViewUserVideos: nextProps.getAdminUserByIdResponse.data })
        } else {
          this.setState({ isGettingTags: false });
          this.setState({ isLoading: false });
        }
      }
    }
  }
  componentDidMount() {
    var id = window.location.href.split("/").pop();
    var value = parseInt(id);
    if (!isNaN(value)) {
      if (id != "view") {
        this.setState({ isGettingTags: true });
        var data = {
          inAdminUserId: id,
        };
        this.props.GetAdminUserById(data);
      }
    } else {
      this.setState({ user: "IsNewUser" });
    }
    //this.props.GetUserPaymentMethods(id)
  }
  // handleView(row) {
  //     this.props.history.push(`/userview/${row.uiUserId}`)
  // }
  userDetails() {
    if (this.state.showUserDetails == false) {
      this.setState({ showUserDetails: true });
    }
    if (this.state.showUserDetails == true) {
      this.setState({ showUserDetails: false });
    }
  }
  onSubmit = (formValues) => {
    // console.log(formValues.Firstname, "ASDA");
    this.setState({ isLoading: true });
    if (formValues.Password != formValues.Confirmpassword) {
      this.setState({ isError: true });
      this.setState({ isLoading: false });
    } else {
      var data = {
        inAdminUserId:
          formValues.inAdminUserId == undefined ||
          formValues.inAdminUserId == ""
            ? 0
            : formValues.inAdminUserId,
        stFirstName: formValues.Firstname,
        stLastName: formValues.Lastname,
        stPassword: formValues.Confirmpassword,
        stContact: formValues.Contact,
        stEmail: formValues.Email,
      };
      this.props.AddAdminUser(data);
      this.setState({ isRedirect: true });
    }
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
    const columns = [
      { dataField: "inVideoId", text: "VideoId Unique Id", hidden: true },
      { dataField: "stTitle", text: "Video Title", sort: true },
      {
        dataField: "stVideoURL",
        text: "Video URL",
        formatter: (rowContent, row) => {
          return (
            <a href={row.stVideoURL} target="_blank">
              {row.stVideoURL}
            </a>
          );
        },
      },
      { dataField: "AssignedTags", text: "Assigned Tags", sort: false },
    ];

    const defaultSorted = [
      {
        dataField: "stTitle",
        order: "asc",
      },
    ];
    const sizePerPageList = [
      { text: "10", value: 10 },
      { text: "5", value: 5 },
      { text: "3", value: 3 },
    ];

    const pagination = paginationFactory({
      page: 1,
      sizePerPage: 10,
      showTotal: true,
      alwaysShowAllBtns: true,

      onPageChange: function(page, sizePerPage) {
        console.log("page", page);
        console.log("sizePerPage", sizePerPage);
      },
      onSizePerPageChange: function(page, sizePerPage) {
        console.log("page", page);
        console.log("sizePerPage", sizePerPage);
      },
    });
    const { SearchBar, ClearSearchButton } = Search;
    var User = this.state.user;
    if (this.state.isRedirect) {
      return <Redirect to="/ManageAdminUsersPage" />;
    }
    return (
      <div className="card card-custom gutter-b example example-compact">
        <div className="card-body">
          <form
            className="form-horizontal"
            ref={(el) => (this.myFormRef = el)}
            onSubmit={handleSubmit(this.onSubmit)}
          >
            <div className="card card-custom gutter-b example example-compact">
              <div className="card-title">
                <h3 className="card-label">User Details</h3>
              </div>
              <div className="card-toolbar"></div>
              <div className="row">
                <div className="col-sm-4">
                  {User == "IsNewUser" ? (
                    <Field
                      type="text"
                      name="Firstname"
                      label="First Name"
                      placeholder="First Name"
                      component={renderField}
                    />
                  ) : (
                    <Field
                      type="text"
                      name="stFirstName"
                      label="First Name"
                      placeholder="First Name"
                      component={renderdisableField}
                    />
                  )}
                </div>

                <div className="col-sm-4">
                  {User == "IsNewUser" ? (
                    <Field
                      type="text"
                      name="Lastname"
                      label="Last Name"
                      placeholder="Last Name"
                      component={renderField}
                    />
                  ) : (
                    <Field
                      type="text"
                      name="stLastName"
                      label="Last Name"
                      placeholder="Last Name"
                      component={renderdisableField}
                    />
                  )}
                </div>

                <div className="col-sm-4">
                  {User == "IsNewUser" ? (
                    <Field
                      type="text"
                      name="Email"
                      label="Email"
                      placeholder="Email Address"
                      component={renderField}
                    />
                  ) : (
                    <Field
                      type="text"
                      name="stEmail"
                      label="Email"
                      placeholder="Email Address"
                      component={renderdisableField}
                    />
                  )}
                </div>

                <div className="col-sm-4">
                  {User == "IsNewUser" ? (
                    <Field
                      type="text"
                      name="Contact"
                      label="PhoneNo"
                      placeholder="Phone Number"
                      component={renderField}
                    />
                  ) : (
                    <Field
                      type="text"
                      name="stContact"
                      label="PhoneNo"
                      placeholder="Phone Number"
                      component={renderdisableField}
                    />
                  )}
                </div>
              </div>
            </div>
            {User == "IsNewUser" ? (
              <div className="card card-custom gutter-b example example-compact">
                <div className="card-title">
                  <h3 className="card-label">Password</h3>
                </div>
                <div className="card-toolbar"></div>
                <div className="row">
                  <div className="col-sm-3">
                    <Field
                      type="password"
                      autocomplete="off"
                      name="Password"
                      label="Password"
                      placeholder="Enter Password"
                      component={renderField}
                    />
                    {this.state.isError == true ? (
                      <label style={{ marginTop: -15 }}>
                        Passwors not match
                      </label>
                    ) : null}
                  </div>
                  <div className="col-sm-3">
                    <Field
                      type="password"
                      autocomplete="off"
                      name="Confirmpassword"
                      label="Confirm Password"
                      placeholder="Enter Confirm Password"
                      component={renderField}
                    />
                  </div>
                </div>
              </div>
            ) : null}
            <div className="row mt-3 mb-3">
              <div className="col-sm-9 text-left userprofile-btn">
                {User == "IsNewUser" ? (
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
                ) : null}
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>Back</Tooltip>}
                >
                  <Link
                    style={{ width: 120 }}
                    className="btn btn-primary"
                    id="kw_lnk_cancel_carrier"
                    to="/ManageAdminUsersPage"
                  >
                    {User == "IsNewUser" ? (
                      "Cancel"
                    ) : (
                      <i class="fa fa-arrow-left" aria-hidden="true"></i>
                    )}
                  </Link>
                </OverlayTrigger>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
ViewUserPage = reduxForm({
  form: "Profile",
  validate,
  enableReinitialize: true,
  destroyOnUnmount: true,
})(ViewUserPage);
function mapStateToProps(state) {
  return {
    initialValues: {
      inAdminUserId:
        state.auth.GetAdminUserByIdResponse != undefined &&
        state.auth.GetAdminUserByIdResponse.data != undefined
          ? state.auth.GetAdminUserByIdResponse.data.inAdminUserId
          : "",
      stFirstName:
        state.auth.GetAdminUserByIdResponse != undefined &&
        state.auth.GetAdminUserByIdResponse.data != undefined
          ? state.auth.GetAdminUserByIdResponse.data.stFirstName
          : "",
      stLastName:
        state.auth.GetAdminUserByIdResponse != undefined &&
        state.auth.GetAdminUserByIdResponse.data != undefined
          ? state.auth.GetAdminUserByIdResponse.data.stLastName
          : "",
      stContact:
        state.auth.GetAdminUserByIdResponse != undefined &&
        state.auth.GetAdminUserByIdResponse.data != undefined
          ? state.auth.GetAdminUserByIdResponse.data.stContact
          : "",
      // stBusinessName: state.auth.GetAdminUserByIdResponse != undefined && state.auth.GetAdminUserByIdResponse.data != undefined ? state.auth.GetAdminUserByIdResponse.data.stBusinessName : "",
      // stWebsite: state.auth.GetAdminUserByIdResponse != undefined && state.auth.GetAdminUserByIdResponse.data != undefined ? state.auth.GetAdminUserByIdResponse.data.stWebsite : "",
      // stAddress: state.auth.GetAdminUserByIdResponse != undefined && state.auth.GetAdminUserByIdResponse.data != undefined ? state.auth.GetAdminUserByIdResponse.data.stAddress : "",
      stEmail:
        state.auth.GetAdminUserByIdResponse != undefined &&
        state.auth.GetAdminUserByIdResponse.data != undefined
          ? state.auth.GetAdminUserByIdResponse.data.stEmail
          : "",
    },
    getAdminUserByIdResponse: state.auth.GetAdminUserByIdResponse,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    GetAdminUserById: (data) => dispatch(auth.actions.GetAdminUserById(data)),
    AddAdminUser: (data) => dispatch(auth.actions.AddAdminUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewUserPage);
