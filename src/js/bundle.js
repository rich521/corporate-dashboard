import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";

import Layout from "./pages/Layout";
import MainView from "./pages/MainView";
import MapView from "./pages/MapView";
import MetricView from "./pages/MetricView";

import store from "./store";

const history = syncHistoryWithStore(browserHistory, store);
const app = document.getElementById("app");

ReactDOM.render(
    <Provider store={store}>
	    <Router history={history}>
			<Route path="/" component={Layout}>
				<IndexRoute component={MainView}></IndexRoute>
				<Route path="mapView" component={MapView}></Route>
				<Route path="metricView" component={MetricView}></Route>
			</Route>
		</Router>
	</Provider>, app);
