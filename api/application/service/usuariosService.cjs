const UsuarioRepository = require("../../domain/repositories/usuarioRepository.cjs");

module.exports = class UsuarioService {
    constructor() {
        this.usuarioRepository = new UsuarioRepository();
    }

    async getUsers() {
        const user = await this.usuarioRepository.getAll();
        if (!user) {
            throw new Error(
                JSON.stringify({ status: 404, message: "Usuario no encontrado." })
            );
        }
        return user;
    }
}