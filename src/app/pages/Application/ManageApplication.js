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

class ManageApplication extends Component {
    constructor(props) {
        super();
        this.state = {
            pageNumber: 1,
            tagsData: [],
            isGettingTags: false,
        }
    }

    handleEdit(row) {
        this.props.history.push(`/Tags/Tag/${row.inTagId}`)
    }

    handleDelete(row) {
        if (row != null)
            this.hideAlert(false);
        this.props.DeleteTagById(row.inTagId)
    }
    componentDidMount() {
        this.setState({ isGettingTags: true })
        this.props.GetTags("");
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.GetTagResponse) {
            if (nextProps.GetTagResponse && nextProps.GetTagResponse != this.props.GetTagResponse) {
                if (nextProps.GetTagResponse.statusCode == 200) {
                    this.setState({ isGettingTags: false });
                    this.setState({ isLoading: false })
                    this.setState({ totalno: nextProps.GetTagResponse.data.length })

                    this.setState({ tagsData: nextProps.GetTagResponse.data })
                }
            }
        }
        if (nextProps.DeleteTagByIdResponse) {
            if (nextProps.DeleteTagByIdResponse && nextProps.DeleteTagByIdResponse != this.props.DeleteTagByIdResponse) {
                if (nextProps.DeleteTagByIdResponse.data.statusCode == 200) {
                    this.props.GetTags("");
                    this.setState({ isGettingTags: false });
                    this.SuccessFailSweetAlert(nextProps.DeleteTagByIdResponse.data.messgae, 'success')
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
            // { dataField: 'inTagId', text: 'TagId Unique Id', hidden: true },
            // { dataField: 'stTags', text: 'Tag Name', sort: true },
            // { dataField: 'flgIsActive', text: 'Is Active', sort: false },
            // {
            //     dataField: 'dtCreatedOn', text: 'Created Date', sort: false,
            //     formatter: (cell) => {
            //         if (cell == null) {
            //             return
            //         }
            //         return moment(cell).format("MM/DD/YYYY");
            //     },
            // },
            //#endregion
            {
                dataField: 'link',
                text: 'Action',
                formatter: (rowContent, row) => {
                    return (
                        <div>
                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip>Edit Application</Tooltip>}>
                                <a className="btn btn-icon btn-sm btn-primary" data-toggle="tooltip" data-placement="buttom" style={{ marginRight: 10 }} onClick={(e) => this.handleEdit(row)}>
                                    <i className="fas fa-edit icon-nm"></i>
                                </a>
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip>Delete Application</Tooltip>}>
                                <a className="btn btn-icon btn-sm btn-danger" data-toggle="tooltip" data-placement="buttom" onClick={(e) => this.ConfirmationSweetAlert(row, "Are you sure want to delete it.?")}>
                                    <i className="ki ki-close icon-nm"></i>
                                </a>
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
                        <h3 className="card-label">Application</h3>
                        {this.state.isGettingTags && <Spinner animation="border" variant="primary" />}
                    </div>
                    <div className="card-toolbar">
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip>Add Application</Tooltip>}>
                            <Link className="btn btn-primary" id="kw_lnk_new_insurance_type" to="/AddApplicationPage">
                            Add Application
                            </Link>
                        </OverlayTrigger>

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
                        </a> Edit Application &nbsp;&nbsp;&nbsp;
                        <a className="btn btn-icon btn-sm btn-danger" data-placement="buttom" style={{ height: 'calc(1.5em + 0.40rem + 1px)', width: 'calc(1.5em + 0.40rem + 1px)' }}>
                            <i className="ki ki-close icon-nm"></i>
                        </a> Delete Application 
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
        GetTagResponse: state.auth.GetTagResponse,
        DeleteTagByIdResponse: state.auth.DeleteTagByIdResponse,
        insuranceTypeResponse: state.auth.insuranceTypeResponse,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        GetTags: (data) => dispatch(auth.actions.GetTags(data)),
        DeleteTagById: (data) => dispatch(auth.actions.DeleteTagById(data)),
        SaveInsuranceType: (data) => dispatch(auth.actions.SaveInsuranceType(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageApplication);