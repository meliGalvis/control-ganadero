const express = require("express");
const cors = require("cors");
const { conectarDB } = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

// rutas
app.get("/", (req, res) => {
    res.send("API Control Ganadero funcionando 🚀");
});
app.use("/api", require("./routes/usuarios"));
app.use("/api", require("./routes/bovinos"));

const PORT = process.env.PORT || 3000;

// 🚀 iniciar servidor
const iniciarServidor = async () => {
    try {
        const conectado = await conectarDB();

        if (conectado) {
            console.log("🟢 Modo ONLINE (Mongo conectado)");
        } else {
            console.log("🟡 Modo OFFLINE (sin base de datos)");
        }

    } catch (error) {
        console.log("🔴 Error general al iniciar DB");
    }

    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
};

iniciarServidor();