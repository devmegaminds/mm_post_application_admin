import React, { Component } from 'react'
import { connect } from "react-redux";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
    PaginationProvider,
} from "react-bootstrap-table2-paginator"
import * as auth from "../../../app/modules/Auth/_redux/authRedux";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Spinner from 'react-bootstrap/Spinner'
import moment from 'moment';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Pagination } from "../pagination/Pagination";
import { Formik } from "formik";
class ManageUsersPage extends Component {
    constructor(props) {
        super();
        this.state = {
            pageNumber: 1,
            pageSize: 5,
            listLoading: true,
            page_Limit: 10,
            Offset_value: 1,
            Sort_Column: "dtCreatedOn",
            Sort_Order: "DESC",
            userResponseData: [],
            userRquestData: {
                "stSearchText": "",
                "stSortColumn": "dtCreatedOn",
                "stSortOrder": "DESC",
                "inOffset": 1,
                "inLimit": 10
            },
            isGettingListData: false
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.GetUserDataResponse) {
            if (nextProps.GetUserDataResponse && nextProps.GetUserDataResponse != this.props.GetUserDataResponse) {
                if (nextProps.GetUserDataResponse.statusCode == 200) {
                    this.setState({ isGettingListData: false });
                    this.setState({ totalno: nextProps.GetUserDataResponse.data[0].TotalRecords });

                    this.setState({ userResponseData: nextProps.GetUserDataResponse.data }, () => {
                    });
                    this.setState({ listLoading: false });
                }
                if (nextProps.GetUserDataResponse.statusCode == 400) {
                    this.setState({ isGettingListData: false });
                    this.setState({ totalno: 0 });

                    this.setState({ userResponseData: [] }, () => {
                    });
                    this.setState({ listLoading: false });
                }
            }
        }
    }
    componentDidMount() {
        this.setState({ isGettingListData: true })

        this.props.GetUsers(this.state.userRquestData);
    }
    handleView(row) {
        this.props.history.push(`/ViewUserPage/${row.inUserID}`)
    }
    hideModel = () => {
        this.setState({
            alert: '',
            showModal: false,
        })
    }
    getHandlerTableChange(setQueryParams) {

        return (type, { page, sizePerPage, sortField, sortOrder, data }) => {
            const pageNumber = page || 1;
            var shortingfield = sortField;
            if (sortField == "contact") {
                shortingfield = "PhoneNumber";
            }
            if (sortField == "status") {
                shortingfield = "flgIsActive";
            }
            if (sortField == "createdOn") {
                shortingfield = "dtCreatedOn";
            }

            var userRquestData = {
                "stSearchText": this.state.searchingText != undefined ? this.state.searchingText : "",
                "stSortColumn": shortingfield != undefined ? shortingfield : "dtCreatedOn",
                "stSortOrder": sortOrder != undefined ? sortOrder : "DESC",
                "inOffset": pageNumber,
                "inLimit": sizePerPage,
                "stClientTimeZone": localStorage.getItem("CurrentTimezone") != undefined ? localStorage.getItem("CurrentTimezone") : ""
            }
            this.setState({
                page_Limit: sizePerPage,
                Offset_value: pageNumber,
                Sort_Column: shortingfield != undefined ? shortingfield : "dtCreatedOn",
                Sort_Order: sortOrder != undefined ? sortOrder : "DESC"
            })
            this.setState({ listLoading: true });
            this.props.GetUsers(userRquestData);
        };
    }

    render() {
        var $this = this;

        const columns = [
            { dataField: 'inUserID', text: 'User Unique Id', hidden: true },
            { dataField: 'TotalRecords', text: 'Row Id', hidden: true },
            { dataField: 'stFirstName', text: 'First Name', sort: true },
            { dataField: 'stLastName', text: 'Last Name', sort: true },
            { dataField: 'stContact', text: 'Contact Number', sort: true },
            { dataField: 'stEmail', text: 'Email', sort: true },
            { dataField: 'AssignedTags', text: 'Assigned Tags', sort: false },
            // {
            //     dataField: 'createdOn', text: 'Signup Date', sort: true,
            //     formatter: (cell) => {
            //         if (cell == null) {
            //             return
            //         }
            //         return moment(cell).format("MM/DD/YYYY, h:mm a");
            //     },
            // },
           {
                dataField: 'link',
                text: 'Action',
                formatter: (rowContent, row) => {
                    return (
                        <div>
                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip>View Favorite Video</Tooltip>}>
                                <a className="btn btn-icon btn-sm btn-primary" data-toggle="tooltip" data-placement="buttom" style={{ marginRight: 10 }} onClick={(e) => this.handleView(row)}>
                                    <i className="far fa-eye"></i>
                                </a>
                            </OverlayTrigger>
                        </div>
                    )
                },
                headerStyle: (colum, colIndex) => {
                    return { width: '7%' };
                }
           }
        ];

        const defaultSorted = [{
            dataField: 'CreatedOn',
            order: 'desc'
        }];

        const sizePerPageList = [
            { text: "10", value: 10 },
            { text: "5", value: 5 },
            { text: "3", value: 3 }
        ];

        const paginationOptions = {
            custom: true,
            totalSize: $this.state.totalno,
            sizePerPageList: sizePerPageList,
            lastPageText: 'Last',
            firstPageText: 'First',
            nextPageText: 'Next',
            prePageText: 'Previous',
            onSizePerPageChange: function (page, sizePerPage) {

            },
            onPageChange: function (page) {


            },
            alwaysShowAllBtns: true,
        };
        const { SearchBar, ClearSearchButton } = Search;
        const NoDataIndication = () => (
            <div className="spinner">
                <div className="rect1" />
                <div className="rect2" />
                <div className="rect3" />
                <div className="rect4" />
                <div className="rect5" />
            </div>
        );
        const applyFilter = (values) => {

            const newQueryParams = prepareFilter(values);

        };
        const prepareFilter = (values) => {

            const { status, type, searchText } = values;
            const newQueryParams = this.state.carriers;
            const filter = {};

            var userRquestData = {
                "stSearchText": searchText != undefined ? searchText : null,
                "stSortColumn": this.state.Sort_Column,
                "stSortOrder": this.state.Sort_Order,
                "inOffset": this.state.Offset_value,
                "inLimit": this.state.page_Limit,
                "stClientTimeZone": localStorage.getItem("CurrentTimezone") != undefined ? localStorage.getItem("CurrentTimezone") : ""

            }
            this.setState({ searchingText: searchText });
            this.setState({ listLoading: true });
            this.props.GetUsers(userRquestData);
            return newQueryParams;
        };
        return (
            <div className="card card-custom gutter-b">
                <div className="card-header">
                    <div className="card-title">
                        <h3 className="card-label">Users</h3>

                    </div>
                </div>
                <div className="card-body">

                    <Formik
                        initialValues={{
                            searchText: "",
                        }}
                        onSubmit={(values) => {
                            applyFilter(values);
                        }}
                    >
                        {({
                            values,
                            handleSubmit,
                            handleBlur,
                            handleChange,
                            setFieldValue,
                        }) => (
                            <form onSubmit={handleSubmit} className="form form-label-right">
                                <div className="form-group row">

                                    <div className="col-lg-2">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="searchText"
                                            placeholder="Search"
                                            onBlur={handleBlur}
                                            value={values.searchText}
                                            onChange={(e) => {
                                                setFieldValue("searchText", e.target.value);
                                                handleSubmit();
                                            }}
                                        />
                                        {/* <small className="form-text text-muted">
                                            <b>Search</b> 
                                            in all fields
                </small> */}
                                    </div>
                                </div>
                            </form>
                        )}
                    </Formik>
                    <PaginationProvider pagination={paginationFactory(paginationOptions)}>
                        {({ paginationProps, paginationTableProps }) => {
                            return (
                                <Pagination
                                    isLoading={$this.state.listLoading}
                                    paginationProps={paginationProps}
                                >
                                    <BootstrapTable
                                        wrapperClasses="table-responsive"
                                        bootstrap4
                                        remote
                                        keyField='kw_users_datatable'
                                        data={this.state.userResponseData}
                                        columns={columns}
                                        defaultSorted={defaultSorted}
                                        onTableChange={$this.getHandlerTableChange(
                                        )}
                                        {...paginationTableProps}
                                    >

                                    </BootstrapTable>
                                </Pagination>
                            );
                        }}
                    </PaginationProvider>
                    <a className="btn btn-icon btn-sm btn-primary" data-placement="buttom" style={{ height: 'calc(1.5em + 0.40rem + 1px)', width: 'calc(1.5em + 0.40rem + 1px)' }}  >
                        <i className="far fa-eye"></i>
                    </a> View Favorite Video.&nbsp;&nbsp;&nbsp;

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        initialValues: {
        },
        GetUserDataResponse: state.auth.GetUserDataResponse,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        GetUsers: (data) => dispatch(auth.actions.GetUserData(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsersPage);