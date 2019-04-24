const request = require('supertest');
const { app } = require('../../../src/server/app');


let counter = 0;


//TODO: Revise tests!
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


test("Test create user, but fail get data", async () => {

    const userId = "foo"

    let response = await request(app)
        .post('/api/login')
        .send({ userId: 'foo', password: "bar" })
        .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(204);


    //no use of cookies here, so auth fails
    response = await request(app)
        .get('/api/user');

    expect(response.statusCode).toBe(401);
});

test("Test login after logout", async () => {

    const userId = "foo"

    const agent = request.agent(app);

    let response = await request(app)
        .post('/api/login')
        .send({ userId: 'foo', password: "bar" })
        .set('Content-Type', 'application/json');
    expect(response.statusCode).toBe(204);

    //now logout
    response = await agent.post('/api/logout');
    expect(response.statusCode).toBe(204);


    //after logout, should fail to get data
    response = await agent.get('/api/user');
    expect(response.statusCode).toBe(401);

    //do login
    response = await agent
        .post('/api/login')
        .send({ userId, password: "bar" })
        .set('Content-Type', 'application/json');
    expect(response.statusCode).toBe(204);


    //after logging in again, can get info
    response = await agent.get('/api/user');
    expect(response.statusCode).toBe(200);
});

