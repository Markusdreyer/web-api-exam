import React from "react";
import { Link, withRouter } from 'react-router-dom'

export class SearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonText: "Send friend request"
        };
    }

    componentDidMount() {
        if (this.props.user) {
            this.props.fetchAndUpdateUserInfo();
        }
    }

    handleFriendRequest = async (toUser) => {
        event.target.innerHTML = "Cancel request" //TODO: Revisit
        const url = "/api/friendRequest/" + toUser
        let response

        try {
            response = await fetch(url, {
                method: "post"
            });
        } catch (err) {
            this.setState({ errorMsg: "Failed to connect to server: " + err });
            return;
        }

        if (response.status !== 201) {
            console.log("Fail")
        } else {

        }
    }

    renderLoggedIn(userId) {
        return (
            <div className="msgDiv">
                <input type="text" className="searchbar" placeholder="Search" onChange={this.onSearchChange} />
                <button className="searchBtn" onClick={this.doSearch}>
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

    render() {
        let result = <div></div>
        result = <div>
            {this.props.users.map(user =>
                <div className={"searchResult"}>
                    <Link to={{ pathname: "/profile", state: { profile: user, user: this.props.user } }}>
                        <p className="searchProfile" key={user.id}>{user.firstName} {user.surname}</p>
                    </Link>
                    <div>
                        <button onClick={() => this.handleFriendRequest(user.id)}>Send friend request</button>
                    </div>
                </div>
            )}
        </div>

        return (
            <div>
                <p>Click on name to view profile</p>
                {result}
            </div>
        );
    }
}

export default withRouter(SearchResult);