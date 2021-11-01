import React, { Component } from 'react'
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm, getFormValues } from 'redux-form'
import * as auth from "../../modules/Auth/_redux/authRedux";
import { Link, Redirect } from "react-router-dom";
import "../custom.css";
import SweetAlert from 'react-bootstrap-sweetalert';
import { OverlayTrigger, Tooltip ,Dropdown} from "react-bootstrap";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const renderFields = ({
    input, label, type, data, placeholder, meta: { asyncValidating, touched, error } }) => (
    <div className="form-group">
        <label>{label}</label>
        <input {...input} type={type} placeholder={placeholder} className="form-control" style={{ marginTop: '-3%' }} />
        {touched && error && <small className="error-msg text-danger form-text">{error}</small>}
    </div>
)
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

class AddSubCategoryPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isError: false,
            currentUserData: {},
            isGettingTags: false,
            categoryData: [],
            isChecked: false
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.props.GetCategory("");
        this.state.currentUserData = JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).data
    }
    onSubmit = (formValues) => {
        console.log(formValues, "LLLLLL");
        let indexOfItem = this.state.categoryData.filter(tag => tag.Checked === true)
        // var Tags = indexOfItem.map(function (x) {
        //     return x.inCategoryId;
        // }).join(',');
        if (indexOfItem.length == 0) {
            this.SuccessFailSweetAlert("Please select at least one Category", "error");
            this.setState({ isLoading: false });
        }
        else if (indexOfItem.length > 1) {
            this.SuccessFailSweetAlert("You can select One categary only", "error");
            this.setState({ isLoading: false });
        }
        else {
            var categoryId = indexOfItem[0].inCategoryId
            this.setState({ isLoading: true });
            var data = {
                inSubCategoryId: formValues.inSubCategoryId == undefined || formValues.inSubCategoryId == "" ? 0 : formValues.inSubCategoryId,
                stSubCategoryName: formValues.stSubCategoryName,
                inCategoryId: categoryId,
                inCreatedBy: this.state.currentUserData.inUserID
            }
            this.props.AddSubCategory(data);
        }
       

    }

    hideModel = () => {
        this.setState({
            alert: '',
            showModal: false,
        })
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.getSubCategoryInfoByIDResponse) {
            if (nextProps.getSubCategoryInfoByIDResponse && nextProps.getSubCategoryInfoByIDResponse != this.props.getSubCategoryInfoByIDResponse) {
                if (nextProps.getSubCategoryInfoByIDResponse.statusCode == 200) {

                }
                else if (nextProps.getSubCategoryInfoByIDResponse.Code == 200) {

                }
                else
                    this.SuccessFailSweetAlert("getting error", "error");
            }
        }
        if (nextProps.subCategoryResponse) {
            if (nextProps.subCategoryResponse && nextProps.subCategoryResponse != this.props.subCategoryResponse) {
                if (nextProps.subCategoryResponse.statusCode == 200) {
                    this.setState({ isLoading: false, isRedirect: true });
                }
                else if (nextProps.subCategoryResponse.status == "Error") {
                    this.setState({ Message: nextProps.subCategoryResponse.errorMessage });
                    this.setState({ showModal: true });
                    this.setState({ isLoading: false });
                }
                else {
                    this.setState({ isLoading: false, isRedirect: false });
                }
            }
        }
        if (nextProps.GetCategoryResponse) {
            if (nextProps.GetCategoryResponse && nextProps.GetCategoryResponse != this.props.GetCategoryResponse) {
                if (nextProps.GetCategoryResponse.data.length > 0) {
                    this.setState({ isGettingTags: false });
                    this.setState({ categoryData: nextProps.GetCategoryResponse.data })
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
    componentDidMount() {
        this.setState({ isGettingTags: true })
        var id = window.location.href.split("/").pop();
        if (id != "SubCategory")
            this.props.GetSubCategoryInfoById(id)
        else {
            var data = {
                inSubCategoryId: "",
                stSubCategoryName: "",
                inCreatedBy: "",
                Code: 200
            }
            this.props.ResetTag(data);
        }
    }
    hideAlert(isSaved) {
        this.setState({
            alert: null
        });
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
    onChangesTagName = (e, index) => {
            this.setState({isChecked: this.state.categoryData[index].Checked ? false : true})
            this.state.categoryData[index].Checked = !this.state.isChecked ? !this.state.categoryData[index].Checked : false;
            this.setState({ categoryData: this.state.categoryData });
    }
    render() {
        var $this = this;
        // const columns = [
        //     //#region Index of the Sub Category list
        //     { dataField: 'inCategoryId', text: 'Category Number', hidden: true },
        //     { dataField: 'stCategoryName', text: 'Category Name', sort: true },
        // ];
        const { handleSubmit, pristine, reset, submitting, formValues, change } = this.props;
        if (this.state.isRedirect) {
            return <Redirect to="/ManageSubCategory" />
        }
        return (
            <div className="card card-custom gutter-b example example-compact">

                {/* <ToolkitProvider
                    bootstrap4
                    data={this.state.categoryData}
                    // columns={columns}
                /> */}
                {this.state.alert}
                <div className="card-body">
                    <form className="form-horizontal" onSubmit={handleSubmit(this.onSubmit)}>
                        <input type="hidden" name="inSubCategoryId" />
                        <div className="row">
                            <div className="col-sm-6">
                                <h6 >Sub Category Name <span className="text-danger">*</span></h6>
                                <Field
                                    type="text"
                                    name="stSubCategoryName"
                                    placeholder="Enter SubCategory Name"
                                    component={renderFields}
                                />
                                {/* <Field
                                    type="text"
                                    name="ID"
                                    placeholder="ID"
                                    component={renderFields}
                                /> */}
                            </div>
                            <div className="col-sm-8">
                                <h6 >Category</h6><br></br>
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
                        </div>

                        <div className="row mt-3 mb-3" >
                            <div className="col-sm-9 text-left userprofile-btn">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Tooltip>Submit</Tooltip>}>
                                    <button style={{ width: 120, marginRight: 10 }}
                                        id="kw_dtn_add_carrier"
                                        type="submit"
                                        disabled={this.state.isLoading}
                                        className={`btn btn-primary`}>
                                        Submit
                                        {this.state.isLoading && <span className="ml-3 spinner spinner-white"></span>}
                                    </button></OverlayTrigger>
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Tooltip>Cancel</Tooltip>}>
                                    <Link className="btn btn-danger" id="kw_lnk_cancel_carrier" to="/Tags">
                                        Cancel
                                    </Link>
                                </OverlayTrigger>
                            </div>
                        </div>
                        {this.state.showModal &&
                            <SweetAlert
                                info
                                title={this.state.Message}
                                onConfirm={() => this.hideModel()}>
                            </SweetAlert>
                        }
                        {this.state.showModal &&
                            <SweetAlert
                                error
                                title={this.state.Message}
                                onConfirm={() => this.hideModel()}>
                            </SweetAlert>
                        }
                    </form>
                </div>
            </div>
        )
    }
}

AddSubCategoryPage = reduxForm({
    form: 'SubCategory',
    validate,
    enableReinitialize: true,
    destroyOnUnmount: true
})(AddSubCategoryPage);

function mapStateToProps(state) {
    debugger
    return {
        initialValues: {
            inSubCategoryId: state.auth.GetSubCategoryInfoByIdResponse != undefined && state.auth.GetSubCategoryInfoByIdResponse.data != undefined ? state.auth.GetSubCategoryInfoByIdResponse.data[0]?.inSubCategoryId : "",
            stSubCategoryName: state.auth.GetSubCategoryInfoByIdResponse != undefined && state.auth.GetSubCategoryInfoByIdResponse.data != undefined ? state.auth.GetSubCategoryInfoByIdResponse.data[0]?.stSubCategoryName : ""
        },
        // insuranceTypeResponse: state.auth.insuranceTypeResponse,
        subCategoryResponse: state.auth.subCategoryResponse,
        GetSubCategoryInfoByIdResponse: state.auth.GetSubCategoryInfoByIdResponse,
        randomNumbers: state.auth.randomNumbers,
        GetCategoryResponse: state.auth.GetCategoryResponse,
        // DeleteCategoryByIdResponse: state.auth.DeleteCategoryByIdResponse,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        ResetTag: (data) => dispatch(auth.actions.ResetInsuranceType(data)),
        GetSubCategoryInfoById: (data) => dispatch(auth.actions.GetSubCategoryInfoById(data)),
        //SaveTag: (data) => dispatch(auth.actions.SaveInsuranceType(data)),
        AddSubCategory: (data) => dispatch(auth.actions.AddSubCategory(data)),
        GetCategory: (data) => dispatch(auth.actions.GetCategory(data)),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddSubCategoryPage);