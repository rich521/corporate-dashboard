import React from "react";
import { connect } from "react-redux";
import * as mapActions from "../actions/mapActions";
import InfoTable from "../components/InfoTable";

// All stored data for map
@connect((store) => {
    return {
        fetchedGoogle: store.map.fetchedGoogle,
        fetchedLoc: store.map.fetchedLoc,
        googleScript: store.map.googleScript,
        locations: store.map.locations,
        infoMarker: store.map.infoMarker,
    };
})

export default class MapView extends React.Component {
    componentDidMount() {
        const { dispatch, fetchedGoogle, fetchedLoc, googleScript, locations } = this.props;
        const { gmap } = this.refs;
        if (!fetchedGoogle) {
            dispatch(mapActions.fetchLocations(gmap));
        }

        if (fetchedGoogle) {
            mapActions.fetchGoogleMap(googleScript, dispatch, locations, gmap);
        }
    }
    render() {
        const { infoMarker } = this.props;

        return (
            <div class="page-wrapper">
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
