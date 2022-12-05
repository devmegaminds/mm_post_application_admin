import React, { Component } from "react";
// import { Button, } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./custom.css";
import { connect } from "react-redux";
import * as auth from "./../../app/modules/Auth/_redux/authRedux";
import DatePicker from "react-datepicker";
import { useField, useFormikContext } from "formik";
import moment from "moment";
import { toAbsoluteUrl } from "../../_metronic/_helpers";
import SVG from "react-inlinesvg";
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
class DashboardPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({ isGettingTags: true });
    this.props.GetCategory("");
    this.props.GetApplication("");
    this.props.GetSubCategoryData("");
    this.props.GetAdminUserData("");
    this.props.GetUsers("");
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.GetCategoryResponse) {
      if (
        nextProps.GetCategoryResponse &&
        nextProps.GetCategoryResponse != this.props.GetCategoryResponse
      ) {
        if (nextProps.GetCategoryResponse.statusCode == 200) {
          this.setState({ isGettingTags: false });
          this.setState({ isLoading: false });
          this.setState({
            categoryLength: nextProps.GetCategoryResponse.data.length,
          });
        }
      }
    }
    if (nextProps.GetApplicationResponse) {
      if (
        nextProps.GetApplicationResponse &&
        nextProps.GetApplicationResponse != this.props.GetApplicationResponse
      ) {
        if (nextProps.GetApplicationResponse.statusCode == 200) {
          this.setState({ isGettingTags: false });
          this.setState({ isLoading: false });
          this.setState({
            applicationLength: nextProps.GetApplicationResponse.data.length,
          });
        }
      }
    }
    if (nextProps.GetSubCategoryDataResponse) {
      if (
        nextProps.GetSubCategoryDataResponse &&
        nextProps.GetSubCategoryDataResponse !=
          this.props.GetSubCategoryDataResponse
      ) {
        if (nextProps.GetSubCategoryDataResponse.statusCode == 200) {
          this.setState({ isGettingSubCategory: false });
          this.setState({ isLoading: false });
          this.setState({
            subCategoryLength: nextProps.GetSubCategoryDataResponse.data.length,
          });
        }
      }
    }
    if (nextProps.GetAdminUserDataResponse) {
      if (
        nextProps.GetAdminUserDataResponse &&
        nextProps.GetAdminUserDataResponse !=
          this.props.GetAdminUserDataResponse
      ) {
        if (nextProps.GetAdminUserDataResponse.statusCode == 200) {
          this.setState({ isGettingListData: false });
          this.setState({
            adminUserLength: nextProps.GetAdminUserDataResponse.data.length,
          });
        }
      }
    }
    if (nextProps.GetUserDataResponse) {
      if (
        nextProps.GetUserDataResponse &&
        nextProps.GetUserDataResponse != this.props.GetUserDataResponse
      ) {
        if (nextProps.GetUserDataResponse.statusCode == 200) {
          this.setState({ isGettingListData: false });
          var userDataResponse = nextProps.GetUserDataResponse;
          var newArray = userDataResponse.data.filter(function(el) {
            return el.stUserType != 2;
          });
          this.setState({ userResponseData: newArray }, () => {});
          this.setState({ userlength: newArray.length });
          this.setState({ listLoading: false });
        }
      }
    }
  }

  render() {
    var $this = this;
    return (
      <>
        <div className="card card-custom gutter-b example example-compact">
          <div className="card-body">
            <div className="row">
              <h2>Dashboard</h2>
            </div>
          </div>
        </div>

        {/* <div class="container"> */}
        {/* <div className="card card-custom " style={{ padding: 0 }}> */}
        <div className="card-body">
          <Row xs={3}>
            <Card
              style={{
                marginBottom: 5,
                marginRight: 5,
                background: "#FFFFFF",
              }}
            >
              <CardBody>
                <CardText>
                  {this.state?.applicationLength != null && (
                    <h4>
                      Number Of Application: {this.state.applicationLength}
                    </h4>
                  )}
                </CardText>
              </CardBody>
            </Card>

            <Card
              style={{
                marginBottom: 5,
                marginRight: 5,
                background: "#FFFFFF",
              }}
            >
              <CardBody>
                <CardText>
                  {this.state?.categoryLength != null && (
                    <h4>Number Of Category: {this.state.categoryLength} </h4>
                  )}
                </CardText>
              </CardBody>
            </Card>

            <Card
              style={{
                marginBottom: 5,
                marginRight: 5,
                background: "#FFFFFF",
              }}
            >
              <CardBody>
                <CardText>
                  {this.state?.subCategoryLength != null && (
                    <h4>
                      Number Of Sub Category: {this.state.subCategoryLength}
                    </h4>
                  )}
                </CardText>
              </CardBody>
            </Card>
            <Card
              style={{
                marginBottom: 5,
                marginRight: 5,
                background: "#FFFFFF",
              }}
            >
              <CardBody>
                <CardText>
                  {this.state?.adminUserLength != null && (
                    <h4>Number Of Admin:- {this.state.adminUserLength}</h4>
                  )}
                </CardText>
              </CardBody>
            </Card>
            <Card
              style={{
                marginBottom: 5,
                marginRight: 5,
                background: "#FFFFFF",
              }}
            >
              <CardBody>
                <CardText>
                  {this.state?.userlength != null && (
                    <h4 >
                      Number Of User:- {this.state.userlength}
                    </h4>
                  )}
                </CardText>
              </CardBody>
            </Card>
          </Row>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    initialValues: {},
    GetCategoryResponse: state.auth.GetCategoryResponse,
    GetApplicationResponse: state.auth.GetApplicationResponse,
    GetSubCategoryDataResponse: state.auth.getSubCategoryDataResponse,
    GetAdminUserDataResponse: state.auth.GetAdminUserDataResponse,
    GetUserDataResponse: state.auth.GetUserDataResponse,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    GetCategory: (data) => dispatch(auth.actions.GetCategory(data)),
    GetApplication: (data) => dispatch(auth.actions.GetApplication(data)),
    GetSubCategoryData: (data) =>
      dispatch(auth.actions.GetSubCategoryData(data)),
    GetAdminUserData: (data) => dispatch(auth.actions.GetAdminUserData(data)),
    GetUsers: (data) => dispatch(auth.actions.GetUserData(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
