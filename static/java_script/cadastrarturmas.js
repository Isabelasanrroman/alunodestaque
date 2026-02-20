async function enviarArquivo() {

    let nome = document.getElementById("turma").value;
    let arquivo = document.getElementById("arquivo").files[0];

    let form = new FormData();

    form.append("nome", nome);
    form.append("arquivo", arquivo);

    await fetch("/api/criar_turma", {

        method: "POST",

        body: form

    });

    alert("Turma criada");

    window.location.href = "classificacao.html";
}