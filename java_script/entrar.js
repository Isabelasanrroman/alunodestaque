
    function entrar() {
        let email = document.getElementById("email").value;
        let senha = document.getElementById("senha").value;

        if (email === "" || senha === "") {
            alert("Preencha todos os campos!");
            return;
        }

        let usuarioSalvo = localStorage.getItem("usuario");

        if (!usuarioSalvo) {
            alert("Nenhum usuário cadastrado!");
            return;
        }

        let usuario = JSON.parse(usuarioSalvo);

        if (email === usuario.email && senha === usuario.senha) {
            window.location.href = "cursoscadastrados.html";
        } else {
            alert("Email ou senha incorretos!");
        }
    }