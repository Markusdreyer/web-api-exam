const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require("express-session");
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const authApi = require('./routes/auth-api');
const timelineApi = require('./routes/timeline-api')
const Users = require('./db/users');
const Posts = require('./db/posts');
const app = express();
const ews = require('express-ws')(app);
const WebSocket = require('ws');


Users.createUser("catlover", "lovecats", "Andrea", "Arcuri", "03081980", "Italy")
Users.createUser("lenny1337", "1234", "Leonardo", "da Vinci", "15041519", "Italy")
Users.createUser("christoph", "bar", "Christopher", "Columbus", "23021451", "Italy")
Users.createUser("foo", "bar", "Michelangelo", "Buonarroti", "02111475", "Italy")
Users.createUser("purgatory", "hellishell", "Dante", "Alighieri", "29061265", "Italy")
Users.createUser("colgate59", "secretpass", "Eugenio", "Barsanti", "27051821", "Italy")
Users.createUser("practicallygod", "imalive", "Jesus", "Christ", "24120004", "Bethlehem")



//to handle JSON payloads
app.use(bodyParser.json());


app.use(session({
    secret: 'a secret used to encrypt the session cookies',
    resave: false,
    saveUninitialized: false
}));


//needed to server static files, like HTML, CSS and JS.
app.use(express.static('public'));

let counter = 0;

app.get('/api/posts', (req, res) => {

    const since = req.query["since"];

    const data = Posts;

    if (since !== undefined && since !== null) {
        res.json(data.filter(m => m.id > since));
    } else {
        res.json(data);
    }
});

app.post('/api/posts', (req, res) => {

    const dto = req.body;

    const id = counter++;

    const post = { id: id, author: dto.author, text: dto.text };

    Posts.updatePosts(post);

    res.status(201); //created
    res.send();

    const nclients = ews.getWss().clients.size;
    console.log("Going to broadcast post to " + nclients + " clients");

    ews.getWss().clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            const json = JSON.stringify(post);
            console.log("Broadcasting to client: " + JSON.stringify(post));
            client.send(json);
        } else {
            console.log("Client not ready");
        }
    });
});

app.ws('/', function (ws, req) {
    console.log('Established a new WS connection');
});


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
//app.use('/api', timelineApi)

//handling 404
app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'));
});

module.exports = { app };
