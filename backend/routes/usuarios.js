const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");
const dbConectada = require("../config/db");

// 🔴 Usuario demo offline
const usuarioDemo = {
    username: "admin",
    password: "1234"
};

// CREAR USUARIO
router.post("/usuarios", async (req, res) => {
    const { username, password } = req.body;

    // 🟡 MODO OFFLINE
    if (!dbConectada) {
        return res.json({
            mensaje: "Modo offline: usuario simulado creado"
        });
    }

    // 🟢 MODO ONLINE
    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const nuevoUsuario = new Usuario({
            username,
            password: passwordHash
        });

        await nuevoUsuario.save();

        res.json({ mensaje: "Usuario creado correctamente" });

    } catch (error) {
        res.status(500).json({ error: "Error al crear usuario" });
    }
});

// LOGIN USUARIO
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    // 🟡 MODO OFFLINE
    if (!dbConectada) {
        if (
            username === usuarioDemo.username &&
            password === usuarioDemo.password
        ) {
            return res.json({
                mensaje: "Login offline exitoso",
                usuario: username
            });
        } else {
            return res.status(400).json({
                error: "Credenciales incorrectas (offline)"
            });
        }
    }

    // 🟢 MODO ONLINE
    try {
        const usuario = await Usuario.findOne({ username });

        if (!usuario) {
            return res.status(400).json({ error: "Usuario no existe" });
        }

        const esValida = await bcrypt.compare(password, usuario.password);

        if (!esValida) {
            return res.status(400).json({ error: "Contraseña incorrecta" });
        }

        res.json({
            mensaje: "Login exitoso",
            usuario: username
        });

    } catch (error) {
        res.status(500).json({ error: "Error en servidor" });
    }
});

module.exports = router;
