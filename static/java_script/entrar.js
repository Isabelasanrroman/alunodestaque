async function entrar() {

    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;

    let resposta = await fetch("/api/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email: email,
            senha: senha
        })

    });

    let dados = await resposta.json();

    if (dados.status == "ok")
        window.location.href = "/turmas";

    else
        alert("Login inválido");
}