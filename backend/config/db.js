require("dotenv").config();
const mongoose = require("mongoose");

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("✅ MongoDB conectado");
        return true;

    } catch (error) {
        console.error("❌ Error conectando a MongoDB");
        console.error(error.message);

        // 🔥 NO apagamos el servidor
        return false;
    }
};

module.exports = conectarDB;