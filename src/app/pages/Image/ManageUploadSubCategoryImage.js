import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm, getFormValues } from "redux-form";
import * as auth from "../../modules/Auth/_redux/authRedux";
import { Link, Redirect } from "react-router-dom";
import "../custom.css";
import SweetAlert from "react-bootstrap-sweetalert";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ImageUplaodComponents from "../../components/ImageUplaod";
import { imagesubcriber } from "../../env/subBehaviour";
import { idsubcriber } from "../../env/categoryId";
import "bootstrap/dist/css/bootstrap.min.css";
import { subCategoryIdsubcriber } from "../../env/subCategoryId";

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

const validate = (values) => {
  const errors = {};
  const requiredFields = ["stSubCategoryName"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = field.substring(2) + " is required.";
    }
  });
  return errors;
};

class ManageUploadSubCategoryImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      currentUserData: {},
      subCategoryId: "",
      baseImage: "",
      subCategoryData: [],
      categoryData: [],
      baseImage: [],
      imageData: [],
      showModal: false,
      message: "",
    };
    this.props.GetSubCategory("");
    this.state.currentUserData = JSON.parse(
      JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
    ).data;
  }

  componentDidMount() {
    imagesubcriber.subscribe((x) => {
      this.setState({ image: x });
    });
    // idsubcriber.subscribe((Id) => {
    idsubcriber.subscribe((Id) => {
      var categoryId = Id;
      this.setState({ categoryId: categoryId });
    });
    subCategoryIdsubcriber.subscribe((Id) => {
      var subCategoyId = Id;
      this.setState({ subCategoyIdData: subCategoyId });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.GetSubCategoryResponse) {
      if (
        nextProps.GetSubCategoryResponse &&
        nextProps.GetSubCategoryResponse != this.props.GetSubCategoryResponse
      ) {
        if (nextProps.GetSubCategoryResponse.data.length > 0) {
          this.setState({ isGettingTags: false });
          this.setState({
            subCategoryData: nextProps.GetSubCategoryResponse.data,
          });
        }
      }
    }
  }
  SuccessFailSweetAlert(msg, type) {
    this.setState({ showModal: true, message: msg, alertType: type });
  }
  hideModelError = () => {
    this.setState({
      message: "",
      showModal: false,
    });
  };

  hideModelSuccess = () => {
    this.setState({
      alert: "",
      showModal: false,
      isRedirect: true,
    });
  };
  fileToDataUri = (image) => {
    return new Promise((res) => {
      const reader = new FileReader();
      const { type, name, size } = image;
      reader.addEventListener("load", () => {
        res({
          base64: reader.result,
          name: name,
          type,
          size: size,
        });
      });
      reader.readAsDataURL(image);
    });
  };
  uploadImage = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImagesPromises = [];
      for (let i = 0; i < e.target.files.length; i++) {
        newImagesPromises.push(this.fileToDataUri(e.target.files[i]));
      }
      const newImages = await Promise.all(newImagesPromises);
      this.setState({ baseImage: [...newImages] });
    }
  };

  onSubmit = async (formValues) => {
    let image = this.state.image;
    if (this.state.image.length > 0) {
      var subCategoryId = parseInt(this.state.subCategoyIdData);
      this.setState({ isLoading: true });
      for (var i = 0; i < image.length; i++) {
        const fd = new FormData();
        var subCategoryId = subCategoryId;
        var SubCategoryImageId =
          formValues.inSubCategoryImageId == undefined ||
          formValues.inSubCategoryImageId == ""
            ? 0
            : formValues.inSubCategoryImageId;
        fd.append("image", image[i]["file"]);
        fd.append("inSubCategoryImageId", SubCategoryImageId); //Image Id
        fd.append("inSubCategoryId", subCategoryId); // Sub Caetgory Id
        fd.append("inCreatedBy", this.state.currentUserData.inAdminUserId); // user Id
        this.props.AddSubCategoryImage(fd);
      }
      this.setState({ isLoading: false });
      this.SuccessFailSweetAlert(
        "Image has been saved successfully!",
        "success"
      );
    } else {
      this.SuccessFailSweetAlert("Please upload at least one Image", "error");
      this.setState({ isLoading: false });
    }
  };

  onSubmitAndSendNotification = async (formValues) => {
    // console.log(formValues);
    // debugger
    await this.onSubmit(formValues);
    auth.sendUploadImageNotificationApi();
    // sendUploadImageNotificationApi()
    // let image = this.state.image
    // if (this.state.image.length > 0) {
    //     var subCategoryId = parseInt(this.state.subCategoyIdData)
    //     this.setState({ isLoading: true });
    //     for (var i = 0; i < image.length; i++) {
    //         const fd = new FormData();
    //         var subCategoryId = subCategoryId
    //         var SubCategoryImageId = formValues.inSubCategoryImageId == undefined || formValues.inSubCategoryImageId == "" ? 0 : formValues.inSubCategoryImageId
    //         fd.append('image', image[i]['file']);
    //         fd.append('inSubCategoryImageId', SubCategoryImageId);   //Image Id
    //         fd.append('inSubCategoryId', subCategoryId); // Sub Caetgory Id
    //         fd.append('inCreatedBy', this.state.currentUserData.inAdminUserId); // user Id
    //         this.props.AddSubCategoryImageNotification(fd);
    //     }
    //     this.setState({ isLoading: false });
    //     this.SuccessFailSweetAlert("Image has been saved successfully!", "success");
    // } else {
    //     this.SuccessFailSweetAlert("Please upload at least one Image", "error");
    //     this.setState({ isLoading: false });
    // }
  };

  convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  onChangesTagName = (e, index) => {
    this.setState({
      isChecked: this.state.subCategoryData[index].Checked ? false : true,
    });
    this.state.subCategoryData[index].Checked = !this.state.isChecked
      ? !this.state.subCategoryData[index].Checked
      : false;
    this.setState({ subCategoryData: this.state.subCategoryData });
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
      var categoryId = this.state.categoryId;
      // return <Redirect to="/ManageSubCategory" />
      return <Redirect to={`/AddCategoryPage/${categoryId}`} />;
      // return <Redirect to="/ManageCategory" />
    }
    let x = this.state.baseImage;
    return (
      <div className="card card-custom gutter-b example example-compact">
        {/* <div className="card-header">
                    <div className="card-title">
                        <h3 className="card-label">Sub Category Image</h3>
                    </div>
                    <div className="card-toolbar">
                    </div>
                </div> */}
        {/* <form className="form-horizontal" onSubmit={(this.onSubmit)}> */}
        <div
          style={{ margin: 25 }}
          className="form-group fv-plugins-icon-container"
        >
          {/* <div className="col-sm-4">
                            <h6>Image Upload</h6>
                            <input
                                type="file"
                                multiple
                                onChange={(e) => {
                                    this.uploadImage(e);
                                }}
                            />
                        </div> */}
          <div className="col-sm-12">
            <h3>Upload Sub Category</h3>
            <ImageUplaodComponents />
            {/* <input
                                type="file"
                                multiple
                                onChange={(e) => {
                                    this.uploadImage(e);
                                }}
                            /> */}
          </div>
          <br></br>
          {/* <div className="col-sm-8">
                        <h6 >Sub Category</h6>
                        {this.state.subCategoryData != null && this.state.subCategoryData != "" && this.state.subCategoryData != undefined && this.state.subCategoryData.map(function (tag, i) {
                            return (
                                <Field
                                    type="checkbox"
                                    name={tag.stSubCategoryName}
                                    label={tag.stSubCategoryName}
                                    data={tag.Checked}
                                    onChange={(evt) => $this.onChangesTagName(evt, i)}
                                    component={renderCheckboxField} />
                            )
                        })}
                    </div> */}
          {x.length > 0
            ? x.map((imageObj, i) => {
                return (
                  <div className="form-group multi-preview">
                    <img
                      width="75px"
                      height="75px"
                      src={imageObj.base64}
                      alt=""
                    />
                    <div>
                      <span>{imageObj.size ? imageObj.size : "-"}</span>
                      <span>{imageObj.name ? imageObj.name : "-"}</span>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
        {/* <div style={{ margin: 20 }}>
                        <img src={this.state.baseImage} height="200px" />
                    </div> */}
        <div style={{ margin: 20 }}>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Upload Image</Tooltip>}
          >
            <button
              style={{ width: 150, marginRight: 10 }}
              id="kw_dtn_add_carrier"
              type="submit"
              className="btn btn-primary"
              onClick={this.onSubmit}
            >
              Upload Image
            </button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Upload Image And Send Notification</Tooltip>}
          >
            <button
              style={{ width: 265, marginRight: 10 }}
              id="kw_dtn_add_carrier"
              type="submit"
              className="btn btn-primary"
              onClick={this.onSubmitAndSendNotification}
            >
              Upload Image And Send Notification
            </button>
          </OverlayTrigger>
        </div>
        {this.state.showModal && this.state.alertType == "error" ? (
          <SweetAlert
            error
            title={this.state.message}
            onConfirm={() => this.hideModelError()}
          ></SweetAlert>
        ) : (
          this.state.showModal && (
            <SweetAlert
              success
              title={this.state.message}
              onConfirm={() => this.hideModelSuccess()}
            ></SweetAlert>
          )
        )}
        {/* </form> */}
        <div className="mt-2" style={{ marginBottom: 15 }}>
          <div
            className="btn btn-icon btn-sm btn-primary"
            data-placement="buttom"
            style={{
              height: "calc(1.5em + 0.40rem + 1px)",
              width: "calc(1.5em + 0.40rem + 1px)",
              marginLeft: 18,
            }}
          >
            <i className="fa fa-upload"></i>
          </div>{" "}
          Upload Image &nbsp;&nbsp;&nbsp;
          <div
            className="btn btn-icon btn-sm btn-primary"
            data-placement="buttom"
            style={{
              height: "calc(1.5em + 0.40rem + 1px)",
              width: "calc(1.5em + 0.40rem + 1px)",
            }}
          >
            {/* <i class="fas fa-trash-alt"></i> */}
            <i className="fas fa-edit icon-nm"></i>
          </div>{" "}
          Edit Images &nbsp;&nbsp;&nbsp;
          {/* <div
            className="btn btn-icon btn-sm btn-danger"
            data-placement="buttom"
            style={{
              height: "calc(1.5em + 0.40rem + 1px)",
              width: "calc(1.5em + 0.40rem + 1px)",
            }}
          >
            <i class="fas fa-trash-alt"></i>

          </div>{" "}
          Remove Images &nbsp;&nbsp;&nbsp; */}
          <div
            className="btn btn-icon btn-sm btn-danger"
            data-placement="buttom"
            style={{
              height: "calc(1.5em + 0.40rem + 1px)",
              width: "calc(1.5em + 0.40rem + 1px)",
            }}
          >
            {/* <i class="fas fa-trash-alt"></i> */}
            <i className="ki ki-close icon-nm"></i>
          </div>{" "}
          Remove Selected Images &nbsp;&nbsp;&nbsp;
        </div>
      </div>
    );
  }
}
ManageUploadSubCategoryImage = reduxForm({
  form: "ManageUploadSubCategoryImage",
  validate,
  enableReinitialize: true,
  destroyOnUnmount: true,
})(ManageUploadSubCategoryImage);
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
    },
    subCategoryResponse: state.auth.subCategoryResponse,
    GetSubCategoryInfoByIdResponse: state.auth.GetSubCategoryInfoByIdResponse,
    randomNumbers: state.auth.randomNumbers,
    GetSubCategoryResponse: state.auth.GetSubCategoryResponse,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    AddSubCategoryImage: (data) =>
      dispatch(auth.actions.AddSubCategoryImage(data)),
    // AddSubCategoryImageNotification: (data) => dispatch(auth.actions.AddSubCategoryImageNotification(data)),
    GetSubCategory: (data) => dispatch(auth.actions.GetSubCategory(data)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageUploadSubCategoryImage);
