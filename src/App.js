import { Route, Switch } from 'react-router-dom';

import './App.css';
import Dashboard from './pages/dashboard/dashboard.component';
import Login from './pages/login/login.component';
import SignUp from './pages/signup/signup.component';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route path='/signup' component={SignUp} />
        <Route path='/login' component={Login} />
      </Switch>
    </div>
  );
}

export default App;
