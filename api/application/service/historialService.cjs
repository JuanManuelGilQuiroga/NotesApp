const HistorialRepository = require("../../domain/repositories/historialRepository.cjs");

module.exports = class HistorialService {
    constructor() {
        this.historialRepository = new HistorialRepository();
    }

    async getRecords() {
        const record = await this.historialRepository.getAll();
        if (!record) {
            throw new Error(
                JSON.stringify({ status: 404, message: "Historial no encontrado." })
            );
        }
        return record;
    }

    async getRecordById(id) {
        const record = await this.historialRepository.getById(id);
        if (!record) {
          throw new Error(
            JSON.stringify({ status: 404, message: "Historial no encontrado." })
          );
        }
        return record;
    }

    async createRecord(data) {
        return await this.historialRepository.save(data);
    }

    async changeRecord(id, dataUpdate) {
        return await this.historialRepository.modify(id, dataUpdate);
    }

    async deleteRecord(id) {
        return await this.historialRepository.remove(id);
    }

}