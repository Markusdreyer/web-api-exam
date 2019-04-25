/*
This file contains code from the lecturer. The code has been modified to some extent
*/

const users = new Map();


function getUser(id) {
    return users.get(id);
}

function findUsers(name) {
    let ids = Array.from(users.keys());
    let result = []
    ids.forEach(id => {
        if (getUser(id).firstName == name || getUser(id).surname == name) {
            let user = getUser(id)
            let filteredUser = {
                id: user.id,
                firstName: user.firstName,
                surname: user.surname,
                dateOfBirth: user.dateOfBirth,
                location: user.location,
                friends: user.friends,
                friendRequests: user.friendRequests,
            };
            result.push(filteredUser)
        }
    });
    return result

}

function getAllUsers() {
    let ids = Array.from(users.keys());
    let userArray = []
    ids.forEach(id => {
        let user = getUser(id)
        let filteredUser = {
            id: user.id,
            firstName: user.firstName,
            surname: user.surname,
            dateOfBirth: user.dateOfBirth,
            location: user.location,
            friends: user.friends,
            friendRequests: user.friendRequests,
        };
        userArray.push(filteredUser)
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


function sendFriendRequest(toUser, fromUser) {
    getUser(toUser).friendRequests.push(fromUser)
}


function acceptFriendRequest(fromUser, toUser) {
    getUser(fromUser).friends.push(toUser)
    getUser(toUser).friends.push(fromUser)

    let index = getUser(toUser).friendRequests.indexOf(fromUser)
    if (index !== -1) getUser(toUser).friendRequests.splice(index, 1)

}

function declineFriendRequest(fromUser, toUser) {
    let index = getUser(toUser).friendRequests.indexOf(fromUser)
    if (index !== -1) getUser(toUser).friendRequests.splice(index, 1)

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


module.exports = { getUser, verifyUser, createUser, resetAllUsers, getAllUsers, sendFriendRequest, findUsers, acceptFriendRequest, declineFriendRequest };
