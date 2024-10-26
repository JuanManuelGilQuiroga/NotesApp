const passport = require("passport");

passport.serializeUser((user, done) => {
    console.log("Serializando usuario:", user);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    done(null, done);
});

module.exports = passport;