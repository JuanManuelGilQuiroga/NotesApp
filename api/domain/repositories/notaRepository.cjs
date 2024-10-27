const { ObjectId } = require('mongodb');
const Nota = require('../models/notaModel.cjs');

module.exports = class NotaRepository {
    async getAll() {
        try {
            const note = new Nota();
            return await note.findAll();
        } catch (error) {
            console.error('Error en getAll:', error);
            throw new Error(JSON.stringify({ status: 404, message: 'Notas no encontradas.' }));
        }
    }

    async getById(id) {
        try {
            const note = new Nota();
            return await note.findById(id);
        } catch (error) {
            throw new Error(JSON.stringify({ status: 404, message: 'Nota no encontrada.' }));
        }
    }

    async save(noteData) {
        try {
            const nota = new Nota();
            return await nota.insert(noteData);
        } catch (error) {
            throw new Error(JSON.stringify({ status: 500, message: 'Error guardando nota.' }));
        }
    }

    async modify(id, dataUpdate) {
        try {
            const nota = new Nota();
            return await nota.update(id, dataUpdate);
        } catch (error) {
            throw new Error(JSON.stringify({ status: 500, message: 'Error actualizando nota.' }));
        }
    }

    async remove(id) {
        try {
            const nota = new Nota();
            return await nota.delete(id);
        } catch (error) {
            throw new Error(JSON.stringify({ status: 500, message: 'Error eliminando nota.' }));
        }
    }

}