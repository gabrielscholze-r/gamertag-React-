import Button from 'react-bootstrap/Button';
import  './Post.css'
import { UilThumbsUp as LikeIcon, UilCommentAltMessage as CommIcon, UilPlus as Add, UilHeartBreak as Unfollow } from '@iconscout/react-unicons'
import { useContext, useState, useEffect, useCallback } from 'react';
import usernopicture from '../../../img/usernopicture.png'
import AuthContext from '../../contexts/AuthContextProvider'

import firebase from '../../AuthAndFirestoreFile'
// const listexample = [{
//     estilo1: true,
//     estilo2: false,
//     estilo3:false,
//     estilo4: true
// }]

function Post({doc}) {
    const [uid, setUid] = useContext(AuthContext);
    const [commentNumber, setCNumber] = useState(0)
    const [url, setURL] = useState(null)
    const [profile, setProfile] = useState(usernopicture)
    const [nome, setNome] = useState("")
    const [commentList, setComments] = useState([])
    const [comment, setComment] = useState("")
    const [text, setText] = useState("")  
    const [postStyle, setStyle] = useState("")
    const [likes, setLikes] = useState(0)
    const [curtiu, setCurtiu] = useState(true)
    const [commentUserPic, setCommentUserPic] = useState("")
    const [commentUserName, setCommentUserName] = useState("")

    const [follower, setFollower] = useState([])

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

    const coletarDados = useCallback(async () => {
        var boolvara = false 
        const postdata = await firebase.firestore().collection("post").doc(doc.postid).get()
        setText(postdata.data().texto)
        setStyle(postdata.data().estilo)
        const stylepost = getStyle(postStyle);
        let userstyledata = await firebase.firestore().collection("estilos").doc(uid).get()
        const username = await firebase.firestore().collection("usuario").doc(doc.useruid).get()
        setNome(username.data().nome)
        GerarComentario()
        

        const getlikes = await firebase.firestore().collection("post").doc(doc.postid).collection("likes").get()
        setCurtiu(getlikes.docs.map(doc => doc.id).indexOf(uid) !== -1)
        setLikes(getlikes.docs.length)
        follow()
        try{
            const postpic = await firebase.storage().ref(`posts/${doc.postid}`).getDownloadURL()
            setURL(postpic)
        }
        catch(e){setURL(null)}
        try{
            const fotoperfil = await firebase.storage().ref(`FotosPerfil/${doc.useruid}`).child("FotoPerfil").getDownloadURL()
            setProfile(fotoperfil)
            
        }
        catch(e){
            setProfile(usernopicture)
        }
    },[])
    useEffect(()=> {
        coletarDados()
        },[coletarDados])

    useEffect(()=>{
        GerarComentario()
    },[commentNumber])

    const LikePost = async (e) => {
        if (curtiu){
            await firebase.firestore().collection("post").doc(doc.postid).collection("likes").doc(uid).delete()
            setCurtiu(false);
            setLikes(likes-1)
        }else{
            await firebase.firestore().collection("post").doc(doc.postid).collection("likes").doc(uid).set({id: uid})
            setCurtiu(true);
            setLikes(likes+1)
        }
    }
    const EnviarComentario = async (e) => {
        e.preventDefault();
        setCNumber(commentNumber+1)
        const ComentarioParaEnviar = comment
        setComment("")
        await firebase.firestore().collection("post").doc(doc.postid).collection("comments").doc().set({
            text: ComentarioParaEnviar,
            data: new Date().getTime(),
            usuario: uid
        }).catch(e => {
            console.log(e)
        })
        alert("Comentario Publicado")
    }
    async function getUserData(userUID){
        let dados = await firebase.firestore().collection("usuario").doc(userUID).get()
        return dados.data().nome
    }
    async function GetProfilePicture(userUID){
        try{
            let dados =  await firebase.storage().ref(`FotosPerfil/${userUID}`).child("FotoPerfil").getDownloadURL()
            return dados
        }
        catch(e){
            return usernopicture
        }
        
    }
    async function GerarComentario(){
        const lista = []
        const dados = await firebase.firestore().collection("post").doc(doc.postid).collection("comments").orderBy("data", "desc").get();
        for (const [index, commdata] of dados.docs.entries()){
            let commentdata = commdata.data()
            let userData = await getUserData(commentdata.usuario)
            let CommentUserPicture = await GetProfilePicture(commentdata.usuario)
            
            lista.push(
                <div class="comment-component">
                    <div class="comment-info">
                        <img src={CommentUserPicture} class="comment-img"/>
                        <p class="comment-username">{userData}</p>
                    </div>
                    <p class="comment-text">{commentdata.text}</p>
                </div>
            )
        }
        setCNumber(lista.length)
        setComments(lista)
    }
    function likecolor(){
        let color = ""
        if(curtiu){
            color= "orange"
        }
        else{
             color= "white"
        }
        return color;
    }

    async function addFriends(){
        await firebase.firestore().collection("usuario").doc(uid).collection("amigos").doc(doc.useruid).set({
            friendid:doc.useruid
        })
        coletarDados()
        window.location.reload(false);
    }
    async function removeFriend(){
        await firebase.firestore().collection("usuario").doc(uid).collection("amigos").doc(doc.useruid).delete()
        coletarDados()
        window.location.reload(false);

    }

    async function follow(){
        let result = []
        const userdata = await firebase.firestore().collection("usuario").doc(uid).collection("amigos").get()
        if(uid==doc.useruid){

            result.push(<div ></div>)
            setFollower(result)
        }
        else{
            if(userdata.docs.length==0){
                result.push(
                    <div class="follow-button">
                        <Add class="unicon" onClick={addFriends}/>    
                    </div>
                )
                setFollower(result)
            }
            else{
                let boolvar = false
                for(const [key, value] of userdata.docs.entries()){
               
                    if(value.id==doc.useruid){
                        boolvar = true
                        break;
                    }
                }
                if(boolvar){
                    result.push(
                        <div class="unfollow-button"><Unfollow class="unicon" onClick={removeFriend}/></div>
                        
                    )
                    setFollower(result)
                }
                else{
                    result.push(
                        <div class="follow-button">
                            <Add class="unicon" onClick={addFriends}/>    
                        </div>
                        
                    )
                    setFollower(result)
                }
            }
        }  
    }
    

    return (
       
            <div class="post-container">
        
        <div class="post-header">
            {/* Header */}
            <div class="pic-name">
                <img src={profile} alt={nome} class="profilepic-user"/>
                <p class="text">{nome}</p>
            </div>
    
            <div>{follower}</div>
        </div>
            {/* Texto */}
                <div class="legenda">
                    <p class="legenda-foto">
                        {text}
                    </p>
                
            </div>
            {url!==null && (
                <div class="post-img-container">
                    <img src={url} class="post-image"/>
                </div>
            )}
            <div class="legenda-style">
    
                    <div class="likomment">
                        <div class="button-container">
                            <LikeIcon class="unicon " style={{color: likecolor()}} onClick={LikePost}/>
                            <div class="counter-likomment">{likes}</div>
                        </div>
                        
                        <div class="button-container">
                            <CommIcon class="unicon" />
                            <div class="counter-likomment">{commentNumber}</div>
                        </div>
                    </div>
               
                <p class="poststyle-text">{postStyle}</p>
    
            </div>
    
            
            {/* comentarios? */}
    
            {commentList}
            <form class="comment-section">
                <input type="text" value={comment} onChange={e => setComment(e.target.value)} class="comment-input" placeholder="Comente algo..."/>
                <button type="submit" disabled={!comment.trim()}  onClick={EnviarComentario} class="postcomment-button" >Postar</button>
                {/*  */}
            </form>
            
    </div>
    
    )
        
        
    
    
        
     
}

export default Post
