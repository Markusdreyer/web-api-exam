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
                </div>

                {loggedIn ? (
                    <div>
                        <Profile user={this.props.user} />
                    </div>
                ) : (
                        <div>
                            <p> Log in to view profile</p>
                        </div>
                    )
                }
            </div>
        );
    }
}
