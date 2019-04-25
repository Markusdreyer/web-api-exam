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

    render() {
        let result = <div></div>
        result = <div>
            {this.props.users.map(u =>
                <div>
                    <p key={u.id}>{u.firstName} {u.surname}</p>
                    <button onClick={() => this.handleFriendRequest(u.id)}>Send friend request</button>
                </div>
            )}
        </div>

        return (
            <div>
                {result}
            </div>
        );
    }
}

export default withRouter(SearchResult);