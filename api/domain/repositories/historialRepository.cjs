const { ObjectId } = require('mongodb');
const Historial = require('../models/historialModel.cjs');

module.exports = class HistorialRepository {
    async getAll() {
        try {
            const historial = new Historial();
            return await historial.findAll();
        } catch (error) {
            console.error('Error en getAll:', error);
            throw new Error(JSON.stringify({ status: 404, message: 'Notas no encontradas.' }));
        }
    }

    async getById(id) {
        try {
            const historial = new Historial();
            return await historial.findById(id);
        } catch (error) {
            throw new Error(JSON.stringify({ status: 404, message: 'Historial no encontrada.' }));
        }
    }

    async save(noteData) {
        try {
            const historial = new Historial();
            console.log(historial);
            return await historial.insert(noteData);
        } catch (error) {
            throw new Error(JSON.stringify({ status: 500, message: 'Error guardando historial.' }));
        }
    }

    async modify(id, dataUpdate) {
        try {
            const historial = new Historial();
            console.log("id",id, dataUpdate)
            return await historial.update(id, dataUpdate);
        } catch (error) {
            throw new Error(JSON.stringify({ status: 500, message: 'Error actualizando historial.' }));
        }
    }

    async remove(id) {
        try {
            const historial = new Historial();
            return await historial.delete(id);
        } catch (error) {
            throw new Error(JSON.stringify({ status: 500, message: 'Error eliminando historial.' }));
        }
    }

}