import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Animation from './containers/animation';
import { Provider } from 'react-redux';
import App from './App'
import TopView from './containers/topview';
import Projection from './containers/projection';
import configureStore from './store/index';
// import * as serviceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './index.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/topview" component={TopView} />
          <Route exact path="/animation" component={Animation} />
          <Route exact path="/projection" component={Projection} />
        </Switch>
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);

// serviceWorker.unregister();
