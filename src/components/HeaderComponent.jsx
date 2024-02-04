import React, { Component } from "react";

class HeaderComponent extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div>
            <a
              href="https://www.google.com"
              className="navbar-brand text-center"
            >
              Premier League Application
            </a>
          </div>
        </nav>
      </div>
    );
  }
}

export default HeaderComponent;
