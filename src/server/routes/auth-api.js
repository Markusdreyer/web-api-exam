const express = require('express');
const passport = require('passport');

const Users = require('../db/users');

const router = express.Router();


/*
Move unrelated users activity to seperate file
*/
router.get('/users', function (req, res) {

    if (!req.user) {
        res.status(401).send();
        return;
    }
    res.status(200).send(Users.getAllUsers())
});

router.get('/menu/:id', (req, res) => {
    var week = req.params.id
    res.status(200).send(menu.get.menu(week))
})

/*
*/

router.post('/login', passport.authenticate('local'), (req, res) => {

    res.status(204).send();
});

router.post('/signup', function (req, res) {

    const created = Users.createUser(req.body.userId, req.body.password, req.body.firstName, req.body.surname, req.body.dateOfBirth, req.body.location);

    if (!created) {
        res.status(400).send();
        return;
    }

    passport.authenticate('local')(req, res, () => {
        req.session.save((err) => {
            if (err) {
                //shouldn't really happen
                res.status(500).send();
            } else {
                res.status(201).send();
            }
        });
    });
});

router.post('/logout', function (req, res) {

    req.logout();
    res.status(204).send();
});


/*
    Just return the id of the user, if the request is
    authenticated with a valid session cookie
 */
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
        location: req.user.location
    }
    );
});


module.exports = router;
