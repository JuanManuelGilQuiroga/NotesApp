const express = require("express");
const UsuarioController = require("../controllers/usuarioController.cjs");
const UsuarioValidator = require("../validators/usuarioValidator.cjs");


const router = express.Router();
const usuarioController = new UsuarioController();
const usuarioValidator = new UsuarioValidator();

router.get("/", usuarioValidator.validateUserDataEmpty(), (req, res) => usuarioController.getUsers(req, res));
router.get("/:id", (req, res) => usuarioController.getUser(req, res));
router.post("/", usuarioValidator.validateUserData(),(req, res) => usuarioController.createUser(req, res));
router.post("/login", async (req, res) => {
    try {
        await usuarioController.login(req, res);
    } catch (error) {
        res.status(500).json({ error: "Error en el login" });
    }
});
router.post("/logout", async (req, res) => {
    try {
      await usuarioController.logout(req, res);
    } catch (error) {
      res.status(500).json({ error: "Error al cerrar sesión" });
    }
  });

module.exports = router;