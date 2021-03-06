//This file contains code from the lecturer and has been altered to fit the needs of this assignment
//https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/src/client/signup.jsx

import React from 'react';
import { withRouter } from 'react-router-dom'

export class SignUp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: "",
            firstName: "",
            surname: "",
            dateOfBirth: "",
            location: "",
            password: "",
            confirm: "",
            errorMsg: null
        };
    }

    onUserIdChange = (event) => {
        this.setState({ userId: event.target.value, errorMsg: null });
    };

    onFirstNameChange = (event) => {
        this.setState({ firstName: event.target.value, errorMsg: null });
    };

    onSurnameChange = (event) => {
        this.setState({ surname: event.target.value, errorMsg: null });
    };

    onDateOfBirthChange = (event) => {
        this.setState({ dateOfBirth: event.target.value, errorMsg: null });
    };

    onLocationChange = (event) => {
        this.setState({ location: event.target.value, errorMsg: null });
    };


    onPasswordChange = (event) => {
        this.setState({ password: event.target.value, errorMsg: null });
    };

    onConfirmChange = (event) => {
        this.setState({ confirm: event.target.value, errorMsg: null });
    };

    doSignUp = async () => {

        const { userId, password, firstName, surname, dateOfBirth, location, confirm } = this.state;

        if (confirm !== password) {
            this.setState({ errorMsg: "Passwords do not match" });
            return;
        }

        const url = "/api/signup";

        const payload = { userId: userId, password: password, firstName: firstName, surname: surname, dateOfBirth: dateOfBirth, location: location };

        let response;

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

        this.setState({ errorMsg: null });
        await this.props.fetchAndUpdateUserInfo();
        this.props.history.push('/');
    };

    render() {

        let error = <div></div>;
        if (this.state.errorMsg !== null) {
            error = <div className="errorMsg"><p>{this.state.errorMsg}</p></div>
        }

        let confirmMsg = "Passwords match";
        if (this.state.confirm !== this.state.password) {
            confirmMsg = "Not matching";
        }

        return (
            <div>
                <div>
                    <p>Username:</p>
                    <input type="text"
                        value={this.state.userId}
                        onChange={this.onUserIdChange}
                        id="userIdInput"
                    />
                </div>
                <div>
                    <p>First Name:</p>
                    <input type="text"
                        value={this.state.firstName}
                        onChange={this.onFirstNameChange}
                        id="firstNameInput"
                    />
                </div>
                <div>
                    <p>Surname:</p>
                    <input type="text"
                        value={this.state.surname}
                        onChange={this.onSurnameChange}
                        id="surnameInput"
                    />
                </div>
                <div>
                    <p>Date of Birth:</p>
                    <input type="text"
                        value={this.state.dateOfBirth}
                        onChange={this.onDateOfBirthChange}
                        id="dateOfBirthInput"
                    />
                </div>
                <div>
                    <p>Location:</p>
                    <input type="text"
                        value={this.state.location}
                        onChange={this.onLocationChange}
                        id="locationInput"
                    />
                </div>
                <div>
                    <p>Password:</p>
                    <input type="password"
                        value={this.state.password}
                        onChange={this.onPasswordChange}
                        id="passwordInput"
                    />
                </div>
                <div>
                    <p>Confirm:</p>
                    <input type="password"
                        value={this.state.confirm}
                        onChange={this.onConfirmChange}
                        id="confirmInput"
                    />
                    <div>{confirmMsg}</div>
                </div>

                {error}

                <div className="btn" onClick={this.doSignUp} id="signUpBtn">Sign Up</div>
            </div>
        );
    }
}

export default withRouter(SignUp);
