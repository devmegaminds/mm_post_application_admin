import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import FileBase64 from 'react-file-base64';
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../_metronic/_helpers";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { Link } from "react-router-dom";
import * as auth from "../../modules/Auth/_redux/authRedux";
//import * as manageTagRedux from "../../modules/Auth/_redux/manageTagRedux";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SweetAlert from 'react-bootstrap-sweetalert';
import moment from 'moment';
import { stubFalse } from 'lodash';
import Spinner from 'react-bootstrap/Spinner'
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import { Pagination } from "../pagination/Pagination";

const initialValues = {
  stLabName: "",
  stLabAddress: "",
  stLabEmail: "",
  stPhoneNo: "",
  contact: "",
  inLabID: "",
  inUserID: "",
  files: "",
  baseimg: ""
};


export default function ManageUploadCategoryImage({ navigation }) {
  const dispatch = useDispatch()

  // const [selectedFile, setSelectedFile] = useState();
  // const [isFilePicked, setIsFilePicked] = useState(false);

  const [baseImage, setBaseImage] = useState("");
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    initialValues.baseimg = base64;
    setBaseImage(base64);
  };
  const convertBase64 = (file) => {
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
  // const changeHandler = (event, index) => {
  //   setSelectedFile(event.target.files[index]);
  //   console.log((event.target.files[index]), "?>?>?>?>??>");
  //   // this.setState({
  //   //   file: URL.createObjectURL(event.target.files[index])
  //   // })
  //   console.log(selectedFile, ":::::::::");
  //   setIsFilePicked(true);
  // };

  // const getFiles = (files, index) => {
  //   for (let index = 0; index < files.length; index++) {
  //     // const element = array[index];
  //     console.log(files[index].name, "<><><><><><><");
  //   }
  //   // this.setState({ files: files })
  // }
  var currentUserData = JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).data
  const onSubmit = (formValues) => {
    debugger
    var data = {
        inSubCategoryImageId: formValues.inSubCategoryImageId == undefined || formValues.inSubCategoryImageId == "" ? 0 : formValues.inSubCategoryImageId,
        stImageDatabase64: baseImage.split(',')[1],
        inSubCategoryId: "32",
        inCreatedBy: currentUserData.inUserID

      //   "inSubCategoryImageId": 0,
      // "stImageDatabase64": "string",
      // "inSubCategoryId": 0,
      // "inCreatedBy": 0
    }
    dispatch(auth.actions.AddSubCategoryImage(data))
  }
  return (

    <div className="card card-custom gutter-b" style={{ display: "block" }}>
      <div className="card-header">
        <div className="card-title">
          <h3 className="card-label">Upload SubCategory Image</h3>
        </div>
        <div className="card-toolbar">
          {/* <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Add Image</Tooltip>}>
            <Link className="btn btn-primary" id="kw_lnk_new_insurance_type" to="/UploadImagePage">
              Add Image
            </Link>
          </OverlayTrigger> */}
        </div>
      </div>
      <form className="form-horizontal" onSubmit={(onSubmit)}>
        <div style={{ margin: 25 }} className="form-group fv-plugins-icon-container">
          {/* <FileBase64
          multiple={true}
          type='file'
          id='multi'
          margin="normal"
          accept="image/x-png,image/gif,image/jpeg"
          name="selectedImagePath"
          onDone={getFiles.bind()}
        // onChange={changeHandler}
        /> */}
          <input
            type="file"
            onChange={(e) => {
              uploadImage(e);
            }}
          />
          <br></br>
        </div>
        <div style={{ margin: 20 }}>
          <img src={baseImage} height="200px" />
        </div>
        <div style={{ margin: 20 }}>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Add Image</Tooltip>}>
            <button style={{ width: 120, marginRight: 10 }}
              id="kw_dtn_add_carrier"
              type="submit"
              disabled={!baseImage}
              className={`btn btn-primary`}>
              Submit
              {/* {this.state.isLoading && <span className="ml-3 spinner spinner-white"></span>} */}
            </button>
          </OverlayTrigger>
        </div>
      </form>
    </div>
  );
}
// const mapDispatchToProps = (dispatch) => {
//   debugger
//   return {
//     // ResetTag: (data) => dispatch(auth.actions.ResetInsuranceType(data)),
//     // GetCategoryInfoByID: (data) => dispatch(auth.actions.GetCategoryInfoByID(data)),
//     // //SaveTag: (data) => dispatch(auth.actions.SaveInsuranceType(data)),
//     AddImage: (data) => dispatch(auth.actions.AddImage(data)),
//   }
// }
// ManageUploadCategoryImage;
// export default injectIntl(connect(null, mapDispatchToProps)(ManageUploadCategoryImage));
