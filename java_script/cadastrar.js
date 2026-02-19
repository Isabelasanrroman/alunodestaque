function cadastrar() {
        let nome = document.getElementById("nome").value;
        let email = document.getElementById("email").value;
        let senha = document.getElementById("senha").value;

        if (nome === "" || email === "" || senha === "") {
            alert("Preencha todos os campos!");
            return;
        }

        let usuario = {
            nome: nome,
            email: email,
            senha: senha
        };

        localStorage.setItem("usuario", JSON.stringify(usuario));

        window.location.href = "entrar.html";
    }