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

        if (response.status !== 200) {
            console.log("Fail")
        } else {

        }
    }

    handleDeclineFriend = () => {

    }

    render() {

        let profile = <div></div>
        profile = <div>
            <h2>{this.props.user.firstName} {this.props.user.surname}</h2>
            <h3>{this.props.user.dateOfBirth} {this.props.user.location}</h3>
        </div>
        let friendRequests = <div>
            {this.props.user.friendRequests.map(fr =>
                <div>
                    <p>{fr}</p>
                    <button onClick={() => this.handleAcceptFriend(fr)}>Accept</button>
                    <button onClick={() => this.handleDeclineFriend(fr)}>Decline</button>
                </div>
            )}
        </div>

        let friends = <div>
            {this.props.user.friends.map(friend =>
                <div>
                    <p>{friend}</p>
                </div>
            )}
        </div>
        return (
            <div>
                {profile}
                <h4>Friend requests:</h4>
                {friendRequests}
                <h4>Friends:</h4>
                {friends}
            </div>
        );
    }
}
