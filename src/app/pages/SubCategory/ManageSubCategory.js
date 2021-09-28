import React, { Component } from 'react'
import { connect } from "react-redux";
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

class ManageSubCategory extends Component {
    constructor(props) {
        super();
        this.state = {
            pageNumber: 1,
            subcategoryData: [],
            isGettingSubCategory: false,
        }
    }

    handleEdit(row) {
        this.props.history.push(`/AddSubCategoryPage/${row.inSubCategoryId}`)
    }

    handleEdit(row) {
        this.props.history.push(`/AddThumbnailImage/${row.inSubCategoryId}`)
    }

    handleDelete(row) {
        if (row != null)
            this.hideAlert(false);
        this.props.DeleteSubCategoryById(row.inSubCategoryId)
    }
    componentDidMount() {
        debugger
        this.setState({ isGettingSubCategory: true })
        this.props.GetSubCategory("");
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.GetSubCategoryResponse) {
            if (nextProps.GetSubCategoryResponse && nextProps.GetSubCategoryResponse != this.props.GetSubCategoryResponse) {
                if (nextProps.GetSubCategoryResponse.statusCode == 200) {
                    this.setState({ isGettingSubCategory: false });
                    this.setState({ isLoading: false })
                    this.setState({ totalno: nextProps.GetSubCategoryResponse.data.length })

                    this.setState({ subcategoryData: nextProps.GetSubCategoryResponse.data })
                }
            }
        }
        if (nextProps.DeleteSubCategoryByIdResponse) {
            if (nextProps.DeleteSubCategoryByIdResponse && nextProps.DeleteSubCategoryByIdResponse != this.props.DeleteSubCategoryByIdResponse) {
                if (nextProps.DeleteSubCategoryByIdResponse.data.statusCode == 200) {
                    this.props.GetSubCategory("");
                    this.setState({ isGettingSubCategory: false });
                    this.SuccessFailSweetAlert(nextProps.DeleteSubCategoryByIdResponse.data.messgae, 'success')
                }
            }
        }
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

    ConfirmationSweetAlert(row, msg) {
        let getAlert = '';
        getAlert = () => (
            <SweetAlert
                error
                title={msg}
                onConfirm={() => this.handleDelete(row)}
                showCancel
                cancelBtnBsStyle='danger'
                onCancel={() => this.hideAlert(false)}

            >
            </SweetAlert>
        );
        this.setState({
            alert: getAlert()
        });
    }

    hideAlert(isSaved) {
        this.setState({
            alert: null
        });
    }
    hideAlert(isSaved) {
        this.setState({
            alert: null
        });
    }
    dateFormatter(cell) {
        if (!cell) {
            return "";
        }
        return `${moment(cell).format("MM-DD-YYYY") ? moment(cell).format("MM-DD-YYYY") : moment(cell).format("MM-DD-YYYY")}`;
    }
    render() {
        var $this = this;
        const columns = [
            //#region Index of the Sub Category list
            { dataField: 'inSubCategoryId', text: 'SubCategory Number', hidden: false },
            { dataField: 'stSubCategoryName', text: 'SubCategory Name', sort: true },
            { dataField: 'inCategoryId', text: 'Category ID', sort: true },
            { dataField: 'inCreatedBy', text: 'CreatedBy', sort: true },
            // { dataField: 'flgIsActive', text: 'Is Active', sort: false },
            {
                dataField: 'dtCreatedOn', text: 'Created Date', sort: false,
                formatter: (cell) => {
                    if (cell == null) {
                        return
                    }
                    return moment(cell).format("MM/DD/YYYY");
                },
            },
            //#endregion
            {
                dataField: 'link',
                text: 'Action',
                formatter: (rowContent, row) => {
                    return (
                        <div>
                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip>Edit SubCategory</Tooltip>}>
                                <a className="btn btn-icon btn-sm btn-primary" data-toggle="tooltip" data-placement="buttom" style={{ marginRight: 10 }} onClick={(e) => this.handleEdit(row)}>
                                    <i className="fas fa-edit icon-nm"></i>
                                </a>
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip>Add Image</Tooltip>}>
                                <a className="btn btn-icon btn-sm btn-primary" data-toggle="tooltip" data-placement="buttom" style={{ marginRight: 10 }} onClick={(e) => this.handleEdit(row)}>
                                    <i className="fas fa-edit icon-nm"></i>
                                </a>
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip>Delete SubCategory</Tooltip>}>
                                <a className="btn btn-icon btn-sm btn-danger" data-toggle="tooltip" data-placement="buttom" onClick={(e) => this.ConfirmationSweetAlert(row, "Are you sure want to delete it.?")}>
                                    <i className="ki ki-close icon-nm"></i>
                                </a>
                            </OverlayTrigger>

                            {/* <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip>Add Sub-Category</Tooltip>}>
                                <a className="btn btn-icon btn-sm btn-primary" data-toggle="modal" data-target="#exampleModal">
                                    <i className="ki ki-close icon-nm"></i>
                                </a>
                            
                            </OverlayTrigger> */}

                        </div>
                    )
                },
                headerStyle: (colum, colIndex) => {
                    return { width: '10%' };
                }
            }
        ];

        const defaultSorted = [{
            dataField: 'stTags',
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
            <div className="card card-custom gutter-b">
                {this.state.alert}
                <div className="card-header">
                    <div className="card-title">
                        <h3 className="card-label">Sub Category</h3>
                        {this.state.isGettingSubCategory && <Spinner animation="border" variant="primary" />}
                    </div>
                    <div className="card-toolbar">
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip>Add SubCategory</Tooltip>}>
                            <Link className="btn btn-primary" id="kw_lnk_new_insurance_type" to="/AddSubCategoryPage">
                                Add SubCategory
                            </Link>
                        </OverlayTrigger>
                        <div style={{ marginLeft: 20 }}>
                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip>Add Category Image</Tooltip>}>
                                <Link className="btn btn-primary" id="kw_lnk_new_insurance_type" to="/ManageUploadSubCategoryImage">
                                    Add Sub-Category Image
                                </Link>
                            </OverlayTrigger>
                        </div>
                        {/* <div style={{ marginLeft: 20 }}>
                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip>Add Thumbnail Image</Tooltip>}>
                                <Link className="btn btn-primary" id="kw_lnk_new_insurance_type" to="/AddThumbnailImage">
                                    Add Thumbnail Image
                                </Link>
                            </OverlayTrigger>
                        </div> */}

                        {/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
                            Launch demo modal
                        </button>

                        <div class="modal fade" id="exampleModalLong" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Modal Title</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <i aria-hidden="true" class="ki ki-close"></i>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                       <p>Modal</p>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-light-primary font-weight-bold" data-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary font-weight-bold">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                    </div>
                </div>

                <div className="card-body">

                    <ToolkitProvider
                        bootstrap4
                        keyField='kw_insuranceType_datatable'
                        data={this.state.subcategoryData}
                        columns={columns}

                        search
                    >
                        {
                            props => (
                                <div >
                                    <SearchBar {...props.searchProps} />

                                    <BootstrapTable
                                        defaultSorted={defaultSorted}
                                        pagination={pagination}
                                        {...props.baseProps}
                                    />
                                </div>
                            )
                        }
                    </ToolkitProvider>
                    <div className="mt-2">
                        <a className="btn btn-icon btn-sm btn-primary" data-placement="buttom" style={{ height: 'calc(1.5em + 0.40rem + 1px)', width: 'calc(1.5em + 0.40rem + 1px)' }}  >
                            <i className="fas fa-edit icon-nm"></i>
                        </a> Edit SubCategory &nbsp;&nbsp;&nbsp;
                        <a className="btn btn-icon btn-sm btn-danger" data-placement="buttom" style={{ height: 'calc(1.5em + 0.40rem + 1px)', width: 'calc(1.5em + 0.40rem + 1px)' }}>
                            <i className="ki ki-close icon-nm"></i>
                        </a> Delete SubCategory
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        initialValues: {

        },
        GetSubCategoryResponse: state.auth.GetSubCategoryResponse,
        DeleteSubCategoryByIdResponse: state.auth.DeleteSubCategoryByIdResponse,
        insuranceTypeResponse: state.auth.insuranceTypeResponse,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        GetSubCategory: (data) => dispatch(auth.actions.GetSubCategory(data)),
        DeleteSubCategoryById: (data) => dispatch(auth.actions.DeleteSubCategoryById(data)),
        SaveInsuranceType: (data) => dispatch(auth.actions.SaveInsuranceType(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageSubCategory);