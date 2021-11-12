import React, { useCallback, useContext, useEffect, useState } from 'react';
import './Header.css'
import gTLogo from '../../../img/gamertag__logo.png'
import { UilBell, UilUser, UilSearch, UilSetting } from '@iconscout/react-unicons'
import SideBarProvider from '../../contexts/SideBarProvider';
import AuthContext from '../../contexts/AuthContextProvider';
import firebase from '../../AuthAndFirestoreFile';
import {UserMail} from '../../LoginPage'
import usernopicture from '../../../img/usernopicture.png'


function Header(){
    const [Uid, setUid] = useContext(AuthContext);
    const [sbprovider, setProvider] = useContext(SideBarProvider);
    const [fotoperfil, setFotoperfil] = useState("")
    const [boolvar, setBool] = useState(false)
    function ChangeStates(param){
        setProvider(param);
    }

    const getPic = useCallback(async ()=>{
        let foto = await firebase.storage().ref(`FotosPerfil/${Uid}`).child("FotoPerfil").getDownloadURL()
        // foto = usernopicture
        if(foto==undefined){
            foto=usernopicture
        }
        setFotoperfil(foto)
  
    })
          
    useEffect(()=>{getPic()},[getPic])
    return (
        <nav>
            <div class="header">
                <div class="header-flex">
                {/* Div logo */}
                
                    <div class="logo" onClick={() => ChangeStates(0)}>   
                        <img src={gTLogo} alt="gamertag_logo"class="gamertag_logo"/>

                    </div>
                
                {/* Div icons */}
                    <div class="nav-links">
                        <UilBell size="40" class="nav-icon notf-bell"/>
                        <img src={fotoperfil} class="userpic" onClick={()=>ChangeStates(1)}/>

                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Header;