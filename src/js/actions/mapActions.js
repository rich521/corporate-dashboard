import axios from "axios";

let map,
    markers = [];
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
        map = new google.maps.Map(refMap, {
            zoom: 4,
            center: { lat: 41.878114, lng: -87.62979 },
        });
        fetchGoogleMap(google, dispatch, data);
    }
    document.getElementsByTagName('head')[0].appendChild(script);


}

export function fetchGoogleMap(google, dispatch, locations, id, infoMarker) {
    if (infoMarker) {
        let loc,
            locPos;
        if (locations.length < infoMarker.id) {
            loc = locations[0];
            locPos = loc.position;
        } else {
            loc = locations[infoMarker.id];
            locPos = loc.position;
        }
        map.setCenter({ lat: locPos.lat, lng: locPos.lng })
        dispatch({
            type: "CHANGE_INFO_MARKER",
            payload: {
                id: infoMarker.id,
                company_name: loc.company_name,
                employees: loc.employees,
                position: locPos,
                city: loc.city,
            }
        });
    }

    if (!locations) return;
    const locIndex = locations.length,
        markerIndex = markers.length;

    if (markerIndex) {
        for (var i = markerIndex - 1; i >= 0; i--) {
            markers[i].setMap(null);
        }
    }
    markers = [];
    for (let i = locIndex - 1; i >= 0; i--) {
        const newLoc = locations[i];
        const marker = new google.maps.Marker({
            position: newLoc.position,
            map: map,
            title: newLoc.city,
            animation: google.maps.Animation.DROP
        });
        // Initial marker to show selected
        if (infoMarker)
            if (i === infoMarker.id) animateMarker(google, marker);
        if (i === 6 && !infoMarker) animateMarker(google, marker);

        marker.addListener("click", () => {
            let id = i;
            if (marker.getAnimation() === null) {
                marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(() => {
                    marker.setAnimation(null);
                }, 1400);
            }
            dispatch({
                type: "CHANGE_INFO_MARKER",
                payload: {
                    id: id,
                    company_name: newLoc.company_name,
                    employees: newLoc.employees,
                    position: newLoc.position,
                    city: newLoc.city,
                }
            });
        });
        markers.push(marker);
    }
}

function animateMarker(google, marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(() => {
        marker.setAnimation(null);
    }, 3000);
}
