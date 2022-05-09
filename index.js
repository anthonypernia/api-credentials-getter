
const express = require('express');
const { config } = require('./config/');
const app = express();
const port = config.port;
const ServerRouter = require("./routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(port, () => {
    console.log(`Credential app listening on port ${port}!`);
});

ServerRouter(app);