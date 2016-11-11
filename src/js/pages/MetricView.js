import React from "react";
import { connect } from "react-redux";
import * as metricActions from "../actions/metricActions";


@connect((store) => {
    return {
        fetchedMetric: store.metric.metrics,
    };
})

export default class MetricView extends React.Component {
    componentDidMount() {
        const { dispatch, fetchedMetric } = this.props;
        dispatch(metricActions.fetchMetrics());
    }

    render() {
        const { pieChart, barChart, lineChart } = this.refs;
        const { fetchedMetric } = this.props;
        // If charts are rendered, then update charts with new data
        if (pieChart && barChart && lineChart) {
            metricActions.updateCharts(fetchedMetric, pieChart, barChart, lineChart);
        }
        return (
            <div class="page-wrapper">
			    <div class="container-fluid">
			        <div class="row">
			            <div class="col-lg-12">
			                <h3 class="page-header">Metric View</h3>
			            </div>
			        </div>
			       	<div class="row">
			            <div class="col-lg-12 .col-xs-12">
			                <div class="table-responsive">
			                    <div class="form-group canvas">
			                    	<h4>Open Issues vs Closed Issues</h4>
			                    	<canvas ref="pieChart" width="400" height="400"></canvas>
                                </div>
                                <div class="form-group canvas">
			                    	<h4>Reported Issues over Time</h4>
			                    	<canvas ref="barChart" width="400" height="400"></canvas>
                                </div>
                                <div class="form-group canvas">
			                    	<h4>Paying Customers over Time</h4>
			                    	<canvas ref="lineChart" width="400" height="400"></canvas>
                                </div>
			                </div>
			            </div>
			        </div>
			    </div>
			</div>
        );
    }
}
