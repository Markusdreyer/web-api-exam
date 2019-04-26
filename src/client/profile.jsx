import React from "react";
import { isNullOrUndefined } from "util";

export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user
        };
    }

    handleAcceptFriend = async (fromUser) => {
        const url = "/api/accept/" + fromUser
        let response
        let payload = { id: this.props.user.id }

        try {
            response = await fetch(url, {
                method: "put",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            this.setState({ errorMsg: "Failed to connect to server: " + err });
            return;
        }

        if (response.status !== 200) {
            console.log("Fail")
        } else {
            await this.props.fetchAndUpdateUserInfo();
            this.setState({
                user: this.props.user
            })
        }
    }

    handleDeclineFriend = async (fromUser) => {
        const url = "/api/decline/" + fromUser
        let response
        let payload = { id: this.props.user.id }

        try {
            response = await fetch(url, {
                method: "delete",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            this.setState({ errorMsg: "Failed to connect to server: " + err });
            return;
        }

        if (response.status !== 200) {
            console.log("Fail")
        }
        await this.props.fetchAndUpdateUserInfo();
        this.setState({
            user: this.props.user
        })

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
                    <button id="acceptBtn" onClick={() => this.handleAcceptFriend(fr)}>Accept</button>
                    <button id="declineBtn" onClick={() => this.handleDeclineFriend(fr)}>Decline</button>
                </div>
            )}
        </div>

        let friends = <div className="friendsDiv">
            {this.state.user.friends.map(friend =>
                <div key={friend}>
                    <p>{friend}</p>
                </div>)}
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


