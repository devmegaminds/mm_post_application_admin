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

class ManageCategory extends Component {
    constructor(props) {
        super();
        this.state = {
            pageNumber: 1,
            tagsData: [],
            isGettingTags: false,
        }
    }

    handleEdit(row) {
        this.props.history.push(`/AddCategoryPage/${row.inCategoryId}`)
    }

    handleDelete(row) {
        if (row != null)
            this.hideAlert(false);
        this.props.DeleteCategoryById(row.inCategoryId)
    }
    componentDidMount() {
        this.setState({ isGettingTags: true })
        this.props.GetCategory("");
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.GetCategoryResponse) {
            if (nextProps.GetCategoryResponse && nextProps.GetCategoryResponse != this.props.GetCategoryResponse) {
                if (nextProps.GetCategoryResponse.statusCode == 200) {
                    this.setState({ isGettingTags: false });
                    this.setState({ isLoading: false })
                    this.setState({ totalno: nextProps.GetCategoryResponse.data.length })

                    this.setState({ tagsData: nextProps.GetCategoryResponse.data })
                }
            }
        }
        if (nextProps.DeleteCategoryByIdResponse) {
            if (nextProps.DeleteCategoryByIdResponse && nextProps.DeleteCategoryByIdResponse != this.props.DeleteCategoryByIdResponse) {
                if (nextProps.DeleteCategoryByIdResponse.data.statusCode == 200) {
                    this.props.GetCategory("");
                    this.setState({ isGettingTags: false });
                    this.SuccessFailSweetAlert(nextProps.DeleteCategoryByIdResponse.data.messgae, 'success')
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
            //#region Index of the Application list
            { dataField: 'inCategoryId', text: 'Category Number', hidden: false },
            { dataField: 'stCategoryName', text: 'Category Name', sort: true },
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
                                overlay={<Tooltip>Edit Category</Tooltip>}>
                                <a className="btn btn-icon btn-sm btn-primary" data-toggle="tooltip" data-placement="buttom" style={{ marginRight: 10 }} onClick={(e) => this.handleEdit(row)}>
                                    <i className="fas fa-edit icon-nm"></i>
                                </a>
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip>Delete Category</Tooltip>}>
                                <a className="btn btn-icon btn-sm btn-danger" data-toggle="tooltip" data-placement="buttom" onClick={(e) => this.ConfirmationSweetAlert(row, "Are you sure want to delete it.?")}>
                                    <i className="ki ki-close icon-nm"></i>
                                </a>
                            </OverlayTrigger>

                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip>Add Sub-Category</Tooltip>}>
                                <a className="btn btn-icon btn-sm btn-primary" data-toggle="modal" data-target="#exampleModal">
                                    <i className="ki ki-close icon-nm"></i>
                                </a>
                                {/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                            Add Image
                        </button> */}
                            </OverlayTrigger>

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
                        <h3 className="card-label">Category</h3>
                        {this.state.isGettingTags && <Spinner animation="border" variant="primary" />}
                    </div>
                    <div className="card-toolbar">
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip>Add Category</Tooltip>}>
                            <Link className="btn btn-primary" id="kw_lnk_new_insurance_type" to="/AddCategoryPage">
                                Add Category
                            </Link>
                        </OverlayTrigger>

                    </div>
                </div>

                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                ...
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-body">

                    <ToolkitProvider
                        bootstrap4
                        keyField='kw_insuranceType_datatable'
                        data={this.state.tagsData}
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
                        </a> Edit Category &nbsp;&nbsp;&nbsp;
                        <a className="btn btn-icon btn-sm btn-danger" data-placement="buttom" style={{ height: 'calc(1.5em + 0.40rem + 1px)', width: 'calc(1.5em + 0.40rem + 1px)' }}>
                            <i className="ki ki-close icon-nm"></i>
                        </a> Delete Category
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
        GetCategoryResponse: state.auth.GetCategoryResponse,
        DeleteCategoryByIdResponse: state.auth.DeleteCategoryByIdResponse,
        insuranceTypeResponse: state.auth.insuranceTypeResponse,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        GetCategory: (data) => dispatch(auth.actions.GetCategory(data)),
        DeleteCategoryById: (data) => dispatch(auth.actions.DeleteCategoryById(data)),
        SaveInsuranceType: (data) => dispatch(auth.actions.SaveInsuranceType(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCategory);