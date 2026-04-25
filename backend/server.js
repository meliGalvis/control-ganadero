const express = require("express");
const cors = require("cors");
const conectarDB = require("./config/db");

const app = express();

// conectar DB
conectarDB();

app.use(cors());
app.use(express.json());

// rutas
app.use("/api", require("./routes/usuarios"));
app.use("/api", require("./routes/bovinos"));

const PORT = process.env.PORT || 3000;

// servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});


