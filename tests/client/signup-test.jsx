const React = require('react');
const { mount } = require('enzyme');
const { overrideFetch, asyncCheckCondition } = require('../mytest-utils');
const { app } = require('../../src/server/app');
const { MemoryRouter } = require('react-router-dom');


const { Login } = require('../../src/client/login');


test("Test rendering of friends and friendRequests", async () => {

    overrideFetch(app)

    const driver = mount(
        <MemoryRouter initialEntries={["/home"]}>
            <Login />
        </MemoryRouter>

    );

    const loginBtn = driver.find("#loginBtn").at(0);

    expect(driver.html().includes("Password")).toBe(true)
    expect(driver.html().includes("User Id")).toBe(true)
    loginBtn.simulate('click');

}); 