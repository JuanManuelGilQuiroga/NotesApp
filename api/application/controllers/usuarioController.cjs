const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const UsuarioService = require("../service/usuariosService.cjs");
const jwtUtils = require("../../utils/jwtUtils.cjs");

module.exports = class UsuarioController {
    constructor() {
        this.usuarioService = new UsuarioService();
    }

    async getUsers(req, res) {
        try {
            const users = await this.usuarioService.getUsers();
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

    async createUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            req.body.contraseña = await bcrypt.hash(req.body.contraseña, 6);
            console.log(req.body.contraseña)
            const user = await this.usuarioService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async login(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    
            const body = await this.usuarioService.searchUsersByquery(req.body);
            const usuario = body.length > 0 ? body[0] : null;
    
            if (!usuario) return res.status(400).json({ message: 'Nick invalido' });
            
    
            const passwordMatch = await bcrypt.compare(req.body.contraseña, usuario.contraseña);
            if (!passwordMatch) return res.status(400).json({ message: 'Contraseña invalida' });
            
    
            const token = jwtUtils.generateToken(usuario);
            const user = usuario.id;
            req.session.passport = { user: user };
            req.session.token = token;
    
            res.status(200).json({ token, usuario });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}