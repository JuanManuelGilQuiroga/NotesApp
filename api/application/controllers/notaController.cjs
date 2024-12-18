const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const HistorialService = require("../service/historialService.cjs");
const NotaService = require("../service/notaService.cjs");
const jwtUtils = require("../../utils/jwtUtils.cjs");
const { ObjectId } = require("mongodb");

module.exports = class NotaController {
    constructor() {
        this.notaService = new NotaService();
        this.historialService = new HistorialService();
    }

    async getNotes(req, res) {
        try {
            const { _id } = req.user
            const notes = await this.notaService.getNotes(_id);
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
            console.log("Esta es la nota ingresada",note)
            const notaId = note.insertedIds[0];
            const historial = {
                notaId: notaId,
                fecha_creacion: new Date(),
                historial: [
                  {
                    titulo: titulo,
                    descripcion: descripcion,
                    fecha_actualizacion: new Date()
                  }
                ]
            }
            const record = await this.historialService.createRecord(historial);
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