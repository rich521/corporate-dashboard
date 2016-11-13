import React from "react";
import { connect } from "react-redux";
import * as mapActions from "../actions/mapActions";
import { equals } from "../actions/arrayActions";
import InfoTable from "../components/InfoTable";

// All stored data for map
@connect((store) => {
    return {
        fetchedGoogle: store.map.fetchedGoogle,
        fetching: store.map.fetching,
        fetchedLoc: store.map.fetchedLoc,
        googleScript: store.map.googleScript,
        locations: store.map.locations,
        infoMarker: store.map.infoMarker,
    };
})

export default class MapView extends React.Component {
    // Only change markers if there is a change in data
    componentWillReceiveProps(nextProps) {
        const { dispatch, googleScript, locations } = this.props;
        if (!locations || !googleScript) return;
        if (!equals(locations, nextProps.locations)) mapActions.fetchGoogleMap(googleScript, dispatch, locations, this.refs.gmap);
    }

    // Fetch data every 5 seconds
    startPoll() {
        this.timeout = setTimeout(() => {
            const { dispatch, googleScript, fetching } = this.props;
            if (!googleScript) return;
            if (!fetching) dispatch(mapActions.fetchLocations(this.refs.gmap, false));
            this.startPoll();
        }, 5000);
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    componentDidMount() {
        const { dispatch, fetchedGoogle, fetchedLoc, googleScript, locations } = this.props;
        const { gmap } = this.refs;
        if (!fetchedGoogle) dispatch(mapActions.fetchLocations(gmap, true));
        if (fetchedGoogle) mapActions.fetchGoogleMap(googleScript, dispatch, locations, gmap);
        this.startPoll();
    }

    render() {
        const { infoMarker } = this.props;
        return (
            <div class="page-wrapper" ref="mapView">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-12">
                            <h3 class="page-header">Map View</h3>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12 .col-xs-12">
                            <div class="table-responsive">
                                 <h4>Company names & employees</h4>
                                <div class="map" ref="gmap"></div>
                                <InfoTable infoMarker={infoMarker}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
