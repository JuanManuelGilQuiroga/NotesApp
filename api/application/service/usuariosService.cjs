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

    async getUserById(id) {
        const user = await this.usuarioRepository.getById(id);
        if (!user) {
          throw new Error(
            JSON.stringify({ status: 404, message: "User not found" })
          );
        }
        return user;
    }

    async createUser(data) {
        return await this.usuarioRepository.save(data);
    }

    async searchUsersByquery(query) {
        const user = await this.usuarioRepository.searchQuery(query);
        if (!user) {
            throw new Error(
                JSON.stringify({ status: 404, message: "Consulta no encontrada." })
            );
        }
        return user;
    }
}