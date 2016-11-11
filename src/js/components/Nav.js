import React from "react";
import { LinkContainer, IndexLinkContainer } from "react-router-bootstrap";
import { Nav, NavItem, Navbar } from "react-bootstrap";

export default class TopNav extends React.Component {
    render() {
        var title = "Corporate Dashboard";
        switch (this.props.titleName) {
            case "/":
                title = "Corporate Dashboard";
                break;
            case "mapView":
            case "/mapView":
                title = "Corporate Map View";
                break;
            case "metricView":
            case "/metricView":
                title = "Corporate Metric View";
                break;
        }

        return (
            // Navbar --> header for title & menu items for navigation
            <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>{ title }</Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <IndexLinkContainer to="/"><NavItem><i class="glyphicon glyphicon-dashboard"></i> Main Dashboard</NavItem></IndexLinkContainer>
                <LinkContainer to="mapView"><NavItem><i class="glyphicon glyphicon-map-marker"></i> Map View</NavItem></LinkContainer>
                <LinkContainer to="metricView"><NavItem><i class="glyphicon glyphicon-stats"></i> Metric View</NavItem></LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        );
    }
}
