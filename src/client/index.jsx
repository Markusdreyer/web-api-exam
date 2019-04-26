//This file contains code from the lecturer and has been altered to fit the needs of this assignment

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from 'react-router-dom';


import { Home } from "./home";
import FriendProfile from "./friendProfile"
import SearchResult from "./searchResult"
import Login from "./login";
import SignUp from "./signup"
import HeaderBar from "./headerbar";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            users: []
        };
    }

    componentDidMount() {
        this.fetchAndUpdateUserInfo();
    }

    fetchAndUpdateUserInfo = async () => {

        const url = "/api/user";

        let response;

        try {
            response = await fetch(url, {
                method: "get"
            });
        } catch (err) {
            this.setState({ errorMsg: "Failed to connect to server: " + err });
            return;
        }

        if (response.status === 401) {
            this.updateLoggedInUser(null);
            return;
        }

        if (response.status !== 200) {
            const payload = await response.json();
            this.updateLoggedInUser(payload);
        }
    };

    updateLoggedInUser = (user) => {
        this.setState({ user: user });
    };

    setResult = (users) => {
        this.setState({
            users: users
        });
    }

    setCurrentProfile = (profile) => {
        this.setState({
            profile: profile
        });
    }


    notFound() {
        return (
            <div>
                <h2>NOT FOUND: 404</h2>
                <p>
                    ERROR: the page you requested is not available.
                </p>
            </div>
        );
    };


    render() {
        const id = this.state.user ? this.state.user.id : null;

        return (
            <BrowserRouter>
                <div>
                    <HeaderBar userId={id}
                        updateLoggedInUser={this.updateLoggedInUser} searchResult={this.setResult} />
                    <Switch>
                        <Route exact path="/profile"
                            user={this.state.user}
                            render={props => <FriendProfile {...props} />} />
                        <Route exact path="/login"
                            render={props => <Login {...props}
                                fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo} />} />
                        <Route exact path="/signup"
                            render={props => <SignUp {...props}
                                fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo} />} />
                        <Route exact path="/searchResult"
                            render={props => <SearchResult {...props}
                                user={this.state.user}
                                users={this.state.users}
                                fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo} />} />
                        <Route exact path="/"
                            render={props => <Home {...props}
                                user={this.state.user}
                                fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo} />} />
                        <Route component={this.notFound} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
