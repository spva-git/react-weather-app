import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { AppWithRedux } from "./containers/App";
import store from "./store";
import "../node_modules/materialize-css/dist/css/materialize.min.css";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render(
  <Provider store={store}>
	<MuiThemeProvider>  
    <AppWithRedux />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
