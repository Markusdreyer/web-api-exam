import React from "react";
import { withRouter } from 'react-router-dom'

export class SearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleFriendRequest = (e) => {

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
        </div>;
        return (
            <div>
                {result}
            </div>
        );
    }
}

export default withRouter(SearchResult);