import React, { useContext, useState } from 'react';
// import CreatePost from './components/CreatePost/CreatePost';
import Header from './components/Header/Header'
import '../css/HomePage.css'
import SideOptions from './components/SideOptions/SideOptions';
import Feed from './components/Feed/Feed'
import SideBarProvider from './contexts/SideBarProvider';
import Profile from './components/Perfil/Perfil';
import AuthContext from './contexts/AuthContextProvider';
import { useHistory } from 'react-router';
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { useCookies } from 'react-cookie';
import Amigos from './components/Amigos/Amigos';
import firebase from './AuthAndFirestoreFile';
const queryClient = new QueryClient();
// import Options from './contexts/OptionsProvider';



function HomePage() {
    const [Uid, setUid] = useContext(AuthContext);  
    let history = useHistory(); 
    const [cookies, setCookies] = useCookies(['user']);
   
    
    if(cookies.id=="" || cookies.id==undefined || Uid==""){
        
        setUid("")
        setCookies("id", "",{path: '/'})
       
        history.push('/')
    }
    const [sbprovider, setProvider] = useContext(SideBarProvider);
         
          
    function feedupdater(){
        switch(sbprovider){
            case 0:
                return(
                <QueryClientProvider client={queryClient}>
                    <Feed/>
                </QueryClientProvider>
                )
                
            case 1:
                return(<Profile/>)
        }
        
    }
    return(
        <div class="home">
            <Header class="header-fixed"/>
            <div class="flex-container">
                <SideOptions />
                {feedupdater()}
                <Amigos id={Uid}/>
            </div>
            
            
        </div>
    )
}

export default HomePage;