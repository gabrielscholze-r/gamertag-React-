import React, { useState, useContext } from 'react';
import gamertag__logo from '../img/gamertag__logo.png';
import { Link, useHistory } from 'react-router-dom';
import '../css/Cadastro.css'
import firebase from './AuthAndFirestoreFile.js';
// import AuthContext from './contexts/AuthContextProvider'
export var Email = "";


function Cadastro() {
  // const [uid, setUid] = useContext(AuthContext)
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [born, setBorn] = useState("");
  const [gender, setGender] = useState("")
  let history = useHistory()
  
   async function cadastrar(){
    Email = email;
    await firebase.auth().createUserWithEmailAndPassword(email, senha)
    .then(async () => {
      
      await firebase.firestore().collection("usuario").doc(email)
      .set({
          nome: nome,
          telefone: telefone,
          dataNascimento: born
      });

  })
  .catch((error)=>{
    console.log("Erro: " + error);
  });
  
}

  return (
    <div class="register-container">
        <div class="registerbox">
        <Link to="/"><img src={gamertag__logo} alt="gamertag__logo" class="gamertag__logo1"/></Link>
            <h2 class="title-cadastro">Cadastro</h2>
                <div class="userbox1">
                    <input type="email" placeholder="Email" class="email-input" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                
                <div class="userbox1">
                    <input type="text" placeholder="Nome Completo" class="name-input" onChange={(e) => setNome(e.target.value)}/>
                </div>
                <div class="userbox1">
                    <input type="tel" placeholder="Celular" class="phone-input" onChange={(e) =>  setTelefone(e.target.value)}/>
                </div>
                {/* <div class="userbox1 borndata-text">
                  
                </div> */}
                <div class="userbox1">
                  <div><p class="data-text">Data de Nascimento</p></div>
                  <div> <input type="date" placeholder="data: " class="data-input" onChange={(e) =>  setBorn(e.target.value)}/></div>
                    
                   
                    
                </div>
                <div class="userbox1">
                    <input type="password" placeholder="Senha" class="password-input" onChange={(e) =>  setSenha(e.target.value)}/>
                </div>
                <Link to="/Cadastrar-Estilos"  class="cadastrar" onClick={cadastrar}>Cadastrar</Link>
            
            
        </div>
        </div>
  )
  
} 


export default Cadastro;