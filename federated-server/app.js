import express from 'express';

const app = express();
app.use(express.json())

///////////////////////////////////////////////////////
//Enable cors
///////////////////////////////////////////////////////
app.use(function (req, res, next) {
    // TODO: update to match the domain you will make the request from
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

export default app;
