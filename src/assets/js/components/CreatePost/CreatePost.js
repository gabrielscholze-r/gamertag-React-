import React, { useState, useEffect, useContext } from 'react'
import './CreatePost.css'
import { UilImageUpload as UpImage } from '@iconscout/react-unicons'
import AuthContext from '../../contexts/AuthContextProvider'
import firebase from '../../AuthAndFirestoreFile'
import { v4 } from 'uuid';

function CreatePost() {
  const [picture, setPicture] = useState(null)
  const [Uid, setUid] = useContext(AuthContext)
  const [PostText, setPostText] = useState('')
  const [style, setStyle] = useState('2D')
  const [PostID, setPostid] = useState(v4())
  const [nome,setNome] = useState("")

  function handleKeyDown(e) {
    setPostText(e.target.value)
    e.target.style.height = 'inherit'
    const computed = window.getComputedStyle(e.target)

    // Calculate the height
    const height =
      parseInt(computed.getPropertyValue('border-top-width'), 10) +
      parseInt(computed.getPropertyValue('padding-top'), 10) +
      e.target.scrollHeight +
      parseInt(computed.getPropertyValue('padding-bottom'), 10) +
      parseInt(computed.getPropertyValue('border-bottom-width'), 10)

    e.target.style.height = `${height}px`
  }
  var x = true;
  async function postar() {
    if(!x){return}
    x=false
    var id = v4()
    setPostid(id);
    alert(PostID)
    if (PostText != '') {
      await firebase
        .firestore()
        .collection('post')
        .doc(PostID)
        .set({
          texto: PostText,
          useruid: Uid,
          estilo: style,
          data: new Date().getTime(),
          postid: PostID
          
        })
        .catch((error) => {
        })
      alert('postou no firebase')

      if (picture != null) {
        await firebase
          .storage()
          .ref(`posts/${PostID}`)
          .put(picture)
        alert('Postou no storage')
      }
      
    } else {
      alert('Digite algo para postar')
    }
    x=true;
  }

  return (
    <div className="post-grid">
      <textarea
        className="post-box"
        placeholder="O que esta pensando?"
        maxLength="300"
        wrap="soft"
        onChange={handleKeyDown}
      ></textarea>
      <div class="post-icons">
        <div class="wrapper">
          <select
            tabIndex
            class="selectbox-post"
            onChange={(e) => setStyle(e.target.value)}
          >
            <option class="optionbox">2D</option>
            <option class="optionbox">3D Games</option>
            <option class="optionbox">Luta</option>
            <option class="optionbox">Party Games</option>
            <option class="optionbox">Roguelike</option>
            <option class="optionbox">Survival</option>
            <option class="optionbox">Esportes</option>
            <option class="optionbox">Metroidvania</option>
            <option class="optionbox">RPG</option>
            <option class="optionbox">Terror</option>
            <option class="optionbox">FPS</option>
            <option class="optionbox">Puzzle</option>
            <option class="optionbox">RTS</option>
            <option class="optionbox">Tiro</option>
            <option class="optionbox">Mmorpg</option>
            <option class="optionbox">Furtivo</option>
            <option class="optionbox">Moba</option>
            <option class="optionbox">Ritmico</option>
            <option class="optionbox">Simulação</option>
            <option class="optionbox">Plataforma</option>
          </select>
        </div>
        <label>
          <input
            type="file"
            class="input-file"
            onChange={(e) => setPicture(e.target.files[0])}
            required="required"
          />
          <UpImage size="35" class="nav-image" />
        </label>
      </div>
        <button class="post-button" onClick={postar}>
          Postar
        </button>
    </div>
  )
}

export default CreatePost
