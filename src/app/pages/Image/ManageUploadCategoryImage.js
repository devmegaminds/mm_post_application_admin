import React, { Component } from 'react'
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm, getFormValues } from 'redux-form'
import * as auth from "../../modules/Auth/_redux/authRedux";
import { Link, Redirect } from "react-router-dom";
import "../custom.css";
import SweetAlert from 'react-bootstrap-sweetalert';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import FileBase64 from 'react-file-base64';
// import ImageUploadPreviewComponent from "../ImageUploadPreviewComponent"


import DemoPage from '../Extra/demo'
import { imagesubcriber } from '../Extra/subBehaviour';
import 'bootstrap/dist/css/bootstrap.min.css';

const renderCheckboxField = ({
    input, label, type, checked, id, txtId, data, onClick, meta: { asyncValidating, touched, error } }) => (
    <div className="form-check form-check-inline">
        {/* style={{ marginTop: 33 }} */}
        <input  {...input} type={type} checked={data} className="form-check-input" style={{ cursor: 'pointer' }}></input>
        <label className="form-check-label">{label}</label>
    </div>
)

const validate = values => {
    const errors = {}
    const requiredFields = [
        'stSubCategoryName'
    ]
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = field.substring(2) + ' is required.'
        }
    })
    return errors
}

class ManageUploadCategoryImage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isError: false,
            currentUserData: {},
            subCategoryId: "",
            files: [],
            categoryData: [],
            baseImage: [],
            imageData: []
        }
        this.props.CheckSubCategory("");
        this.state.currentUserData = JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).data
    }
    componentDidMount() {
         
        imagesubcriber.subscribe((x) => {
             
            this.setState({image: x})
        })
    }

    componentWillReceiveProps(nextProps) {
         
        if (nextProps.CheckSubCategoryResponse) {
            if (nextProps.CheckSubCategoryResponse && nextProps.CheckSubCategoryResponse != this.props.CheckSubCategoryResponse) {
                if (nextProps.CheckSubCategoryResponse.data.length > 0) {
                    this.setState({ isGettingTags: false });
                    this.setState({ categoryData: nextProps.CheckSubCategoryResponse.data })
                }
            }
        }
    }

    hideModel = () => {
        this.setState({
            alert: '',
            showModal: false,
        })
    }

    hideModel = () => {
        this.setState({
            alert: '',
            showModal: false,
        })
    }

    SuccessFailSweetAlert(msg, type) {
        let getAlert = '';
        if (type == 'success') {
            getAlert = () => (
                <SweetAlert
                    success
                    title={msg}
                    onConfirm={() => this.hideAlert(true)}
                >
                </SweetAlert>
            );

        }
        else {
            getAlert = () => (
                <SweetAlert
                    error
                    title={msg}
                    onConfirm={() => this.hideAlert(false)}
                >
                </SweetAlert>
            );
        }

        this.setState({
            alert: getAlert()
        });
    }

    // onFileChange = (event) => {
    //     const fileData = event.target.files;
    //     const blob = new Blob([fileData]);
    //     const reader = new FileReader();

    //     reader.onloadend = () => {
    //         for (let i = 0; i < fileData.length; i++) {
    //             console.log('Data to be sent', {
    //                 name: fileData[i].name,
    //                 fileSize: fileData[i].size,
    //                 fileContentType: fileData[i].type,
    //                 file: reader.result
    //             });
    //         }
    //     }
    //     reader.readAsDataURL(blob);
    //  }
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
            // console.log();
            reader.readAsDataURL(image);
        })
    };
    //#region image upoad 
    uploadImage = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const newImagesPromises = []
            for (let i = 0; i < e.target.files.length; i++) {
                newImagesPromises.push(this.fileToDataUri(e.target.files[i]))
            }
            const newImages = await Promise.all(newImagesPromises)
            // console.log(newImages[1].base64, ":><:><:><:><:>");
            this.setState({ baseImage: [...newImages] })
            //#region Signle Image Upload
            // const file = e.target.files[0];
            // const base64 = await this.convertBase64(file);
            // this.setState({ baseImage: base64 })
            //#endregion
        }
    };

    onSubmit = async (formValues) => {
        //#region Split Base64 Data
         
        const data = []
        var base64Data = this.state.baseImage
        for (let index = 0; index < base64Data.length; index++) {
            data.push(base64Data[index].base64.split(',')[1])
        }
        const newImagess = await Promise.all(data)
        this.setState({ imageData: [...newImagess] })
        //-------------------------------//

        let indexOfItem = this.state.categoryData.filter(tag => tag.Checked === true)
        if (indexOfItem.length == 0) {
            this.SuccessFailSweetAlert("Please select at least one Category", "error");
            this.setState({ isLoading: false });
        }
        else {
             
            let x = this.state.image
            console.log(x, "PLPLPLPLPLPLPLPLPLPLP");
            var categoryId = indexOfItem[0].inCategoryId
            this.setState({ isLoading: true });
            for (var i = 0; i < x.length; i++) {
                const fd = new FormData();
                var xyz = categoryId
                var xyzz = "iMAGE pATRH"
                var asd = 0
                fd.append('image', x[i]['file']);
                fd.append('inCategoryImageId', xyzz);   //Image Id
                // fd.append('stImageDatabase64', x[i]['data_url'].split(',')[1]);  // Imaeg Data base64
                fd.append('stImageDatabase64',xyzz);  // Imaeg Data base64
                fd.append('inCategoryId', categoryId); // Caetgory Id
                // fd.append('stImageDatabase64', xysz);
                this.props.AddImage(fd);
            }
            // var categoryId = indexOfItem[0].inCategoryId
            // this.setState({ isLoading: true });
            // this.state.imageData.forEach(element => {
            //     var data = {
            //         inCategoryImageId: formValues.inCategoryImageId == undefined || formValues.inCategoryImageId == "" ? 0 : formValues.inCategoryImageId,
            //         // stImageDatabase64: this.state.baseImage.split(',')[1],
            //         stImageDatabase64: element,
            //         inCategoryId: categoryId,
            //     }
            //     console.log(data, "CATEGORY IMAGE SCREEN");
            //     this.props.AddImage(data);
            //      
            // });
        }
    }

    // addFormData() {
    //      
    //     let x = this.state.image
    //     console.log(x, "PLPLPLPLPLPLPLPLPLPLP");

    //     for (var i = 0; i < x.length; i++) {
    //         const fd = new FormData();
    //         var xyz = 15
    //         var asd = 0
    //         fd.append('image', x[i]['file']);
    //         fd.append('stImageDatabase64', x[i]['data_url'].split(',')[1]);
    //         fd.append('inCategoryId', xyz);
    //         // fd.append('stImageDatabase64', xysz);
    //         fd.append('inCategoryImageId', asd);
    //         this.props.AddImage(fd);

    //         // console.log(fd, ">:>:>:>:>:>:>:>:>:>:");
    //         // axios.post('http://localhost:4200/api/Image/ImageTest', fd)
    //         //     // axios.post('http://megaminds-001-site12.itempurl.com/api/Image/ImageTest', fd)
    //         //     .catch((e) => {
    //         //     });
    //     }
    // }

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

    
    // ------------------------------

    onChangesTagName = (e, index) => {
        this.setState({ isChecked: this.state.categoryData[index].Checked ? false : true })
        this.state.categoryData[index].Checked = !this.state.isChecked ? !this.state.categoryData[index].Checked : false;
        this.setState({ categoryData: this.state.categoryData });
    }

    render() {
        var $this = this;
        const { handleSubmit, pristine, reset, submitting, formValues, change } = this.props;
        if (this.state.isRedirect) {
            return <Redirect to="/ManageCategory" />
        }
        let base64ImageData = this.state.baseImage
        return (
            <div className="card card-custom gutter-b example example-compact">
                <div className="card-header">
                    <div className="card-title">
                        <h3 className="card-label"> Image</h3>
                    </div>
                    <div className="card-toolbar">
                    </div>
                </div>
                {/* <form className="form-horizontal" onSubmit={(this.onSubmit)}> */}
                    <div style={{ margin: 25 }} className="form-group fv-plugins-icon-container">
                        <div className="col-sm-12">
                            <h6>Image Upload</h6>
                            {/* Imaeg Uplaod  */}
                            <DemoPage/>
                            {/* <div className="form-group">
                                <input
                                    className="form-control"
                                    type="file"
                                    multiple
                                    onChange={(e) => {
                                        this.uploadImage(e);
                                    }}
                                />
                            </div> */}
                        </div>
                        <br></br>
                        <div className="col-sm-8">
                            <h6 >Category</h6>
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
                        </div>
                        {
                            base64ImageData.length > 0
                                ? base64ImageData.map((imageObj, i) => {
                                    return (
                                        <div >
                                            <img
                                                width="75px"
                                                height="75px"
                                                src={imageObj.base64}
                                                alt=''
                                            />
                                            {/* <div>
                                                <span>{imageObj.size ? imageObj.size : '-'}</span>
                                                <span>{imageObj.name ? imageObj.name : '-'}</span>
                                            </div> */}
                                        </div>
                                    )
                                })
                                : null
                        }
                    </div>
                    {/* <div style={{ margin: 20 }}>
                        <img src={this.state.baseImage} height="200px" />
                    </div> */}
                    <div style={{ margin: 20 }}>
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip>Add category Image</Tooltip>}>
                            {/* <button style={{ width: 120, marginRight: 10 }}
                                id="kw_dtn_add_carrier"
                                type="submit"
                                className={`btn btn-primary`}>
                                Submit
                            </button> */}                            
                        <button style={{ width: 120, marginRight: 0 }}
                            id="kw_dtn_add_carrier"
                            type="submit"
                            className="btn btn-primary"
                            onClick={(this.onSubmit)}>Submit
                        </button>
                        </OverlayTrigger>
                    </div>
                {/* </form> */}
            </div>
        )
    }
}
ManageUploadCategoryImage = reduxForm({
    form: 'ManageUploadCategoryImage',
    validate,
    enableReinitialize: true,
    destroyOnUnmount: true
})(ManageUploadCategoryImage);
function mapStateToProps(state) {
    return {
        initialValues: {
            // inSubCategoryId: state.auth.GetSubCategoryInfoByIdResponse != undefined && state.auth.GetSubCategoryInfoByIdResponse.data != undefined ? state.auth.GetSubCategoryInfoByIdResponse.data[0].inSubCategoryId : "",
            // stSubCategoryName: state.auth.GetSubCategoryInfoByIdResponse != undefined && state.auth.GetSubCategoryInfoByIdResponse.data != undefined ? state.auth.GetSubCategoryInfoByIdResponse.data[0].stSubCategoryName : ""

        },
        // subCategoryResponse: state.auth.subCategoryResponse,
        // GetSubCategoryInfoByIdResponse: state.auth.GetSubCategoryInfoByIdResponse,
        randomNumbers: state.auth.randomNumbers,
        CheckSubCategoryResponse: state.auth.CheckSubCategoryResponse,


    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        AddImage: (data) => dispatch(auth.actions.AddImage(data)),
        CheckSubCategory: (data) => dispatch(auth.actions.CheckSubCategory(data)),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageUploadCategoryImage);