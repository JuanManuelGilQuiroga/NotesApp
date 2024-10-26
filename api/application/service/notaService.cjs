const NotaRepository = require("../../domain/repositories/notaRepository.cjs");

module.exports = class NotaService {
    constructor() {
        this.notaRepository = new NotaRepository();
    }

    async getUsers() {
        const user = await this.notaRepository.getAll();
        if (!user) {
            throw new Error(
                JSON.stringify({ status: 404, message: "Usuario no encontrado." })
            );
        }
        return user;
    }

    async createNote(data) {
        return await this.notaRepository.save(data);
    }

}