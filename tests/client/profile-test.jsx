const React = require('react');
const { mount } = require('enzyme');

const { overrideFetch } = require('../mytest-utils');
const { app } = require('../../src/server/app');


const { Profile } = require('../../src/client/profile');


test("Test rendering of friends and friendRequests", async () => {

    overrideFetch(app);

    const users = [
        {
            userId: "foobar",
            password: "bar",
            firstName: "test",
            surname: "test",
            dateOfBirth: "test",
            location: "test",
            friends: ["foo"],
            friendRequests: ["lenny1337", "christoph"]
        },
        {
            userId: "barfoo",
            password: "bar",
            firstName: "test",
            surname: "test",
            dateOfBirth: "test",
            location: "test",
            friends: [],
            friendRequests: []
        }
    ]

    const driver = mount(
        <Profile user={users[0]} users={users} />
    );

    const acceptBtn = driver.find("#acceptBtn").at(0);
    const declineBtn = driver.find("#declineBtn").at(0);

    acceptBtn.simulate('click');
    declineBtn.simulate('click');

    expect(driver.html().includes("foo")).toBe(true)
    expect(driver.html().includes("lenny1337")).toBe(true)

});