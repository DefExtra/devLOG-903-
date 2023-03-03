"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const url_1 = __importDefault(require("url"));
exports.default = (app) => {
    app
        .get("/login", (req, res, next) => {
        if (req.session?.backURL) {
            req.session.backURL = req.session?.backURL;
        }
        else if (req.headers.referer) {
            const parsed = url_1.default.parse(req.headers.referer);
            if (parsed.hostname == app.locals.domain) {
                req.session.backURL = parsed.path;
            }
        }
        else {
            req.session.backURL = "/";
        }
        next();
    }, passport_1.default.authenticate("discord", { prompt: "none" }))
        .get("/logout", (req, res) => {
        req.session.destroy(() => {
            req.logout();
            res.redirect("/");
        });
    })
        .get("/callback", passport_1.default.authenticate("discord", { failureRedirect: "/" }), async (req, res) => {
        res.redirect("/");
    });
};
