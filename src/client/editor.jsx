import React from "react";
import { Link } from "react-router-dom";


export class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meals: [],
            mealToCreate: null,
            mealToDelete: null
        };
    }

    componentDidMount() {
    }



    //TODO: Fix status
    createMeal = async (newMeal) => {
        const url = "/api/meal";

        let response;

        try {
            response = await fetch(url, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ meal: newMeal })
            });
        } catch (err) {
            this.setState({ errorMsg: "Failed to connect to server: " + err });
            return;
        }

        if (response.status == 409) {
            alert("Failure: meal already exist")
        }

        if (response.status == 201) {
            alert("Success!")
        }
    }

    //TODO: Fix status
    deleteMeal = async (mealToDelete) => {
        const url = "/api/meal";

        let response;

        try {
            response = await fetch(url, {
                method: "delete",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ meal: mealToDelete })
            });
        } catch (err) {
            this.setState({ errorMsg: "Failed to connect to server: " + err });
            return;
        }

        if (response.status == 404) {
            alert("Failure: meal doesn't exist")
        }

        if (response.status == 200) {
            alert("Success!")
        }
    }

    //TODO: Fix status
    fetchMeals = async () => {
        const url = "/api/meals";

        let response;

        try {
            response = await fetch(url, {
                method: "get"
            });
        } catch (err) {
            this.setState({ errorMsg: "Failed to connect to server: " + err });
            return;
        }

        if (response.status !== 200) {
            console.log("Fail")
        } else {
            const payload = await response.json();
            this.updateMeals(payload);
        }
    };

    updateMeals = (meals) => {
        this.setState({
            meals: meals
        })
    };

    handleChange = (e) => {
        if (e.target.id == "createMeal") {
            this.setState({ mealToCreate: e.target.value })
        }

        if (e.target.id == "removeMeal") {
            this.setState({ mealToDelete: e.target.value })
        }
    }


    render() {

        let meals = <div></div>
        meals = <div>
            {this.state.meals.map(meal =>
                <p key={meal}>{meal}</p>
            )}
        </div>;

        return (
            <div>
                <input id="createMeal" type="text" placeholder="name of meal" onChange={this.handleChange} />
                <button onClick={() => this.createMeal(this.state.mealToCreate)}>Create meal</button>
                <button onClick={this.fetchMeals}>List meals</button>
                <input id="removeMeal" type="text" placeholder="name of meal" onChange={this.handleChange} />
                <button onClick={() => this.deleteMeal(this.state.mealToDelete)}>Delete meal</button>
                {meals}
            </div>
        );
    }
}
