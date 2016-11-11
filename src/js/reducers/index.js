import { combineReducers } from "redux";

import issues from "./issuesReducer";
import map from "./mapReducer";
import metric from "./metricReducer";
import { routerReducer } from "react-router-redux";

export default combineReducers({
    issues,
    map,
    metric,
    routing: routerReducer,
});
