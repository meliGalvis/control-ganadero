const express = require("express");
const router = express.Router();
const Bovino = require("../models/Bovino");

// GET
router.get("/bovinos", async (req, res) => {
    const data = await Bovino.find();
    res.json(data);
});

// POST
router.post("/bovinos", async (req, res) => {
    const nuevo = new Bovino(req.body);
    await nuevo.save();
    res.json(nuevo);
});

// DELETE
router.delete("/bovinos/:id", async (req, res) => {
    await Bovino.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Eliminado" });
});

// UPDATE
router.put("/bovinos/:id", async (req, res) => {
    const actualizado = await Bovino.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(actualizado);
});

module.exports = router;