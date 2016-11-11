import axios from "axios";

// Fetch the issue data
export function fetchIssues() {
    return function(dispatch) {
        axios.get("./data/issues.csv")
            .then((response) => {
                response.data = csvJSON(response.data);
                dispatch({ type: "FETCH_ISSUES_FULFILLED", payload: response.data });
                dispatch({ type: "FILTER_ISSUES", payload: response.data });
            })
            .catch((err) => {
                dispatch({ type: "FETCH_ISSUES_REJECTED", payload: err });
            });
    }
}

// Convert CSV to JSON format
function csvJSON(csv) {
    const l = csv.split("\n"),
        h = l[0].split(","),
        r = [];
    for (let i = 1; i < l.length; i++) {
        let o = {},
            c = l[i].split(",");
        for (let j = 0; j < h.length; j++) {
            o[h[j]] = c[j];
        }
        r.push(o);
    }
    return r.slice(0, -1);
}

// Search bar filter on change
export function _onFilterChange(event, issues, select) {
    return function(dispatch) {
        if (!event.target.value) {
            dispatch({ type: "FILTER_ISSUES", payload: issues });
        }
        const filterBy = event.target.value.toString().toLowerCase(),
            size = issues.length,
            filteredList = [],
            str = select + "";
        for (let i = 0; i < size; i++) {
            let v = issues[i][str];
            if (v.toString().toLowerCase().indexOf(filterBy) !== -1) {
                filteredList.push(issues[i]);
            }
        }

        if (filteredList == null) return;
        dispatch({ type: "FILTER_ISSUES", payload: filteredList });
    }
}

// Select what category type to filter
export function _onSelectChange(value) {
    return {
        type: "SET_SELECT",
        payload: value
    }
}

// ASC or DESC sort
export function _sortRowsBy(issues, select, value) {
    return function(dispatch) {
        const sortBy = value,
            rows = issues,
            sortDir = (sortBy === true) ? false : true;

        if (select === ('id' || 'created_timestamp' || 'closed_timestamp')) {
            rows.sort(sort_by(select, sortBy, parseInt));
        } else {
            rows.sort(sort_by(select, sortBy, function(a) {
                return a.toUpperCase();
            }));
        }

        dispatch({ type: "FILTER_ISSUES", payload: rows });
        dispatch({ type: "SET_SORT", payload: sortDir });
    }
}

// Run the sort function
function sort_by(select, reverse, primer) {
    const key = primer ?
        function(x) {
            return primer(x[select])
        } :
        function(x) {
            return x[select]
        };

    reverse = !reverse ? 1 : -1;

    return function(a, b) {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    }
}
