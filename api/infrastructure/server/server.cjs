const express = require("express"); // Importa Express para crear el servidor
const passport = require("passport");
const http = require("http"); // Importa el módulo HTTP para crear un servidor
const corsConfig = require("../middlewares/corsConfig.cjs"); // Configuración de CORS
const sessionConfig = require("../middlewares/sessionConfig.cjs"); // Configuración de sesiones
const {authenticateToken} = require("../middlewares/authMiddleware.cjs");
const { loginLimiter, getLimiter, postLimiter, deleteLimiter, putLimiter } = require("../middlewares/rateLimit.cjs");
const UsuarioRouter = require("../../application/routes/usuarioRouter.cjs")
const NotaRouter = require("../../application/routes/notaRouter.cjs")
const passportConfig = require("../middlewares/passportConfig.cjs");
passportConfig(passport);

const createServer = () => {
    const app = express(); // Crea una nueva instancia de Express
    
    // Middlewares
    app.use(corsConfig); // Middleware para configurar CORS
    app.use(express.json()); // Middleware para analizar JSON en las solicitudes
    app.use(sessionConfig); // Middleware para la gestión de sesiones
    //app.use(loginLimiter, getLimiter, postLimiter, deleteLimiter, putLimiter); // Middleware para limitar el total de solicitudes
    app.use(express.urlencoded({ extended: true })); // Middleware para analizar datos URL-encoded
    app.use(passport.initialize()); // Inicializa Passport para la autenticación
    app.use(passport.session()); // Middleware para gestionar sesiones con Passport
    
    const server = http.createServer(app);

    app.use("/users", UsuarioRouter);
    app.use("/notes", authenticateToken, NotaRouter);

    return server; // Retorna el servidor configurado
};

module.exports = createServer;