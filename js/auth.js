// FRONTEND auth.js — Connect to Express API

const API_BASE = 'http://localhost:5000/auth'; // Change if deployed

// Registration
document.getElementById("registerForm")?.addEventListener("submit", async function(e) {
    e.preventDefault();

    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    const confirm = document.getElementById("regConfirm").value;

    if (password !== confirm) return alert("Passwords do not match!");

    try {
        const res = await fetch(`${API_BASE}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        if (!res.ok) {
            const error = await res.text();
            throw new Error(error);
        }

        alert("Registered successfully!");
        window.location.href = "login.html";
    } catch (err) {
        alert("Error: " + err.message);
    }
});

// Login
document.getElementById("loginForm")?.addEventListener("submit", async function(e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const res = await fetch(`${API_BASE}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            const error = await res.text();
            throw new Error(error);
        }

        const data = await res.json();
        localStorage.setItem("user", JSON.stringify(data));
        alert("Login successful!");
        window.location.href = "index.html";
    } catch (err) {
        alert("Error: " + err.message);
    }
});

