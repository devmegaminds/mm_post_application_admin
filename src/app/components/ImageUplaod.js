import React from "react";
import "../pages/custom.css";
import ImageUploading from "react-images-uploading";
import { imagesubcriber } from "../env/subBehaviour";
// const BASE_URL = "http://localhost:4200/api/"
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export function App() {
  let [images, setImages] = React.useState([]);
  const maxNumber = 25;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
    imagesubcriber.next(imageList);
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
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>Upload</Tooltip>}
                >
                  <button
                    // className="btn btn-primary"
                    className="btn btn-icon btn-sm btn-primary"
                    style={{ marginRight: 20 }}
                    // style={isDragging ? { color: 'red',marginRight:20} : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    {/* Uplaod Image */}
                    <i className="fa fa-upload"></i>
                  </button>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>Remove All Images</Tooltip>}
                >
                  <button
                    className="btn btn-icon btn-sm btn-danger"
                    onClick={onImageRemoveAll}
                  >
                    <i className="ki ki-close icon-nm"></i>
                  </button>
                </OverlayTrigger>
              </div>
              <div class="row">
                {imageList.map((image, index) => (
                  <div class="col-2">
                    <div key={index} className="image-item mt-5 mb-5 mr-5">
                      <img
                        width="140px"
                        height="140px"
                        src={image["data_url"]}
                      />
                      <div
                        className="image-item__btn-wrapper"
                        style={{ marginTop: 5 }}
                      >
                        <OverlayTrigger
                          placement="bottom"
                          overlay={<Tooltip>Edit Image</Tooltip>}
                        >
                          <button
                            style={{ marginRight: 5 }}
                            className="btn btn-icon btn-sm btn-primary"
                            onClick={() => onImageUpdate(index)}
                          >
                            <i
                              style={{ alignSelf: "center" }}
                              className="fas fa-edit icon-nm"
                            ></i>
                          </button>
                        </OverlayTrigger>

                        <OverlayTrigger
                          placement="bottom"
                          overlay={<Tooltip>Remove Image</Tooltip>}
                        >
                          <button
                            className="btn btn-icon btn-sm btn-danger"
                            onClick={() => onImageRemove(index)}
                          >
                            {/* <i class="fas fa-trash-alt"></i> */}
                            <i className="ki ki-close icon-nm"></i>
                          </button>
                        </OverlayTrigger>
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
