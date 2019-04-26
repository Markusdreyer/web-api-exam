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
        event.target.innerHTML = "Cancel request"
        const url = "/api/request/" + toUser
        let response
        let payload = { id: this.props.user.id }

        try {
            response = await fetch(url, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
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

    render() {
        let result = <div></div>
        result = <div>
            {this.props.users.map(user =>
                <div key={user.id} className={"searchResult"}>
                    <Link to={{ pathname: "/profile", state: { profile: user, user: this.props.user } }}>
                        <p className="searchProfile">{user.firstName} {user.surname}</p>
                    </Link>
                    <div>
                        <button id="friendRequestBtn" onClick={() => this.handleFriendRequest(user.id)}>Send friend request</button>
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