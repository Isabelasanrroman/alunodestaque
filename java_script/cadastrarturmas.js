function enviarArquivo() {
    const file = document.getElementById('arquivo').files[0];
    const nomeTurma = document.getElementById('turma').value.trim();

    if (!nomeTurma) { alert("Digite o nome da turma!"); return; }
    if (!file) { alert("Escolha um arquivo CSV!"); return; }

    const reader = new FileReader();
    reader.onload = function(e) {
        const texto = e.target.result.trim();
        const linhas = texto.split(/\r?\n/);

        let alunosMap = {};

        for (let i = 1; i < linhas.length; i++) {
            if (linhas[i].trim() === "") continue;

            const colunas = linhas[i].includes(";") ? linhas[i].split(";") : linhas[i].split(",");
            if (colunas.length < 4) continue;

            const nome = colunas[0].trim();
            const disciplina = colunas[1].trim();
            const nota = parseFloat(colunas[2]);
            const frequencia = parseFloat(colunas[3]);

            if (!nome || !disciplina || isNaN(nota) || isNaN(frequencia)) continue;

            if (!alunosMap[nome]) alunosMap[nome] = { soma:0, quantidade:0, somaFrequencia:0, disciplinas:[] };

            alunosMap[nome].soma += nota;
            alunosMap[nome].quantidade++;
            alunosMap[nome].somaFrequencia += frequencia;
            alunosMap[nome].disciplinas.push({ disciplina, nota, frequencia });
        }

        let alunos = [];
        for (let nome in alunosMap) {
            const media = alunosMap[nome].soma / alunosMap[nome].quantidade;
            const freq = alunosMap[nome].somaFrequencia / alunosMap[nome].quantidade;

            let medalha = "Sem medalha";
            if (media >= 9 && freq >= 95) medalha = "🥇 Ouro";
            else if (media >= 8 && freq >= 90) medalha = "🥈 Prata";
            else if (media >= 7 && freq >= 85) medalha = "🥉 Bronze";

            alunos.push({
                nome: nome,
                media: media.toFixed(2),
                frequencia: freq.toFixed(2),
                classificacao: medalha,
                disciplinas: alunosMap[nome].disciplinas
            });
        }

        alunos.sort((a,b)=>b.media - a.media);

        localStorage.setItem("turma_nome", nomeTurma);
        localStorage.setItem("alunos", JSON.stringify(alunos));
        window.location.href = "classificacao.html";
    };

    reader.readAsText(file);
}