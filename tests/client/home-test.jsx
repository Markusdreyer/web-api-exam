//This file contains code from the lecturer and has been altered to fit the needs of this assignment
//https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/tests/client/home-test.jsx
const React = require('react');
const { mount } = require('enzyme');
const { MemoryRouter } = require('react-router-dom');
const { Home } = require('../../src/client/home');
const { overrideWebSocket, overrideFetch, asyncCheckCondition } = require('../mytest-utils');
const { app } = require('../../src/server/app');

const needToLogInMsg = "Please log in to view your profile, search for others and keep in touch with old friends";

let server;
let port;

beforeAll(done => {

    server = app.listen(0, () => {
        port = server.address().port;
        done();
    });
});

afterAll(() => {
    server.close();
});

test("Test not logged in", async () => {

    const driver = mount(<Home />);

    const html = driver.html();
    expect(html.includes(needToLogInMsg)).toEqual(true);
});
