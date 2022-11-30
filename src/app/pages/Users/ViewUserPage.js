import React, { Component } from "react";
import { connect } from "react-redux";
import paginationFactory from "react-bootstrap-table2-paginator";
import * as auth from "../../modules/Auth/_redux/authRedux";
import { Search } from "react-bootstrap-table2-toolkit";
import { Link, Redirect } from "react-router-dom";
import { Field, FieldArray, reduxForm, getFormValues } from "redux-form";
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
// const renderField = ({
//   input,
//   label,
//   type,
//   placeholder,
//   meta: { asyncValidating, touched, error },
// }) => (
//   <div className="form-group col-sm-10" style={{ padding: 0 }}>
//     <label>{label}</label>
//     <input
//       {...input}
//       type={type}
//       placeholder={placeholder}
//       className="form-control "
//     />
//     {touched && error && (
//       <small className="error-msg text-danger form-text">{error}</small>
//     )}
//   </div>
// );

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

      userCoverDetails: [],
      userCoverPaymentDetails: [],
      invitedUserContactList: [],
      isGettingdata: true,
      showUserDetails: false,
    };
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
          this.setState({
            userProfilesData: nextProps.getProfileDetailsByUserIdResponse.data,
          });
          console.log(
            "/-/-/-/-/--//-/-",
            nextProps.getProfileDetailsByUserIdResponse.data
          );
        } else {
          // this.setState({ isLoading: false });
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
    }
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

  render() {
    var $this = this;
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
                      name="stFirstName"
                      label="First Name"
                      placeholder="First Name"
                      component={renderdisableField}
                    />
                  </div>

                  <div className="col-sm-4">
                    <Field
                      type="text"
                      name="stLastName"
                      label="Last Name"
                      placeholder="Last Name"
                      component={renderdisableField}
                    />
                  </div>
                  <div className="col-sm-4">
                    <Field
                      type="text"
                      name="stEmail"
                      label="Email"
                      placeholder="Email Address"
                      component={renderdisableField}
                    />
                  </div>
                  <div className="col-sm-4">
                    <Field
                      type="text"
                      name="stContact"
                      label="Phone Number"
                      placeholder="Phone Number"
                      component={renderdisableField}
                    />
                  </div>
                  <div className="col-sm-4">
                    <Field
                      type="text"
                      name="stAddress"
                      label="Address"
                      placeholder="Address"
                      component={renderdisableField}
                    />
                  </div>
                  <div className="col-sm-4">
                    <Field
                      type="text"
                      name="stBusinessName"
                      label="Business Name"
                      placeholder="Business Name"
                      component={renderdisableField}
                    />
                  </div>
                  <div className="col-sm-4">
                    <Field
                      type="text"
                      name="stWebsite"
                      label="Website"
                      placeholder="Website"
                      component={renderdisableField}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="card card-custom gutter-b example example-compact" style={{padding:10}}>
        <h3 className="card-label">Profile List</h3>
          <Row xs={3}>
            {this.state.userProfilesData?.map((item, index) => {
              console.log(item);
              return (
                <Col>
                  <Card style={{ marginBottom: 5,background:item.inDeviceId != null ?  '#C8F7F4' : "#c4c4c4" }}>
                    <CardBody>
                      <CardTitle tag="h5">
                        {item.stProfileType == 1
                          ? "Personal Profile"
                          : "Business Profile"}
                      </CardTitle>
                      {item.stProfileType == 1 ? (
                        <div>
                          <CardText>
                            <b>FirstName:-</b>{" "}
                            {item.stFirstName == null
                              ? "Guest"
                              : item.stFirstName}
                          </CardText>
                          <CardText>
                            <b>LastName:-</b>{" "}
                            {item.stLastName == null
                              ? "Guest"
                              : item.stLastName}
                          </CardText>
                          <CardText>
                            <b>Address:-</b>{" "}
                            {item.stAddress == null ? "Guest" : item.stAddress}
                          </CardText>
                          <CardText>
                            <b>Email:-</b>{" "}
                            {item.stEmail == null ? "Guest" : item.stEmail}
                          </CardText>
                          <CardText>
                            <b>MobileNumber:-</b>{" "}
                            {item.stMobileNumber == null
                              ? "Guest"
                              : item.stMobileNumber}
                          </CardText>
                        </div>
                      ) : (
                        <div>
                          <CardText>
                            <b>BusinessName:-</b> {item.stBusinessName}
                          </CardText>
                          <CardText>
                            <b>BusinessSite:-</b> {item.stBusinessSite}
                          </CardText>
                          <CardText>
                            <b>BusinessAddress:-</b> {item.stBusinessAddress}
                          </CardText>
                          <CardText>
                            <b>BusinessEmail:-</b> {item.stBusinessEmail}
                          </CardText>
                          <CardText>
                            <b>MobileNumber:-</b> {item.stMobileNumber}
                          </CardText>
                        </div>
                      )}
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>

        <div style={{ marginBottom: 5 }} />
        <div className="card card-custom gutter-b example example-compact">
          <div className="card-body">
            <form className="form-horizontal">
              <div className="card card-custom gutter-b example example-compact">
                <div className="card-title">
                  <h3 className="card-label">Device Details</h3>
                  <div className="card-toolbar"></div>
                  <div className="row">
                    <div className="col-sm-4">
                      <Field
                        type="text"
                        name="stUniqueId"
                        label="Unique Id"
                        placeholder="UniqueId"
                        component={renderdisableField}
                      />
                    </div>
                    <div className="col-sm-4">
                      <Field
                        type="text"
                        name="inApiLevel"
                        label="Api Level"
                        placeholder="Api Level"
                        component={renderdisableField}
                      />
                    </div>
                    <div className="col-sm-4">
                      <Field
                        type="text"
                        name="stIpAddress"
                        label="IP Address"
                        placeholder="IP Address"
                        component={renderdisableField}
                      />
                    </div>
                    <div className="col-sm-4">
                      <Field
                        type="text"
                        name="stMacAddress"
                        label="Mac Address"
                        placeholder="Mac Address"
                        component={renderdisableField}
                      />
                    </div>
                    <div className="col-sm-4">
                      <Field
                        type="text"
                        name="stbaseOS"
                        label="Base OS"
                        placeholder="Base OS"
                        component={renderdisableField}
                      />
                    </div>
                    <div className="col-sm-4">
                      <Field
                        type="text"
                        name="stBootloader"
                        label="Boot Loader"
                        placeholder="BootLoader"
                        component={renderdisableField}
                      />
                    </div>
                    <div className="col-sm-4">
                      <Field
                        type="text"
                        name="stBuildId"
                        label="Build Id"
                        placeholder="Build Id"
                        component={renderdisableField}
                      />
                    </div>
                    <div className="col-sm-4">
                      <Field
                        type="text"
                        name="stDeviceName"
                        label="Device Name"
                        placeholder="Device Name"
                        component={renderdisableField}
                      />
                    </div>
                    <div className="col-sm-4">
                      <Field
                        type="text"
                        name="stInstanceId"
                        label="Instance Id"
                        placeholder="Instance Id"
                        component={renderdisableField}
                      />
                    </div>
                    <div className="col-sm-4">
                      <Field
                        type="text"
                        name="stHardware"
                        label="Hardware"
                        placeholder="Hardware"
                        component={renderdisableField}
                      />
                    </div>
                    <div className="col-sm-4">
                      <Field
                        type="text"
                        name="stMaxMemory"
                        label="Max Memory"
                        placeholder="MaxMemory"
                        component={renderdisableField}
                      />
                    </div>
                    <div className="col-sm-4">
                      <Field
                        type="text"
                        name="stProduct"
                        label="Product"
                        placeholder="Product"
                        component={renderdisableField}
                      />
                    </div>
                    <div className="col-sm-4">
                      <Field
                        type="text"
                        name="stSynchronizedUniqueId"
                        label="Synchronized Unique Id"
                        placeholder="SynchronizedUnique Id"
                        component={renderdisableField}
                      />
                    </div>
                    <div className="col-sm-4">
                      <Field
                        type="text"
                        name="stCarrier"
                        label="Carrier"
                        placeholder="Carrier"
                        component={renderdisableField}
                      />
                    </div>
                    <div className="col-sm-4">
                      <Field
                        type="text"
                        name="stTotalMemory"
                        label="Total Memory"
                        placeholder="Total Memory"
                        component={renderdisableField}
                      />
                    </div>
                    <div className="col-sm-4">
                      <Field
                        type="text"
                        name="stUsedMemory"
                        label="Used Memory"
                        placeholder="Used Memory"
                        component={renderdisableField}
                      />
                    </div>
                  </div>
                </div>
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>Back</Tooltip>}
                >
                  <Link
                    style={{ width: 120 }}
                    className="btn btn-primary"
                    id="kw_lnk_cancel_carrier"
                    to="/ManageMobileUsersPage"
                  >
                    <i class="fa fa-arrow-left" aria-hidden="true"></i>
                  </Link>
                </OverlayTrigger>
              </div>
            </form>
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
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    GetUserById: (data) => dispatch(auth.actions.GetUseFavoriteVideoData(data)),
    GetProfileByUserId: (data) =>
      dispatch(auth.actions.GetProfileDetailsByUserId(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewUserPage);
