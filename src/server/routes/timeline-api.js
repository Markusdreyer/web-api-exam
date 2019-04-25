const express = require('express');
const ews = require('express-ws')(express());
const WebSocket = require('ws');
const Users = require('../db/users');
const router = express.Router();

const Posts = require('../db/posts');


let counter = 0;

router.get('/posts', (req, res) => {

    const since = req.query["since"];

    const data = Posts;

    if (since !== undefined && since !== null) {
        res.json(data.filter(m => m.id > since));
    } else {
        res.json(data);
    }
});

router.post('/posts', (req, res) => {

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

module.exports = router;
