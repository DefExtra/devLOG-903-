"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const passport_1 = __importDefault(require("passport"));
const body_parser_1 = __importDefault(require("body-parser"));
const passport_discord_1 = __importDefault(require("passport-discord"));
const Strategy = passport_discord_1.default.Strategy;
const express_session_1 = __importDefault(require("express-session"));
const memorystore_1 = __importDefault(require("memorystore"));
const memorystore = (0, memorystore_1.default)(express_session_1.default);
const dashboard_config_1 = __importDefault(require("../../dashboard.config"));
const router_1 = __importDefault(require("./routers/router"));
const chalk_1 = __importDefault(require("chalk"));
exports.default = (db, thiser) => {
    passport_1.default.serializeUser((user, done) => done(null, user));
    passport_1.default.deserializeUser((obj, done) => done(null, obj));
    passport_1.default.use(new Strategy({
        clientID: dashboard_config_1.default.clientID,
        clientSecret: dashboard_config_1.default.clientSECRET,
        callbackURL: dashboard_config_1.default.domain + "/callback",
        scope: ["identify", "guilds", "guilds.join"],
    }, (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => done(null, profile));
    }));
    app.use((0, express_session_1.default)({
        store: new memorystore({ checkPeriod: 86400000 }),
        secret: `!@#$d8932%^ni#(!@bn9312)`,
        resave: false,
        saveUninitialized: false,
    }));
    app.set("views", __dirname + "/views");
    app.set("view engine", "pug");
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({
        extended: true,
    }));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({
        extended: true,
    }));
    (0, router_1.default)(app, db);
    app.use(express_1.default.static(`${__dirname}/assets`));
    app.locals.basedir = `${__dirname}/assets`;
    app.listen(dashboard_config_1.default.port, () => {
        thiser.emit("SystemLog", {
            type: "connection",
            text: chalk_1.default.blue.bold("[ + ]") + " Loading Dashboard To The Host...",
        });
    });
};
