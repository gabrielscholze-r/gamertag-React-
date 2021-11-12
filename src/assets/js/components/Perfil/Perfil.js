import React, { useCallback, useContext, useEffect, useState } from 'react';
import firebase from '../../AuthAndFirestoreFile';
import AuthContext from '../../contexts/AuthContextProvider';
import usernopicture from '../../../img/usernopicture.png'

import './Perfil.css'
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router';

function Profile () {
    const [nome, setNome] = useState("");
    const [nomeTemp, setNomeTemp] = useState("");
    const [telefone, setTelefone] = useState("");
    const [telefoneTemp, setTelefoneTemp] = useState("");
    const [dataNascimento, setdataNascimento] = useState("");
    const [dataNascimentoTemp, setdataNascimentoTemp] = useState("");
    const [Uid, setUid] = useContext(AuthContext);
    const [picture, setPicture] = useState(usernopicture);
    const [cookies,setCookies] = useCookies(['user'])
    let history = useHistory()

    const getDados = useCallback(async ()=>{
        try{
            await firebase.firestore().collection("usuario").doc(Uid).get().then(snapshot => {
                setNome(snapshot.data().nome)
                setTelefone(snapshot.data().telefone)
                setdataNascimento(snapshot.data().dataNascimento)
            })
        }
        catch(e){
            setCookies('id','',{path:'/'})
            setUid("")
            window.location.reload(false)
            history.push('/')

        }
        
        await firebase.storage().ref(`FotosPerfil/${Uid}`).child("FotoPerfil").getDownloadURL().then(foto=> {setPicture(foto)})
        
    
    }, [])
        

    async function alterarNome(){
        await firebase.firestore().collection("usuario").doc(Uid)
          .update({
              nome: nomeTemp
        })
      .catch((error)=>{
        console.log("Erro: " + error);
      });
    }

    async function alterarTelefone(){
        await firebase.firestore().collection("usuario").doc(Uid)
          .update({
              telefone: telefoneTemp
        })
      .catch((error)=>{
        console.log("Erro: " + error);
      });
    }

    async function alterarDataNascimento(){
        await firebase.firestore().collection("usuario").doc(Uid)
          .update({
              dataNascimento: dataNascimentoTemp
        })
      .catch((error)=>{
        console.log("Erro: " + error);
      });
    }

    

    async function TrocarFoto(IMG){
        await firebase.storage().ref(`FotosPerfil/${Uid}`).child("FotoPerfil").put(IMG)
        firebase.storage().ref(`FotosPerfil/${Uid}`).child("FotoPerfil").getDownloadURL()
        .then((url) => {
           setPicture(url)
        })
    }
    useEffect(()=>{getDados()},[getDados])
    
    return (<div className="profile-grid">
        <div className="photo-name">
            <div className="user-picture">
                <img src={picture} class="picture"/>
            </div>
            <div class="button-profile">
                <label>
                    <input
                    type="file"
                    class="input-file2"
                    onChange={(e) => TrocarFoto(e.target.files[0])}
                    required="required"
                    />
                    <p>TROCAR FOTO</p><br/>
                </label>
            </div>
        </div>

        <div class="dados">

            <div class="pares">
                <p>Nome: </p>
                <span class="dados2"> {nome}</span> 
            </div>

            <div class="pares">
                <p>Telefone: </p>
                <span class="dados2"> {telefone}</span> 
            </div>

            <div class="pares">
                <p>Data de Nascimento:</p> 
                <span class="dados2"> {dataNascimento}</span> 
            </div>
        </div>

        <h1>
            ALTERAR DADOS
        </h1>
            <div class="justify-alterar">
                <div class="userbox1">
                    <input type="text" placeholder="Nome Completo" class="name-input" onChange={(e) => setNomeTemp(e.target.value)}/>
                </div>

                <div class="button-profile">
                    <label>
                        <button type="file" class="input-file2" onClick={(e) => alterarNome()} required="required"/>
                        <p>ALTERAR</p>
                    </label>
                </div>
            </div>

            <div class="justify-alterar">
                <div class="userbox1">
                    <input type="tel" placeholder="Telefone" class="phone-input" onChange={(e) =>  setTelefoneTemp(e.target.value)}/>
                </div>

                <div class="button-profile">
                    <label>
                        <button type="file" class="input-file2" onClick={(e) => alterarTelefone()} required="required"/>
                        <p>ALTERAR</p>
                    </label>
                </div>
            </div>

            <div class="justify-alterar">
                
                <input type="date" placeholder="data: " class="data-input" onChange={(e) =>  setdataNascimentoTemp(e.target.value)}/>

                <div class="button-profile">
                    <label>
                        <button type="file" class="input-file2" onClick={(e) => alterarDataNascimento()} required="required"/>
                        <p>ALTERAR</p>
                    </label>
                </div>
            </div>
        </div>
    )
}
export default Profile;