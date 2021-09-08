import React, { Component } from "react";
import { Button, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "./custom.css";
import { connect } from "react-redux";
import * as auth from "./../../app/modules/Auth/_redux/authRedux";
import DatePicker from "react-datepicker";
import { useField, useFormikContext } from "formik";
import moment from 'moment';
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
            <h2>Dashboard</h2>
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
export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);