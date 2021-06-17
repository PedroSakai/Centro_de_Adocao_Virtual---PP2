import React, { Component } from 'react'; 
import Logo from '../../assets/imagens/Logo.png';
import './MenuInicial.css'; 

export default class MenuInicial extends Component
{ 
    render()
    { 
        return( 
            <nav className="fundo">

                <a href="/">
                    <img className="Logo" src={Logo} alt="Logo escola" /> 
                </a> 

                <a className="itemMenu" href="/"> Login </a>

                <a className="itemMenu" href="/cadastro"> Cadastro</a>

            </nav> 
        ) 
    } 
}