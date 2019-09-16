import express from "express";
const app = express();
const port = process.env.PORT || 5000;

// console.log that your server is up and running
// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get("/ping", (req, res) => {
    // tslint:disable-next-line:no-console
    console.log("request");
    res.send({ express: "pong" });
});
