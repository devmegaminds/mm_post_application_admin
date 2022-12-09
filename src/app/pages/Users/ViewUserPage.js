import React, { Component } from "react";
import { connect } from "react-redux";
import paginationFactory from "react-bootstrap-table2-paginator";
import * as auth from "../../modules/Auth/_redux/authRedux";
import { Link, Redirect } from "react-router-dom";
import { Field, FieldArray, reduxForm, getFormValues } from "redux-form";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
const baseURL = "http://megaminds-001-site12.itempurl.com";

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
  const requiredFields = [];
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
      userProfilesListData: [],
      isGettingTags: false,
      userProfilesData: [],
      getDeviceList: [],
      userPersonalProfilesData: [],
      userBusinessProfilesData: [],
      userCoverDetails: [],
      userCoverPaymentDetails: [],
      invitedUserContactList: [],
      isGettingdata: true,
      showUserDetails: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.GetUserByIdResponse) {
      console.log(nextProps.GetUserByIdResponse, "/-/-/-/-/-/-");
      if (
        nextProps.GetUserByIdResponse &&
        nextProps.GetUserByIdResponse != this.props.GetUserByIdResponse
      ) {
        if (nextProps.GetUserByIdResponse.statusCode == 200) {
          this.setState({ isGettingTags: false });
          this.setState({ isLoading: false });
          this.setState({ totalno: nextProps.GetUserByIdResponse.data.length });
          this.setState({ ViewUserVideos: nextProps.GetUserByIdResponse.data });
        } else {
          this.setState({ isGettingTags: false });
          this.setState({ isLoading: false });
        }
      }
    }

    if (nextProps.getProfileDetailsByUserIdResponse) {
      if (
        nextProps.getProfileDetailsByUserIdResponse &&
        nextProps.getProfileDetailsByUserIdResponse !=
          this.props.getProfileDetailsByUserIdResponse
      ) {
        if (nextProps.getProfileDetailsByUserIdResponse.statusCode == 200) {
          this.setState({
            userProfilesNumber:
              nextProps.getProfileDetailsByUserIdResponse.data.length,
          });

          var PersonalProfile = nextProps.getProfileDetailsByUserIdResponse.data.filter(
            function(el) {
              return el.stProfileType != 2;
            }
          );
          var BusinessProfile = nextProps.getProfileDetailsByUserIdResponse.data.filter(
            function(el) {
              return el.stProfileType == 2;
            }
          );

          this.setState({
            userPersonalProfilesData: PersonalProfile,
          });
          this.setState({
            userBusinessProfilesData: BusinessProfile,
          });
          this.setState({
            userProfilesData: nextProps.getProfileDetailsByUserIdResponse.data,
          });
        } else {
        }
      }
    }

    if (nextProps.getDeviceDetailsByUserIdResponse) {
      if (
        nextProps.getDeviceDetailsByUserIdResponse &&
        nextProps.getDeviceDetailsByUserIdResponse !=
          this.props.getDeviceDetailsByUserIdResponse
      ) {
        if (nextProps.getDeviceDetailsByUserIdResponse.statusCode == 200) {
          this.setState({
            totalNoOfDevice:
              nextProps.getDeviceDetailsByUserIdResponse.data.length,
          });
          this.setState({
            getDeviceList: nextProps.getDeviceDetailsByUserIdResponse.data,
          });
        } else {
          this.setState({ isGettingTags: false });
          this.setState({ isLoading: false });
        }
      }
    }
  }

  componentDidMount() {
    var id = window.location.href.split("/").pop();
    if (id != "view") {
      this.setState({ isGettingTags: true });
      var data = {
        // inUserID: 446,
        inUserID: id,
      };
      console.log(data, "DATA");
      this.props.GetUserById(data);
      this.props.GetProfileByUserId(data);
      this.props.GetDeviceListByUserId(data);
    }
  }

  myFunction(item) {
    console.log(item);
    if (item.stProfileType == 1) {
      document.getElementsByClassName(
        `${item.inDeviceId}`
      )[0].style.background = "#C9F7F5";
    } else if (item.stProfileType == 2) {
      document.getElementsByClassName(
        `${item.inDeviceId}`
      )[0].style.background = "#E1F0FF";
    } else {
      document.getElementsByClassName(
        `${item.inDeviceId}`
      )[0].style.background = "";
    }
  }
  resetBackground(item) {
    document.getElementsByClassName(`${item.inDeviceId}`)[0].style.background =
      "";
  }
  render() {
    var $this = this;
    return (
      <>
        <div className="card card-custom gutter-b example example-compact">
          <div className="card-body">
            <form
              className="form-horizontal"
              ref={(el) => (this.myFormRef = el)}
            >
              <div className="card card-custom gutter-b example example-compact">
                <div className="card-title">
                  <h3 className="card-label">User Details</h3>
                </div>
                <div className="card-toolbar"></div>
                <div className="row">
                  <div className="col-sm-4">
                    <Field
                      type="text"
                      name="stContact"
                      label="Phone Number"
                      placeholder="Phone Number"
                      component={renderdisableField}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="card card-custom gutter-b">
          <div className="card-header">
            <div className="card-title">
              <h3 className="card-label">Profile List</h3>
            </div>
            <div className="card-toolbar"></div>
          </div>
          <div className="card-body table-responsive">
            <h3 className="card-label">Personal Profile List</h3>
            <table class="table table-hover-table-responsive">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Mobile Number</th>
                  <th scope="col">Email</th>
                  <th scope="col">Address</th>
                </tr>
              </thead>
              <tbody>
                {this.state.userPersonalProfilesData?.map((item, index) => {
                  var indexNumber = index + 1;
                  return (
                    <tr className={item.inDeviceId}>
                      <th scope="row">{indexNumber}</th>
                      <td>{item.stFirstName}</td>
                      <td>{item.stLastName}</td>
                      <td>{item.stContact}</td>
                      <td>{item.stEmail}</td>
                      <td>{item.stAddress}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="card-body table-responsive">
            <h3 className="card-label">Business Profile List</h3>
            <table class="table table-hover" id="businesstable">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Business Logo</th>
                  <th scope="col">Business Name</th>
                  <th scope="col">Business Site</th>
                  <th scope="col">Mobile Number</th>
                  <th scope="col">Business Email</th>
                  <th scope="col">Business Address</th>
                </tr>
              </thead>
              <tbody>
                {this.state.userBusinessProfilesData?.map((item, index) => {
                  var indexNumber = index + 1;
                  return (
                    <tr className={item.inDeviceId}>
                      <th scope="row">{indexNumber}</th>
                      <td>
                        <img
                          resizeMode="contain"
                          width="150px"
                          src={`${baseURL}${item.stImagePath}`}
                        />
                      </td>
                      <td>{item.stBusinessName}</td>
                      <td>{item.stBusinessSite}</td>
                      <td>{item.stMobileNumber}</td>
                      <td>{item.stBusinessEmail}</td>
                      <td>{item.stBusinessAddress}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card card-custom gutter-b">
          <div className="card-header">
            <div className="card-title">
              <h3 className="card-label">Device List</h3>
            </div>
            <div className="card-toolbar"></div>
          </div>

          <div className="card-body table-responsive">
            <h3 className="card-label">Device List</h3>
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Device Name</th>
                  <th scope="col">Country</th>
                  <th scope="col">Region Name</th>
                  <th scope="col">TotalDisk Capacity</th>
                  <th scope="col">Profile Type</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {this.state.getDeviceList?.map((item, index) => {
                  var indexNumber = index + 1;
                  var decimals = 2;
                  const k = 1024;
                  const dm = decimals < 0 ? 0 : decimals;
                  const sizes = [
                    "Bytes",
                    "KB",
                    "MB",
                    "GB",
                    "TB",
                    "PB",
                    "EB",
                    "ZB",
                    "YB",
                  ];
                  const i = Math.floor(
                    Math.log(item.stTotalDiskCapacity) / Math.log(k)
                  );
                  var deviceSpace = `${parseFloat(
                    (item.stTotalDiskCapacity / Math.pow(k, i)).toFixed(dm)
                  )} ${sizes[i]}`;

                  return (
                    <tr
                      onMouseOver={() => this.myFunction(item)}
                      onMouseOut={() => this.resetBackground(item)}
                      className={item.inDeviceId}
                      // onMouseOver={() => this.changeBackground(item)}
                    >
                      <th scope="row">{indexNumber}</th>
                      <td>{item.stDeviceName}</td>
                      <td>{item.stCountry}</td>
                      <td>{item.stRegionName}</td>
                      <td>{deviceSpace}</td>
                      <td>
                        {item.stProfileType == 1 ? (
                          <span
                            style={{ marginRight: 5 }}
                            class="label label-inline label-light-success font-weight-bold"
                          >
                            Personal
                          </span>
                        ) : item.stProfileType == 2 ? (
                          <span
                            style={{ marginRight: 5 }}
                            class="label label-inline label-light-primary font-weight-bold"
                          >
                            Business
                          </span>
                        ) : (
                          <span class="label label-inline label-light-danger font-weight-bold">
                            No Profile Type Found
                          </span>
                        )}
                      </td>
                      <td>
                        {item.stProfileType == 1 ? (
                          <span>
                            <span class="label label-inline label-light-success font-weight-bold">
                              {item.stFirstName} {item.stLastName}
                            </span>
                          </span>
                        ) : item.stProfileType == 2 ? (
                          <span>
                            <span
                              style={{ fontWeight: "bold" }}
                              class="label label-inline label-light-primary font-weight-bold"
                            >
                              {item.stBusinessName}
                            </span>
                          </span>
                        ) : (
                          <span class="label label-inline label-light-danger font-weight-bold">
                            No Profile Type Found
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>
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
      inUserID:
        state.auth.GetUseFavoriteVideoDataResponse != undefined &&
        state.auth.GetUseFavoriteVideoDataResponse.data != undefined
          ? state.auth.GetUseFavoriteVideoDataResponse.data.inUserID
          : "",
      stFirstName:
        state.auth.GetUseFavoriteVideoDataResponse != undefined &&
        state.auth.GetUseFavoriteVideoDataResponse.data != undefined
          ? state.auth.GetUseFavoriteVideoDataResponse.data.stFirstName
          : "",
      stLastName:
        state.auth.GetUseFavoriteVideoDataResponse != undefined &&
        state.auth.GetUseFavoriteVideoDataResponse.data != undefined
          ? state.auth.GetUseFavoriteVideoDataResponse.data.stLastName
          : "",
      stContact:
        state.auth.GetUseFavoriteVideoDataResponse != undefined &&
        state.auth.GetUseFavoriteVideoDataResponse.data != undefined
          ? state.auth.GetUseFavoriteVideoDataResponse.data.stContact
          : "",
      stBusinessName:
        state.auth.GetUseFavoriteVideoDataResponse != undefined &&
        state.auth.GetUseFavoriteVideoDataResponse.data != undefined
          ? state.auth.GetUseFavoriteVideoDataResponse.data.stBusinessName
          : "",
      stWebsite:
        state.auth.GetUseFavoriteVideoDataResponse != undefined &&
        state.auth.GetUseFavoriteVideoDataResponse.data != undefined
          ? state.auth.GetUseFavoriteVideoDataResponse.data.stWebsite
          : "",
      stAddress:
        state.auth.GetUseFavoriteVideoDataResponse != undefined &&
        state.auth.GetUseFavoriteVideoDataResponse.data != undefined
          ? state.auth.GetUseFavoriteVideoDataResponse.data.stAddress
          : "",
      stEmail:
        state.auth.GetUseFavoriteVideoDataResponse != undefined &&
        state.auth.GetUseFavoriteVideoDataResponse.data != undefined
          ? state.auth.GetUseFavoriteVideoDataResponse.data.stEmail
          : "",
      inApiLevel:
        state.auth.GetUseFavoriteVideoDataResponse != undefined &&
        state.auth.GetUseFavoriteVideoDataResponse.data != undefined
          ? state.auth.GetUseFavoriteVideoDataResponse.data.inApiLevel
          : "",
      stUniqueId:
        state.auth.GetUseFavoriteVideoDataResponse != undefined &&
        state.auth.GetUseFavoriteVideoDataResponse.data != undefined
          ? state.auth.GetUseFavoriteVideoDataResponse.data.stUniqueId
          : "",
      stIpAddress:
        state.auth.GetUseFavoriteVideoDataResponse != undefined &&
        state.auth.GetUseFavoriteVideoDataResponse.data != undefined
          ? state.auth.GetUseFavoriteVideoDataResponse.data.stIpAddress
          : "",
      stMacAddress:
        state.auth.GetUseFavoriteVideoDataResponse != undefined &&
        state.auth.GetUseFavoriteVideoDataResponse.data != undefined
          ? state.auth.GetUseFavoriteVideoDataResponse.data.stMacAddress
          : "",
      stbaseOS:
        state.auth.GetUseFavoriteVideoDataResponse != undefined &&
        state.auth.GetUseFavoriteVideoDataResponse.data != undefined
          ? state.auth.GetUseFavoriteVideoDataResponse.data.stbaseOS
          : "",
      stBootloader:
        state.auth.GetUseFavoriteVideoDataResponse != undefined &&
        state.auth.GetUseFavoriteVideoDataResponse.data != undefined
          ? state.auth.GetUseFavoriteVideoDataResponse.data.stBootloader
          : "",
      stBuildId:
        state.auth.GetUseFavoriteVideoDataResponse != undefined &&
        state.auth.GetUseFavoriteVideoDataResponse.data != undefined
          ? state.auth.GetUseFavoriteVideoDataResponse.data.stBuildId
          : "",
      stDeviceName:
        state.auth.GetUseFavoriteVideoDataResponse != undefined &&
        state.auth.GetUseFavoriteVideoDataResponse.data != undefined
          ? state.auth.GetUseFavoriteVideoDataResponse.data.stDeviceName
          : "",
      stDeviceName:
        state.auth.GetUseFavoriteVideoDataResponse != undefined &&
        state.auth.GetUseFavoriteVideoDataResponse.data != undefined
          ? state.auth.GetUseFavoriteVideoDataResponse.data.stDeviceName
          : "",
      stInstanceId:
        state.auth.GetUseFavoriteVideoDataResponse != undefined &&
        state.auth.GetUseFavoriteVideoDataResponse.data != undefined
          ? state.auth.GetUseFavoriteVideoDataResponse.data.stInstanceId
          : "",
      stHardware:
        state.auth.GetUseFavoriteVideoDataResponse != undefined &&
        state.auth.GetUseFavoriteVideoDataResponse.data != undefined
          ? state.auth.GetUseFavoriteVideoDataResponse.data.stHardware
          : "",
      stMaxMemory:
        state.auth.GetUseFavoriteVideoDataResponse != undefined &&
        state.auth.GetUseFavoriteVideoDataResponse.data != undefined
          ? state.auth.GetUseFavoriteVideoDataResponse.data.stMaxMemory
          : "",
      stProduct:
        state.auth.GetUseFavoriteVideoDataResponse != undefined &&
        state.auth.GetUseFavoriteVideoDataResponse.data != undefined
          ? state.auth.GetUseFavoriteVideoDataResponse.data.stProduct
          : "",
      stSynchronizedUniqueId:
        state.auth.GetUseFavoriteVideoDataResponse != undefined &&
        state.auth.GetUseFavoriteVideoDataResponse.data != undefined
          ? state.auth.GetUseFavoriteVideoDataResponse.data
              .stSynchronizedUniqueId
          : "",
      stCarrier:
        state.auth.GetUseFavoriteVideoDataResponse != undefined &&
        state.auth.GetUseFavoriteVideoDataResponse.data != undefined
          ? state.auth.GetUseFavoriteVideoDataResponse.data.stCarrier
          : "",
      stTotalMemory:
        state.auth.GetUseFavoriteVideoDataResponse != undefined &&
        state.auth.GetUseFavoriteVideoDataResponse.data != undefined
          ? state.auth.GetUseFavoriteVideoDataResponse.data.stTotalMemory
          : "",
      stUsedMemory:
        state.auth.GetUseFavoriteVideoDataResponse != undefined &&
        state.auth.GetUseFavoriteVideoDataResponse.data != undefined
          ? state.auth.GetUseFavoriteVideoDataResponse.data.stUsedMemory
          : "",
    },
    GetUserByIdResponse: state.auth.GetUseFavoriteVideoDataResponse,
    getProfileDetailsByUserIdResponse:
      state.auth.GetProfileDetailsByUserIdResponse,
    getDeviceDetailsByUserIdResponse:
      state.auth.GetDeviceDetailsByUserIdResponse,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    GetUserById: (data) => dispatch(auth.actions.GetUseFavoriteVideoData(data)),
    GetProfileByUserId: (data) =>
      dispatch(auth.actions.GetProfileDetailsByUserId(data)),
    GetDeviceListByUserId: (data) =>
      dispatch(auth.actions.GetDeviceDetailsByUserId(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewUserPage);
