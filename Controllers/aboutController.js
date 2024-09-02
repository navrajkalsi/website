"use strict";

const path = require("path"),
    fs = require("fs");

exports.renderAbout = (req, res) => {
    fs.readdir(path.join(__dirname, "../", "public"), { recursive: true }, (err, filesArray) => {
        res.render("about", {
            files: filesArray
        });
    });
};