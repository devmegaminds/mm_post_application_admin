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
    this.parentRef = React.createRef();
    this.changeBackground = this.changeBackground.bind(this);
    this.resetBackground = this.resetBackground.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.GetUserByIdResponse) {
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

  changeBackground(e) {
    console.log(e);
    e.target.style.background = "red";
  }

  resetBackground(e) {
    console.log(e);
    e.target.style.background = "green";
  }

  render() {
    var $this = this;
    const PERSONALPROFILECOLUMNS = [
      { dataField: "stFirstName", text: "FirstName", sort: true },
      { dataField: "stLastName", text: "LastName", sort: true },
      { dataField: "stMobileNumber", text: "MobileNumber", sort: true },
      { dataField: "stEmail", text: "Email", sort: true },
      { dataField: "stAddress", text: "Address", sort: true },
    ];

    const BUSINESSPROFILECOLUMNS = [
      {
        dataField: "stImagePath",
        text: "Logo",
        formatter: (rowContent, row) => {
          console.log(rowContent);
          return (
            <img
              resizeMode="contain"
              width="150px"
              // src={`https://images.unsplash.com/photo-1610878180933-123728745d22?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FuYWRhJTIwbmF0dXJlfGVufDB8fDB8fA%3D%3D&w=1000&q=80`}
              src={`${baseURL}${rowContent}`}
            />
          );
        },
      },
      { dataField: "stBusinessName", text: "BusinessName", sort: true },
      { dataField: "stBusinessSite", text: "BusinessSite", sort: true },
      { dataField: "stMobileNumber", text: "MobileNumber", sort: true },
      { dataField: "stBusinessEmail", text: "BusinessEmail", sort: true },
      { dataField: "stBusinessAddress", text: "BusinessAddress", sort: true },
    ];

    const DEVICETABLECOLUMNS = [
      // { dataField: "inDeviceId", text: "DeviceId", sort: true },
      { dataField: "stDeviceName", text: "DeviceName", sort: true },
      { dataField: "stCountry", text: "Country", sort: true },
      { dataField: "stRegionName", text: "RegionName", sort: true },
      // { dataField: "inProfileId", text: "ProfileId", sort: true },

      {
        dataField: "stTotalDiskCapacity",
        text: "ProfileType",
        sort: true,
        formatter: (rowContent, row) => {
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
          const i = Math.floor(Math.log(rowContent) / Math.log(k));
          return `${parseFloat((rowContent / Math.pow(k, i)).toFixed(dm))} ${
            sizes[i]
          }`;
        },
      },

      {
        dataField: "stProfileType",
        text: "ProfileType",
        sort: true,
        formatter: (rowContent, row) => {
          return (
            <>
              {rowContent == 2
                ? "Business"
                : rowContent == 1
                ? "Personal"
                : null}
            </>
          );
        },
      },
      // { dataField: "stProfileType", text: "ProfileType", sort: true },
    ];

    const defaultSorted = [
      {
        dataField: "stTags",
        order: "asc",
      },
    ];
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
              {/* {this.state.isGettingListData && (
              // <Spinner animation="border" variant="primary" />
            )} */}
            </div>
            <div className="card-toolbar"></div>
          </div>
          <div className="card-body">
            <h3 className="card-label">Personal Profile List</h3>
            <ToolkitProvider
              debugger
              bootstrap4
              keyField="kw_insuranceType_datatable"
              data={this.state.userPersonalProfilesData}
              columns={PERSONALPROFILECOLUMNS}
            >
              {(props) => (
                <div>
                  <BootstrapTable
                    defaultSorted={defaultSorted}
                    {...props.baseProps}
                  />
                </div>
              )}
            </ToolkitProvider>
            <h3 className="card-label">Business Profile List</h3>
            <ToolkitProvider
              debugger
              bootstrap4
              keyField="kw_insuranceType_datatable"
              data={this.state.userBusinessProfilesData}
              columns={BUSINESSPROFILECOLUMNS}
            >
              {(props) => (
                <div>
                  <BootstrapTable
                    defaultSorted={defaultSorted}
                    {...props.baseProps}
                  />
                </div>
              )}
            </ToolkitProvider>
          </div>
        </div>

        <div className="card card-custom gutter-b">
          <div className="card-header">
            <div className="card-title">
              <h3 className="card-label">
                Device List
              </h3>
            </div>
            <div className="card-toolbar"></div>
          </div>
          <div className="card-body">
            <ToolkitProvider
              debugger
              bootstrap4
              keyField="kw_insuranceType_datatable"
              data={this.state.getDeviceList}
              columns={DEVICETABLECOLUMNS}
            >
              {(props) => (
                <div>
                  <BootstrapTable
                    defaultSorted={defaultSorted}
                    {...props.baseProps}
                  />
                </div>
              )}
            </ToolkitProvider>
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
