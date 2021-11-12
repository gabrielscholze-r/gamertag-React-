import React, { useContext, useEffect, useState,useCallback } from 'react';
// import {onSnapshot} from "firebase/firestore"
import CreatePost from '../CreatePost/CreatePost.js'
import './Feed.css'
import Post from '../Post/Post.jsx';
import firebase from '../../AuthAndFirestoreFile'
import { useInfiniteQuery } from "react-query";
import AuthContext from '../../contexts/AuthContextProvider.js';


export default function Feed() {
    const [uid, setUid] = useContext(AuthContext)
    const fetchPostsFirebase = async () => {
        const results = await colectData();

        return { results};
    };
    function getStyle(Style){
        let newStyle = Style
        switch(newStyle){
            case "Esportes":
                newStyle = "esportes"
                return newStyle
            case "2D":
                newStyle = "twoD"
                return newStyle
            case "3D Games":
                newStyle = "threeD"
                return newStyle
            case "Luta":
                newStyle = "luta"
                return newStyle
            case "FPS":
                newStyle = "fps"
                return newStyle
            case "Party Games":
                newStyle = "partygames"
                return newStyle
            case "Survival":
                newStyle = "survival"
                return newStyle
            case "Roguelike":
                newStyle="roguelike"
                return newStyle
            case "Metroidvania":
                newStyle="metroidvania"
                return newStyle
            case "Moba":
                newStyle = "moba"
                return newStyle
            case "Mmorpg":
                newStyle="mmorpg"
                return newStyle
            case "Furtivo":
                newStyle="furtivo"
                return newStyle
            case "Plataforma":
                newStyle="plataforma"
                return newStyle
            case "RTS":
                newStyle = "rts"
                return newStyle
            case "Puzzle":
                newStyle="puzzle"
            case "Tiro":
                newStyle="tiro"
                return newStyle
            case "Ritmico":
                newStyle="ritimo"
                return newStyle
            case "Simulação":
                newStyle="simulacao"
                return newStyle
            case "RPG":
                return newStyle
                newStyle="rpg"
                return newStyle
            case "Terror":
                newStyle="terror"
                return newStyle
        }
        
    }
    const {
        data,
        isLoading,
        isError,
    } = useInfiniteQuery("posts", fetchPostsFirebase);


    // async function colectData() {
    //     let userstyledata = await firebase.firestore().collection("estilos").doc(uid).get()
    //     let result = new Array;
    //     let snapshot = await firebase.firestore().collection("post").orderBy("data", "desc").get()
    //     let userdata = await firebase.firestore().collection("usuario").doc(uid).collection("amigos").get()
    //     snapshot.docs.forEach(async (doc) => {
    //             let isfriend = false
    //             for (const [x, g] of userdata.docs.entries()){
    //                 isfriend=true
    //                 break;
    //             }
    //             if(doc.data().useruid==uid || isfriend){
    //                 result.push(doc.data())
    //             }else{
    //                 for (const [x,i] of Object.entries(userstyledata.data())){
    //                     if(x==getStyle(doc.data().estilo)){
    //                         if(i){
    //                             result.push(doc.data())
    //                             break
    //                         }
    //                     }
    //                 }
    //             }
        
    //     })
    //     return result
    // }
    const colectData = useCallback(async ()=>{let userstyledata = await firebase.firestore().collection("estilos").doc(uid).get()
    let result = new Array;
    let snapshot = await firebase.firestore().collection("post").orderBy("data", "desc").get()
    let userdata = await firebase.firestore().collection("usuario").doc(uid).collection("amigos").get()
    snapshot.docs.forEach(async (doc) => {
            let isfriend = false
            for (const [x, g] of userdata.docs.entries()){
                if(g.id==doc.data().useruid){
                    isfriend=true
                    break;
                }
                
            }
            if(doc.data().useruid==uid || isfriend){
                result.push(doc.data())
            }else{
                for (const [x,i] of Object.entries(userstyledata.data())){
                    if(x==getStyle(doc.data().estilo)){
                        if(i){
                            result.push(doc.data())
                            break
                        }
                    }
                }
            }
    
    })
    return result},[])
   
        
    

    return (
        <div className="feed-grid">
            <CreatePost/>
            <main>
                {isLoading ? (
                    <p>Loading...</p>
                ) : isError ? (
                    <p>There was an error</p>
                ) : (
                    data.pages.map((page) =>
                        page.results.map((post) =>
                            <Post  key={post.postid} doc={post} />
                        )
                    )
                )}
            </main>
        </div>
    );
}