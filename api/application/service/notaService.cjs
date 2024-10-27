const NotaRepository = require("../../domain/repositories/notaRepository.cjs");

module.exports = class NotaService {
    constructor() {
        this.notaRepository = new NotaRepository();
    }

    async getNotes() {
        const user = await this.notaRepository.getAll();
        if (!user) {
            throw new Error(
                JSON.stringify({ status: 404, message: "Usuario no encontrado." })
            );
        }
        return user;
    }

    async getNoteById(id) {
        const note = await this.notaRepository.getById(id);
        if (!note) {
          throw new Error(
            JSON.stringify({ status: 404, message: "Note not found" })
          );
        }
        return note;
    }

    async createNote(data) {
        return await this.notaRepository.save(data);
    }

    async changeNote(id, dataUpdate) {
        return await this.notaRepository.modify(id, dataUpdate);
    }

    async deleteNote(id) {
        return await this.notaRepository.remove(id);
    }

}