import React, { useState } from "react";
import MenuInicial from '../MenuInicial';
import '../Login/Login.css';

const Login = () => {

    const [nome, setNome] = useState("");
    const [senha, setPassword] = useState("");
    const [user, setUser] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const userForm = { nome, senha };
        console.log(userForm);

        await fetch("http://localhost:5000/api/home/login", 
        {
        method: "POST",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        //body: JSON.stringify({"username": "teste", "senha": "teste123"})
        body: JSON.stringify(userForm)
        })

        .then(
        resp => {
            if (resp.ok) {
                //console.log(resp.json());
                resp.json().then((data) => {
                console.log(data);
                // set the state of the user
                setUser(data);
                // store the user in localStorage
                localStorage.setItem('user', data);
                //console.log(data)
                })
            }
            else {
                alert('Usuário inexistente ou senha errada');
                document.getElementById('nome').value='';
                document.getElementById('senha').value='';
            }
        })

        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });
    }

    if (user) {
        window.location.href = 'http://localhost:3000/animais';
    }

    return (
        <div className="pagina">
            <MenuInicial></MenuInicial>

            <div className="login">
                <h1 id="titulo">Login</h1>

                
                <form onSubmit={handleSubmit}>

                    <div className="formLogin">
                        <label htmlFor="nome">Nome de Usuario: </label>

                        <input
                            id="nome"
                            type="text"
                            value={nome}
                            placeholder="nome de usuario"
                            onChange={({ target }) => setNome(target.value)}
                        />

                        <label htmlFor="senha">Senha:</label>
                        <input
                            id="senha"
                            type="password"
                            value={senha}
                            placeholder="senha"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                        
                    </div>

                    <button type="submit" className="btnLogin">Login</button>

                    <br></br>
                    <br></br>

                    <a href="http://localhost:3000/cadastro">Cadastre-se</a>
                </form>
            </div>
        </div>
    );
};

export default Login;