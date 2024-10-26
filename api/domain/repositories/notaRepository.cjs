const { ObjectId } = require('mongodb');
const Nota = require('../models/notaModel.cjs');

module.exports = class NotaRepository {
    async getAll() {
        try {
            const user = new Nota();
            return await user.findAll();
        } catch (error) {
            console.error('Error en getAll:', error);
            throw new Error(JSON.stringify({ status: 404, message: 'Notas no encontradas.' }));
        }
    }

    async getById(id) {
        try {
            const user = new Nota();
            return await user.findById(id);
        } catch (error) {
            console.error('Error en getAll:', error);
            throw new Error(JSON.stringify({ status: 404, message: 'Notas no encontradas.' }));
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

}