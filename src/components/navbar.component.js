import React, { Component } from "react";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <a className="navbar-brand mx-auto" href="/">
          Github Jobs
        </a>
      </nav>
    );
  }
}
