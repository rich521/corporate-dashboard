export default function reducer(state = {
    fetching: false,
    fetchedMetric: false,
    errorMetric: null,
    metrics: null,
}, action) {

    switch (action.type) {
        case "FETCH_METRIC":
            {
                return {
                    ...state,
                    fetching: true,
                }
            }
        case "FETCH_METRIC_REJECTED":
            {
                return {
                    ...state,
                    fetchedMetric: false,
                    fetching: false,
                    errorMetric: action.payload
                }
            }
        case "FETCH_METRIC_FULFILLED":
            {
                return {
                    ...state,
                    fetchedMetric: true,
                    fetching: false,
                    metrics: action.payload,
                }
            }
    }

    return state;
}
