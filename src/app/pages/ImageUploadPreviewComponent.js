import React, {useState} from "react";

export default function App() {
  const [images, setImages] = useState([])
  
  const fileToDataUri = (image) => {
    return new Promise((res) => {
      const reader = new FileReader();
      const {type, name, size} = image;
      reader.addEventListener('load', () => {
          res({
              base64: reader.result,
              name: name,
              type,
              size: size,
          })
      });
      reader.readAsDataURL(image);
    })
  }

    // convertBase64 = (file) => {
    //     return new Promise((resolve, reject) => {
    //         const fileReader = new FileReader();
    //         fileReader.readAsDataURL(file);
    //         fileReader.onload = () => {
    //             resolve(fileReader.result);
    //         };
    //         fileReader.onerror = (error) => {
    //             reject(error);
    //         };
    //     });
    // };

  const uploadImage = async (e) => {
      debugger
    if (e.target.files && e.target.files.length > 0) {
        const newImagesPromises = []
        for (let i = 0; i < e.target.files.length; i++) {
            newImagesPromises.push(fileToDataUri(e.target.files[i]))
        }
        const newImages = await Promise.all(newImagesPromises)
        setImages([...images, ...newImages])
    }
    // e.target.value = "";
}

debugger
  return (
      <form>
          <div className="form-group">
              <input className="form-control" type="file" onChange={uploadImage} multiple />
          </div>
          {
              images.length > 0
                  ? images.map((imageObj, i) => {
                      return (
                          <div key={i}>
                              <img
                                  width="50"
                                  src={imageObj.base64}
                                  alt=''
                              />
                              <div>
                                  <span>{imageObj.size ? imageObj.size : '-'}</span>
                                  <span>{imageObj.name ? imageObj.name : '-'}</span>
                                  {/* <span
                                onClick={() => removeImage(i)}
                            >
                                test
                            </span> */}
                              </div>
                          </div>
                      )
                  })
                  : null
          }
      </form>
  );
}



// import React, { Component } from 'react';

// class ImageUploadPreviewComponent extends Component {

//     fileObj = [];
//     fileArray = [];

//     constructor(props) {
//         super(props)
//         this.state = {
//             file: [null]
//         }
//         this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this)
//         this.uploadFiles = this.uploadFiles.bind(this)
//     }

//     uploadMultipleFiles(e) {
//         this.fileObj.push(e.target.files)
//         for (let i = 0; i < this.fileObj[0].length; i++) {
//             this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
//         }
//         this.setState({ file: this.fileArray })
//     }

//     uploadFiles(e) {
//         e.preventDefault()
//         console.log(this.state.file)
//     }

//     render() {
//         return (
//             <form>
//                 <div className="form-group multi-preview">
//                     {(this.fileArray || []).map(url => (
//                         <img src={url} alt="..." height="200px" />
//                     ))}
//                 </div>

//                 <div className="form-group">
//                     <input type="file" className="form-control" onChange={this.uploadMultipleFiles} multiple />
//                 </div>
//                 {/* <button type="button" className="btn btn-danger btn-block" onClick={this.uploadFiles}>Upload</button> */}
//             </form >
//         )
//     }
// }
// export default ImageUploadPreviewComponent