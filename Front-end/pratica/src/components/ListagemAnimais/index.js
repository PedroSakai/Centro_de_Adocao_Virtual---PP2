import React, { Component } from 'react'; 
import './ListagemAnimais.css'; 
import Menu from '../Menu';

const apiUrl = 'http://localhost:5000/api/animais';

export default class ListagemAnimais extends Component
{
    state = {
        dadosAnimais: []
    }

    componentDidMount() {
        fetch(apiUrl)
        .then(res => res.json())
        .then(
        (result) => {
        this.setState({
            dadosAnimais: result
        });
        console.log("dadosAnimais:" + result);
        }
        )
    }

    render()
    { 
        return( 
            <div className="pagina">
                <Menu></Menu>

                <div class="animais">
                    <div className='titulo'>
                        <h1>Centro de Adoção Virtual:</h1>

                        <p>Escolha algum animal para adotar !</p>
                    </div>
                    
                    <div className='animais'>
                        <br></br>
                        {
                            this.state.dadosAnimais.map(
                            (animal) =>
                                <div className="card" key={animal.id}> 

                                    <a href={`http://localhost:3000/infos/${animal.nome}/${animal.raca}/${animal.descricao}/${animal.urlFoto}/${animal.nomeDono}`}>
                                        <img src={`https://${animal.urlFoto}`} alt={animal.nome} />
                                    </a> 

                                    

                                    <div className="container">
                                        <h4 className='cardAnimal'><b>{animal.nome}</b></h4>

                                        <p className='cardAnimal'>{animal.raca}</p>
                                        
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>

            </div>
        ) 
    } 
}