import React, { Component } from "react";
import "../custom.css";
import { connect } from "react-redux";
class DashboardPage extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className="card card-custom gutter-b example example-compact">
        <div className="card-body">
          <div className="row">
            <h2>Hello</h2>
          </div>
        </div>
      </div >
    )
  }
}

function mapStateToProps(state) {
  return {
    initialValues: {

    },
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
  }
}
export default (DashboardPage);