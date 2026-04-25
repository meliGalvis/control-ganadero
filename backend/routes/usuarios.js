const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");

// CREAR USUARIO
router.post("/usuarios", async (req, res) => {
    const { username, password } = req.body;

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

    const usuario = await Usuario.findOne({ username });

    if (!usuario) {
        return res.status(400).json({ error: "Usuario no existe" });
    }

    const esValida = await bcrypt.compare(password, usuario.password);

    if (!esValida) {
        return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    res.json({ mensaje: "Login exitoso" });
});

module.exports = router;