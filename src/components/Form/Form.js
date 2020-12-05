import React, { Component } from "react";
import { connect } from "react-redux";
import "./Form.css";
import getForm from "../../actions/getForm";
import { CircularProgress } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import 'react-toastify/dist/ReactToastify.css';
import FormView from "../FormView";
import postSurvey from "../../actions/postSurvey"

class Form extends Component {
  constructor(props){
    super(props);
    this.state = {showSuccess:false};
    this.formRef = React.createRef();
  }

  componentDidMount(){
    const urlParts = this.props.history.location.pathname.split("/");
    this.formId = urlParts[urlParts.length - 1];
    this.props.getForm(this.formId);
  }

  onSubmit = e => {
    e.preventDefault();
    var formData = {};
    this.props.form.questions.forEach(question => {
      if(question.type === "checkbox"){
        var selectedOptions = []; 
        e.target[question.name].forEach(option => {
          if(option.checked){
            selectedOptions.push(option.value);
          }
        });
        formData[question.name] = selectedOptions;
        return;
      }
      formData[question.name] = e.target[question.name].value;
    });

    this.props.postSurvey({formData, formId:this.formId});
    this.setState({showSuccess:true});
  }

  componentDidUpdate(){
    if(this.props.postedSurvey && this.state.showSuccess){
      toast.success(<div className="text-center"><CheckCircleOutlineIcon/> {this.props.postedSurvey.message}</div>, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        this.formRef.current.reset();
        this.setState({showSuccess:false});
    }
  }

  render(){
    if(!this.props.form){
      return (
      <div className="loader-container">
        <div className="loader-div">
          <CircularProgress color="inherit" />
          <h4 className="mt-3">Fetching Form...</h4>
        </div>
      </div>);
    }
    return(<div className="container-fluid">
      <ToastContainer/>
      <FormView form={this.props.form} onSubmit={this.onSubmit} loading={this.props.loading} formRef={this.formRef} />
    </div>);
  }
}

const mapStateToProps = ({FormReducer}) => {
  return {
    form: FormReducer.receivedForm,
    postedSurvey: FormReducer.postedSurvey,
    loading: FormReducer.loading,
    error: FormReducer.error
  };
};
const mapDispatchToProps = {
  getForm, postSurvey
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);