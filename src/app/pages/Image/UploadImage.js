import React, { useState } from "react";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import FileBase64 from 'react-file-base64';

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

function UploadImage(props) {
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
  return (

    <div className="login-form login-signin" style={{ display: "block" }}>
      <p className="text-muted font-weight-bold">Upload Image</p>
      <div className="form-group fv-plugins-icon-container">
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
        <img src={baseImage} height="200px" />
      </div>
    </div>
  );
}

export default injectIntl(connect(null,)(UploadImage));
