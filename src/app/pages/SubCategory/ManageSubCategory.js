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
import { categoryIdsubcriber, idsub, imagesubcriber } from '../../env/subBehaviour';
import { idsubcriber } from '../../env/categoryId';

class ManageSubCategory extends Component {
    constructor(props) {
        super();
        this.state = {
            pageNumber: 1,
            subcategoryData: [],
            isGettingSubCategory: false,
        }
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleEdit(row) {
        var categoryId = parseInt(this.state.categoryId)
        if (row.inSubCategoryId != null)
            this.props.history.push(`/AddSubCategoryPage/${row.inSubCategoryId}`)
    }

    handleImage(row) {
        this.props.history.push(`/AddThumbnailImage/${row.inSubCategoryId}`)
    }

    handleDelete(row) {
        if (row != null)
            this.hideAlert(false);
        this.props.DeleteSubCategoryById(row.inSubCategoryId)
    }
    componentDidMount() {
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

    handleChange = (e) => {
        console.log(e.target.value)
    };

    onBlur = (e, row) => {
        if (e.target.value != "") {
            debugger
            var DisplayPriority = e.target.defaultValue = e.target.value
            var data = {
                inDisplayPriority: DisplayPriority,
                inSubCategoryId: row.inSubCategoryId
            }
            this.props.UpdateSubCategoryPriority(data);
            this.SuccessFailSweetAlert("Update priority successfully", "success");
        }
        e.target.value = e.target.defaultValue
    };

    __onChange(e, row) {
        var intIndex = this.state.subcategoryData.map(function (e) { return row.inSubCategoryId; }).indexOf(row.inSubCategoryId);
        this.state.subcategoryData[intIndex].flgIsActive.data[0] = e.target.checked ? 1 : 0;
        this.setState({ subcategoryData: this.state.subcategoryData });
        var data = {
            inSubCategoryId: row.inSubCategoryId,
            flgIsActive: e.target.checked ? 1 : 0
        }
        this.props.UpdateSubCategoryStatus(data)
        // this.SuccessFailSweetAlert("Change status successfully", "success");
        // if (document.getElementById('chk1').checked) {
        // if (document.getElementById('chk1').checked) {
        // var isActive = 1
        // var x = row.inCategoryId
        // console.log(x, "LLLLLL");
        // this.setState({ isChecked: true })
        // var data = {
        //     inCategoryId: x,
        //     flgIsActive: isActive
        // }
        // console.log("Checked");
        // } else {
        //     var isActive = 0
        //     console.log("UnChecked");
        //     this.setState({ isChecked: true })
        // }
    }

    render() {
        var $this = this;
        const columns = [
            //#region Index of the Sub Category list
            // { dataField: 'inSubCategoryId', text: 'Sub Category Number', hidden: false,sort: true },
            { dataField: 'stSubCategoryName', text: 'Sub Category', sort: true },
            { dataField: 'stCategoryName', text: 'Category' },
            {
                dataField: 'inDisplayPriority',
                text: 'Display Priority',
                // sort: true
                formatter: (dataField, row, index) => {
                    return (
                        <div>
                            <input
                                // disabled={true}
                                defaultValue={dataField}
                                className="form-control"
                                onBlur={(e) => this.onBlur(e, row)}
                                // onChange={(e)=>console.log(e,"11111")}
                                onChange={this.handleChange}
                            />
                            {/* <input type="text" onChange={this.handleChange.bind(this, index)} value={this.state.index} value={dataField}/> */}
                        </div>
                    )
                }
            },
            {
                dataField: 'dtCreatedOn', text: 'Created Date', sort: false,
                formatter: (cell) => {
                    if (cell == null) {
                        return
                    }
                    return moment(cell).format("MM/DD/YYYY");
                },
            },
            {
                dataField: 'link', text: 'Is Active', sort: false,
                formatter: (rowContent, row) => {
                    return (
                        <span class="switch switch-outline switch-icon switch-success" style={{ width: "27%", marginLeft: 20, marginRight: 10 }}>
                            <label>
                                <input type="checkbox"
                                    ref={this.textInput}
                                    name="select"
                                    checked={row.flgIsActive.data[0] == 1}
                                    onClick={(e) => this.__onChange(e, row)}
                                />
                                <span></span>
                            </label>
                        </span>
                    )
                },
            },
            //#endregion
            {
                dataField: 'link',
                text: 'Action',
                formatter: (rowContent, row) => {
                    return (
                        <div>
                            {/* <div class="row"> */}
                            {/* <span class="switch switch-outline switch-icon switch-success" style={{ width: "27%" ,marginLeft:20,marginRight:10}}>
                                        <label>
                                            <input type="checkbox"
                                                ref={this.textInput}
                                                name="select"
                                                checked={row.flgIsActive.data[0] == 1}
                                                onClick={(e) => this.__onChange(e, row)}
                                            />
                                            <span></span>
                                        </label>
                                    </span> */}
                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip>Edit Sub Category</Tooltip>}>
                                {/* <button className="btn btn-icon btn-sm btn-danger" onClick={(e) => this.handleEdit(row)}><i className="fas fa-edit icon-nm"></i></button> */}
                                <a className="btn btn-icon btn-sm btn-primary" data-toggle="tooltip" data-placement="buttom" style={{ marginRight: 10 }} onClick={(e) => this.handleEdit(row)}>
                                    <i className="fas fa-edit icon-nm"></i>
                                </a>
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip>Add Sub Category Thumbnail</Tooltip>}>
                                <a className="btn btn-icon btn-sm btn-primary" data-toggle="tooltip" data-placement="buttom" style={{ marginRight: 10 }} onClick={(e) => this.handleImage(row)}>
                                    <i className="fas fa-image icon-nm"></i>
                                </a>
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip>Delete Sub Category</Tooltip>}>
                                <a className="btn btn-icon btn-sm btn-danger" data-toggle="tooltip" data-placement="buttom" onClick={(e) => this.ConfirmationSweetAlert(row, "Are you sure want to delete it.?")}>
                                    <i className="ki ki-close icon-nm"></i>
                                </a>
                            </OverlayTrigger>
                        </div>
                        // </div>
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
                            overlay={<Tooltip>Add Sub Category</Tooltip>}>
                            <Link className="btn btn-primary" id="kw_lnk_new_insurance_type" to="/AddSubCategoryPage">
                                Add Sub Category
                            </Link>
                        </OverlayTrigger>
                        <div style={{ marginLeft: 20 }}>
                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip>Add Sub Category Image</Tooltip>}>
                                <Link className="btn btn-primary" id="kw_lnk_new_insurance_type" to="/ManageUploadSubCategoryImage">
                                    Add Sub Category Image
                                </Link>
                            </OverlayTrigger>
                        </div>
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
                        <div className="btn btn-icon btn-sm btn-primary" data-placement="buttom" style={{ height: 'calc(1.5em + 0.40rem + 1px)', width: 'calc(1.5em + 0.40rem + 1px)' }}  >
                            <i className="fas fa-edit icon-nm"></i>
                        </div> Edit SubCategory &nbsp;&nbsp;&nbsp;
                        <div className="btn btn-icon btn-sm btn-primary" data-placement="buttom" style={{ height: 'calc(1.5em + 0.40rem + 1px)', width: 'calc(1.5em + 0.40rem + 1px)' }}  >
                            <i className="fas fa-image icon-nm"></i>
                        </div> Add Sub Category Thumbnail &nbsp;&nbsp;&nbsp;
                        <div className="btn btn-icon btn-sm btn-danger" data-placement="buttom" style={{ height: 'calc(1.5em + 0.40rem + 1px)', width: 'calc(1.5em + 0.40rem + 1px)' }}>
                            <i className="ki ki-close icon-nm"></i>
                        </div> Delete SubCategory
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
        UpdateSubCategoryPriority: (data) => dispatch(auth.actions.UpdateSubCategoryPriority(data)),
        SaveInsuranceType: (data) => dispatch(auth.actions.SaveInsuranceType(data)),
        UpdateSubCategoryStatus: (data) => dispatch(auth.actions.UpdateSubCategoryStatus(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageSubCategory);