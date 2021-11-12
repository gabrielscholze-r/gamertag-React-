import React, { useContext, useState } from 'react'
import '../css/LoginPage.css'
import gamertag__logo from '../img/gamertag__logo.png';
import { Link } from 'react-router-dom';
import firebase from './AuthAndFirestoreFile.js';
import AuthContext from './contexts/AuthContextProvider';
import { useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie';

function LoginPage() {
    const [cookies, setCookies] = useCookies(['user']);
    const [email,setEmail] = useState("");
    const [senha,setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    // const [Uid, setUid] = useContext(AuthContext);
    const [Uid, setUid] = useContext(AuthContext);
    let history = useHistory()
    
    function logar(){
        setMensagem("");
        firebase.auth().signInWithEmailAndPassword(email,senha)
        .then(()=>{
            setCookies("id", email.toString(),{ path: '/' })
            firebase.auth().onAuthStateChanged((user)=>{
                if(user){
                    alert(" Logado com sucesso! ");
                    setUid(email)
                    history.push("/HomePage")
                }
            })
            

        })
        .catch((error)=>{
            setMensagem("E-mail ou Senha inválidos! Tente Novamente!");
        })
        
        
    }
    return(
        <div class="container-login">
        <Link to="/"><img src={gamertag__logo} alt="gamertag__logo" class="gamertag__logo"/></Link>
        <div class="loginbox">
            <h2>Login</h2>
            <p class="error-message">{mensagem}</p>
                <div class="userbox">
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div class="userbox">
                    <input type="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)}/>
                </div>
                <button class="entrar" onClick={logar}>Entrar</button>
            <h2>Não possui conta? <Link to="/Cadastrar" class="cadastre-se">Cadastre-se</Link></h2>
        </div>
    </div>
    )
}

export default LoginPage;
