import React from "react";
import { withRouter } from 'react-router-dom'

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

    handleFriendRequest = async (fromUser, toUser) => {
        event.target.innerHTML = "Cancel request"
        const url = "/api/friendRequest/" + toUser
        let response

        const payload = { fromUser: fromUser };

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

        }

    }

    render() {
        const users = this.props.user;
        let result = <div></div>

        if (!users || !users.length) {
            result = <div>
                {this.props.users.map(u =>
                    <div>
                        <p key={u.id}>{u.firstName} {u.surname}</p>
                        <button onClick={() => this.handleFriendRequest(this.props.user.id, u.id)}>Send friend request</button>
                    </div>
                )}
            </div>
        }
        return (
            <div>
                {result}
            </div>
        );
    }
}

export default withRouter(SearchResult);