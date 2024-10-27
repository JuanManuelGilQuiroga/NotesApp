const express = require("express");
const NotaController = require("../controllers/notaController.cjs");
const NotaValidator = require("../validators/notaValidator.cjs");

const router = express.Router();
const notaController = new NotaController();
const notaValidator = new NotaValidator();

router.get("/", notaValidator.validateNoteDataEmpty(), (req, res) => notaController.getNotes(req, res));
router.get("/:id", (req, res) => notaController.getNote(req, res));
router.post("/", notaValidator.validateNoteData(),(req, res) => notaController.createNote(req, res));
router.put("/:id", notaValidator.validateNoteDataToUpdate(),(req, res) => notaController.changeNote(req, res));
router.delete("/:id", (req, res) => notaController.deleteNote(req, res));

module.exports = router;