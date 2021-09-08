import React from "react";
import { Button, Form, InputGroup, Col, Row } from "react-bootstrap";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner'
import { Link } from "react-router-dom";


// import { useSubheader } from "../../../_metronic/layout";

export class MyPage extends React.Component {
  render() {
    return (

      <div className="card card-custom gutter-b example example-compact">
        <div className="card-header">
          <div className="card-title">
            <h3 className="card-label">User Page</h3>
          </div>
          {/* <div className="card-toolbar">
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>New Application</Tooltip>}>
              <Link className="btn btn-primary" id="kw_lnk_new_insurance_type" to="/Extra">
                New Application
              </Link>
            </OverlayTrigger>
          </div> */}
        </div>
        {/* <div className="card-body">
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" autocomplete="off" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" autocomplete="off" />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridAddress1">
              <Form.Label>Address</Form.Label>
              <Form.Text placeholder="1234 Main St" autocomplete="off" />
            </Form.Group>

            <Form.Group controlId="formGridAddress2">
              <Form.Label>Address 2</Form.Label>
              <Form.Control placeholder="Apartment, studio, or floor" />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control as="select">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control />
              </Form.Group>
            </Form.Row>
            <Form.Group id="formGridCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </div> */}
      </div>
    )
  }
};
