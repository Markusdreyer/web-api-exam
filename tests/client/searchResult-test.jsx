//This file contains code from the lecturer and has been altered to fit the needs of this assignment

const React = require('react');
const { mount } = require('enzyme');
const { MemoryRouter } = require('react-router-dom');
const { overrideWebSocket, overrideFetch } = require('../mytest-utils');
const { app } = require('../../src/server/app');


const { SearchResult } = require('../../src/client/searchResult');



test("Test mounting", async () => {
    overrideFetch(app);
    overrideWebSocket();

    const fetchAndUpdateUserInfo = () => { };

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
        <MemoryRouter initialEntries={["/home"]}>
            <SearchResult fetchAndUpdateUserInfo={fetchAndUpdateUserInfo} user={users[0]} users={users} />
        </MemoryRouter>
    );

    const friendRequestBtn = driver.find("#friendRequestBtn").at(0);
    friendRequestBtn.simulate('click');

    driver.html().includes("Cancel request")

});