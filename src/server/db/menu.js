const meals = [
    "Meatballs",
    "Enchilladas",
    "Taco",
    "Buffalo wings",
    "Pizza",
    "Spaghetti bolognese",
    "Caesar salad",
    "Chili con carne",
    "Chicken tikka masala",
    "Chicken nuggets",

]

var menu = [
    {
        week: [
            { day: "Monday", meal: meals[0] },
            { day: "Tuesday", meal: meals[1] },
            { day: "Wednesday", meal: meals[2] },
            { day: "Thursday", meal: meals[3] },
            { day: "Friday", meal: meals[4] }
        ]
    },
    {
        week: [
            { day: "Monday", meal: meals[5] },
            { day: "Tuesday", meal: meals[6] },
            { day: "Wednesday", meal: meals[7] },
            { day: "Thursday", meal: meals[8] },
            { day: "Friday", meal: meals[0] }
        ]
    },
    {
        week: [
            { day: "Monday", meal: meals[4] },
            { day: "Tuesday", meal: meals[7] },
            { day: "Wednesday", meal: meals[3] },
            { day: "Thursday", meal: meals[2] },
            { day: "Friday", meal: meals[1] }
        ]
    },
    {
        week: [
            { day: "Monday", meal: meals[5] },
            { day: "Tuesday", meal: meals[6] },
            { day: "Wednesday", meal: meals[8] },
            { day: "Thursday", meal: meals[0] },
            { day: "Friday", meal: meals[4] }
        ]
    }
]

const mealExists = (meal) => {
    let mealsUpperCase = []
    meal = meal.toLocaleUpperCase()
    meals.map((item) => {
        mealsUpperCase.push(item.toLocaleUpperCase())
    })
    if (mealsUpperCase.includes(meal)) {
        return true
    } else {
        return false
    }
}

const indexOfMeal = (meal) => {
    let mealsUpperCase = []
    meal = meal.toLocaleUpperCase()
    meals.map((item) => {
        mealsUpperCase.push(item.toLocaleUpperCase())
    })
    return mealsUpperCase.indexOf(meal)
}

//TODO: Status code
const get = {
    /**
     * get the menu for a specific week
     * 
     * @param {String} day i.e: "tuesday"
     */
    menu(week) {
        var days = []
        menu[week].week.forEach(day => {
            days.push(day)
        })
        return days
    },

    /**
     * get every food item
     */
    meals() {
        return meals;
    },
}


//TODO: Status code
const create = {
    /**
     * create a meal
     * 
     * @param {String} meal i.e: "Pizza"
     */
    meal(meal) {
        if (mealExists(meal)) {
            return 409
        } else {
            meals.push(meal)
            return 201
        }
    }
}

//TODO: Status code
const update = {
    /**
     * update an existing meal
     * 
     * @param {number} id i.e: 0
     * @param {string} meal i.e: "Pizza"
     */
    meal(id, newMeal) {
        if (meals.length < id) {
            return 404
        } else if (mealExists(newMeal)) {
            return 409
        } else {
            meals[id] = newMeal
            return 200
        }
    }
}


//TODO: Status codes
const remove = {
    /**
     * remove an existing meal
     * 
     * @param {number} id i.e: 0
     */
    meal(meal) {
        if (mealExists(meal)) {
            meals.splice(indexOfMeal(meal), 1)
            return 200
        }
        return 404
    }
}


module.exports = { menu, get, create, update, remove };
