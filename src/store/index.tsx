import { createStore, applyMiddleware, compose, Store } from 'redux';
import { enthusiasm } from './../store/reducers/index';
import promise from 'redux-promise-middleware';
// import persistState from 'redux-localstorage';

import thunk from 'redux-thunk';

// const auth: any = 'auth';

const createStoreWithMiddleware = compose(
  applyMiddleware(
    thunk,
    promise,
  ),
  // persistState(auth),
  // window.REDUX_DEVTOOLS_EXTENSION ? window.devToolsExtension() : (f: any) => f,
)(createStore);


export default function configureStore() : Store {
  const store = createStoreWithMiddleware(enthusiasm);
  return store;
}
