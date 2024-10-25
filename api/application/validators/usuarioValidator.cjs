const { body, query, param } = require("express-validator");
const { ObjectId } = require("mongodb");
module.exports = class UsuarioValidator {

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