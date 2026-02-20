from flask import Flask, render_template

app = Flask(__name__)

# Rota para a Página Inicial (Index)
@app.route('/')
def index():
    return render_template('index.html')

# Rota para Login (Entrar)
@app.route('/entrar')
def entrar():
    return render_template('entrar.html')

# Rota para Cadastro de Usuários/Alunos
@app.route('/cadastrar')
def cadastrar():
    return render_template('cadastrar.html')

# Rota para Cadastro de Turmas
@app.route('/cadastrar-turmas')
def cadastrar_turmas():
    return render_template('cadastrarturmas.html')

# Rota para Classificação (Ranking/Destaque)
@app.route('/classificacao')
def classificacao():
    return render_template('classificacao.html')

# Rota para Cursos Cadastrados
@app.route('/cursos-cadastrados')
def cursos_cadastrados():
    return render_template('cursoscadastrados.html')

if __name__ == '__main__':
    app.run(debug=True)