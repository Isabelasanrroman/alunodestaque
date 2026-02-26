from flask import Flask, render_template, request
import csv
from collections import defaultdict


import psycopg2

def conectar():
    return psycopg2.connect(
        host="localhost",
        database="alunosdestaques",
        user="postgres",
        password="1234"
    )


app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/entrar', methods=['GET', 'POST'])
def entrar():
    if request.method == 'POST':
        email = request.form['email']
        senha = request.form['senha']
        print("Email:", email)
        print("Senha:", senha)

        return redirect(url_for('cursoscadastrados.html'))

    return render_template('entrar.html')

@app.route('/cadastrar', methods=['GET', 'POST'])
def cadastrar():
    if request.method == 'POST':
        nome = request.form['nome']
        email = request.form['email']
        senha = request.form['senha']

        print("Nome:", nome)
        print("Email:", email)
        print("Senha:", senha)

    return render_template('cadastrar.html')


@app.route('/cadastrar-turmas', methods=['GET', 'POST'])
def cadastrar_turmas():
    if request.method == 'POST':
        turma = request.form['turma']
        arquivo = request.files['arquivo']

        dados = defaultdict(lambda: {"notas": [], "freqs": []})

        leitor = csv.DictReader(
            arquivo.stream.read().decode("utf-8").splitlines()
        )

        for linha in leitor:
            nome = linha['nome']
            nota = float(linha['nota'])
            freq = float(linha['frequência'])

            dados[nome]["notas"].append(nota)
            dados[nome]["freqs"].append(freq)

        alunos = []

        for nome, info in dados.items():
            media = round(sum(info["notas"]) / len(info["notas"]))
            freq_media = round(sum(info["freqs"]) / len(info["freqs"]))

            if media >= 95 and freq_media == 100:
                classificacao = "🥇 Ouro"
            elif media >= 95 and freq_media >= 97:
                classificacao = "🥈 Prata"
            elif media >= 95 and freq_media >= 95:
                classificacao = "🥉 Bronze"
            else:
                classificacao = "—"

            alunos.append({
                "nome": nome,
                "media": media,
                "freq": freq_media,
                "classificacao": classificacao
            })

        alunos.sort(key=lambda x: (x["media"], x["freq"]), reverse=True)

        return render_template("classificacao.html", alunos=alunos, turma=turma)

    # IMPORTANTE: aqui NÃO usa alunos
    return render_template("cadastrarturmas.html")


@app.route('/classificacao')
def classificacao():
    return render_template('classificacao.html', alunos=[], turma="")

@app.route('/cursos-cadastrados')
def cursos_cadastrados():
    return render_template('cursoscadastrados.html')

if __name__ == '__main__':
    app.run(debug=True)