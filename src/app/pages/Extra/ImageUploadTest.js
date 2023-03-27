import React, { Component } from 'react'
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import axios from "axios";
import { imagesubcriber } from '../../../pages/Extra/subBehaviour';
// imagesubcriber



const BASE_URL = "https://feelbrandliveapi.megaminds.live/api/"
// const BASE_URL = "http://localhost:4200/api/"

class ImageUploadTest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            files: [],
            baseImage: [],
            imageData: []
        }
    }
    // componentDidMount() {
    //     imagesubcriber.subscribe((x) => {
    //         debugger
    //         console.log(x,">:>:>:>:>:>:>:");
    //     })
    // }

    fileToDataUri = (image) => {
        return new Promise((res) => {
            const reader = new FileReader();
            const { type, name, size } = image;
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
    };

    //#region image upload 
    uploadImage = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const newImagesPromises = []
            for (let i = 0; i < e.target.files.length; i++) {
                newImagesPromises.push(this.fileToDataUri(e.target.files[i]))
            }
            const newImages = await Promise.all(newImagesPromises)
            this.setState({ baseImage: [...newImages] })
        }
    };

    fetchData = async (data) => {
        const instance = await axios.create({});
        const respo = instance.post(`${BASE_URL}Image/addEditImageTest`, data)
            .catch((e) => {
                return e.response;
            });
        return respo;
    }

    onSubmit = async (formValues) => {
        const data = []
        var base64Data = this.state.baseImage
        for (let index = 0; index < base64Data.length; index++) {
            data.push(base64Data[index].base64.split(',')[1])
        }
        const newImagess = await Promise.all(data)
        this.setState({ imageData: [...newImagess] })
        this.state.imageData.forEach(element => {
            var data = {
                inCategoryImageId: formValues.inCategoryImageId == undefined || formValues.inCategoryImageId == "" ? 0 : formValues.inCategoryImageId,
                stImageDatabase64: element,
            }
            console.log(data, "CATEGORY IMAGE SCREEN");
            this.fetchData(data)
        });
    }

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
        let base64ImageData = this.state.baseImage
        return (
            <div className="card card-custom gutter-b example example-compact">
                <div className="card-header">
                    <div className="card-title">
                        <h3 className="card-label"> Image Upload Test</h3>
                    </div>
                    <div className="card-toolbar">
                    </div>
                </div>
                <form className="form-horizontal" onSubmit={(this.onSubmit)}>
                    <div style={{ margin: 25 }} className="form-group fv-plugins-icon-container">
                        <div className="col-sm-4">
                            <h6>Image Upload Test</h6>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="file"
                                    multiple
                                    onChange={(e) => {
                                        this.uploadImage(e);
                                    }}
                                />
                            </div>
                        </div>
                        <br></br>
                        {
                            base64ImageData.length > 0
                                ? base64ImageData.map((imageObj, i) => {
                                    return (
                                        <div >
                                            <img
                                                width="100px"
                                                height="100px"
                                                src={imageObj.base64}
                                                alt=''
                                            />
                                        </div>
                                    )
                                })
                                : null
                        }
                    </div>
                    <div style={{ margin: 20 }}>
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip>Add category Image</Tooltip>}>
                            <button style={{ width: 120, marginRight: 10 }}
                                id="kw_dtn_add_carrier"
                                type="submit"
                                className={`btn btn-primary`}>
                                Submit
                            </button>
                        </OverlayTrigger>
                    </div>
                </form>
            </div>
        )
    }
}
export default ImageUploadTest;