"use strict";

const express = require("express"),
    app = express(),
    path = require("path"),
    fs = require("fs"),
    aboutController = require("./Controllers/aboutController.js");

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

const publicPath = path.join(__dirname, "public");
app.use("/", express.static(publicPath));
app.use("/index", express.static(publicPath));
app.use("/movies", express.static(publicPath, { index: "movies.html" }));
app.use("/music", express.static(publicPath, { index: "music.html" }));
app.use("/series", express.static(publicPath, { index: "series.html" }));
app.use("/about", aboutController.renderAbout);
app.use("/about", express.static(publicPath));
app.use("/test", express.static(publicPath, { index: "test.html" }));
app.use("*", express.static(publicPath, { index: "error.html" }));

app.use((req, res) => {
    console.log(`Request for ${req.headers.host} ${req.url}`);
});

app.listen(app.get("port"), () => {

    console.log(app.get("port"));
});