// Registration logic
document.getElementById("registerForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    const confirm = document.getElementById("regConfirm").value;

    if (password !== confirm) return alert("Passwords do not match!");
    if (localStorage.getItem(email)) return alert("User already exists!");

    const user = { name, email, password };
    localStorage.setItem(email, JSON.stringify(user));
    alert("Registered successfully!");
    window.location.href = "login.html";
});

// Login logic
document.getElementById("loginForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const user = JSON.parse(localStorage.getItem(email));
    if (!user || user.password !== password) return alert("Invalid credentials!");
    
    alert("Login successful!");
    window.location.href = "index.html";
});
