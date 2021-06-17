import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import Cadastro from './components/Cadastro';
import ListagemAnimais from './components/ListagemAnimais';
import InfoAnimais from './components/InfoAnimais';
import CadastroAnimais from './components/CadastroAnimais';
import Login from './components/Login';

export default class Rotas extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/cadastro/" component={Cadastro}/>
                <Route path="/animais/" component={ListagemAnimais}/>
                <Route path="/infos/:nome/:raca/:desc/:urlFoto1/:urlFoto2/:dono" component={InfoAnimais}/>
                <Route path="/cadastroAnimais/" component={CadastroAnimais}/>
                <Redirect from='*' to='/' />
            </Switch>
        )
    }
}
//<Route path="/infos/:nome/:raca/:desc/:email/:urlFoto" component={InfoAnimais}/>