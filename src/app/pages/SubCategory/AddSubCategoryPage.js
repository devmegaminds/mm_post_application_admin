import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm, getFormValues } from "redux-form";
import * as auth from "../../modules/Auth/_redux/authRedux";
import { Link, Redirect } from "react-router-dom";
import "../custom.css";
import SweetAlert from "react-bootstrap-sweetalert";
import { OverlayTrigger, Tooltip, Dropdown } from "react-bootstrap";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import ManageUploadSubCategoryImage from "../Image/ManageUploadSubCategoryImage";
import { subCategoryIdsubcriber } from "../../env/subCategoryId";
import { idsubcriber } from "../../env/categoryId";
import ImageUplaodComponents from "../../components/ImageUplaod";
import AddThumbnailImage from "../ThumbnailImage/AddThumbnailImage";

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
  const requiredFields = ["stSubCategoryName"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Sub Category Name is required.";
    }
  });
  if (values.stSubCategoryName && values.stSubCategoryName.trim() == "") {
    errors["stSubCategoryName"] = "Sub Category Name is required.";
  }
  return errors;
};

class AddSubCategoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      currentUserData: {},
      isGettingTags: false,
      categoryData: [],
      isChecked: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.props.GetCategory("");
    this.state.currentUserData = JSON.parse(
      JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
    ).data;
  }
  onSubmit = (formValues) => {
    // let indexOfItem = this.state.categoryData.filter(tag => tag.Checked === true)
    // var Tags = indexOfItem.map(function (x) {
    //     return x.inCategoryId;
    // }).join(',');
    // if (indexOfItem.length == 0) {
    //     this.SuccessFailSweetAlert("Please select at least one Category", "error");
    //     this.setState({ isLoading: false });
    // }
    // else if (indexOfItem.length > 1) {
    //     this.SuccessFailSweetAlert("You can select One categary only", "error");
    //     this.setState({ isLoading: false });
    // }
    // else {

    var categoryId = this.state.categoryId;
    console.log(categoryId);
    this.setState({ isLoading: true });
    var data = {
      inSubCategoryId:
        formValues.inSubCategoryId == undefined ||
        formValues.inSubCategoryId == ""
          ? 0
          : formValues.inSubCategoryId,
      stSubCategoryName: formValues.stSubCategoryName,
      inCategoryId: categoryId,
      inCreatedBy: this.state.currentUserData.inAdminUserId,
      inDisplayPriority: this.state.priority,
    };
    this.props.AddSubCategory(data);
    // }
  };

  hideModel = () => {
    this.setState({
      alert: "",
      showModal: false,
    });
  };
  componentWillReceiveProps(nextProps) {
    var id = window.location.href.split("/").pop(); // "1"   "ASDASD"
    var value = parseInt(id);
    if (isNaN(value)) {
      if (nextProps.checkSubCategoryPriorityResponse) {
        if (
          nextProps.checkSubCategoryPriorityResponse &&
          nextProps.checkSubCategoryPriorityResponse !=
            this.props.checkSubCategoryPriorityResponse
        ) {
          if (nextProps.checkSubCategoryPriorityResponse.statusCode == 200) {
            var newPriority =
              nextProps.checkSubCategoryPriorityResponse.data[0]
                .DisplayPriority + 1;
            this.setState({ priority: newPriority });
          }
        }
      }
    } else {
      if (nextProps.GetSubCategoryInfoByIdResponse) {
        if (
          nextProps.GetSubCategoryInfoByIdResponse &&
          nextProps.GetSubCategoryInfoByIdResponse !=
            this.props.GetSubCategoryInfoByIdResponse
        ) {
          if (nextProps.GetSubCategoryInfoByIdResponse.statusCode == 200) {
            var oldPriority =
              nextProps.GetSubCategoryInfoByIdResponse.data[0]
                .inDisplayPriority;
            console.log(oldPriority, "OLD");
            this.setState({ priority: oldPriority });
          }
        }
      }
    }
    if (nextProps.getSubCategoryInfoByIDResponse) {
      if (
        nextProps.getSubCategoryInfoByIDResponse &&
        nextProps.getSubCategoryInfoByIDResponse !=
          this.props.getSubCategoryInfoByIDResponse
      ) {
        if (nextProps.getSubCategoryInfoByIDResponse.statusCode == 200) {
        } else if (nextProps.getSubCategoryInfoByIDResponse.Code == 200) {
        } else this.SuccessFailSweetAlert("getting error", "error");
      }
    }
    if (nextProps.subCategoryResponse) {
      if (
        nextProps.subCategoryResponse &&
        nextProps.subCategoryResponse != this.props.subCategoryResponse
      ) {
        if (nextProps.subCategoryResponse.statusCode == 200) {
          this.setState({ isLoading: false, isRedirect: true });
        } else if (nextProps.subCategoryResponse.status == "Error") {
          this.setState({ Message: "Sub Category is already exist." });
          this.setState({ showModal: true });
          this.setState({ isLoading: false });
        } else {
          this.setState({ isLoading: false, isRedirect: false });
        }
      }
    }
    if (nextProps.getImageBySubCategoryResponse) {
      if (
        nextProps.getImageBySubCategoryResponse &&
        nextProps.getImageBySubCategoryResponse !=
          this.props.getImageBySubCategoryResponse
      ) {
        if (nextProps.getImageBySubCategoryResponse.statusCode == 200) {
          var x = nextProps.getImageBySubCategoryResponse.data;
          this.setState({ imageData: x });
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
      if (
        nextProps.GetSubCategoryInfoByIdResponse &&
        nextProps.GetSubCategoryInfoByIdResponse
      ) {
        if (nextProps.GetSubCategoryInfoByIdResponse.data.length > 0) {
          this.setState({
            thumbnailImage:
              nextProps.GetSubCategoryInfoByIdResponse.data[0].stImagePath,
          });
          // var AssignedTags = nextProps.GetSubCategoryInfoByIdResponse.data[0].inCategoryId - 1
          // nextProps.GetCategoryResponse.data[AssignedTags].Checked = true
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
    this.setState({ isGettingTags: true });
    idsubcriber.subscribe((Id) => {
      var categoryId = Id;
      this.setState({ categoryId: categoryId });
    });

    var id = window.location.href.split("/").pop();
    var value = parseInt(id);
    if (!isNaN(value)) {
      this.setState({ subCategoryId: id });
    }
    subCategoryIdsubcriber.next(id);
    if (id != "SubCategory") this.props.GetSubCategoryInfoById(id);
    else {
      var data = {
        inSubCategoryId: "",
        stSubCategoryName: "",
        inCreatedBy: "",
        Code: 200,
      };
      this.props.ResetTag(data);
    }
    this.props.CheckSubCategoryPriority();
    this.getSubCategoryImage();
  }

  getSubCategoryImage = () => {
    var id = window.location.href.split("/").pop();
    var data = {
      inSubCategroyId: id,
    };
    this.props.GetImageBySubCategory(data);
  };

  hideAlert(isSaved) {
    this.setState({
      alert: null,
    });
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
    this.setState({
      isChecked: this.state.categoryData[index].Checked ? false : true,
    });

    this.state.categoryData[index].Checked = !this.state.isChecked
      ? !this.state.categoryData[index].Checked
      : false;
    this.setState({ categoryData: this.state.categoryData });
  };

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
    var inSubCategoryImageId = image.inSubCategoryImageId;
    this.setState({ inSubCategoryImageId: inSubCategoryImageId });
    var data = {
      inSubCategoryImageId: inSubCategoryImageId,
      inModifiedBy: this.state.currentUserData.inAdminUserId,
    };
    this.props.DeleteSubCategoryImage(data);
    this.hideAlert(false);
    // var categoryId = this.state.categoryId
    // this.props.history.push(`/AddCategoryPage/` + categoryId)
    this.setState({ isRedirect: true });
  }
  render() {
    var $this = this;
    // const columns = [
    //     //#region Index of the Sub Category list
    //     { dataField: 'inCategoryId', text: 'Category Number', hidden: true },
    //     { dataField: 'stCategoryName', text: 'Category Name', sort: true },
    // ];
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      formValues,
      change,
    } = this.props;
    if (this.state.isRedirect) {
      var categoryId = this.state.categoryId;
      return <Redirect to={`/AddCategoryPage/${categoryId}`} />;
    }
    var thumbnailImage = this.state.thumbnailImage;
    var sub = this.state.subCategoryId;
    var Id = this.state.categoryId;
    return (
      <div className="card card-custom gutter-b example example-compact">
        {/* <ToolkitProvider
                    bootstrap4
                    data={this.state.categoryData}
                    // columns={columns}
                /> */}
        {this.state.alert}
        <div className="card-body">
          <form
            className="form-horizontal"
            onSubmit={handleSubmit(this.onSubmit)}
          >
            <input type="hidden" name="inSubCategoryId" />
            <div className="row">
              <div className="col-sm-6">
                <h6 style={{ marginBottom: 10 }}>
                  Sub Category Name <span className="text-danger">*</span>
                </h6>
                <Field
                  type="text"
                  name="stSubCategoryName"
                  placeholder="Enter Sub Category Name"
                  component={renderFields}
                />
              </div>
              <div className="row-sm-6">
                <h6>Priority</h6>
                <input
                  style={{ marginTop: -1, width: "30%" }}
                  disabled={true}
                  defaultValue={this.state.priority}
                  className="form-control"
                />
              </div>
              <div style={{}}>
                {sub == undefined
                  ? null
                  : [
                      thumbnailImage == undefined ? null : (
                        <div className="row-sm-6">
                          <h6>Thumbnail Image</h6>
                          <div className="image-item mt-5 mb-5 mr-5">
                            <img
                              width="150px"
                              height="150px"
                              style={{
                                border: "2px solid black",
                                marginTop: -15,
                              }}
                              src={`${baseURL}${thumbnailImage}`}
                            />
                          </div>
                        </div>
                      ),
                    ]}
              </div>
              {/* <AddThumbnailImage /> */}
              {/* <div className="col-sm-8">
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
                            </div> */}
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
                    // to="/ManageCategory"
                    to={`/AddCategoryPage/${Id}`}
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
          <ManageUploadSubCategoryImage />
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
                      {/* <button style={{ marginRight: 5 }} className="btn btn-icon btn-sm btn-primary" onClick={() => onImageUpdate(index)}><i style={{ alignSelf: "center" }} className="fas fa-edit icon-nm"></i></button> */}
                      {/* <button className="btn btn-icon btn-sm btn-danger" onClick={() => onImageRemove(index)}><i className="ki ki-close icon-nm"></i></button> */}
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
                          <i class="fas fa-trash-alt"></i>
                        </button>
                      </OverlayTrigger>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div
            className="btn btn-icon btn-sm btn-danger"
            data-placement="buttom"
            style={{
              height: "calc(1.5em + 0.40rem + 1px)",
              width: "calc(1.5em + 0.40rem + 1px)",
            }}
          >
            <i class="fas fa-trash-alt"></i>
            {/* <i className="ki ki-close icon-nm"></i> */}
          </div>{" "}
          Remove Images &nbsp;&nbsp;&nbsp;
        </div>
      </div>
    );
  }
}

AddSubCategoryPage = reduxForm({
  form: "SubCategory",
  validate,
  enableReinitialize: true,
  destroyOnUnmount: true,
})(AddSubCategoryPage);

function mapStateToProps(state) {
  return {
    initialValues: {
      inSubCategoryId:
        state.auth.GetSubCategoryInfoByIdResponse != undefined &&
        state.auth.GetSubCategoryInfoByIdResponse.data != undefined
          ? state.auth.GetSubCategoryInfoByIdResponse.data[0]?.inSubCategoryId
          : "",
      stSubCategoryName:
        state.auth.GetSubCategoryInfoByIdResponse != undefined &&
        state.auth.GetSubCategoryInfoByIdResponse.data != undefined
          ? state.auth.GetSubCategoryInfoByIdResponse.data[0]?.stSubCategoryName
          : "",
      inCategoryId:
        state.auth.GetSubCategoryInfoByIdResponse != undefined &&
        state.auth.GetSubCategoryInfoByIdResponse.data != undefined
          ? state.auth.GetSubCategoryInfoByIdResponse.data[0]?.inCategoryId
          : "",
      inDisplayPriority:
        state.auth.GetSubCategoryInfoByIdResponse != undefined &&
        state.auth.GetSubCategoryInfoByIdResponse.data != undefined
          ? state.auth.GetSubCategoryInfoByIdResponse.data[0]?.inDisplayPriority
          : "",
    },
    // insuranceTypeResponse: state.auth.insuranceTypeResponse,
    checkSubCategoryPriorityResponse:
      state.auth.checkSubCategoryPriorityResponse,
    subCategoryResponse: state.auth.subCategoryResponse,
    GetSubCategoryInfoByIdResponse: state.auth.GetSubCategoryInfoByIdResponse,
    randomNumbers: state.auth.randomNumbers,
    GetCategoryResponse: state.auth.GetCategoryResponse,
    getImageBySubCategoryResponse: state.auth.getImageBySubCategoryResponse,

    // DeleteCategoryByIdResponse: state.auth.DeleteCategoryByIdResponse,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    ResetTag: (data) => dispatch(auth.actions.ResetInsuranceType(data)),
    GetSubCategoryInfoById: (data) =>
      dispatch(auth.actions.GetSubCategoryInfoById(data)),
    CheckSubCategoryPriority: (data) =>
      dispatch(auth.actions.CheckSubCategoryPriority(data)),
    //SaveTag: (data) => dispatch(auth.actions.SaveInsuranceType(data)),
    AddSubCategory: (data) => dispatch(auth.actions.AddSubCategory(data)),
    GetCategory: (data) => dispatch(auth.actions.GetCategory(data)),
    GetImageBySubCategory: (data) =>
      dispatch(auth.actions.GetImageBySubCategory(data)),
    DeleteSubCategoryImage: (data) =>
      dispatch(auth.actions.DeleteSubCategoryImage(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddSubCategoryPage);
