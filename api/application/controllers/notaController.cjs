const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const NotaService = require("../service/notaService.cjs");
const jwtUtils = require("../../utils/jwtUtils.cjs");
const { ObjectId } = require("mongodb");

module.exports = class NotaController {
    constructor() {
        this.notaService = new NotaService();
    }

    async getNotes(req, res) {
        try {
            const notes = await this.notaService.getNotes();
            if (!notes) {
                return res.status(404).json({ message: "Notas no encontradas" });
            }
            console.log(notes)
            res.status(200).json(notes);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async getNote(req, res) {
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
    
          const note = await this.notaService.getNoteById(req.params.id);
          if (!note) {
            return res.status(404).json({ message: "Nota no encontrada" });
          }
          res.status(200).json(note);
        } catch (error) {
          const errorObj = JSON.parse(error.message);
          res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async createNote(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const { titulo, descripcion } = req.body;
            const { _id } = req.user
            const nota = {
                usuarioId: new ObjectId(_id),
                titulo: titulo,
                descripcion: descripcion,
                fecha: new Date()
            }
            const note = await this.notaService.createNote(nota);
            res.status(201).json(note);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async changeNote(req, res) {
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
    
          const note = await this.notaService.changeNote(req.params.id, req.body);
          if (!note) {
            return res.status(404).json({ message: "Nota no actualizada" });
          }
          res.status(200).json(note);
        } catch (error) {
          const errorObj = JSON.parse(error.message);
          res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async deleteNote(req, res) {
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
    
          const note = await this.notaService.deleteNote(req.params.id);
          if (!note) {
            return res.status(404).json({ message: "Nota no eliminada" });
          }
          res.status(200).json(note);
        } catch (error) {
          const errorObj = JSON.parse(error.message);
          res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

}