import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./FormView.css";

class FormView extends Component {
  renderQuestions = () => {
    return this.props.form.questions.map((question, index) => {
      if(question.type === "text"){
        return (<div className="form-group row" key={question.id || index}>
            <label className="col-xs-12 col-sm-4 col-lg-3 col-xl-2 col-form-label" htmlFor={question.name + index}>{question.name}</label>
            <div className="col-xs-12 col-sm-8 col-lg-9 col-xl-10">
              <input type="text" name={question.name} id={question.name + index} className="form-control" required/>
            </div>
          </div>);
      }
      if(question.type === "radio"){
        return (<div className="form-group row" key={question.id || index}>
            <label className="col-xs-12 col-sm-4 col-lg-3 col-xl-2 col-form-label">{question.name}</label>
            <div className="col-xs-12 col-sm-8 col-lg-9 col-xl-10">
              {question.options.map((option, i) => (
                <div className="form-check" key={i}>
                <input className="form-check-input" type="radio" name={question.name} value={option} id={question.name + i} defaultChecked={true}/>
                <label className="form-check-label" htmlFor={question.name + index}>
                  {option}
                </label>
              </div>
              ))}
            </div>
          </div>);
      }

      if(question.type === "checkbox"){
        return (<div className="form-group row" key={question.id || index}>
            <label className="col-xs-12 col-sm-4 col-lg-3 col-xl-2 col-form-label">{question.name}</label>
            <div className="col-xs-12 col-sm-8 col-lg-9 col-xl-10">
              {question.options.map((option, i) => (
                <div className="form-check" key={i}>
                <input className="form-check-input" type="checkbox" name={question.name} value={option} id={question.name + i} />
                <label className="form-check-label" htmlFor={question.name + index}>
                  {option}
                </label>
              </div>
              ))}
            </div>
          </div>);
      }
      return <></>;
    })
  }

  render(){
    return(<div className="container-fluid Formview-container p-4 mt-2">
      {this.props.form.name === "" && this.props.form.questions.length < 1 ? 
      <div className="text-center">
        Form name and questions will appear here
      </div> :
      <>
      <div className="row mt-2">
        <div className="col-12 text-center">
          <h2>{this.props.form.name}</h2>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-11 mx-auto">
          <form onSubmit={this.props.onSubmit} ref={this.props.formRef || null}>
            {this.renderQuestions()}
            {this.props.onSubmit &&
            <div className="text-right">
              <Button type="submit" variant="primary" disabled={this.props.loading}>Submit</Button>
            </div>}
          </form>
        </div>
      </div>
      </>
      }
    </div>);
  }
}

export default FormView;