import React from "react";
import { connect } from "react-redux";
import TableIssues from "../components/TableIssues";
import * as issuesActions from "../actions/issuesActions";
import { equals } from "../actions/arrayActions";

// Main data store for handling and processing
@connect((store) => {
    return {
        issues: store.issues.issues,
        fetching: store.issues.fetching,
        filteredIssues: store.issues.filteredIssues,
        selectValue: store.issues.selectValue,
        sortValue: store.issues.sortValue,
    };
})

export default class MainView extends React.Component {
    componentWillReceiveProps(nextProps) {
        const { issues, dispatch, selectValue } = this.props;
        let filtIssues = nextProps.issues;
        if (equals(issues, filtIssues)) dispatch(issuesActions._onFilterChange(false, filtIssues, selectValue));
    }

    startPoll() {
        const { dispatch, fetching } = this.props;
        this.timeout = setTimeout(() => {
            if (!fetching) dispatch(issuesActions.fetchIssues());
            this.startPoll();
        }, 2500);
    }

    // Clear timeouts when changing page
    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    // After rendering, dispatch and fetch issues from database
    componentDidMount() {
        const { dispatch, filteredIssues } = this.props;
        // only run once if the filtedissues are not defined
        let check = false;
        if (!filteredIssues) check = true;
        dispatch(issuesActions.fetchIssues(check));
        this.startPoll();
    }

    // Run the on filter change function
    _onFilterChange(event) {
            const { dispatch, issues, selectValue } = this.props;
            dispatch(issuesActions._onFilterChange(event, issues, selectValue));
        }
        // Run the select function for dispatching
    _onSelectChange(event) {
            this.props.dispatch(issuesActions._onSelectChange(event.target.value));
        }
        // Run the sort function
    _sortRowsBy() {
        const { dispatch, filteredIssues, selectValue, sortValue } = this.props;
        dispatch(issuesActions._sortRowsBy(filteredIssues, selectValue, sortValue));
    }

    render() {
        const { filteredIssues, selectValue, sortValue } = this.props;
        // If filtered Issues have not been loaded, render ajax gif first
        if (filteredIssues == null) {
            // Load ajax gif
            return <h1>Loading Issues</h1>
        }
        // Render the main dashboard after data has been loaded
        return (
            <div class="page-wrapper" ref="mainView">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-12">
                            <h3 class="page-header">
                                Main Dashboard Table
                            </h3>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12 .col-xs-12">
                            <h4>All Issues</h4>
                            <div class="table-responsive">
                                <div class="form-group">
                                    <label>Select category</label>
                                    <select class="form-control" onChange={this._onSelectChange.bind(this)}>
                                        <option value="id">id</option>
                                        <option value="customer_name">Customer Name</option>
                                        <option value="customer_email">Customer Email</option>
                                        <option value="created_timestamp">Created_On</option>
                                        <option value="closed_timestamp">Closed_On</option>
                                        <option value="status">Status</option>
                                        <option value="employee_name">Employee Name</option>
                                        <option value="description">Description</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Searching for '{selectValue}'</label>
                                    <input class="form-control" placeholder="Search" onChange={this._onFilterChange.bind(this)}/>
                                </div>
                                <div class="form-group">
                                    <button class="btn btn-primary" onClick={this._sortRowsBy.bind(this)}>Sort by: {selectValue} {(sortValue === true) ? '▲' : '▼'}</button>
                                </div>
                                <TableIssues filteredIssues={filteredIssues}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
