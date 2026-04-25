const form = document.getElementById("loginForm");
const status = document.getElementById("loginStatus");

const API_URL = "http://control-ganadero-api.onrender.com/api/login";

form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const username = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;

    // limpiar mensajes
    status.innerHTML = "";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            status.innerHTML = "<p style='color:green;'>Ingreso exitoso...</p>";

            // guardar sesión básica
            localStorage.setItem("usuario", username);

            setTimeout(() => {
                window.location.href = "home.html";
            }, 1000);

        } else {
            status.innerHTML = `<p style="color:red;">${data.error}</p>`;
        }

    } catch (error) {
        status.innerHTML = "<p style='color:red;'>Error conectando al servidor</p>";
    }
});

// MODAL
function abrirModal() {
    document.getElementById("modalRegistro").style.display = "block";
}

function cerrarModal() {
    document.getElementById("modalRegistro").style.display = "none";
}

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async function(e) {
    e.preventDefault();

    const username = document.getElementById("newUser").value;
    const password = document.getElementById("newPassword").value;
    const status = document.getElementById("registerStatus");

    try {
        const res = await fetch("http://control-ganadero-api.onrender.com/api/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (res.ok) {
            status.innerHTML = "<p style='color:green;'>Usuario creado</p>";
            registerForm.reset();
        } else {
            status.innerHTML = `<p style='color:red;'>${data.error}</p>`;
        }

    } catch (error) {
        status.innerHTML = "<p style='color:red;'>Error del servidor</p>";
    }
});
