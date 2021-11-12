import React, { useCallback, useContext, useEffect, useState } from 'react';
import firebase from '../../AuthAndFirestoreFile';
import AuthContext from '../../contexts/AuthContextProvider';
import usernopicture from '../../../img/usernopicture.png'
import './Amigos.css'
import { UilHeartBreak as Unfollow } from '@iconscout/react-unicons'



function Amigos({id}) {
    const [executed, setExecuted] = useState(new Boolean)
    const [uid, setUid] = useState(id)
    const [friends, setFriends] = useState(new Array)
    // const [foto, setFoto] = useState("")
    async function removeFriend(friendID){
        await firebase.firestore().collection("usuario").doc(uid).collection("amigos").doc(friendID).delete()
        getAmigos()
        window.location.reload(false);
    }
    const getAmigos = useCallback(async () => {
        if(!executed){return}
        else{let listaAmigos = []
        const friendsdata = await firebase.firestore().collection("usuario").doc(uid).collection("amigos").get()
        
        if(friendsdata.docs.length==0){
            listaAmigos.push(<p>Nenhum amigo encontrado</p>)
            setFriends(listaAmigos)
            
        }
        else{
        
        for (const [key,value] of friendsdata.docs.entries()){
            let fotoperfil = ""
            try{
                fotoperfil = await firebase.storage().ref(`FotosPerfil/${value.id}`).child("FotoPerfil").getDownloadURL()
            }
            catch(e){
                fotoperfil = usernopicture
            }
            let data = await firebase.firestore().collection("usuario").doc(value.id).get()
            let name = data.data().nome
            listaAmigos.push
                    (<div class="friend">
                        <div class="pic-text">
                            <img src={fotoperfil} class="friend-pic"/>
                            <p>{name}</p>
                        </div>
                        <button class="unfollow-button" onClick={e => removeFriend(value.id)}><Unfollow class="unfollow-icon" /></button>
                    </div>)
        } 
        setFriends(listaAmigos)}
        setExecuted(true)
    }
        
    },[])
    useEffect(()=>{
        getAmigos()
    }, [getAmigos])

    
    return(
        <div class="friends-container">
            <h1>AMIGOS</h1>
            {friends}
        </div>
    )

}

// 

export default Amigos