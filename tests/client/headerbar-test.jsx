//This file contains code from the lecturer and has been altered to fit the needs of this assignment
//https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/tests/client/headerbar-test.jsx

const React = require('react');
const { mount } = require('enzyme');
const { MemoryRouter } = require('react-router-dom');

const { HeaderBar } = require('../../src/client/headerbar');
const { overrideFetch, asyncCheckCondition } = require('../mytest-utils');
const { app } = require('../../src/server/app');

const notLoggedInMsg = "LogIn";
const loggedInMsg = "Logout"



test("Test not logged in", async () => {

    const userId = null;
    const updateLoggedInUser = () => { };

    const driver = mount(
        <MemoryRouter initialEntries={["/home"]}>
            <HeaderBar userId={userId} updateLoggedInUser={updateLoggedInUser} />
        </MemoryRouter>
    );

    const html = driver.html();
    expect(html.includes(notLoggedInMsg)).toEqual(true);
});


test("Test logged in", async () => {

    const searchbar = "search";
    const userId = "Foo"
    const updateLoggedInUser = () => { };

    const driver = mount(
        <MemoryRouter initialEntries={["/home"]}>
            <HeaderBar userId={userId} updateLoggedInUser={updateLoggedInUser} />
        </MemoryRouter>
    );

    const html = driver.html();
    expect(html.includes(loggedInMsg)).toEqual(true);
    expect(html.includes(searchbar)).toEqual(true);
});

test("Test do logout", async () => {

    overrideFetch(app);

    let userId = "foo";


    const driver = mount(
        <MemoryRouter initialEntries={["/home"]}>
            <HeaderBar userId={userId} />
        </MemoryRouter>
    );

    const html = driver.html();

    const logoutBtn = driver.find("#logoutBtnId").at(0);
    const searchBtn = driver.find("#searchBtn").at(0);
    searchBtn.simulate('click');
    logoutBtn.simulate('click');

    searchBtn

    const changed = await asyncCheckCondition(() => {
        driver.update();
        const displayed = driver.html().includes(userId);
        return !displayed;
    }, 2000, 200);
    expect(changed).toEqual(true);

});