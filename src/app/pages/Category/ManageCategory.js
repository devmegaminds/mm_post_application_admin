import React, { Component } from 'react'
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm, getFormValues } from 'redux-form'
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
const renderFields = ({ input, label, type, data, placeholder, meta: { asyncValidating, touched, error } }) => (
    <div className="form-group">
        <label>{label}</label>
        <input {...input} type={type} placeholder={placeholder} className="form-control" style={{ marginTop: '-3%' }} />
        {touched && error && <small className="error-msg text-danger form-text">{error}</small>}
    </div>
)

class ManageCategory extends Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
        this.state = {
            pageNumber: 1,
            tagsData: [],
            isGettingTags: false,
            test: false
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
        debugger
        if (nextProps.GetCategoryResponse) {
            if (nextProps.GetCategoryResponse && nextProps.GetCategoryResponse != this.props.GetCategoryResponse) {
                if (nextProps.GetCategoryResponse.statusCode == 200) {
                    this.setState({ isGettingTags: false });
                    this.setState({ isLoading: false })
                    this.setState({ totalno: nextProps.GetCategoryResponse.data.length })
                    this.setState({ tagsData: nextProps.GetCategoryResponse.data })

                    // var x = nextProps.GetCategoryResponse.data
                    // for (let index = 0; index < x.length; index++) {
                    //     const element = x[index];
                    //     this.setState({ active:nextProps.GetCategoryResponse.data[index].flgIsActive.data[0] })

                    //     // if(nextProps.GetCategoryResponse.data[index].flgIsActive.data[0] == 2){
                    //     //     this.setState({isChecked: true})
                    //     // }
                    // }

                    // nextProps.GetCategoryResponse.data[0].flgIsActive.data[0]
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

    handleChange = (e) => {
        console.log(e.target.value)
    };

    onBlur = (e, row) => {
        debugger
        if (e.target.value != "") {
            var DisplayPriority = e.target.defaultValue = e.target.value
            var data = {
                inDisplayPriority: DisplayPriority,
                inCategoryId: row.inCategoryId
            }
            this.props.UpdateCategoryPriority(data);
            this.SuccessFailSweetAlert("Update priority successfully", "success");
        }
        e.target.value = e.target.defaultValue
    };
    __onChange(e, row) {
        debugger
        var intIndex = this.state.tagsData.map(function (e) { return row.inCategoryId; }).indexOf(row.inCategoryId);
        this.state.tagsData[intIndex].flgIsActive.data[0] = e.target.checked ? 1 : 0;
        this.setState({ tagsData: this.state.tagsData });
        var data = {
            inCategoryId: row.inCategoryId,
            flgIsActive: e.target.checked ? 1 : 0
        }
        this.props.UpdateCategoryStatus(data)
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
            //#region Index of the Ctegory list
            // { dataField: 'inCategoryId', text: 'Category Number', hidden: false },
            { dataField: 'stCategoryName', text: 'Category Name', sort: true },
            {
                dataField: 'inDisplayPriority',
                text: 'Display Priority',
                // sort: true
                formatter: (dataField, row, index) => {
                    return (
                        <div>
                            <input
                                defaultValue={dataField}
                                className="form-control"
                                onBlur={(e) => this.onBlur(e, row)}
                                onChange={this.handleChange}
                            />
                        </div>
                    )
                }

            },
            // { dataField: 'flgIsActive', text: 'Is Active', sort: false },
            { dataField: 'subCategory', text: 'Sub Category' },

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
                dataField: 'link', text: 'Is Active', sort: false, class: "test",
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
                            {/* {row.flgIsActive.data[0] == 1 && */}
                            {/* <input type="checkbox" checked={row.flgIsActive.data[0] == 1}
                                onClick={(e) => this.__onChange(e, row)}  /> */}

                            {/* <div class="row"> */}
                            {/* <div class="row">
                                    <span class="switch switch-outline switch-icon switch-success" style={{ width: "27%" ,marginLeft:20,marginRight:10}}>
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
                                overlay={<Tooltip>Edit Category</Tooltip>}>
                                <a className="btn btn-icon btn-sm btn-primary" data-toggle="tooltip" data-placement="buttom" style={{ marginRight: 10 }} onClick={(e) => this.handleEdit(row)}>
                                    <i className="fas fa-edit icon-nm"></i>
                                </a>
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip>Delete Category</Tooltip>}>
                                <a className="btn btn-icon btn-sm btn-danger" data-toggle="tooltip" data-placement="buttom" style={{ marginRight: 10 }} onClick={(e) => this.ConfirmationSweetAlert(row, "Are you sure want to delete it.?")}>
                                    <i className="ki ki-close icon-nm"></i>
                                </a>
                            </OverlayTrigger>
                        </div>
                        // </div>
                    )
                },
                headerStyle: (colum, colIndex) => {
                    return { width: '15%' };
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
                        <div style={{ marginLeft: 20 }}>
                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip>Add Category Image</Tooltip>}>
                                <Link className="btn btn-primary" id="kw_lnk_new_insurance_type" to="/ManageUploadCategoryImage">
                                    Add Category Image
                                </Link>
                            </OverlayTrigger>
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
                    // autoColumns= {true}
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
                        </div> Edit Category &nbsp;&nbsp;&nbsp;
                        <div className="btn btn-icon btn-sm btn-danger" data-placement="buttom" style={{ height: 'calc(1.5em + 0.40rem + 1px)', width: 'calc(1.5em + 0.40rem + 1px)' }}>
                            <i className="ki ki-close icon-nm"></i>
                        </div> Delete Category
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
        UpdateCategoryPriority: (data) => dispatch(auth.actions.UpdateCategoryPriority(data)),
        UpdateCategoryStatus: (data) => dispatch(auth.actions.UpdateCategoryStatus(data)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCategory);