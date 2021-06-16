import React, { Component } from 'react'; 
import './Cadastro.css'; 
import MenuInicial from '../MenuInicial';

const apiUrl = 'http://localhost:5000/api/Usuarios';

const stateInicial = { usuarios: { nome: '', email: '', senha: ''}, dadosUsuarios: [] }

export default class Cadastro extends Component
{ 
    state = { ...stateInicial };

    componentDidMount() {
        fetch(apiUrl)
        .then(res => res.json())
        .then(
        (result) => {
        this.setState({
            dadosUsuarios: result
        });
        
        console.log("Função didMount:" + result);
        
        },
        (error) => {
        this.setState({ error });
        }
        )
    }

    atualizaCampo(event) {
        //clonar usuário a partir do state, para não alterar o state diretamente

        const usuarios = { ...this.state.usuarios };

        //usar o atributo NAME do input identificar o campo a ser atualizado
        
        usuarios[event.target.name] = event.target.value;
        
        //atualizar o state
        
        this.setState({ usuarios });
    }

    salvar() {
        const usuarios = this.state.usuarios;
        const metodo = usuarios.id ? 'put' : 'post';
        const url = usuarios.id ? `${apiUrl}/${usuarios.id}` : apiUrl;

        fetch(url, {
            method: metodo,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
        },

        body: JSON.stringify(usuarios)
        })
    
        .then(
            resp => {
                resp.json().then((data) => {
                console.log(data);
                const listaCursos = this.getListaAtualizada(data);
                this.setState({
                
                    usuarios: stateInicial.usuarios, dadosUsuarios: listaCursos });
                
                })
        })
    }

    getListaAtualizada(usuarios, add=true) {
        const lista = this.state.dadosUsuarios.filter(a => a.id !== usuarios.id);

        if (add) lista.unshift(usuarios);

        return lista;
    }

    renderForm() {
        return(
            <div className="inclui-container">

                <label> Nome: </label>

                <input
                    type="text"
                    id="nome"
                    placeholder="Nome de usuario"
                    className="form-input"
                    name="nome"
                    value={this.state.usuarios.nome}
                    onChange={ e => this.atualizaCampo(e)}
                />

                <label> Email: </label>

                <input
                    type="text"
                    id="email"
                    placeholder="email"
                    className="form-input"
                    name="email"
                    value={this.state.usuarios.email}
                    onChange={ e => this.atualizaCampo(e)}
                />

                <label> Senha: </label>

                <input
                    type="password"
                    id="senha"
                    placeholder="senha"
                    className="form-input"
                    name="senha"
                    value={this.state.usuarios.senha}
                    onChange={ e => this.atualizaCampo(e)}
                />

                <button className="btnSalvar"
                    onClick={e => this.salvar(e)}>
                    Salvar
                </button>

                <button className="btnCancelar"
                    onClick={e => this.limpar(e)} >
                    Cancelar
                </button>

            </div>
        )
    }

    limpar(){
        this.setState({ usuarios: stateInicial.usuarios});
    }

    carregar(usuarios) {
        this.setState({ usuarios })
    }

    render()
    { 
        return( 
            <div>
                <MenuInicial></MenuInicial>
                <h1>Cadastre-se</h1>

                {this.renderForm()}
            </div>
        ) 
    } 
}