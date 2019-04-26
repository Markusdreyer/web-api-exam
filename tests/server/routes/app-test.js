const request = require('supertest');
const { app } = require('../../../src/server/app');



test("Test posts for user", async () => {

    const response = await request(app)
        .get('/api/posts/foo');

    expect(response.statusCode).toBe(200);
});

test("Test create new post", async () => {

    const response = await request(app)
        .post('/api/posts')
        .send({ author: 'foobar', text: "barfoo" })
        .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(201);
});

