import React, { Component } from "react";
import "./CreateForm.css";
import { connect } from "react-redux";
import {Modal, Button, Form, Spinner, Row} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import postForm from "../../actions/postForm";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import FormView from "../FormView";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { Link } from "react-router-dom";

class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.initQuestion = {
      questionName:"",
      answerType:"text",
      optionsString:""
    };

    this.state = {
      formName:"",
      showAddQuestion:false,
      question: this.initQuestion,
      formQuestions:[],
      showSubmitDialogue:false
    };
  }

  toggleAddQuestionModal = () => {
    this.setState(state => ({showAddQuestion:!state.showAddQuestion}));
  }

  handleQuestionChange = e => {
    this.setState({question:{...this.state.question, [e.target.name]:e.target.value}});
  }

  addQuestion = event => {
    event.preventDefault();
    const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.stopPropagation();
        return this.setState({validated:true});
      }
      else{
        const {questionName, answerType, optionsString} = this.state.question;
        var options = optionsString.trim() !== "" ? optionsString.split('\n') : [];
        const question = {
          name:questionName,
          type:answerType,
          options
        }
        this.setState(state => ({formQuestions:[...state.formQuestions, question]}));
        this.toggleAddQuestionModal();
        this.setState({question:this.initQuestion, validated:false});
      }
  }

  cancelQuestion = e => {
    this.toggleAddQuestionModal();
    this.setState({question:this.initQuestion, validated:false});
  }

  saveForm = () => {
    var error = null;
    if(this.state.formName.trim() === ""){
      error = "Form name is required!"
    }
    else if(this.state.formQuestions.length < 1){
      error = "Please add at least 1 question!"
    }

    if(error !== null){
      toast.error(<div className="text-center"><ErrorOutlineIcon className="mr-2" color="inherit" />{error}</div>, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      return;
  }

    const form = {name:this.state.formName, questions:this.state.formQuestions};
    this.props.postForm(form);
    this.setState({showSubmitDialogue:true, formQuestions:[], formName:""});
  }

  static getderive

  render(){
    return(<div className="container-fluid">
      <ToastContainer/>
      <div className="row mt-3">
        <div className="col-11 mx-auto d-flex flex-row">
            <div className="align-self-start">
              <Link to="/"><Button variant="outline-info"><ArrowBackIcon/> Forms</Button></Link>
            </div>
            <div className="flex-grow-1">
              <h2 className="text-center mx-auto">Create Form</h2>
            </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-11 mx-auto">
          <div className="form-group row">
            <div className="col-7 col-lg-8 col-xl-9">
              <input type="text" value={this.state.formName} onChange={e => this.setState({formName:e.target.value})} name="formName" className="form-control" placeholder="Enter Form Name"/>
            </div>
            <div className="col-5 col-lg-4 col-xl-3 text-center">
              <Button onClick={this.toggleAddQuestionModal} variant="outline-primary" disabled={this.props.loading}>+ Add Question</Button>
              <Button onClick={this.saveForm} variant="primary" className="ml-2" disabled={this.props.loading}>
                Save
                {this.props.loading && <Spinner className="ml-1" as="span" size="sm" animation="border" role="status" aria-hidden="true"/>}
              </Button>

              {this.props.postedForm && this.state.showSubmitDialogue && 
              <Modal show={true} size="lg">
                <Modal.Header>
                  <Modal.Title id="contained-modal-title-vcenter">
                  Form Submitted
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Alert severity="success" className="my-3"><span>Form has been saved successfully!</span></Alert>
                <Form.Group className="mx-2 mt-4 mb-3" as={Row} controlId="formPlaintextEmail">
                    <Form.Label column sm="3" className="my-auto">Form URL:</Form.Label>
                      <div className="col-8 my-auto">
                        {/* <Form.Control type="text" placeholder={this.props.postedForm.url} readOnly /> */}
                          <a href={this.props.postedForm.url} target="_blank" rel="noreferrer">{this.props.postedForm.url}</a>
                      </div>
                    <div className="col-1 my-auto mx-0 p-0 text-center">
                    <IconButton style={{outline: 'none !important'}} className="mr-2" aria-haspopup="false" onClick={() => navigator.clipboard.writeText(this.props.postedForm.url)}><FileCopyIcon /></IconButton>
                    </div>
                </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={() => this.setState({showSubmitDialogue:false})}>Close</Button>
                </Modal.Footer>
              </Modal>}



              <Modal size="lg" show={this.state.showAddQuestion} onHide={this.toggleAddQuestionModal} centered>
                  <Modal.Header closeButton>
                  <Modal.Title>Add Question</Modal.Title>
                  </Modal.Header>
                  {/* <form noValidate onSubmit={this.addQuestion}> */}
                  <Form noValidate validated={this.state.validated} onSubmit={this.addQuestion}>
                  <Modal.Body>
                  <div className="form-group row">
                    <label htmlFor="questionName" className="col-4 col-form-label">Question Name:</label>
                    <div className="col-8">
                      <input type="text" name="questionName" value={this.state.question.questionName} onChange={this.handleQuestionChange} className="form-control" id="questionName" placeholder="Enter Question Name" required/>
                      <div className="invalid-feedback">*Question name is required</div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="answerType" className="col-4 col-form-label">Answer Type:</label>
                    <div className="col-8">
                      <select value={this.state.question.answerType} id="answerType" name="answerType" className="form-control" onChange={this.handleQuestionChange}>
                        <option value="text">Text</option>
                        <option value="checkbox">Multichoice Checkbox</option>
                        <option value="radio">Single Select Radio</option>
                      </select>
                    </div>
                  </div>
                  {(this.state.question.answerType === "checkbox" || this.state.question.answerType === "radio") &&
                  <div className="form-group row">
                  <label htmlFor="optionsString" className="col-4 col-form-label">Enter Options:</label>
                  <div className="col-8">
                  <textarea className="form-control" value={this.state.optionsString} onChange={this.handleQuestionChange} name="optionsString" id="optionsString" rows="3"></textarea>
                  <span className="text-info">*Insert options by seperating in new line</span>
                  </div>
                </div>}
                    
                  </Modal.Body>
                  <Modal.Footer>
                  <Button variant="primary" type="submit">Add</Button>
                  <Button variant="outline-secondary" onClick={this.cancelQuestion}>Cancel</Button>
                  </Modal.Footer>
                  {/* </form> */}
                  </Form>
              </Modal>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-11 mx-auto">
        <FormView form={{name:this.state.formName, questions:this.state.formQuestions}} />
        </div>
      </div>
    </div>);
  }
}

const mapStateToProps = ({FormReducer}) => {
  return {
    postedForm: FormReducer.postedForm,
    loading: FormReducer.loading,
    error: FormReducer.error
  };
};
const mapDispatchToProps = {
  postForm
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateForm);