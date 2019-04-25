import React from "react";

export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleAcceptFriend = async (fromUser) => {
        const url = "/api/acceptRequest/" + fromUser
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

    handleDeclineFriend = async (fromUser) => {
        const url = "/api/declineRequest/" + fromUser
        let response

        try {
            response = await fetch(url, {
                method: "post"
            });
        } catch (err) {
            this.setState({ errorMsg: "Failed to connect to server: " + err });
            return;
        }

        if (response.status !== 200) {
            console.log("Fail")
        } else {

        }
    }

    render() {

        let profile = <div>
            <h2>{this.props.user.firstName} {this.props.user.surname}</h2>
            <h3>{this.props.user.dateOfBirth} {this.props.user.location}</h3>
        </div>
        let friendRequests = <div className="friendRequestsDiv">
            {this.props.user.friendRequests.map(fr =>
                <div key={fr}>
                    <p>{fr}</p>
                    <button onClick={() => this.handleAcceptFriend(fr)}>Accept</button>
                    <button onClick={() => this.handleDeclineFriend(fr)}>Decline</button>
                </div>
            )}
        </div>

        let friends = <div className="friendsDiv">
            {this.props.user.friends.map(friend =>
                <div key={friend}>
                    <p>{friend}</p>
                </div>
            )}
        </div>
        return (
            <div className="profileDiv">
                {profile}
                <h4>Friend requests:</h4>
                {friendRequests}
                <h4>Friends:</h4>
                {friends}
            </div>
        );
    }
}


