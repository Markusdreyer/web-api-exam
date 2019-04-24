import React from "react";
import { Profile } from "./profile"
import { Link } from "react-router-dom";


export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: [],
            meals: [],
            mealInput: null
        };
    }

    componentDidMount() {
        if (this.props.user) {
            this.props.fetchAndUpdateUserInfo();
        }
    }


    render() {
        const user = this.props.user;
        const loggedIn = user !== null && user !== undefined;

        return (
            <div>
                <div>
                    <h1>Welcome to the house of Medici!</h1>

                </div>

                {loggedIn ? (
                    <div>
                        <Profile user={this.props.user} />
                    </div>
                ) : (
                        <div>
                            <p>Please log in to view your profile, search for others and keep in touch with old friends</p>
                        </div>
                    )
                }
            </div>
        );
    }
}
