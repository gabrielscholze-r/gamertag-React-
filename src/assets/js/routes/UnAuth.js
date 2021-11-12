import React from 'react'
import {Route, Link, Switch, BrowserRouter} from 'react-router-dom'
import Cadastro from '../Cadastro'
import Cadastro2 from '../Cadastro2'
import LoginPage from '../LoginPage'
import TelaInicio from '../TelaInicio'
import Cadastro3 from '../Cadastro3'

const UnAuth = () => {
    return(
            <Switch>
                <Route exact path="/"><TelaInicio/></Route>
                <Route exact path="/Login"><LoginPage/></Route>
                <Route exact path="/Cadastrar"><Cadastro/></Route>
                <Route exact path="/Cadastrar-Estilos"><Cadastro2/></Route>
                <Route exact path="/Cadastrar-photo"><Cadastro3/></Route>
            </Switch>
    )
}
export default UnAuth;