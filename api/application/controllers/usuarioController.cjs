const UsuarioService = require("../service/usuariosService.cjs");
const jwtUtils = require("../../utils/jwtUtils.cjs");

module.exports = class UsuarioController {
    constructor() {
        this.usuarioService = new UsuarioService();
    }

    async getUsers(req, res) {
        try {
            const users = await this.usuarioService.getUsers();
            if (!users) {
                return res.status(404).json({ message: "Usuarios no encontrados" });
            }
            console.log(users)
            res.status(200).json(users);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }
}