//This file contains code from the lecturer and has been altered to fit the needs of this assignment

import React from "react";
import { Link, withRouter } from "react-router-dom";
import { async } from "rxjs/internal/scheduler/async";

export class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      searchInput: null
    };
  }

  onSearchChange = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  doSearch = async () => {
    let url = "/api/users/"

    if (this.state.searchInput != null) {
      url += this.state.searchInput;
    }


    let response;

    try {
      response = await fetch(url, { method: "get" });
    } catch (err) {
      alert("Failed to connect to server: " + err);
      return;
    }
    const payload = await response.json();
    this.props.searchResult(payload)
  }

  doLogout = async () => {
    const url = "/api/logout";

    let response;

    try {
      response = await fetch(url, { method: "post" });
    } catch (err) {
      alert("Failed to connect to server: " + err);
      return;
    }

    this.props.updateLoggedInUser(null);
    this.props.history.push("/");
  };

  renderLoggedIn(userId) {
    return (
      <div className="msgDiv">
        <input type="text" className="searchbar" placeholder="Search" onChange={this.onSearchChange} />
        <button id="searchBtn" onClick={this.doSearch}>
          <Link to="/searchResult">
            Search
        </Link>
        </button>
        <div className="btn btnPartHeader" onClick={this.doLogout} id="logoutBtnId">
          Logout
        </div>
      </div>
    );
  }

  renderNotLoggedIn() {
    return (
      <div className="msgDiv">
        <div className="searchbar"></div>
        <div className="btnPartHeader">
          <Link className="btn" to="/login">
            LogIn
          </Link>
        </div>
      </div>
    );
  }

  render() {
    const userId = this.props.userId;

    let content;
    if (!userId) {
      content = this.renderNotLoggedIn();
    } else {
      content = this.renderLoggedIn(userId);
    }

    return (
      <div className={"headerBar"}>
        <Link className="btn home" to={"/"}>
          Home
        </Link>
        {content}
      </div>
    );
  }
}

export default withRouter(HeaderBar);
