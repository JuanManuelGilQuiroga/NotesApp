const passport = require("passport");
const Usuario = require('../../domain/models/usuarioModel.cjs');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        console.log("Serializando usuario:", user);
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        // Aquí puedes buscar el usuario en la base de datos usando el ID
        // y luego llamar a done(null, user) para pasar el usuario al siguiente middleware
        const userCollection = new Usuario();
        const user = await userCollection.findById(id);
        done(null, user); // Este es un ejemplo básico
    });
};