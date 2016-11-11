import React from "react";
import { LinkContainer, IndexLinkContainer } from "react-router-bootstrap";
import { Nav, NavItem, Navbar, MenuItem } from "react-bootstrap";

export default class TopNav extends React.Component {
    navigate() {
        this.props.router.push("/");
    }
    render() {
        return (
            <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <IndexLinkContainer to="/"><Navbar.Brand>Corporate Dashboard</Navbar.Brand></IndexLinkContainer>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <IndexLinkContainer to="/"><NavItem><i class="fa fa-fw fa-dashboard"></i> Main Dashboard</NavItem></IndexLinkContainer>
                <LinkContainer to="mapView"><NavItem><i class="fa fa-fw fa-map-marker"></i> Map View</NavItem></LinkContainer>
                <LinkContainer to="metricView"><NavItem><i class="fa fa-fw fa-bar-chart-o"></i> Metric View</NavItem></LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        );
    }
}
