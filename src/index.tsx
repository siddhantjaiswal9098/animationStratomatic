import * as React from 'react';
import * as ReactDOM from 'react-dom';

// import Hello from './containers/Hello';
import { Provider } from 'react-redux';
import App from './App'
import configureStore from './store/index';
// import * as serviceWorker from './registerServiceWorker';

import './index.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

// serviceWorker.unregister();
