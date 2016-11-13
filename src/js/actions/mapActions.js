import axios from "axios";

export function fetchLocations(refMap, check) {
    return function(dispatch) {
        dispatch({ type: "FETCH_LOC" });
        axios.get("./data/location.json")
            .then((response) => {
                // First aquire location data
                dispatch({ type: "FETCH_LOC_FULFILLED", payload: response.data });
                return response.data;
            }).then((data) => {
                // Next acquire google map
                if (check) fetchGoogleScript(refMap, dispatch, data);
            })
            .catch((err) => {
                // Catch any error
                dispatch({ type: "FETCH_LOC_REJECTED", payload: err });
            });
    }
}

function fetchGoogleScript(refMap, dispatch, data) {
    const script = document.createElement('script'),
        api = "AIzaSyCq0E_YjDqMAaFaaLZ67OEIAvadmWaPKa8";

    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=' + api);
    script.onerror = (error) => {
        dispatch({ type: "FETCH_GOOGLE_REJECTED", payload: error });
        throw new URIError("The script " + error.target.src + " is not accessible.");
    };
    script.onload = function googleScript() {
        // Load markers and data onto google map
        dispatch({ type: "FETCH_GOOGLE_FULFILLED", payload: google });
        fetchGoogleMap(google, dispatch, data, refMap);
    }
    document.getElementsByTagName('head')[0].appendChild(script);
}

export function fetchGoogleMap(google, dispatch, locations, id) {
    const initLocation = { lat: 41.878114, lng: -87.62979 };
    var map = new google.maps.Map(id, {
        zoom: 4,
        center: initLocation
    });

    if (!locations) return;

    const locIndex = locations.length;
    for (var i = locIndex - 1; i >= 0; i--) {
        const newLoc = locations[i];
        const marker = new google.maps.Marker({
            position: newLoc.position,
            map: map,
            title: newLoc.city,
            animation: google.maps.Animation.DROP
        });
        // Initial marker to show selected
        if (i === 6) {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(() => {
                marker.setAnimation(null);
            }, 3000);
        }
        marker.addListener("click", () => {
            if (marker.getAnimation() === null) {
                marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(() => {
                    marker.setAnimation(null);
                }, 3000);
            }
            dispatch({
                type: "CHANGE_INFO_MARKER",
                payload: {
                    company_name: newLoc.company_name,
                    employees: newLoc.employees,
                    position: newLoc.position,
                    city: newLoc.city,
                }
            });
        });
    }
}
