import React, { Component } from "react";
import { connect } from "react-redux";
import "./FormList.css";
import getAllForms from "../../actions/getAllForms";
import { Table, Button } from "react-bootstrap";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

class FormList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
    this.props.getAllForms();
  }

  renderForms(){
    return this.props.forms.map((form, index) => (
      <tr key={form.id}>
        <td>{index+1}</td>
        <td>{form.name}</td>
        <td><a href={form.url} className="Formlist-form-link" target="_blank" rel="noreferrer">{form.url}</a></td>
        <td>{form.createdAt}</td>
        <td>{form.responses}</td>
      </tr>
    ));
  }

  render(){
    if(!this.props.forms){
      return (
      <div className="loader-container">
        <div className="loader-div">
          <CircularProgress color="inherit" />
          <h4 className="mt-3">Fetching Forms...</h4>
        </div>
      </div>);
    }
    return(<div className="container-fluid">
      <div className="row mt-4">
        <div className="col-11 mx-auto">
        <h1 className="text-center">All Forms</h1>
        <div className="text-right"><Link to="/create"><Button variant="primary" className="ml-2">+ Create Form</Button></Link></div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-11 mx-auto">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Form URL</th>
              <th>Created At</th>
              <th>Responses</th>
            </tr>
          </thead>
          <tbody>
            {this.renderForms()}
          </tbody>
        </Table>
        </div>
      </div>
    </div>);
  }
}

const mapStateToProps = ({FormReducer}) => {
  return {
    forms: FormReducer.forms,
    loading: FormReducer.loading,
    error: FormReducer.error
  };
};
const mapDispatchToProps = {
  getAllForms
};

export default connect(mapStateToProps, mapDispatchToProps)(FormList);