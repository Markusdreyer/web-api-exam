import React from "react";
import { withRouter } from 'react-router-dom'


export class FriendProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        console.log(this.props.location.state)
        let profile = <div></div>
        profile = <div>
            <h2>{this.props.location.state.user.firstName} {this.props.location.state.user.surname}</h2>
            <h3>{this.props.location.state.user.dateOfBirth} {this.props.location.state.user.location}</h3>
        </div>
        let friends = <div>
            {this.props.location.state.user.friends.map(friend =>
                <div>
                    <p>{friend}</p>
                </div>
            )}
        </div>
        return (
            <div>
                {profile}
                <h4>Friends:</h4>
                {friends}
            </div>
        );
    }
}

export default withRouter(FriendProfile);
