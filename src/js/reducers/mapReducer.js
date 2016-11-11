export default function reducer(state = {
    locations: null,
    googleScript: null,
    fetchedGoogle: false,
    fetchedLoc: false,
    errorLoc: null,
    infoMarker: {
        "company_name": "Thoughtstorm",
        "employees": 9,
        "city": "Chicago",
        "position": {
            "lat": 41.878114,
            "lng": -87.629798
        }
    },
}, action) {

    switch (action.type) {
        case "FETCH_LOC_REJECTED":
            {
                return {
                    ...state,
                    fetchedLoc: false,
                    errorLoc: action.payload
                }
            }
        case "FETCH_LOC_FULFILLED":
            {
                return {
                    ...state,
                    fetchedLoc: true,
                    locations: action.payload,
                }
            }
        case "FETCH_GOOGLE_REJECTED":
            {
                return {
                    ...state,
                    fetchedGoogle: false,
                }
            }
        case "FETCH_GOOGLE_FULFILLED":
            {
                return {
                    ...state,
                    fetchedGoogle: true,
                    googleScript: action.payload,
                }
            }
        case "CHANGE_INFO_MARKER":
            {
                return {
                    ...state,
                    infoMarker: action.payload,
                }
            }
    }

    return state;
}
