import React from "react";
import { withRouter } from 'react-router-dom'


export class FriendProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const props = this.props.location.state
        const friend = props.user.friends.includes(props.profile.id)

        let profile = <div></div>
        profile = <div>
            <h2>{props.profile.firstName} {props.profile.surname}</h2>
            <h3>{props.profile.dateOfBirth} {props.profile.location}</h3>
        </div>

        let friends = <div>
            {props.profile.friends.map(friend =>
                <div key={friend}>
                    <p>{friend}</p>
                </div>
            )}
        </div>
        return (
            <div>
                {friend ? (
                    <div>
                        {profile}
                        <h4>Friends:</h4>
                        {friends}
                    </div>
                ) : (
                        <div>
                            <p>You can only view your friends profiles</p>
                            <p>{props.profile.firstName} has not accepted your friend request yet.</p>
                        </div>
                    )
                }

            </div>
        );
    }
}

export default withRouter(FriendProfile);
