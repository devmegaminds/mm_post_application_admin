import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm, getFormValues } from "redux-form";
import * as auth from "../../modules/Auth/_redux/authRedux";
import { Link, Redirect } from "react-router-dom";
import "../custom.css";
import SweetAlert from "react-bootstrap-sweetalert";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ManageSubCategory from "../SubCategory/ManageSubCategory";
import ManageUploadCategoryImage from "../Image/ManageUploadCategoryImage";
import { idsubcriber } from "../../env/categoryId";
const baseURL = "http://megaminds-001-site12.itempurl.com";

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
const renderDisableCheckboxField = ({
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
    <input
      {...input}
      type={type}
      checked={data}
      className="form-check-input"
      style={{ cursor: "pointer" }}
      disabled={true}
    ></input>
    <label className="form-check-label">{label}</label>
  </div>
);

const renderdisableField = ({
  input,
  label,
  type,
  placeholder,
  meta: { asyncValidating, touched, error },
}) => (
  <div className="form-group">
    <label>{label}</label>
    <input
      {...input}
      type={type}
      placeholder={placeholder}
      className="form-control "
      style={{ marginTop: "-3%" }}
      disabled={true}
    />
    {touched && error && (
      <small className="error-msg text-danger form-text">{error}</small>
    )}
  </div>
);
const validate = (values) => {
  const errors = {};
  const requiredFields = ["stCategoryName"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Category Name is required.";
    }
  });
  if (values.stCategoryName && values.stCategoryName.trim() == "") {
    errors["stCategoryName"] = "Category Name is required.";
  }
  return errors;
};

class AddCategoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      currentUserData: {},
      isChecked: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.state.currentUserData = JSON.parse(
      JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
    ).data;
  }
  onSubmit = (formValues) => {
    this.setState({ isLoading: true });
    if (formValues.stCategoryName.trim() != "") {
      var isCheckValue = this.state.isChecked == true ? 1 : 0;
      var data = {
        inCategoryId:
          formValues.inCategoryId == undefined || formValues.inCategoryId == ""
            ? 0
            : formValues.inCategoryId,
        stCategoryName: formValues.stCategoryName,
        inCreatedBy: this.state.currentUserData.inAdminUserId,
        inDisplayPriority: this.state.priority,
        isHaveSubCategory: isCheckValue,
      };
      this.props.AddCategory(data);
    }
  };

  hideModel = () => {
    this.setState({
      alert: "",
      showModal: false,
    });
  };
  componentWillReceiveProps(nextProps) {
    var id = window.location.href.split("/").pop(); //Get Cetegory Id from the URL
    var value = parseInt(id);
    this.setState({ categoryIdValue: value });
    if (isNaN(value)) {
      if (nextProps.checkCategoryPriorityResponse) {
        if (
          nextProps.checkCategoryPriorityResponse &&
          nextProps.checkCategoryPriorityResponse !=
            this.props.checkCategoryPriorityResponse
        ) {
          if (nextProps.checkCategoryPriorityResponse.statusCode == 200) {
            var newPriority =
              nextProps.checkCategoryPriorityResponse.data[0].DisplayPriority +
              1;
            this.setState({ priority: newPriority });
          }
        }
      }
    } else {
      if (nextProps.GetCategoryInfoByIDResponse) {
        if (
          nextProps.GetCategoryInfoByIDResponse &&
          nextProps.GetCategoryInfoByIDResponse !=
            this.props.GetCategoryInfoByIDResponse
        ) {
          if (nextProps.GetCategoryInfoByIDResponse.statusCode == 200) {
            var prePriority =
              nextProps.GetCategoryInfoByIDResponse.data[0].inDisplayPriority;
            var isChecked =
              nextProps.GetCategoryInfoByIDResponse.data[0].isHaveSubCategory;
            this.setState({ isChecked: isChecked == 1 ? true : false });
            this.setState({ priority: prePriority });
          }
        }
      }
    }
    if (nextProps.getImageByCategoryResponse) {
      if (
        nextProps.getImageByCategoryResponse &&
        nextProps.getImageByCategoryResponse !=
          this.props.getImageByCategoryResponse
      ) {
        if (nextProps.getImageByCategoryResponse.statusCode == 200) {
          var image = nextProps.getImageByCategoryResponse.data;
          this.setState({ imageData: image });
        }
      }
    }
    if (nextProps.getCategoryInfoByIDResponse) {
      if (
        nextProps.getCategoryInfoByIDResponse &&
        nextProps.getCategoryInfoByIDResponse !=
          this.props.getCategoryInfoByIDResponse
      ) {
        if (nextProps.getCategoryInfoByIDResponse.statusCode == 200) {
        } else if (nextProps.getCategoryInfoByIDResponse.Code == 200) {
        } else this.SuccessFailSweetAlert("getting error", "error");
      }
    }
    if (nextProps.categoryResponse) {
      if (
        nextProps.categoryResponse &&
        nextProps.categoryResponse != this.props.categoryResponse
      ) {
        if (nextProps.categoryResponse.statusCode == 200) {
          this.setState({
            categoryId: nextProps.categoryResponse.data.inCategoryId,
          });
          this.setState({ isLoading: false });
          var categoryId = nextProps.categoryResponse.data.inCategoryId;
          this.props.history.push(`/AddCategoryPage/${categoryId}`);
        } else if (nextProps.categoryResponse.status == "Error") {
          // this.setState({ Message: nextProps.categoryResponse.errorMessage });
          this.setState({ Message: "Category is already exist." });
          this.setState({ showModal: true });
          this.setState({ isLoading: false });
        } else {
          this.setState({ isLoading: false, isRedirect: false });
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
    idsubcriber.next(id);
    // console.log()
    var value = parseInt(id);
    if (!isNaN(value)) {
      this.setState({ categoryId: id });
    }
    if (id != "Category") this.props.GetCategoryInfoByID(id);
    else {
      var data = {
        inCategoryId: "",
        stCategoryName: "",
        inCreatedBy: "",
        Code: 200,
      };
      this.props.ResetTag(data);
    }
    this.props.CheckCategoryPriority();
    this.getImage();
  }
  ConfirmationSweetAlert(index, image, msg) {
    let getAlert = "";
    getAlert = () => (
      <SweetAlert
        error
        title={msg}
        showCancel
        reverseButtons
        onConfirm={() => this.handleDelete(index, image)}
        cancelBtnBsStyle="danger"
        onCancel={() => this.hideAlert(false)}
      ></SweetAlert>
    );
    this.setState({
      alert: getAlert(),
    });
  }
  handleDelete(index, image) {
    var inCategoryImageId = image.inCategoryImageId;
    this.setState({ inCategoryImageId: inCategoryImageId });
    var data = {
      inCategoryImageId: inCategoryImageId,
      inModifiedBy: this.state.currentUserData.inAdminUserId,
    };
    this.props.DeleteCategoryImage(data);
    this.hideAlert(false);
    // var id = window.location.href.split("/").pop();
    // this.props.GetCategoryInfoByID(id)
    var image = this.props.getImageByCategoryResponse.data;
    this.setState({ imageData: image });
    this.setState({ isRedirect: true });
    // this.getImage();
  }
  hideAlert(isSaved) {
    this.setState({
      alert: null,
    });
  }

  getImage = () => {
    var id = window.location.href.split("/").pop();
    var data = {
      inCategroyId: id,
    };
    this.props.GetImageByCategory(data);
  };

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
    this.setState({ isChecked: this.state.isChecked ? false : true });
    // this.state.categoryData[index].Checked = !this.state.isChecked ? !this.state.categoryData[index].Checked : false;
    // this.setState({ categoryData: this.state.categoryData });
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
      return <Redirect to="/ManageCategory" />;
    }
    let isChecked = this.state.isChecked;
    let categoryId = this.state.categoryId;
    return (
      <div className="card card-custom gutter-b example example-compact">
        {this.state.alert}
        <div className="card-body">
          <form
            className="form-horizontal"
            onSubmit={handleSubmit(this.onSubmit)}
          >
            <input type="hidden" name="inCategoryId" />
            <div className="row">
              <div className="col-sm-6">
                <h6 style={{ marginBottom: 10 }}>
                  Category Name <span className="text-danger">*</span>
                </h6>
                {isNaN(this.state.categoryIdValue) ? (
                  <Field
                    type="text"
                    name="stCategoryName"
                    placeholder="Enter Category Name"
                    component={renderFields}
                  />
                ) : (
                  <Field
                    type="text"
                    name="stCategoryName"
                    placeholder="Enter Category Name"
                    component={renderdisableField}
                  />
                )}
              </div>
              <div className="row-sm-6">
                <h6>Priority</h6>
                <input
                  style={{ marginTop: -1, width: "30%" }}
                  disabled={true}
                  name="inDisplayPriority"
                  defaultValue={this.state.priority}
                  className="form-control"
                  // onChange={(e)=>console.log(e,"11111")}
                />
                {/* <label>{this.state.priority}</label> */}
              </div>
            </div>
            <div className="row-sm-6">
              <h6>Category have any sub category?</h6>
              {isNaN(this.state.categoryIdValue) ? (
                <Field
                  type="checkbox"
                  data={this.state.isChecked}
                  onChange={(evt) => $this.onChangesTagName(evt)}
                  component={renderCheckboxField}
                />
              ) : (
                <Field
                  type="checkbox"
                  data={this.state.isChecked}
                  onChange={(evt) => $this.onChangesTagName(evt)}
                  component={renderDisableCheckboxField}
                />
              )}
              {/* <label>{this.state.priority}</label> */}
            </div>
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
                    className="btn btn-danger"
                    id="kw_lnk_cancel_carrier"
                    to="/ManageCategory"
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
          {categoryId == undefined ? null : isChecked == true ? (
            <ManageSubCategory history={this.props.history} />
          ) : (
            <ManageUploadCategoryImage history={this.props.history} />
          )}
          <div class="row">
            {this.state.imageData != null &&
              this.state.imageData != "" &&
              this.state.imageData != undefined &&
              this.state.imageData.map((image, index) => (
                <div class="col-2">
                  <div className="image-item mt-5 mb-5 mr-5">
                    <div key={index} className="image-item mt-5 mb-5 mr-5">
                      <img
                        width="140px"
                        height="140px"
                        src={`${baseURL}${image.stImagePath}`}
                      />
                    </div>
                    <div className="image-item__btn-wrapper">
                      {/* <button style={{ marginRight: 5 }} className="btn btn-icon btn-sm btn-primary" onClick={() => console.log(image)}><i style={{ alignSelf: "center" }} className="fas fa-edit icon-nm"></i></button> */}
                      <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip>Delete Image</Tooltip>}
                      >
                        <button
                          className="btn btn-icon btn-sm btn-danger"
                          onClick={() =>
                            this.ConfirmationSweetAlert(
                              index,
                              image,
                              "Do you want to delete this image?"
                            )
                          }
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </OverlayTrigger>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

AddCategoryPage = reduxForm({
  form: "Category",
  validate,
  enableReinitialize: true,
  destroyOnUnmount: true,
})(AddCategoryPage);

function mapStateToProps(state) {
  return {
    initialValues: {
      inCategoryId:
        state.auth.GetCategoryInfoByIDResponse != undefined &&
        state.auth.GetCategoryInfoByIDResponse.data != undefined
          ? state.auth.GetCategoryInfoByIDResponse.data[0]?.inCategoryId
          : "",
      stCategoryName:
        state.auth.GetCategoryInfoByIDResponse != undefined &&
        state.auth.GetCategoryInfoByIDResponse.data != undefined
          ? state.auth.GetCategoryInfoByIDResponse.data[0]?.stCategoryName
          : "",
      inDisplayPriority:
        state.auth.GetCategoryInfoByIDResponse != undefined &&
        state.auth.GetCategoryInfoByIDResponse.data != undefined
          ? state.auth.GetCategoryInfoByIDResponse.data[0]?.inDisplayPriority
          : "",
    },
    // insuranceTypeResponse: state.auth.insuranceTypeResponse,
    checkCategoryPriorityResponse: state.auth.checkCategoryPriorityResponse,
    categoryResponse: state.auth.categoryResponse,
    GetCategoryInfoByIDResponse: state.auth.GetCategoryInfoByIDResponse,
    getImageByCategoryResponse: state.auth.getImageByCategoryResponse,
    randomNumbers: state.auth.randomNumbers,
    AddCategoryResponse: state.auth.AddCategoryResponse,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    ResetTag: (data) => dispatch(auth.actions.ResetInsuranceType(data)),
    GetCategoryInfoByID: (data) =>
      dispatch(auth.actions.GetCategoryInfoByID(data)),
    //SaveTag: (data) => dispatch(auth.actions.SaveInsuranceType(data)),
    CheckCategoryPriority: (data) =>
      dispatch(auth.actions.CheckCategoryPriority(data)),
    GetImageByCategory: (data) =>
      dispatch(auth.actions.GetImageByCategory(data)),
    AddCategory: (data) => dispatch(auth.actions.AddCategory(data)),
    DeleteCategoryImage: (data) =>
      dispatch(auth.actions.DeleteCategoryImage(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddCategoryPage);
