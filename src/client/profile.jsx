import React from "react";



export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "Place",
            surname: "Holder",
            dateOfBirth: "",
            location: ""
        };
    }

    render() {

        let profile = <div></div>
        profile = <div>
            {console.log(this.props.user)}
            <h2>{this.props.user.firstName} {this.props.user.surname}</h2>
            <h3>{this.props.user.dateOfBirth} {this.props.user.location}</h3>
        </div>
        let friendRequests = <div>
            {this.props.user.friendRequests.map(fr =>
                <div>
                    <p>{fr}</p>
                </div>
            )}
        </div>
        return (
            <div>
                {profile}
                <h4>Friend requests:</h4>
                {friendRequests}
            </div>
        );
    }
}
