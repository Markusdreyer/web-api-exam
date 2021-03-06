# Student notes

## Preface
The program has been pre-populated with data for ease of use, and a user is also set up with some extra cases to get started.

Following are all the users available to log into on startup, however, the  ```foo``` user is already set up with friends and friend request for easy testing.
```
1: username: "catlover", password: "lovecats"
2: username: "lenny1337", password: "1234"
3: username: "christoph", password: "bar"
4: username: "foo", password: "bar"
5: username: "purgatory", password: "hellishell"
6: username: "colgate59", password: "secretpass"
7: username: "practicallygod", password: "imalive"
```

### How to run
1. Open the folder containing the program and run ```yarn install``` in the root folder
2. Once dependecies are installed, run ```yarn test``` to run test
3. run ```yarn dev``` to access the application at localhost:8080

### Functionality
- [x] Websockets timeline rendering posts from your friends in chronological order.
- [x] List of friends
- [x] List of friend requests (only visible to the user logged in)   
- [X] Send friend requests 
- [x] Accept or decline friend requests
- [x] Login page
- [x] Signup page
- [x] Search for other users (case sensitive)
- [X] View other users profile (limited view if not friends)


*Note: leave the search field blank to list all users*

### Coverage

All files: 50.28% Stmts coverage

### Shortcomings
I did not have time to complete the private Websocket chat (Pt. 9 & 10)

## Checklist
### Requirements for E
- [x] Write a home page with React.
- [x] At least 2 other React pages that can be accessed via React-Router.
- [x] At least one page should have some “state”, whose change should be triggerable from the GUI
- [x] From each page, it should be possible to go back to the homepage without having to use the
“Back” button in the browser.

### Requirements for D
- [x] RESTful API handling GET, one POST, one PUT and one DELETE, using JSON as data transfer format.
- [x] The REST API MUST follow the best practices for API design (e.g., on the naming conventions of
the endpoints).
- [x] The frontend MUST use such API (e.g., using fetch).

### Requirements for C
- [x] Handle authentication/authorization, which MUST be session-based via cookies (as
seen in class). 

### Requirements for B
- [x] WebSockets, with the frontend using it.
- [x] 50% Test coverage 