import React from 'react';
import Menu from '../Menu';
import './InfoAnimais.css'; 
import {useParams} from "react-router";

const InfoAnimais = () => {

    const {nome} = useParams();
    const {raca} = useParams();
    const {desc} = useParams();
    const {urlFoto1} = useParams();
    const {urlFoto2} = useParams();
    const {dono} = useParams();

    async function handleClick() 
    {
        const usuario = await (await fetch('http://localhost:5000/api/Usuarios/' + dono)).json();

        window.location.href='mailto:'+usuario.email+'?Subject=Interresse%20em%20adotar%20"'+nome+'"';
    }

    return (
        <div>

            <Menu></Menu>
            
            <div className="uhu">
                
                <img src={`https://${urlFoto1}/${urlFoto2}`} alt={nome} />
                
                
                <h3>{nome}</h3>

                <b></b>

                <p>Raça: {raca}</p>
                
                <b></b>

                <p>Descrição:  {desc}</p>

                <b></b>

                <button className="btnEmail" onClick={handleClick}>Tenho Interresse!</button>
            
            </div>
            
        </div>
    )
}

export default InfoAnimais;