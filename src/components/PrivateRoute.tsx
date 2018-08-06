import React from 'react';
import {Route, withRouter, Redirect, RouteComponentProps} from 'react-router-dom';


export interface IProps{
  id: string
}

interface IComponentProp extends RouteComponentProps<IProps> {
  component: any;
  path?: string;
  exact?: boolean;
  strict?: boolean;
}

export interface IFState{
  token: string | null
}

// 私有路由，只有登录的用户才能访问
class PrivateRoute extends React.Component<IComponentProp, IFState>{
  constructor (props: any) {
    super(props)
    this.state = {
      token: window.localStorage.getItem("token")
    }
  }
  public render(){
    console.log(this.props)
    const { component: Component , path="/", exact=false, strict=false } = this.props;
    return this.state.token ?  (
      <Route  path={path} exact={exact}  strict={strict}  render={(props)=>( <Component {...props} /> )} />
    ) : <Redirect to={'/login'} />;
  }
}

export default withRouter(PrivateRoute);
