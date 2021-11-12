import React, {useContex, useState} from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthContext from './contexts/AuthContextProvider';
import SideBarProvider from './contexts/SideBarProvider'
import HomePage from './HomePage';
import Rotas from './routes/Rotas';
import '../css/App.css'
import { CookiesProvider } from "react-cookie";
function App(){

  const [sbprovider, setProvider] = useState(0);
  // const [Uid, setUid] = useState(false);
  const [Uid, setUid] = useState("")
  return(
    <div className="App">
        <BrowserRouter>
          <CookiesProvider>
            <SideBarProvider.Provider value={[sbprovider, setProvider]}>
              <AuthContext.Provider value={[Uid, setUid]}>
                <Rotas/>
              </AuthContext.Provider>
            </SideBarProvider.Provider>
          </CookiesProvider>
        </BrowserRouter>
    </div>

  )
}

export default App;
