const express = require("express");
const UsuarioController = require("../controllers/usuarioController.cjs");
const UsuarioValidator = require("../validators/usuarioValidator.cjs");


const router = express.Router();
const usuarioController = new UsuarioController();
const usuarioValidator = new UsuarioValidator();

router.get("/", usuarioValidator.validateUserDataEmpty(), (req, res) => usuarioController.getUsers(req, res))

module.exports = router;