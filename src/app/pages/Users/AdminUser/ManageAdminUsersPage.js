import React, { Component } from "react";
import { connect } from "react-redux";
import SVG from "react-inlinesvg";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import { Link } from "react-router-dom";
import * as auth from "../../../modules/Auth/_redux/authRedux";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import moment from "moment";
import { stubFalse } from "lodash";
import Spinner from "react-bootstrap/Spinner";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { Pagination } from "../../pagination/Pagination";

class ManageSubCategory extends Component {
  constructor(props) {
    super();
    this.state = {
      pageNumber: 1,
      // subcategoryData: [],
      userResponseData: [],
      isGettingListData: false,
    };
  }

  handleView(row) {
    this.props.history.push(`/ViewAdminUserPage/${row.inAdminUserId}`);
  }

  hideModel = () => {
    this.setState({
      alert: "",
      showModal: false,
    });
  };

  componentDidMount() {
    this.setState({ isGettingListData: true });
    this.props.GetAdminUserData("");
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.GetAdminUserDataResponse) {
      if (
        nextProps.GetAdminUserDataResponse &&
        nextProps.GetAdminUserDataResponse !=
          this.props.GetAdminUserDataResponse
      ) {
        if (nextProps.GetAdminUserDataResponse.statusCode == 200) {
          this.setState({ isGettingListData: false });
          this.setState({
            totalno: nextProps.GetAdminUserDataResponse.data[0].TotalRecords,
          });
          this.setState(
            { userResponseData: nextProps.GetAdminUserDataResponse.data },
            () => {}
          );

          this.setState({ listLoading: false });
        }
        if (nextProps.GetAdminUserDataResponse.statusCode == 400) {
          this.setState({ isGettingListData: false });
          this.setState({ totalno: 0 });

          this.setState({ userResponseData: [] }, () => {});
          this.setState({ listLoading: false });
        }
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
  render() {
    var $this = this;
    const columns = [
      //#region Index of the Sub Category list
      // { dataField: 'inUserID', text: 'User Unique Id', hidden: true },
      { dataField: "stFirstName", text: "First Name", sort: true },
      { dataField: "stLastName", text: "Last Name", sort: true },
      { dataField: "stContact", text: "Contact Number", sort: true },
      { dataField: "stEmail", text: "Email", sort: true },
      // {
      //   dataField: "dtCreatedOn",
      //   text: "Created Date",
      //   sort: false,
      //   formatter: (cell) => {
      //     if (cell == null) {
      //       return;
      //     }
      //     return moment(cell).format("MM/DD/YYYY");
      //   },
      // },
      //#endregion
      {
        dataField: "link",
        text: "Action",
        formatter: (rowContent, row) => {
          return (
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>View User</Tooltip>}
            >
              <a
                className="btn btn-icon btn-sm btn-primary"
                data-toggle="tooltip"
                data-placement="buttom"
                style={{ marginLeft: 10 }}
                onClick={(e) => this.handleView(row)}
              >
                <i className="far fa-eye"></i>
              </a>
            </OverlayTrigger>
          );
        },
        headerStyle: (colum, colIndex) => {
          return { width: "5%" };
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
    const { SearchBar } = Search;

    return (
      <div className="card card-custom gutter-b">
        {this.state.alert}
        <div className="card-header">
          <div className="card-title">
            <h3 className="card-label">Admin List</h3>
            {this.state.isGettingListData && (
              <Spinner animation="border" variant="primary" />
            )}
          </div>
          <div className="card-toolbar">
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>Add New Admin</Tooltip>}
            >
              <Link
                className="btn btn-primary"
                id="kw_lnk_new_insurance_type"
                to="/ViewAdminUserPage"
              >
                New Admin
              </Link>
            </OverlayTrigger>
          </div>
        </div>

        <div className="card-body">
          <ToolkitProvider
            bootstrap4
            keyField="kw_insuranceType_datatable"
            data={this.state.userResponseData}
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
            <a
              className="btn btn-icon btn-sm btn-primary"
              data-placement="buttom"
              style={{
                height: "calc(1.5em + 0.40rem + 1px)",
                width: "calc(1.5em + 0.40rem + 1px)",
              }}
            >
              <i className="far fa-eye"></i>
            </a>{" "}
            View Admin User Detail &nbsp;&nbsp;&nbsp;
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    initialValues: {},
    GetAdminUserDataResponse: state.auth.GetAdminUserDataResponse,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    GetAdminUserData: (data) => dispatch(auth.actions.GetAdminUserData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSubCategory);
