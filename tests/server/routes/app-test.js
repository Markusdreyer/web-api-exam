//This file contains code from the lecturer and has been altered to fit the needs of this assignment
const request = require('supertest');
const { app } = require('../../../src/server/app');
const Posts = require('../../../src/server/db/posts');

test("Test posts for user", async () => {

    const response = await request(app)
        .get('/api/posts/foo');

    expect(response.statusCode).toBe(200);
});

test("Test create new post", async () => {
    const post = { id: 0, author: "", text: "bar" };

    Posts.updatePosts(post)


    const response = await request(app)
        .post('/api/posts')
        .send({ author: 'foobar', text: "barfoo" })
        .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(201);
});

