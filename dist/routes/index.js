"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var routes = express_1.Router();
routes.get("/", function (req, res, next) {
    res.send("hello");
    next();
});
exports.default = routes;
