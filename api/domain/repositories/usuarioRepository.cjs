const { ObjectId } = require('mongodb');
const Usuario = require('../models/usuarioModel.cjs');

module.exports = class UsuarioRepository {
    async getAll() {
        try {
            const user = new Usuario();
            return await user.findAll();
        } catch (error) {
            console.error('Error en getAll:', error);
            throw new Error(JSON.stringify({ status: 404, message: 'Usuarios no encontrados.' }));
        }
    }

    async getById(id) {
        try {
            const user = new Usuario();
            return await user.findById(id);
        } catch (error) {
            console.error('Error en getAll:', error);
            throw new Error(JSON.stringify({ status: 404, message: 'Usuarios no encontrados.' }));
        }
    }

    async save(userData) {
        try {
            const user = new Usuario();
            return await user.insert(userData);
        } catch (error) {
            throw new Error(JSON.stringify({ status: 500, message: 'Error guardando usuario.' }));
        }
    }
}