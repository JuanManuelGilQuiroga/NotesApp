const { body, query, param } = require("express-validator");
const { ObjectId } = require("mongodb");
module.exports = class UsuarioValidator {

    validateUserData = () => {
        return [
            body('nick')
                .notEmpty().withMessage('El nick es obligatorio')
                .isString().withMessage('El nombre debe ser una cadena de caracteres'),
            
            body('nombre')
                .notEmpty().withMessage('El nombre es obligatorio')
                .isString().withMessage('El nombre debe ser una cadena de caracteres'),

            body('apellido')
                .notEmpty().withMessage('El apellido es obligatorio')
                .isString().withMessage('El apellido debe ser una cadena de caracteres'),

            body('contraseña')
                .notEmpty().withMessage('La contraseña es obligatoria')
                .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),

            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error('No envíe nada en la URL');
                }
                return true;
            })
        ];
    };

    validateUserDataEmpty = () => {
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

    validateUsersId = () => {
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