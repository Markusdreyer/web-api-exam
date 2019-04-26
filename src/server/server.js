//This file contains code from the lecturer and has been altered to fit the needs of this assignment

const { app } = require('./app');

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log('Started server on port ' + port);
});

