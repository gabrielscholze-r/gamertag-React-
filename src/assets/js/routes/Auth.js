import React from 'react'
import {Route, Link, Switch, BrowserRouter} from 'react-router-dom'
import HomePage from '../HomePage';

const Auth = () => {

    return(
            <Switch>
                <Route exact path="/HomePage"><HomePage/></Route>
            </Switch>
    )
}
export default Auth;