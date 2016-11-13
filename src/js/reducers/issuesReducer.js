export default function reducer(state = {
    issues: [],
    fetching: false,
    fetched: false,
    error: null,
    selectValue: "id",
    sortValue: true,
}, action) {

    switch (action.type) {
        case "FETCH_ISSUES":
            {
                return {
                    ...state,
                    fetching: true
                }
            }
        case "FETCH_ISSUES_REJECTED":
            {
                return {
                    ...state,
                    fetching: false,
                    error: action.payload
                }
            }
        case "FETCH_ISSUES_FULFILLED":
            {
                return {
                    ...state,
                    fetching: false,
                    fetched: true,
                    issues: action.payload,
                }
            }
        case "FILTER_ISSUES":
            {
                return {
                    ...state,
                    filteredIssues: action.payload,
                }
            }
        case "SET_SELECT":
            {
                return {
                    ...state,
                    selectValue: action.payload,
                }
            }
        case "SET_SORT":
            {
                return {
                    ...state,
                    sortValue: action.payload,
                }
            }
    }

    return state;
}
