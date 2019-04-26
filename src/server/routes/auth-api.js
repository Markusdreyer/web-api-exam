//This file contains code from the lecturer and has been altered to fit the needs of this assignment


const express = require('express');
const passport = require('passport');

const Users = require('../db/users');

const router = express.Router();


router.put('/accept/:fromUser', function (req, res) {
    Users.acceptFriendRequest(req.params.fromUser, req.body.id)
    res.status(200).send()
})

router.delete('/decline/:fromUser', function (req, res) {
    Users.declineFriendRequest(req.params.fromUser, req.body.id)
    res.status(200).send()
})

router.get('/users/:name', function (req, res) {

    if (!req.user) {
        res.status(401).send();
        return;
    }

    res.status(200).send(Users.findUsers(req.params.name))
});

router.get('/users', function (req, res) {
    if (!req.user) {
        res.status(401).send();
        return;
    }
    res.status(200).send(Users.getAllUsers())
});

router.post('/request/:toUser', (req, res) => {
    Users.sendFriendRequest(req.params.toUser, req.body.id)
    res.status(201).send()
})

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.status(204).send();
});

router.post('/signup', function (req, res) {

    const created = Users.createUser(req.body.userId, req.body.password, req.body.firstName, req.body.surname, req.body.dateOfBirth, req.body.location);

    passport.authenticate('local')(req, res, () => {
        req.session.save((err) => {
            res.status(201).send();
        });
    });
});

router.post('/logout', function (req, res) {

    req.logout();
    res.status(204).send();
});


router.get('/user', function (req, res) {

    if (!req.user) {
        res.status(401).send();
        return;
    }

    res.status(200).json({
        id: req.user.id,
        firstName: req.user.firstName,
        surname: req.user.surname,
        dateOfBirth: req.user.dateOfBirth,
        location: req.user.location,
        friends: req.user.friends,
        friendRequests: req.user.friendRequests,
    }
    );
});


module.exports = router;
