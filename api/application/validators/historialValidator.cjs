const { body, query, param } = require("express-validator");
const { ObjectId } = require("mongodb");
module.exports = class NotaValidator {

    validateNoteData = () => {
        return [
            body('titulo')
                .notEmpty().withMessage('El titulo es obligatorio')
                .isString().withMessage('El titulo debe ser una cadena de caracteres'),
            
            body('descripcion')
                .notEmpty().withMessage('La descripcion es obligatorio')
                .isString().withMessage('La descripcion debe ser una cadena de caracteres'),

            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error('No envíe nada en la URL');
                }
                return true;
            })
        ];
    };

    validateNoteDataToUpdate = () => {
        return [
            param('id').custom((value, { req }) => {
                if (!ObjectId.isValid(value)) {
                    throw new Error('Envia un id valido');
                }
                return true;
            }),
            body('titulo')
                .notEmpty().withMessage('El titulo es obligatorio')
                .isString().withMessage('El titulo debe ser una cadena de caracteres'),
            
            body('descripcion')
                .notEmpty().withMessage('La descripcion es obligatorio')
                .isString().withMessage('La descripcion debe ser una cadena de caracteres'),

            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error('No envíe nada en la URL');
                }
                return true;
            })
        ];
    };

    validateNoteDataEmpty = () => {
        return [
            body().custom((value, { req }) => {
                if (Object.keys(req.body).length > 0) {
                    throw new Error('No mandar nada en el body');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`No mandar nada en la url`);
                }
                return true;
            })
        ];
    };

    validateNotesId = () => {
        return [
            param('id').custom((value, { req }) => {
                if (!ObjectId.isValid(value)) {
                    throw new Error('Envia un id valido');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error('No mandar nada en la url');
                }
                return true;
            }),
            body().custom((value, { req }) => {
                if (Object.keys(req.body).length > 0) {
                    throw new Error('No mandar nada en el body');
                }
                return true;
            })
        ];
    };

}