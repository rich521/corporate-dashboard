export default function reducer(state = {
    fetchedMetric: false,
    errorMetric: null,
    metrics: null,
}, action) {

    switch (action.type) {
        case "FETCH_METRIC_REJECTED":
            {
                return {
                    ...state,
                    fetchedMetric: false,
                    errorMetric: action.payload
                }
            }
        case "FETCH_METRIC_FULFILLED":
            {
                return {
                    ...state,
                    fetchedMetric: true,
                    metrics: action.payload,
                }
            }
    }

    return state;
}
