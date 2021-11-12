import React, { useContext, useState } from 'react'
import '../css/Cadastro3.css'
import usernopicture from '../img/usernopicture.png'
import AuthContext from './contexts/AuthContextProvider'
// import { UilImageUpload as UpImage } from '@iconscout/react-unicons'
import firebase from './AuthAndFirestoreFile'
import {Email} from './Cadastro';
import { useHistory } from 'react-router'
export default function Cadastro3() {
  const history = useHistory();
  const [picture, setPicture] = useState(usernopicture)
  // const [picture2, setPicture2] = useState([])
  const [uid, setUid] = useContext(AuthContext)
  // Após confirmar a foto, setuid e push('/HomePage')

  function UploadIMG(IMG){
    firebase.storage().ref(`FotosPerfil/${Email}`).child("FotoPerfil").put(IMG)
    firebase.storage().ref(`FotosPerfil/${Email}`).child("FotoPerfil").getDownloadURL()
    .then((url) => {
      setPicture(url)
    })
  }
  function ignoreUpload(){
    if(window.confirm("Deseja continuar criar uma conta sem foto de perfil?"))
    {
      setPicture(usernopicture)
      setUid(Email)
      firebase.storage().ref(`FotosPerfil/${Email}`).child("FotoPerfil").put(picture)
      alert("Cadastrado com sucesso!")
      history.push("/HomePage")
    }
  }
  function avançar(){
    if(picture==usernopicture){
      if(window.confirm("Deseja continuar criar uma conta sem foto de perfil?")){
        firebase.storage().ref(`FotosPerfil/${Email}`).put(picture)
        history.push("/HomePage")
      }
      
    }
    else{
      if(window.confirm("Deseja criar uma conta com a foto selecionada?")){
        alert("Conta criada com sucesso")
        setUid(Email)
        history.push("/HomePage")
      }
    }
  }

  return (
    <div>
      <h1>FOTO DE PERFIL</h1>
      <div class="cadastro3-container">
        {/* <h2>FOTO DE PERFIL</h2> */}
        {/* <div class="user-picture"></div> */}
        <img src={picture} class="usernopicture" />

        <div class="button">
          <label>
            <input
              type="file"
              class="input-file2"
              onChange={(e) => UploadIMG(e.target.files[0])}
              required="required"
            />
            <p>CARREGAR FOTO</p>
          </label>
        </div>
        <p class="foto-carregada">Foto Carregada!</p>
        {/* <div>
                <input type="file"/>
                
            </div> */}
        {/* <div>
                <button class="uploadpic-button">Carregar Foto</button>
            </div> */}
        <div>
          <button class="ignore-button" onClick={ignoreUpload}>Ignorar</button>
        </div>
        <div>
          <button class="avancar" onClick={avançar}>AVANÇAR</button>
        </div>
      </div>
    </div>
  )
}