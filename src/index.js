import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from "react-redux";
import {createStore} from "redux";
import App from "./Component/App";

import reducers from './reducers';

ReactDOM.render(
  <React.StrictMode>
      <Provider store={createStore(reducers)}><App/></Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


