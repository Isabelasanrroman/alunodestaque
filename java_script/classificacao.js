const nomeTurma = localStorage.getItem("turma_nome");
document.getElementById("titulo").innerText = "Resultado da Turma: " + (nomeTurma || "");

const alunos = JSON.parse(localStorage.getItem("alunos"));
const tbody = document.querySelector("#tabela tbody");

if (!alunos || alunos.length === 0) {
    alert("Nenhum dado encontrado!");
} else {
    alunos.forEach(a => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${a.nome}</td>
            <td>${a.media}</td>
            <td>${a.frequencia}%</td>
            <td>${a.classificacao}</td>
        `;
        tbody.appendChild(tr);
    });
}