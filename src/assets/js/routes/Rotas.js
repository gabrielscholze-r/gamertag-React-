import React, { useContext, useEffect } from 'react'
import {BrowserRouter,Route, Link, Switch, useHistory} from 'react-router-dom'
import LoginPage from '../LoginPage'
import TelaInicio from '../TelaInicio'
import Cadastro from '../Cadastro'
import Cadastro2 from '../Cadastro2'
import HomePage from '../HomePage'
import AuthContext from '../contexts/AuthContextProvider'
import UnAuth from './UnAuth'
import Auth from './Auth'
import {useCookies} from 'react-cookie'




function Rotas() {
    const [Uid, setUid] = useContext(AuthContext);
    const [cookie, setCookie] = useCookies(['user'])
    let history = useHistory()
    function router(){
        if(Uid!=""){
            return(
                <Auth/> 
            )
        }
        else{
            if(cookie.id=="" || cookie.id==undefined){
                history.push("/")
            }else{
                setUid(cookie.id)
                history.push("/HomePage")
            }
            return(
                <UnAuth/>
            )
            
        }
    }
    return (
        <>
            {router()}
        </>
    )
}
export default Rotas;