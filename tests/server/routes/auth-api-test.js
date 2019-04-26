//This file contains code from the lecturer and has been altered to fit the needs of this assignment

const request = require('supertest');
const { app } = require('../../../src/server/app');


let counter = 0;


test("Test fail login", async () => {

    const response = await request(app)
        .post('/api/login')
        .send({ userId: 'foo_' + (counter++), password: "bar" })
        .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(401);
});

test("Test fail access data of non-existent user", async () => {

    const response = await request(app)
        .get('/api/user');

    expect(response.statusCode).toBe(401);
});

test("Test login after logout", async () => {

    const userId = 'foo_' + (counter++);

    const agent = request.agent(app);

    let response = await agent
        .post('/api/signup')
        .send({ userId, password: "bar" })
        .set('Content-Type', 'application/json');
    expect(response.statusCode).toBe(201);

    response = await agent.get('/api/user');
    expect(response.statusCode).toBe(200);

    response = await agent.post('/api/logout');
    expect(response.statusCode).toBe(204);

    response = await agent.get('/api/user');
    expect(response.statusCode).toBe(401);

    response = await agent
        .post('/api/login')
        .send({ userId, password: "bar" })
        .set('Content-Type', 'application/json');
    expect(response.statusCode).toBe(204);

    response = await agent.get('/api/user');
    expect(response.statusCode).toBe(200);
});

test("Test friend requests", async () => {
    const fromUser = "purgatory"
    const toUser = "colgate59"

    const agent = request.agent(app);

    let response = await agent
        .post('/api/request/' + toUser)
        .set('Content-Type', 'application/json')
        .send({ id: fromUser })
    expect(response.statusCode).toBe(201);

    response = await agent
        .put('/api/accept/' + fromUser)
        .send({ id: toUser })
    expect(response.statusCode).toBe(200);

    response = await agent
        .post('/api/request/' + toUser)
        .set('Content-Type', 'application/json')
        .send({ id: fromUser })
    expect(response.statusCode).toBe(201);

    response = await agent
        .delete('/api/decline/' + fromUser)
        .send({ id: toUser })
    expect(response.statusCode).toBe(200);

});

