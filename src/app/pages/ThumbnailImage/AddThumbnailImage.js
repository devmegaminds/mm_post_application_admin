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

class AddThumbnailImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      currentUserData: {},
      subCategoryId: "",
      baseImage: "",
      showModal: false,
      message: "",
    };
    this.state.currentUserData = JSON.parse(
      JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
    ).data;
  }
  onSubmit = (formValues) => {
    let image = this.state.image;
    if (this.state.image.length > 0) {
      const fd = new FormData();
      var subCategoryId = this.state.subCategoryId;
      if (this.state.imageId == undefined || this.state.imageId == null) {
        var SubCategoryImageId = 0;
      } else {
        var SubCategoryImageId = this.state.imageId;
      }
      let x = this.state.image;
      fd.append("image", x[0].file);
      fd.append("inSubCategoryThumbnailImageId", SubCategoryImageId); //Image Id
      fd.append("inSubCategoryId", subCategoryId); // Sub Caetgory Id

      this.props.AddSubCategoryThumbnailImage(fd);
      this.SuccessFailSweetAlert(
        "Image has been saved successfully!",
        "success"
      );
      this.setState({ isLoading: false });
    } else {
      this.SuccessFailSweetAlert("Please upload at least one Image", "error");
      this.setState({ isLoading: false });
    }
  };

  componentWillReceiveProps(nextProps) {
    var id = window.location.href.split("/").pop(); // "1"   "ASDASD"
    var value = parseInt(id);
    if (!isNaN(value)) {
      if (
        nextProps.GetSubCategoryInfoByIdResponse &&
        nextProps.GetSubCategoryInfoByIdResponse
      ) {
        if (nextProps.GetSubCategoryInfoByIdResponse.data.length > 0) {
          this.setState({
            thumbnailImage:
              nextProps.GetSubCategoryInfoByIdResponse.data[0].stImagePath,
          });
          this.setState({
            imageId:
              nextProps.GetSubCategoryInfoByIdResponse.data[0]
                .inSubCategoryThumbnailImageId,
          });
        }
      }
    }
  }

  componentDidMount() {
    imagesubcriber.subscribe((x) => {
      this.setState({ image: x });
    });
    idsubcriber.subscribe((Id) => {
      var categoryId = Id;
      this.setState({ categoryId: categoryId });
      console.log(categoryId);
    });
    var id = window.location.href.split("/").pop();
    this.setState({ subCategoryId: id });
    this.props.GetSubCategoryInfoById(id);
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
  uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await this.convertBase64(file);
    this.setState({ baseImage: base64 });
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
      return <Redirect to={`/AddCategoryPage/${categoryId}`} />;
      // return <Redirect to="/ManageSubCategory" />
    }
    var thumbnailImage = this.state.thumbnailImage;
    var sub = this.state.subCategoryId;
    return (
      <div className="card card-custom gutter-b example example-compact">
        <div className="card-header">
          <div className="card-title">
            <h3 className="card-label">Upload Thumbnail Image</h3>
          </div>
          <div className="card-toolbar"></div>
        </div>
        <div
          style={{ margin: 25 }}
          className="form-group fv-plugins-icon-container"
        >
          <div className="col-sm-6">
            <h6>Image Upload</h6>
            <ImageUplaodComponents />
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
          <br></br>
        </div>

        <div style={{ margin: 20 }}>
          <img src={this.state.baseImage} height="200px" />
        </div>
        <div style={{ margin: 20 }}>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Upload Thumbnaul Image</Tooltip>}
          >
            <button
              style={{ width: 120, marginRight: 10 }}
              id="kw_dtn_add_carrier"
              type="submit"
              className="btn btn-primary"
              onClick={this.onSubmit}
            >
              Submit
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
              to="/ManageCategory"
            >
              Cancel
            </Link>
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
      </div>
    );
  }
}

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
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    AddSubCategoryThumbnailImage: (data) =>
      dispatch(auth.actions.AddSubCategoryThumbnailImage(data)),
    GetSubCategoryInfoById: (data) =>
      dispatch(auth.actions.GetSubCategoryInfoById(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddThumbnailImage);
