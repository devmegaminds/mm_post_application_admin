import React, { Component } from "react";
import { connect } from "react-redux";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../_metronic/_helpers";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import { Link } from "react-router-dom";
import * as auth from "../../modules/Auth/_redux/authRedux";
//import * as manageTagRedux from "../../modules/Auth/_redux/manageTagRedux";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import moment from "moment";
import { stubFalse } from "lodash";
import Spinner from "react-bootstrap/Spinner";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { Pagination } from "../pagination/Pagination";

class ManageApplication extends Component {
  constructor(props) {
    super();
    this.state = {
      pageNumber: 1,
      tagsData: [],
      IsLoaderShow: false,
    };
  }

  handleEdit(row) {
    this.props.history.push(`/AddApplicationPage/${row.inApplicationId}`);
  }
  handleDelete(row) {
    if (row != null) this.hideAlert(false);
    this.props.DeleteApplicationById(row.inApplicationId);
  }
  componentDidMount() {
    this.setState({ IsLoaderShow: true });
    this.props.GetApplication("");
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.GetApplicationResponse) {
      if (
        nextProps.GetApplicationResponse &&
        nextProps.GetApplicationResponse != this.props.GetApplicationResponse
      ) {
        if (nextProps.GetApplicationResponse.statusCode == 200) {
          this.setState({ IsLoaderShow: false });
          this.setState({ isLoading: false });
          this.setState({
            totalno: nextProps.GetApplicationResponse.data.length,
          });
          this.setState({ tagsData: nextProps.GetApplicationResponse.data });
        }
        this.setState({ IsLoaderShow: false });
      }
    }
    if (nextProps.DeleteApplicationByIdResponse) {
      if (
        nextProps.DeleteApplicationByIdResponse &&
        nextProps.DeleteApplicationByIdResponse !=
          this.props.DeleteApplicationByIdResponse
      ) {
        if (nextProps.DeleteApplicationByIdResponse.data.statusCode == 200) {
          this.props.GetApplication("");
          this.setState({ IsLoaderShow: false });
          this.SuccessFailSweetAlert(
            nextProps.DeleteApplicationByIdResponse.data.messgae,
            "success"
          );
        }
        this.setState({ IsLoaderShow: false });
      }
    }
  }
  SuccessFailSweetAlert(msg, type) {
    let getAlert = "";
    if (type == "success") {
      getAlert = () => (
        <SweetAlert
          success
          title={msg}
          onConfirm={() => this.hideAlert(true)}
        ></SweetAlert>
      );
    } else {
      getAlert = () => (
        <SweetAlert
          error
          title={msg}
          onConfirm={() => this.hideAlert(false)}
        ></SweetAlert>
      );
    }

    this.setState({
      alert: getAlert(),
    });
  }

  ConfirmationSweetAlert(row, msg) {
    let getAlert = "";
    getAlert = () => (
      <SweetAlert
        error
        title={msg}
        onConfirm={() => this.handleDelete(row)}
        showCancel
        cancelBtnBsStyle="danger"
        onCancel={() => this.hideAlert(false)}
        reverseButtons
      ></SweetAlert>
    );
    this.setState({
      alert: getAlert(),
    });
  }

  hideAlert(isSaved) {
    this.setState({
      alert: null,
    });
  }
  hideAlert(isSaved) {
    this.setState({
      alert: null,
    });
  }
  dateFormatter(cell) {
    if (!cell) {
      return "";
    }
    return `${
      moment(cell).format("MM-DD-YYYY")
        ? moment(cell).format("MM-DD-YYYY")
        : moment(cell).format("MM-DD-YYYY")
    }`;
  }
  changeevent(e, row) {
    console.log(row.inApplicationId);
  }
  render() {
    var $this = this;
    const columns = [
      //#region Index of the Application list
      // { dataField: 'inApplicationId', text: 'Application Id', hidden: true },
      { dataField: "stAppplicationName", text: "Application Name", sort: true },
      { dataField: "inCreatedBy", text: "Creator Id" },
      // { dataField: 'flgIsActive', text: 'Is Active', sort: false },
      {
        dataField: "dtCreatedOn",
        text: "Created Date",
        sort: false,
        formatter: (cell) => {
          if (cell == null) {
            return;
          }
          return moment(cell).format("MM/DD/YYYY");
        },
      },
      //#endregion
      {
        dataField: "link",
        text: "Action",
        formatter: (rowContent, row) => {
          return (
            <div>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>Edit Application</Tooltip>}
              >
                <a
                  className="btn btn-icon btn-sm btn-primary"
                  data-toggle="tooltip"
                  data-placement="buttom"
                  style={{ marginRight: 10 }}
                  onClick={(e) => this.handleEdit(row)}
                >
                  <i className="fas fa-edit icon-nm"></i>
                </a>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>Delete Application</Tooltip>}
              >
                <a
                  className="btn btn-icon btn-sm btn-danger"
                  data-toggle="tooltip"
                  data-placement="buttom"
                  onClick={(e) =>
                    this.ConfirmationSweetAlert(
                      row,
                      "Do you want to delete this application?"
                    )
                  }
                >
                  <i className="ki ki-close icon-nm"></i>
                </a>
              </OverlayTrigger>
            </div>
          );
        },
        headerStyle: (colum, colIndex) => {
          return { width: "10%" };
        },
      },
    ];

    const defaultSorted = [
      {
        dataField: "stTags",
        order: "asc",
      },
    ];
    const sizePerPageList = [
      { text: "10", value: 10 },
      { text: "5", value: 5 },
      { text: "3", value: 3 },
    ];

    const pagination = paginationFactory({
      page: 1,
      sizePerPage: 10,
      showTotal: true,
      alwaysShowAllBtns: true,
      onPageChange: function(page, sizePerPage) {
        console.log("page", page);
        console.log("sizePerPage", sizePerPage);
      },
      onSizePerPageChange: function(page, sizePerPage) {
        console.log("page", page);
        console.log("sizePerPage", sizePerPage);
      },
    });
    const { SearchBar, ClearSearchButton } = Search;

    return (
      <div className="card card-custom gutter-b">
        {this.state.alert}
        <div className="card-header">
          <div className="card-title">
            <h3 className="card-label">Application</h3>
            {this.state.IsLoaderShow && (
              <Spinner animation="border" variant="primary" />
            )}
          </div>
          <div className="card-toolbar">
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>Add Application</Tooltip>}
            >
              <Link
                className="btn btn-primary"
                id="kw_lnk_new_insurance_type"
                to="/AddApplicationPage"
              >
                Add Application
              </Link>
            </OverlayTrigger>
          </div>
        </div>
        <div className="card-body">
          <ToolkitProvider
            bootstrap4
            keyField="kw_insuranceType_datatable"
            data={this.state.tagsData}
            columns={columns}
            search
          >
            {(props) => (
              <div>
                <SearchBar {...props.searchProps} />
                <BootstrapTable
                  defaultSorted={defaultSorted}
                  pagination={pagination}
                  {...props.baseProps}
                />
              </div>
            )}
          </ToolkitProvider>
          <div className="mt-2">
            <div
              className="btn btn-icon btn-sm btn-primary"
              data-placement="buttom"
              style={{
                height: "calc(1.5em + 0.40rem + 1px)",
                width: "calc(1.5em + 0.40rem + 1px)",
              }}
            >
              <i className="fas fa-edit icon-nm"></i>
            </div>{" "}
            Edit Application &nbsp;&nbsp;&nbsp;
            <div
              className="btn btn-icon btn-sm btn-danger"
              data-placement="buttom"
              style={{
                height: "calc(1.5em + 0.40rem + 1px)",
                width: "calc(1.5em + 0.40rem + 1px)",
              }}
            >
              <i className="ki ki-close icon-nm"></i>
            </div>{" "}
            Delete Application &nbsp;&nbsp;&nbsp;
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    initialValues: {},
    GetApplicationResponse: state.auth.GetApplicationResponse,
    DeleteApplicationByIdResponse: state.auth.DeleteApplicationByIdResponse,
    insuranceTypeResponse: state.auth.insuranceTypeResponse,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    GetApplication: (data) => dispatch(auth.actions.GetApplication(data)),
    DeleteApplicationById: (data) =>
      dispatch(auth.actions.DeleteApplicationById(data)),
    SaveInsuranceType: (data) => dispatch(auth.actions.SaveInsuranceType(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageApplication);
