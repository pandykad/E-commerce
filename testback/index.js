const express = require("express");
const app = express();

const port = 8000;

app.get("/", (req,res) => {
    return res.send("hello !!!!");
})

app.get("/hitesh", (req,res) => {
    return res.send("uses insta");
})

app.get("/login", (req,res) => {
    return res.send("welcome");
})

app.get("/node", (req,res) => {
    return res.send("welcome");
})

app.listen(port, () => {
    console.log("SERVER IS RUNNING !")
})
// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))