const session = require("express-session");

const sessionConfig = session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: false,
        maxAge: 60 * 60 * 1000,
    },
});

module.exports = sessionConfig;