const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const NotaService = require("../service/notaService.cjs");
const jwtUtils = require("../../utils/jwtUtils.cjs");

module.exports = class NotaController {
    constructor() {
        this.notaService = new NotaService();
    }

    async getNotes(req, res) {
        try {
            const users = await this.notaService.getUsers();
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

    async createNote(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const user = await this.notaService.createNote(req.body);
            res.status(201).json(user);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

}