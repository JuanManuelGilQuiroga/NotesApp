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

    async getUser(req, res) {
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
    
          const user = await this.usuarioService.getUserById(req.params.id);
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
    
          res.status(200).json(user);
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
            req.login(usuario, (err) => {
                console.log(usuario)
                if (err) return res.status(500).json({ message: 'Error al iniciar sesión' });

                req.session.token = token;

                res.status(200).json({ token, usuario });
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async logout(req, res) {
        try {
          // Limpiar la cookie del token
          res.clearCookie("connect.sid", {
            httpOnly: false,
            secure: "false",
            domain: "localhost",
            sameSite: "strict",
          });
          // Destruir la sesión y enviar la respuesta solo cuando se complete
          req.session.destroy((err) => {
            if (err) {
              console.error("Error al destruir la sesión:", err);
              return res.status(500).json({ message: "Error al cerrar la sesión" });
            }
    
            res.status(200).json({ message: "Logout successful" });
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal server error" });
        }
      }
}