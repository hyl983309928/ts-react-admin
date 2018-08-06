import React, { Component } from 'react'
import { Route, Switch, Redirect} from 'react-router-dom'
import * as pages from '../view/index'
import router from './config'

interface IRouterItem{
  path: string;
  component?: string;
  children: any;
}

export default class MenuRouter extends Component{
  public render () {
    return (
      <Switch>
          {
            router.menus.map((menuItem: IRouterItem) => {
              const route = (r: any) => {
                const ComponentItem = pages[r.component]
                return (
                  <Route path={r.path} component={ComponentItem} key={r.path} />
                )
              }
              return menuItem.component ? route(menuItem) : menuItem.children.map((r: IRouterItem) => route(r))
            })
          }

        <Route render={() => <Redirect to="/app/user/store" />} />
        {/*<Route path="/app/user" component={pages['Store']} />*/}
      </Switch>
    )
  }
}