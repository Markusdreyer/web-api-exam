import React from "react";
import { Editor } from "./editor"
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

    fetchMenuforWeek = async (id) => {
        const url = "/api/menu/" + id;

        let response;

        try {
            response = await fetch(url, {
                method: "get",
                headers: {
                    'Cache-Control': 'private'
                }
            });
        } catch (err) {
            this.setState({ errorMsg: "Failed to connect to server: " + err });
            return;
        }

        if (response.status !== 200) {
            //TODO here could have some warning message in the page.
            console.log("Fail")
        } else {
            const payload = await response.json();
            this.updateMenu(payload);
        }
    };

    updateMenu = (menu) => {
        this.setState({
            menu: menu
        })
    };

    render() {
        const user = this.props.user;
        const loggedIn = user !== null && user !== undefined;
        const handleClick = e => this.fetchMenuforWeek(e.target.id)
        const handleChange = e => this.setState({ mealInput: e.target.value })

        //TODO: Make renderMenu function
        let menu = <div></div>;
        menu = <div>
            {this.state.menu.map(m =>
                <p key={m.day}>{m.day}: {m.meal}</p>
            )}
        </div>;

        let meals = <div></div>
        meals = <div>
            {this.state.meals.map(meal =>
                <p>{meal}</p>
            )}
        </div>;

        return (
            <div>
                <div>
                    <h2>Cantina</h2>
                    Select which week you want the menu for:
                    <div className="calendarContainer">
                        <button id="0" onClick={handleClick}>1</button>
                        <button id="1" onClick={handleClick}>2</button>
                        <button id="2" onClick={handleClick}>3</button>
                        <button id="3" onClick={handleClick}>4</button>
                    </div>
                    {menu}
                </div>

                {loggedIn ? (
                    <Editor />
                ) : (
                        <div>
                            <p> Log in to edit the menu</p>
                        </div>
                    )
                }
            </div>
        );
    }
}
