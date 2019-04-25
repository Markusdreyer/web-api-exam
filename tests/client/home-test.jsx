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


test("Test logged in", async () => {
    overrideFetch(app);
    overrideWebSocket();

    const user = { id: "Foo", friendRequests: [], friends: [] }; //TODO: added friendrequests and friends temporary
    const fetchAndUpdateUserInfo = () => new Promise(resolve => resolve());

    const driver = mount(
        <MemoryRouter initialEntries={["/home"]}>
            <Home fetchAndUpdateUserInfo={fetchAndUpdateUserInfo} user={user} />
        </MemoryRouter>
    );

    const html = driver.html();
    expect(html.includes(needToLogInMsg)).toEqual(false);
});