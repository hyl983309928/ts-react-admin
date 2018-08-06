import * as React from 'react';
import App from './view/App'
import Login from "./view/user/Login";
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'

class Page extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/login" component={Login} />
            <Route exact={true} path="/" render={() => <Redirect to="/app" push={true} /> } />
            <PrivateRoute path="/app" component={App} />
            <Redirect to={'/'} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Page;
