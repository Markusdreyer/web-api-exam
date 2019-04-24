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

    handleChange = (e) => {
    }

    render() {

        let profile = <div></div>
        profile = <div>
            <h2>{this.props.user.firstName} {this.props.user.surname}</h2>
            <h3>{this.props.user.dateOfBirth} {this.props.user.location}</h3>

        </div>;
        return (
            <div>
                {profile}
            </div>
        );
    }
}
