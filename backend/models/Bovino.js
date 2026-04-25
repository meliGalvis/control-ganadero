const mongoose = require("mongoose");

const BovinoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    raza: {
        type: String,
        required: true
    },
    genero: {
        type: String,
        required: true,
        enum: ["Macho", "Hembra"]
    }
}, {
    timestamps: true // opcional: agrega createdAt y updatedAt
});

module.exports = mongoose.model("Bovino", BovinoSchema);