import React from 'react';
import ReactDOM from 'react-dom';
import Page from './Page';
import registerServiceWorker from './registerServiceWorker';
import store from './redux/store'
import { Provider } from 'react-redux';
import './style/index.scss'

export default class Root extends React.Component{
  public render () {
    return (
      <Provider store={store}>
        <Page />
      </Provider>
    )
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
