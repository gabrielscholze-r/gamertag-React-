import {useCookies} from 'react-cookie'
import React, { useContext } from 'react';
import { Link,useHistory } from 'react-router-dom';
import '../css/TelaInicio.css';
import gamertag__logo from '../img/gamertag__logo.png';
import AuthContext from './contexts/AuthContextProvider';


function TelaInicio() {
    const [uid, setUid] = useContext(AuthContext)
    const [cookies, setCookie] = useCookies(['user']);
    let history = useHistory()
    if(cookies.id!=undefined && cookies.id!=""){
        setUid(cookies.id)
        history.push("/HomePage")
    }
    return(
        <div class=" text-center justify-center grid">
            <div class="header-telainicio text-center">
                <img src={gamertag__logo} alt="gamertag__logo" class="gamertag__logo"/>
                {/* <div class="header-buttons">
                    <li ><a><button id="join-header">Entrar</button></a></li>
                    <li><a><button id="register-header">Cadastrar-se</button></a></li>
                </div> */}
            </div>
            
            <section>
                <div class="component1">
                    <h1 class="title">GAMERTAG, A UNIÃO GAMER.</h1>
                    <p class="description">Una-se à comunidade gamer e fale com amigos, conheça novas pessoas e comente sobre seus jogos favoritos!</p>
                </div>
                <div class="component2"> 
                    <Link to="/Login"><button class="join-button">Entrar</button></Link>
                    <Link to="/Cadastrar"><button class="createAccount-button">Criar conta</button></Link>
                    
                </div>

            </section>
        </div>
    );
}

export default TelaInicio;