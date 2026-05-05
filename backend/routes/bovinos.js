const express = require("express");
const router = express.Router();
const Bovino = require("../models/Bovino");
const dbConectada = require("../config/db");

// ARRAY LOCAL
let bovinosLocal = [
    {
        _id: "1",
        nombre: "Lola",
        edad: 3,
        raza: "Holstein",
        genero: "Hembra"
    }
];

// GET
router.get("/bovinos", async (req, res) => {
    if (!dbConectada) {
        return res.json(bovinosLocal);
    }

    const data = await Bovino.find();
    res.json(data);
});

// POST
router.post("/bovinos", async (req, res) => {
    if (!dbConectada) {
        const nuevo = {
            _id: Date.now().toString(),
            ...req.body
        };

        bovinosLocal.push(nuevo);
        return res.json(nuevo);
    }

    const nuevo = new Bovino(req.body);
    await nuevo.save();
    res.json(nuevo);
});

// DELETE
router.delete("/bovinos/:id", async (req, res) => {
    if (!dbConectada) {
        bovinosLocal = bovinosLocal.filter(b => b._id !== req.params.id);
        return res.json({ mensaje: "Eliminado (offline)" });
    }

    await Bovino.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Eliminado" });
});

// UPDATE
router.put("/bovinos/:id", async (req, res) => {
    if (!dbConectada) {
        const bovino = bovinosLocal.find(b => b._id === req.params.id);

        if (bovino) {
            Object.assign(bovino, req.body);
        }

        return res.json(bovino);
    }

    const actualizado = await Bovino.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(actualizado);
});

module.exports = router;
