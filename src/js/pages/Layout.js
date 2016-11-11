import React from "react";
import { IndexLink, Link } from "react-router";
import TopNav from "../components/Nav";
import Footer from "../components/Footer";

export default class Layout extends React.Component {
    render() {
        return (
            <div class="wrapper">
                <TopNav />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}
