// import React from 'react';
// //API Request Module
// import axios from 'axios';
// import ImageUploading from 'react-images-uploading';
// import '../custom.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const maxNumber = 10;
// const maxMbFileSize = 5 * 1024 * 1024; // 5Mb

// class Demo extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             imagedata: String,
//             image: []
//         };
//         this.addFormData = this.addFormData.bind(this);
//         this.handleChange = this.handleChange.bind(this);
//     }

//     //FileChange
//     handleChange(file) {
//         this.setState({
//             imagedata: file[0],
//         })
//     }

//     //Form Submission
//     addFormData(evt) {
//         debugger
//         // evt.preventDefault();
//         // const fd = new FormData();
//         // fd.append('image', this.state.imagedata);
//         // //Post Request to Nodejs API Route
//         // axios.post('http://localhost:8000/upload', fd
//         // ).then(res => {
//         //     // this.myFormRef.reset();
//         //     //Success Message in Sweetalert modal
//         //     console.log("Image has been uploaded successfully.");
//         // }
//         // );

//         for (var a = 0; a < this.state.image.length; a++) {
//             const fd = new FormData();
//             let x = this.state.image[a]
//             for (var i = 0; i < x.length; i++) {
//                 //console.log(images[a])
//                 fd.append('image', x[i].file);
//                 //Post Request to Nodejs API Route
//                 axios.post('http://localhost:8000/upload', fd
//                 ).then(res => {
//                 });
//             }
//         }
//     }

//     onChange = (imageList) => {
//         debugger
//         // data for submit
//         this.setState({ image: [imageList] })
//         console.log(imageList);
//     };

//     render() {
//         return (
//             <div>
//                 <div>
//                     {/* <form ref={(el) => this.myFormRef = el}> */}
//                     <ImageUploading
//                         multiple
//                         value={this.state.image}
//                         onChange={this.onChange}
//                         maxNumber={maxNumber}
//                         dataURLKey="data_url"
//                     >
//                         {({ imageList,
//                             onImageUpload,
//                             onImageRemoveAll,
//                             onImageUpdate,
//                             onImageRemove,
//                             isDragging,
//                             dragProps, }) => (
//                             // write your building UI
//                             <div className="upload__image-wrapper">
//                                 <div className="mainbtndiv">
//                                     <button className="btn btn-primary" onClick={onImageUpload}>Upload images</button>
//                                     <button className="btn btn-danger" onClick={onImageRemoveAll}>Remove all images</button>
//                                 </div>
//                                 {this.state.image.map((image, index) => (
//                                     // <div key={image.key}>
//                                     <div key={index} className="image-item mt-5 mb-5 mr-5">
//                                         <img width="100px" height="100px" src={image[index].data_url} />
//                                         {/* <img src={image.dataURL} /> */}
//                                         <button className="btn btn-primary" onClick={onImageUpdate}>Update</button>
//                                         <button className="btn btn-danger" onClick={onImageRemove}>Remove</button>
//                                     </div>
//                                 ))}

//                             </div>
//                         )}
//                     </ImageUploading>
//                     {/* </form> */}
//                 </div>
//                 <button className="btn btn-primary" onClick={this.addFormData}>Submit Images</button>
//                 {/* <form ref={(el) => this.myFormRef = el}>
//                     <label for="image">Image Upload:</label>
//                     <input onChange={(e) => this.handleChange(e.target.files)} type="file" id="image" ref="productimage" />
//                     <button type="submit" onClick={this.addFormData}>Submit</button>
//                 </form> */}
//             </div>
//         )
//     }
// }
// export default Demo;

import React from 'react';
import '../custom.css';
import ImageUploading from 'react-images-uploading';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';

import { imagesubcriber } from './subBehaviour';
// const BASE_URL = "http://localhost:4200/api/"

export function App() {
    let [images, setImages] = React.useState([]);
    const maxNumber = 25;
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
        imagesubcriber.next(imageList)
    };

    return (
        <div className="App">
            <div>
                <ImageUploading
                    multiple
                    value={images}
                    onChange={onChange}
                    maxNumber={maxNumber}
                    dataURLKey="data_url"
                >
                    {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                    }) => (
                        // write your building UI
                        <div className="upload__image-wrapper">
                            <div className="mainbtndiv">
                                <button
                                    // className="btn btn-primary"
                                    className="btn btn-icon btn-sm btn-primary"
                                    style={{ marginRight: 20 }}
                                    // style={isDragging ? { color: 'red',marginRight:20} : undefined}
                                    onClick={onImageUpload}
                                    {...dragProps}>
                                    {/* Uplaod Image */}
                                    <i className="fa fa-upload"></i>
                                </button>
                                <button className="btn btn-icon btn-sm btn-danger" onClick={onImageRemoveAll}><i className="ki ki-close icon-nm"></i></button>
                            </div>
                            <div class="row">
                                {imageList.map((image, index) => (
                                    <div class="col-2">
                                        <div key={index} className="image-item mt-5 mb-5 mr-5">
                                            <img width="140px"
                                                height="140px"
                                                src={image['data_url']} />
                                            <div className="image-item__btn-wrapper">
                                                <button style={{ marginRight: 5 }} className="btn btn-icon btn-sm btn-primary" onClick={() => onImageUpdate(index)}><i style={{ alignSelf: "center" }} className="fas fa-edit icon-nm"></i></button>
                                                <button className="btn btn-icon btn-sm btn-danger" onClick={() => onImageRemove(index)}><i className="ki ki-close icon-nm"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </ImageUploading>
            </div>
            {/* <button className="btn btn-primary" onClick={() => uploadimages()}>Submit Images</button> */}
        </div>
    );
}
export default App;