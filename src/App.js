import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import FormList from "./components/FormList";
import CreateForm from "./components/CreateForm";
import Form from "./components/Form";

function App() {
  return (
    <Router>
				<Switch>
					<Route exact path="/" component={FormList} />
          <Route exact path="/create" component={CreateForm}/>
          <Route exact path="/form/:id" component={Form}/>
				</Switch>
			</Router>
  );
}

export default App;
