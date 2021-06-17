import React, { Component } from 'react'; 
import Logo from '../../assets/imagens/Logo.png';
import './Menu.css'; 

export default class Menu extends Component
{ 
    render()
    { 
        return( 
            <nav className="fundo"> 
                <a href="/animais"> 
                    <img className="Logo" src={Logo} alt="Logo escola" /> 
                </a> 

                <a className="itemMenu" href="/"> Sair </a> 

                <a className="itemMenu" href="/cadastroAnimais"> Cadastrar</a> 

                <a className="itemMenu" href="/animais"> Animais </a>
            </nav> 
        ) 
    } 
}