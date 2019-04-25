const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require("express-session");
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');

const authApi = require('./routes/auth-api');
const timelineApi = require('./routes/timeline-api')
const Users = require('./db/users');

const WsHandler = require('./ws-handler');


const app = express();
Users.createUser("catlover", "lovecats", "Andrea", "Arcuri", "03081980", "Italy")
Users.createUser("lenny1337", "1234", "Leonardo", "da Vinci", "15041519", "Italy")
Users.createUser("christoph", "bar", "Christopher", "Columbus", "23021451", "Italy")
Users.createUser("foo", "bar", "Michelangelo", "Buonarroti", "02111475", "Italy")
Users.createUser("purgatory", "hellishell", "Dante", "Alighieri", "29061265", "Italy")
Users.createUser("colgate59", "secretpass", "Eugenio", "Barsanti", "27051821", "Italy")
Users.createUser("practicallygod", "imalive", "Jesus", "Christ", "24120004", "Bethlehem")



//to handle JSON payloads
app.use(bodyParser.json());

WsHandler.init(app);


app.use(session({
    secret: 'a secret used to encrypt the session cookies',
    resave: false,
    saveUninitialized: false
}));


//needed to server static files, like HTML, CSS and JS.
app.use(express.static('public'));


passport.use(new LocalStrategy(
    {
        usernameField: 'userId',
        passwordField: 'password'
    },
    function (userId, password, done) {
        const ok = Users.verifyUser(userId, password);

        if (!ok) {
            return done(null, false, { message: 'Invalid username/password' });
        }

        const user = Users.getUser(userId);
        return done(null, user);
    }
));


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {

    const user = Users.getUser(id);

    if (user !== null) {
        done(null, user);
    } else {
        done(null, false);
    }
});

app.use(passport.initialize());
app.use(passport.session());


//--- Routes -----------
app.use('/api', authApi);
app.use('/api', timelineApi)

//handling 404
app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'));
});

module.exports = { app };
