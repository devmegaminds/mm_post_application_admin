import React, { Component } from 'react'
// import { Button, Form, InputGroup, Col, Row, ButtonToolbar } from "react-bootstrap";
import { Field, FieldArray, reduxForm, getFormValues } from 'redux-form'
import clsx from "clsx";
import { connect } from "react-redux";
import * as auth from "../../../app/modules/Auth/_redux/authRedux";
import { Link, Redirect } from "react-router-dom";
import "../custom.css";
import SweetAlert from 'react-bootstrap-sweetalert';
import FileBase64 from 'react-file-base64';
import { cartCountSubscriber, cartCountService } from "../pagination/dataTransferService";
const renderField = ({
  input,
  label,
  type,
  placeholder,
  meta: { asyncValidating, touched, error }
}) => (
  <div className="form-group col-sm-10" style={{ padding: 0 }}>
    <label>{label}</label>
    <input {...input} type={type} placeholder={placeholder} className="form-control " />
    {touched && error && <small className="error-msg text-danger form-text">{error}</small>}
  </div>
)
const renderdisableField = ({
  input,
  label,
  type,
  placeholder,
  meta: { asyncValidating, touched, error }
}) => (
  <div className="form-group col-sm-10" style={{ padding: 0 }}>
    <label>{label}</label>
    <input {...input} type={type} placeholder={placeholder} className="form-control " disabled={true} />
    {touched && error && <small className="error-msg text-danger form-text">{error}</small>}
  </div>
)

const validate = values => {
  const errors = {}
  const requiredFields = [

  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = field + ' is required.'
    }
  })


  return errors
}





class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isError: false,
      DoImageRemove: false,
      isReset: "",
      showModal: false,
      showModals: false,
      currentUserData: {}
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state.currentUserData = JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).data

  }

  onSubmit = (formValues) => {
    var stFirstName = formValues.FirstName;
    var stLastName = formValues.LastName;

    var userJSON = JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user;
    var userData = JSON.parse(userJSON);
    var _persist = JSON.parse(localStorage.getItem("persist:v713-demo1-auth"))._persist;

    var localdata = localStorage.getItem("persist:v713-demo1-auth")
    var locatusername = JSON.parse(JSON.parse(localdata).user)
    locatusername.token = userData.token;
    locatusername.data.stFirstName = stFirstName
    locatusername.data.stLastName = stLastName
    locatusername.data.stContact = formValues.PhoneNo

    let localStorageItems = {
      'user': JSON.stringify(locatusername),
      '_persist': _persist
    }
    localStorage.setItem('persist:v713-demo1-auth', JSON.stringify(localStorageItems))
    this.setState({ isLoading: true });
    console.log(formValues);
    var image = null;
    if (this.state.image != undefined) {
      image = this.state.image;
      this.setState({ DoImageRemove: true })
    }

    var data = {
      inUserId: this.state.currentUserData.inUserID,
      stFirstName: stFirstName,
      stLastName: stLastName,
      stOldPassword: formValues.oldPassword != undefined ? formValues.oldPassword : '',
      stNewPassword: formValues.newPassword != undefined ? formValues.newPassword : '',
      stConfurmPassword: formValues.confirmpassword != undefined ? formValues.confirmpassword : '',
    }
    this.props.UpdateProfile(data);

  }


  componentWillReceiveProps(nextProps) {

    if (nextProps.updateResponse) {
      if (nextProps.updateResponse && nextProps.updateResponse != this.props.updateResponse) {

        if (nextProps.updateResponse.statusCode == 200) {


          if (nextProps.updateResponse.data[0].PasswordUpdated == 0) {
            this.setState({ isLoading: false });
            this.setState({
              Message: "password & confirm password does not matched."
            });
            this.setState({ showModal: true });
          }
          else if (nextProps.updateResponse.data[0].PasswordUpdated == 1) {
            this.setState({ isLoading: false });
            this.setState({
              Message: "old password does not matched with exsting password."
            });
            this.setState({ showModal: true });
          }
          else if (nextProps.updateResponse.data[0].PasswordUpdated == 2) {
            var userJSON = JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user;
            var userData = JSON.parse(userJSON);
            var _persist = JSON.parse(localStorage.getItem("persist:v713-demo1-auth"))._persist;

            var localdata = localStorage.getItem("persist:v713-demo1-auth")
            var locatusername = JSON.parse(JSON.parse(localdata).user)
            locatusername.token = userData.token;
            locatusername.data.stFirstName = nextProps.updateResponse.data[0].stFirstName
            locatusername.data.stLastName = nextProps.updateResponse.data[0].stLastName
            locatusername.data.stContact = nextProps.updateResponse.data[0].stContact
            locatusername.data.stEmail = nextProps.updateResponse.data[0].stEmail

            let localStorageItems = {
              'user': JSON.stringify(locatusername),
              '_persist': _persist
            }
            localStorage.setItem('persist:v713-demo1-auth', JSON.stringify(localStorageItems))
            this.setState({ isLoading: false });
            this.setState({ Message: "Profile Updated Successfully" });
            this.setState({ showModal: true });
            cartCountSubscriber.subscribe((v) => {
              this.setState({ cartCount: v })
            });
            cartCountSubscriber.next(this.state.cartCount + 1);
          }


        }
        else if (nextProps.updateResponse.statusCode != 200) {

          this.setState({ isLoading: false });
          this.setState({
            Message: nextProps.updateResponse.errorMessages != undefined ? nextProps.SaveProfileResponse.errorMessages[0].errorMessage
              : nextProps.updateResponse.errorMessage
          });
          this.setState({ showModal: true });
        }
      }
    }

  }
  DuplicateSweetAlert(msg, type) {

    let getAlert = '';
    getAlert = () => (
      <SweetAlert
        error
        title={msg}
        onConfirm={() => this.hideAlert(false)}
      >
      </SweetAlert>
    );
    this.setState({
      alert: getAlert()
    });
  }
  hideAlert(isSaved) {
    this.setState({
      alert: null
    });
  }
  onChange = (event) => {

    this.setState({ isError: false, error: '' })
    if (event.target.files.length > 0) {
      if (event.target.files[0].size / 1024 / 1024 > 5) {
        this.setState({ isError: true, error: 'Insurance card image should be smaller than 5 MB' })
      }
      if (event.target.files && event.target.files[0]) {
        var type = event.target.files[0].type; // image/jpg, image/png, image/jpeg...
        // allow jpg, png, jpeg, bmp, gif, ico
        var type_reg = /^image\/(jpg|png|jpeg)$/;
        if (type.match(type_reg)) {
          // file is ready to upload
        } else {
          this.setState({ isError: true, error: 'Only file with the .png, .jpeg, .jpg extension are allowed' })
        }
      }
      this.setState({

        image: event.target.files[0]
      });
    }
    else {
      this.setState({
        image: null
      });
    }
  }
  hideModel = () => {
    this.setState({
      alert: '',

      showModal: false,
    })
  }
  removeSelectedImage = () => {
    this.setState({ selectedImagePath: "", image: "", stOldImagePath: "", files: "", imagePath: "" })
  }
  removeImage = () => {
    this.setState({ isShowImageSection: false, DoImageRemove: true, stOldImagePath: this.state.imagePath, imagePath: "" })
  }
  getFiles(files) {

    this.setState({ files: files })
    this.setState({ isError: false, error: '' })
    if (files.name.length > 0) {
      if (files.size.split(' ')[0] / 1024 > 5) {
        this.setState({ isError: true, error: 'image should be smaller than 5 MB' })
      }
      var type = files.name.split('.')[1] // image/jpg, image/png, image/jpeg...
      // allow jpg, png, jpeg, bmp, gif, ico
      var Extension = files.name.split('.')[1].toLowerCase();
      if (Extension == "gif" || Extension == "png" || Extension == "bmp" || Extension == "jpeg" || Extension == "jpg") {

        this.is64baseimage = files.base64.split(',')[1];
        this.isimageName = files.name.split('.')[1]
        this.setState({
          selectedImagePath: files.base64,
          image: files.file,
          imagePath: files.file.name,
          isShowImageSection: false
        });
      }
      else {
        this.setState({ isError: true, error: 'Only file with the .gif, .png, .bmp, .jpeg, .jpg extension are allowed' })
      }

    }
    else {
      this.is64baseimage = null;
      this.isimageName = null;
    }
  }
  componentDidMount() {
    this.setState({
      imagePath: JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).profileImage, isShowImageSection: true,
      // image: JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).profileImage,
    })

  }
  render() {

    const { handleSubmit, pristine, reset } = this.props;
    return (
      <div className="card card-custom gutter-b example example-compact">
        <div className="card-body">
          <form className="form-horizontal" ref={(el) => this.myFormRef = el} onSubmit={handleSubmit(this.onSubmit)}>
            <div className="card card-custom gutter-b example example-compact">
              <div className="card-title">
                <h3 className="card-label">User Details</h3>
              </div>
              <div className="card-toolbar">

              </div>
              <div className="row">
                <div className="col-sm-4">
                  <Field
                    type="text"
                    name="FirstName"
                    label="First Name"
                    placeholder="Enter First Name"
                    component={renderField}
                  />
                </div>

                <div className="col-sm-4">
                  <Field
                    type="text"
                    name="LastName"
                    label="Last Name"
                    placeholder="Enter Last Name"
                    component={renderField}
                  />
                </div>
                <div className="col-sm-4">
                  <Field

                    type="text"
                    name="Email"
                    label="Email"
                    // placeholder="Enter Email Address"
                    component={renderdisableField}
                  />
                </div>
                <div className="col-sm-4">
                  <Field
                    type="text"
                    name="PhoneNo"
                    label="PhoneNo"

                    component={renderdisableField}
                  />
                </div>
                {/* <div className="col-sm-4">
                  <label>Profile Image</label>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-6">


                        <FileBase64
                          multiple={false}
                          type='file'
                          id='multi'
                          margin="normal"
                          accept="image/x-png,image/gif,image/jpeg"
                          name="selectedImagePath"
                          component={renderField}
                          onDone={this.getFiles.bind(this)}

                        />
                      </div>
                      {this.state.selectedImagePath &&
                        <div className="col-md-6">
                          <span className="remove-image-button" onClick={() => this.removeSelectedImage()}>&times;</span>
                          <img src={this.state.selectedImagePath} className="img-thumbnail" style={{ width: 50, height: 'auto' }}></img>
                        </div>
                      }

                      {this.state.isShowImageSection && <div className="col-md-6">
                        <span className="remove-image-button" onClick={() => this.removeImage()}>&times;</span>
                        <img src={this.state.imagePath} className="img-thumbnail" style={{ width: 50, height: 'auto' }}></img>
                      </div>
                      }
                    </div>

                  </div>
                  {this.state.isError && <small className="error-msg text-danger form-text">{this.state.error}</small>}
                </div> */}
              </div>
            </div>
            <div className="card card-custom gutter-b example example-compact">
              <div className="card-title">
                <h3 className="card-label">Change Password</h3>
              </div>
              <div className="card-toolbar">

              </div>
              <div className="row">
                <div className="col-sm-3">
                  <Field
                    type="password"
                    autocomplete="off"
                    name="oldPassword"
                    label="Current Password"
                    placeholder="Enter Current password"
                    component={renderField}
                  />
                </div>
                <div className="col-sm-3">
                  <Field
                    type="password"
                    autocomplete="off"
                    name="newPassword"
                    label="New Password"
                    placeholder="Enter new password"
                    component={renderField}
                  />
                </div>
                <div className="col-sm-3">
                  <Field
                    type="password"
                    autocomplete="off"
                    name="confirmpassword"
                    label="Confirm Password"
                    placeholder="Enter Confirm Password"
                    component={renderField}
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="row mt-3 mb-3" >
                <div className="col-sm-9 text-left userprofile-btn">
                  <button style={{ width: 120, marginRight: 10 }}
                    id="kw_dtn_add_carrier"
                    type="submit"
                    disabled={this.state.isLoading || pristine}
                    onClick={(e) => this.setState({ isReset: false })}
                    className={`btn btn-primary`}>
                    Submit
                    {this.state.isLoading && <span className="ml-3 spinner spinner-white"></span>}
                  </button>
                </div>

              </div>
            </div>
          </form>
          {this.state.showModal &&
            <SweetAlert
              success
              title={this.state.Message}
              onConfirm={() => this.hideModel()}
            >

            </SweetAlert>


          }

        </div>
      </div >
    )
  }
}


Profile = reduxForm({
  form: 'Profile',
  validate,
  enableReinitialize: true,
  destroyOnUnmount: true
})(Profile);

function mapStateToProps(state) {
  return {

    initialValues: {
      FirstName: JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).data.stFirstName != "" ?
        JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).data.stFirstName : "dev",
      LastName: JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).data.stLastName != "" ?
        JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).data.stLastName : "",
      Email: JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).data.stEmail,
      PhoneNo: JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).data.stContact,

    },
    updateResponse: state.auth.updateResponse,
    randomNumbers: state.auth.randomNumbers
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    UpdateProfile: (data) => dispatch(auth.actions.UpdateProfile(data)),

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);