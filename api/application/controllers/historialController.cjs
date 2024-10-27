const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const HistorialService = require("../service/historialService.cjs");
const jwtUtils = require("../../utils/jwtUtils.cjs");
const { ObjectId } = require("mongodb");

module.exports = class HistorialController {
    constructor() {
        this.historialService = new HistorialService();
    }

    async getRecords(req, res) {
        try {
            const records = await this.historialService.getRecords();
            if (!records) {
                return res.status(404).json({ message: "Historiales no encontrados" });
            }
            console.log(records)
            res.status(200).json(records);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async getRecord(req, res) {
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
    
          const record = await this.historialService.getRecordById(req.params.id);
          if (!record) {
            return res.status(404).json({ message: "Historial no encontrado" });
          }
          res.status(200).json(record);
        } catch (record) {
          const errorObj = JSON.parse(error.message);
          res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async createRecord(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const { titulo, descripcion } = req.body;
            const { _id } = req.user
            const historial = {
                usuarioId: new ObjectId(_id),
                titulo: titulo,
                descripcion: descripcion,
                fecha: new Date()
            }
            const record = await this.historialService.createRecord(nota);
            res.status(201).json(record);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async changeRecord(req, res) {
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
          const { titulo, descripcion } = req.body;
          const historial = {
              titulo: titulo,
              descripcion: descripcion,
              fecha_actualizacion: new Date()
          }
          const record = await this.historialService.changeRecord(req.params.id, historial);
          if (!record) {
            return res.status(404).json({ message: "Historial no actualizado" });
          }
          res.status(200).json(record);
        } catch (error) {
          const errorObj = JSON.parse(error.message);
          res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async deleteRecord(req, res) {
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
    
          const record = await this.historialService.deleteRecord(req.params.id);
          if (!record) {
            return res.status(404).json({ message: "Historial no eliminado" });
          }
          res.status(200).json(record);
        } catch (error) {
          const errorObj = JSON.parse(error.message);
          res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

}