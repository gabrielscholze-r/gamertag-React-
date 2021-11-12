import React, { createContext, useContext, useState } from 'react';
import { UilBell, UilUser, UilSearch, UilSetting, UilCommentsAlt as ForumIcon, UilPlayCircle as Play, UilHome as Home, UilSignout as SignOut } from '@iconscout/react-unicons'
import './SideOptions.css'
import { Link, useHistory } from 'react-router-dom';
import SideBarProvider from '../../contexts/SideBarProvider';
import firebase from '../../AuthAndFirestoreFile';
import AuthContext from '../../contexts/AuthContextProvider';
import { useCookies } from 'react-cookie';

function SideOptions (){
    const [cookies, setCookies] = useCookies(['user']);
    let history = useHistory();
    const [sbprovider, setProvider] = useContext(SideBarProvider);
    const [Uid, setUid] = useContext(AuthContext);
    function changeState(param){
        setProvider(param);
    }

    function deslogar(){
        changeState(0)
        setCookies("id", "",{ path: '/' })
        firebase.auth().signOut();
        alert("Deslogado, volte sempre")
        setUid("")
        window.location.reload(false);
        history.push("/")
        
    }
    return(
        <header class="nav-sideopt">
            <div className="user-opt" onClick={() => changeState(0)}>
            <Home size="45" class="nav-icon2 user-logo2" /><p>Home</p>
            </div>
            <div className="user-opt" onClick={() => changeState(1)}>
            <UilUser size="45" class="nav-icon2 user-logo2" /><p>Perfil</p>
            </div>
            <div className="user-opt SignOut" onClick={deslogar}>
            <SignOut size="45" class="nav-icon user-logo2"/><p>Sair</p>
            </div>
        </header>
    )

}

export default SideOptions;