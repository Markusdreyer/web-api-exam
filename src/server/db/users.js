/*
This file contains code from the lecturer. The code has been modified to some extent
*/

const users = new Map();


function getUser(id) {
    return users.get(id);
}

function getAllUsers() {
    let ids = Array.from(users.keys());
    let userArray = []
    ids.forEach(id => {
        userArray.push(getUser(id))
    });

    return userArray
}

function verifyUser(id, password) {

    const user = getUser(id);

    if (user === undefined) {
        return false;
    }

    return user.password === password;
}


function sendFriendRequest(fromUser, toUser) {
    getUser(toUser).friendRequests.push(fromUser)
}

function createUser(id, password, firstName, surname, dateOfBirth, location) {

    if (getUser(id) !== undefined) {
        return false;
    }

    const user = {
        id: id,
        password: password,
        firstName: firstName,
        surname: surname,
        dateOfBirth: dateOfBirth,
        location: location,
        friends: [],
        friendRequests: [],
    };

    users.set(id, user);
    return true;
}

function resetAllUsers() {
    users.clear();
}


module.exports = { getUser, verifyUser, createUser, resetAllUsers, getAllUsers, sendFriendRequest };
