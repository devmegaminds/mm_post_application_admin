import React, { Component } from 'react'
import { connect } from "react-redux";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import * as auth from "../../modules/Auth/_redux/authRedux";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Spinner from 'react-bootstrap/Spinner'
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Overlay from 'react-bootstrap/Overlay';
import { Texture } from '@material-ui/icons';
import { Field, FieldArray, reduxForm, getFormValues } from 'redux-form'

import { OverlayTrigger, Tooltip } from "react-bootstrap";
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
class ViewUserPage extends Component {
    constructor(props) {
        super();
        this.state = {
            pageNumber: 1,
            ViewUserVideos: [],
            isGettingTags: false,

            userCoverDetails: [],
            userCoverPaymentDetails: [],
            invitedUserContactList: [],
            isGettingdata: true,
            showUserDetails: false,
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.GetUserByIdResponse) {
            if (nextProps.GetUserByIdResponse && nextProps.GetUserByIdResponse != this.props.GetUserByIdResponse) {
                if (nextProps.GetUserByIdResponse.statusCode == 200) {
                    this.setState({ isGettingTags: false });
                    this.setState({ isLoading: false })
                    this.setState({ totalno: nextProps.GetUserByIdResponse.data.length })
                    this.setState({ ViewUserVideos: nextProps.GetUserByIdResponse.data })
                } else {
                    this.setState({ isGettingTags: false });
                    this.setState({ isLoading: false })
                }
            }
        }
    }
    componentDidMount() {
        var id = window.location.href.split("/").pop();
        if (id != "view") {
            this.setState({ isGettingTags: true })
            var data = {
                inUserID: id
            }
            console.log(data, "DATA");
            this.props.GetUserById(data)
        }
        //this.props.GetUserPaymentMethods(id)


    }
    // handleView(row) {
    //     this.props.history.push(`/userview/${row.uiUserId}`)
    // }
    userDetails() {
        if (this.state.showUserDetails == false) {
            this.setState({ showUserDetails: true })
        }
        if (this.state.showUserDetails == true) {
            this.setState({ showUserDetails: false })
        }
    }

    render() {
        var $this = this;
        const columns = [
            { dataField: 'inVideoId', text: 'VideoId Unique Id', hidden: true },
            { dataField: 'stTitle', text: 'Video Title', sort: true },
            {
                dataField: 'stVideoURL',
                text: 'Video URL',
                formatter: (rowContent, row) => {
                    return (
                        <a href={row.stVideoURL} target="_blank">{row.stVideoURL}</a>
                    )
                },
            },
            { dataField: 'AssignedTags', text: 'Assigned Tags', sort: false },
        ];

        const defaultSorted = [{
            dataField: 'stTitle',
            order: 'asc'
        }];
        const sizePerPageList = [
            { text: "10", value: 10 },
            { text: "5", value: 5 },
            { text: "3", value: 3 }


        ];


        const pagination = paginationFactory({
            page: 1,
            sizePerPage: 10,
            showTotal: true,
            alwaysShowAllBtns: true,
            onPageChange: function (page, sizePerPage) {
                console.log('page', page);
                console.log('sizePerPage', sizePerPage);
            },
            onSizePerPageChange: function (page, sizePerPage) {
                console.log('page', page);
                console.log('sizePerPage', sizePerPage);
            }
        });
        const { SearchBar, ClearSearchButton } = Search;

        return (
            <div className="card card-custom gutter-b example example-compact">
                <div className="card-body">
                    <form className="form-horizontal" ref={(el) => this.myFormRef = el}
                    // onSubmit={handleSubmit(this.onSubmit)}
                    >
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
                                        name="stFirstName"
                                        label="First Name"
                                        placeholder="First Name"
                                        component={renderdisableField}
                                    />
                                </div>

                                <div className="col-sm-4">
                                    <Field
                                        type="text"
                                        name="stLastName"
                                        label="Last Name"
                                        placeholder="Last Name"
                                        component={renderdisableField}
                                    />
                                </div>
                                <div className="col-sm-4">
                                    <Field
                                        type="text"
                                        name="stEmail"
                                        label="Email"
                                        placeholder="Email Address"
                                        component={renderdisableField}
                                    />
                                </div>
                                <div className="col-sm-4">
                                    <Field
                                        type="text"
                                        name="stContact"
                                        label="PhoneNo"
                                        placeholder="Phone Number"
                                        component={renderdisableField}
                                    />
                                </div>
                                <div className="col-sm-4">
                                    <Field
                                        type="text"
                                        name="stAddress"
                                        label="Address"
                                        placeholder="Address"
                                        component={renderdisableField}
                                    />
                                </div>
                                <div className="col-sm-4">
                                    <Field
                                        type="text"
                                        name="stBusinessName"
                                        label="BusinessName"
                                        placeholder="BusinessName"
                                        component={renderdisableField}
                                    />
                                </div>
                                <div className="col-sm-4">
                                    <Field
                                        type="text"
                                        name="stWebsite"
                                        label="Website"
                                        placeholder="Website"
                                        component={renderdisableField}
                                    />
                                </div>
                            </div>
                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip>Back</Tooltip>}>
                                <Link style={{ width: 120 }} className="btn btn-primary" id="kw_lnk_cancel_carrier" to="/ManageUsersPage">
                                <i class="fa fa-arrow-left" aria-hidden="true"></i>
                                </Link>
                            </OverlayTrigger>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}
ViewUserPage = reduxForm({
    form: 'Profile',
    validate,
    enableReinitialize: true,
    destroyOnUnmount: true
})(ViewUserPage);
function mapStateToProps(state) {
    console.log(state.auth.GetUseFavoriteVideoDataResponse);
    return {
        initialValues: {
            inUserID: state.auth.GetUseFavoriteVideoDataResponse != undefined && state.auth.GetUseFavoriteVideoDataResponse.data != undefined ? state.auth.GetUseFavoriteVideoDataResponse.data.inUserID : "",
            stFirstName: state.auth.GetUseFavoriteVideoDataResponse != undefined && state.auth.GetUseFavoriteVideoDataResponse.data != undefined ? state.auth.GetUseFavoriteVideoDataResponse.data.stFirstName : "",
            stLastName: state.auth.GetUseFavoriteVideoDataResponse != undefined && state.auth.GetUseFavoriteVideoDataResponse.data != undefined ? state.auth.GetUseFavoriteVideoDataResponse.data.stLastName : "",
            stContact: state.auth.GetUseFavoriteVideoDataResponse != undefined && state.auth.GetUseFavoriteVideoDataResponse.data != undefined ? state.auth.GetUseFavoriteVideoDataResponse.data.stContact : "",
            stBusinessName: state.auth.GetUseFavoriteVideoDataResponse != undefined && state.auth.GetUseFavoriteVideoDataResponse.data != undefined ? state.auth.GetUseFavoriteVideoDataResponse.data.stBusinessName : "",
            stWebsite: state.auth.GetUseFavoriteVideoDataResponse != undefined && state.auth.GetUseFavoriteVideoDataResponse.data != undefined ? state.auth.GetUseFavoriteVideoDataResponse.data.stWebsite : "",
            stAddress: state.auth.GetUseFavoriteVideoDataResponse != undefined && state.auth.GetUseFavoriteVideoDataResponse.data != undefined ? state.auth.GetUseFavoriteVideoDataResponse.data.stAddress : "",
            stEmail: state.auth.GetUseFavoriteVideoDataResponse != undefined && state.auth.GetUseFavoriteVideoDataResponse.data != undefined ? state.auth.GetUseFavoriteVideoDataResponse.data.stEmail : "",
        },
        GetUserByIdResponse: state.auth.GetUseFavoriteVideoDataResponse,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        GetUserById: (data) => dispatch(auth.actions.GetUseFavoriteVideoData(data)),
        //GetUserPaymentMethods: (data) => dispatch(auth.actions.GetUserPaymentMethods(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewUserPage);