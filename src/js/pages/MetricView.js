import React from "react";
import { connect } from "react-redux";
import * as metricActions from "../actions/metricActions";
import { equals } from "../actions/arrayActions";

@connect((store) => {
    return {
        fetching: store.metric.fetching,
        fetchedMetric: store.metric.metrics,
    };
})

export default class MetricView extends React.Component {
    // Only change markers if there is a change in data
    componentWillReceiveProps(nextProps) {
        const { dispatch, fetchedMetric, oneFetch } = this.props;
        const { pieChart, barChart, lineChart } = this.refs;
        // If charts are rendered, then update charts with new data
        if (!equals(fetchedMetric, nextProps.fetchedMetric)) metricActions.updateCharts(fetchedMetric, pieChart, barChart, lineChart);
    }

    // Fetch data every 5 seconds
    startPoll() {
        this.timeout = setTimeout(() => {
            const { dispatch, fetching } = this.props;
            if (!fetching) dispatch(metricActions.fetchMetrics(false));
            this.startPoll();
        }, 5000);
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    componentDidMount() {
        const { pieChart, barChart, lineChart } = this.refs;
        const { dispatch, oneFetch } = this.props;
        dispatch(metricActions.fetchMetrics(true, pieChart, barChart, lineChart));
        this.startPoll();
    }

    render() {
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
