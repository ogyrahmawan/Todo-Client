import Login from './views/login'
import Register from './views/register'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" component={Register} /> 
        </Switch>
      </div>
    </Router>
  );
}

export default App;
