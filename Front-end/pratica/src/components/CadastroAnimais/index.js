import React, { Component } from 'react'; 
import './CadastroAnimais.css'; 
import Menu from '../Menu';

const apiUrl = 'http://localhost:5000/api/Animais';

const stateInicial = { animais: { nome: '', raca: '', descricao: '', urlForo: '', idDono: 0}, dadosAnimais: [] }

export default class CadastroAnimais extends Component
{ 
    state = { ...stateInicial };

    componentDidMount() {
        fetch(apiUrl)
        .then(res => res.json())
        .then(
        (result) => {
        this.setState({
        dadosAnimais: result
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

        const animais = { ...this.state.animais };

        //usar o atributo NAME do input identificar o campo a ser atualizado
        
        animais[event.target.name] = event.target.value;
        
        //atualizar o state
        
        this.setState({ animais });
    }

    salvar() {
        const animais = this.state.animais;
        const metodo = animais.id ? 'put' : 'post';
        const url = animais.id ? `${apiUrl}/${animais.id}` : apiUrl;

        fetch(url, {
            method: metodo,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
        },

        body: JSON.stringify(animais)
        })
    
        .then(
            resp => {
                resp.json().then((data) => {
                console.log(data);
                const listaCursos = this.getListaAtualizada(data);
                this.setState({
                
                animais: stateInicial.animais, dadosAnimais: listaCursos });
                
                })
        })
    }

    getListaAtualizada(animais, add=true) {
        const lista = this.state.dadosAnimais.filter(a => a.id !== animais.id);

        if (add) lista.unshift(animais);

        return lista;
    }

    renderForm() {
        return(
            <div className="inclui-container">

                <label> Nome: </label>

                <input
                    type="text"
                    id="nome"
                    placeholder="nome do animal"
                    className="form-input"
                    name="nome"
                    value={this.state.animais.nome}
                    onChange={ e => this.atualizaCampo(e)}
                />
                <br/>
                <label> Raca: </label>

                <input
                    type="text"
                    id="raca"
                    placeholder="raca"
                    className="form-input"
                    name="raca"
                    value={this.state.animais.raca}
                    onChange={ e => this.atualizaCampo(e)}
                />
                <br/>
                
                <label> Descricao: </label>

                <input
                    type="text"
                    id="descricao"
                    placeholder="descricao"
                    className="form-input"
                    name="descricao"
                    value={this.state.animais.descricao}
                    onChange={ e => this.atualizaCampo(e)}
                />

                <br/>
                <label> URL da foto: </label>

                <input
                    type="text"
                    id="urlFoto"
                    placeholder="url da foto"
                    className="form-input"
                    name="urlFoto"
                    value={this.state.animais.urlFoto}
                    onChange={ e => this.atualizaCampo(e)}
                />
            <br/>
                
                <label> Nome do Dono: </label>

                <input
                    type="text"
                    id="nomeDono"
                    placeholder="Nome do Dono"
                    className="form-input"
                    name="nomeDono"
                    value={this.state.animais.nomeDono}
                    onChange={ e => this.atualizaCampo(e)}
                />

                <br/>
                <button className="btnSalvar"
                    onClick={e => this.salvar(e)} 
                    >
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
        this.setState({ animais: stateInicial.animais});
    }

    carregar(animais) {
        this.setState({ animais })
    }

    render()
    {
        return( 
            <div className="pagina">

                <Menu></Menu>

                <div className="cadastro">

                    <h1 id="titulo">Cadastro de Animais</h1>

                    {this.renderForm()}

                    <br></br>
                    
                    <p>Caso a url da foto for grande demais, use o site <a target="_blank" href='https://abre.ai/'>link</a> para encurta-lo!</p>

                </div>

            </div>
        ) 
    } 
}