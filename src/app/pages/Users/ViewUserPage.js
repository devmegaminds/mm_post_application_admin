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
import { OverlayTrigger, Tooltip } from "react-bootstrap";
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
        debugger

        if (nextProps.GetUserByIdResponse) {
            if (nextProps.GetUserByIdResponse && nextProps.GetUserByIdResponse != this.props.GetUserByIdResponse) {
                if (nextProps.GetUserByIdResponse.statusCode == 200) {
                    // console.log(nextProps.GetUserByIdResponse.data)
                    // this.setState({ userCoverDetails: nextProps.GetUserByIdResponse.data.userCoverDetails })
                    // this.setState({ userCoverPaymentDetails: nextProps.GetUserByIdResponse.data.userCoverPaymentDetails })
                    // this.setState({ invitedUserContactList: nextProps.GetUserByIdResponse.data.invitedUserContactList })
                    // this.setState({ invitedUserContactLists: nextProps.GetUserByIdResponse.data.invitedUserContactList })
                    // this.setState({ inviteUserLimit: nextProps.GetUserByIdResponse.data })
                    // this.setState({ isGettingdata: false })
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
        // if (nextProps.GetUserPaymentMethodsResponse) {
        //     if (nextProps.GetUserPaymentMethodsResponse && nextProps.GetUserPaymentMethodsResponse != this.props.GetUserPaymentMethodsResponse) {
        //         if (nextProps.GetUserPaymentMethodsResponse.statusCode == 200) {
        //             console.log(nextProps.GetUserPaymentMethodsResponse.data)
        //             this.setState({ userBankDetails: nextProps.GetUserPaymentMethodsResponse.data.bankList })
        //             this.setState({ userCardPaymentDetails: nextProps.GetUserPaymentMethodsResponse.data.cardsList })
        //             this.setState({ isGettingdata: false })
        //         } else {

        //         }
        //     }
        // }
    }
    componentDidMount() {
        debugger
        var id = window.location.href.split("/").pop();
        if (id != "view") {
            this.setState({ isGettingTags: true })
            var data = {
                "inUserId": Number(id),
                "stTitle": "",
                "stTags": ""
            }
            this.props.GetUserById(data)
        }
        //this.props.GetUserPaymentMethods(id)


    }
    handleView(row) {
        this.props.history.push(`/userview/${row.uiUserId}`)
    }
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
            <div className="card card-custom gutter-b">
                {this.state.alert}
                <div className="card-header">
                    <div className="card-title">
                        <h3 className="card-label">User favorites Video</h3>
                        {this.state.isGettingTags && <Spinner animation="border" variant="primary" />}
                    </div>
                </div>
                <div className="card-body">
                    {!this.state.isGettingTags && this.state.ViewUserVideos && this.state.ViewUserVideos.length > 0 &&
                        <ToolkitProvider
                            bootstrap4
                            keyField='kw_insuranceType_datatable'
                            data={this.state.ViewUserVideos}
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
                        </ToolkitProvider>} { !this.state.isGettingTags && this.state.ViewUserVideos && this.state.ViewUserVideos.length == 0 && <h6>No Data Found</h6>}
                </div>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        initialValues: {
        },
        GetUserByIdResponse: state.auth.GetUseFavoriteVideoDataResponse,
        //GetUserPaymentMethodsResponse: state.auth.GetUserPaymentMethodsResponse
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        GetUserById: (data) => dispatch(auth.actions.GetUseFavoriteVideoData(data)),
        //GetUserPaymentMethods: (data) => dispatch(auth.actions.GetUserPaymentMethods(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewUserPage);