let modoOffline = false;

let bovinosLocal = [
    {
        _id: "1",
        nombre: "Lola",
        edad: 3,
        raza: "Holstein",
        genero: "Hembra"
    },
    {
        _id: "2",
        nombre: "ToroMax",
        edad: 5,
        raza: "Brahman",
        genero: "Macho"
    }
];

const API_URL = "https://control-ganadero-api.onrender.com/api/bovinos";

// PROTEGER RUTA + CARGAR DATOS
document.addEventListener("DOMContentLoaded", () => {
    const usuario = localStorage.getItem("usuario");

    if (!usuario) {
        window.location.href = "index.html";
        return;
    }

    cargarBovinos();
});

// OBTENER DATOS
async function cargarBovinos() {
    mostrarEstado();
    try {
        const res = await fetch(API_URL);

        if (!res.ok) throw new Error("API no responde");

        const data = await res.json();
        modoOffline = false;

        renderTabla(data);

    } catch (error) {
        console.warn("Modo offline activado");

        modoOffline = true;
        renderTabla(bovinosLocal);
    }
}

// RENDER
function renderTabla(bovinos) {
    const tabla = document.getElementById("tablaBovinos");
    tabla.innerHTML = "";

    bovinos.forEach((bovino) => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${bovino.nombre}</td>
            <td>${bovino.edad}</td>
            <td>${bovino.raza}</td>
            <td>${bovino.genero}</td>
            <td class="acciones">
                <button class="editar" onclick="editarBovino('${bovino._id}')">Editar</button>
                <button class="eliminar" onclick="eliminarBovino('${bovino._id}')">Eliminar</button>
            </td>
        `;

        tabla.appendChild(fila);
    });
}

// CREATE
async function agregarBovino() {
    const nombre = document.getElementById("nombre").value;
    const edad = document.getElementById("edad").value;
    const raza = document.getElementById("raza").value;
    const genero = document.getElementById("genero").value;

    if (!nombre || !edad || !raza || !genero) {
        alert("Completa todos los campos");
        return;
    }

    if (modoOffline) {
        bovinosLocal.push({
            _id: Date.now().toString(),
            nombre,
            edad,
            raza,
            genero
        });

        limpiarFormulario();
        renderTabla(bovinosLocal);
        return;
    }

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, edad, raza, genero })
        });

        limpiarFormulario();
        cargarBovinos();

    } catch (error) {
        alert("Error al guardar");
    }
}

// DELETE
async function eliminarBovino(id) {
    if (!confirm("¿Eliminar bovino?")) return;

    if (modoOffline) {
        bovinosLocal = bovinosLocal.filter(b => b._id !== id);
        renderTabla(bovinosLocal);
        return;
    }

    try {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        cargarBovinos();

    } catch (error) {
        alert("Error al eliminar");
    }
}

// UPDATE
async function editarBovino(id) {
    const nuevoNombre = prompt("Nuevo nombre:");
    const nuevaEdad = prompt("Nueva edad:");
    const nuevaRaza = prompt("Nueva raza:");
    const nuevoGenero = prompt("Nuevo género:");

    if (!nuevoNombre || !nuevaEdad || !nuevaRaza || !nuevoGenero) return;

    if (modoOffline) {
        const bovino = bovinosLocal.find(b => b._id === id);

        if (bovino) {
            bovino.nombre = nuevoNombre;
            bovino.edad = nuevaEdad;
            bovino.raza = nuevaRaza;
            bovino.genero = nuevoGenero;
        }

        renderTabla(bovinosLocal);
        return;
    }

    try {
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nombre: nuevoNombre,
                edad: nuevaEdad,
                raza: nuevaRaza,
                genero: nuevoGenero
            })
        });

        cargarBovinos();

    } catch (error) {
        alert("Error al actualizar");
    }
}

// LIMPIAR
function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("edad").value = "";
    document.getElementById("raza").value = "";
    document.getElementById("genero").value = "";
}

// LOGOUT
function cerrarSesion() {
    localStorage.removeItem("usuario");
    window.location.href = "index.html";
}

function mostrarEstado() {
    const estado = document.getElementById("estado");

    if (!estado) return;

    estado.textContent = modoOffline
        ? "Modo Offline"
        : "Conectado al servidor";
}