import React, { useState, useContext} from 'react'
import gamertag__logo from '../img/gamertag__logo.png'
import { Link } from 'react-router-dom'
import '../css/Cadastro2.css'
import firebase from './AuthAndFirestoreFile.js';
import {Email} from './Cadastro'
import { useHistory } from "react-router-dom";
import AuthContext from './contexts/AuthContextProvider'
import usernopicture from '../img/usernopicture.png'
import { useCookies } from 'react-cookie';
function Cadastro2(){
  const [uid, setUid] = useContext(AuthContext)
  const [threed, setThreed] = useState(false);
  const [luta, setLuta] = useState(false);
  const [ptgames, setPtgames] = useState(false);
  const [roguelike, setRoguelike] = useState(false);
  const [survival, setSurvival] = useState(false);
  const [sports, setSports] = useState(false);
  const [mtdvania, setMtdVania] = useState(false);
  const [twoD, setTwoD] = useState(false);
  const [rpg, setRpg] = useState(false);
  const [terror, setTerror] = useState(false);
  const [fps, setFps] = useState(false);
  const [puzzle, setPuzzle] = useState(false);
  const [rts, setRts] = useState(false);
  const [tiro, setTiro] = useState(false);
  const [mmorpg, setMmorpgg] = useState(false);
  const [furtivo, setFurtivo] = useState(false);
  const [moba, setMoba] = useState(false);
  const [rythm, setRythm] = useState(false);
  const [simulat, setSimulat] = useState(false);
  const [platform, setPlatform] = useState(false);
  let history = useHistory();
  const [cookies, setCookies] = useCookies(['user']);


  async function registrarEstilos(){
    await firebase.firestore().collection("estilos").doc(Email)
      .set({
        threeD: threed,
        luta: luta,
        partygames: ptgames,
        roguelike: roguelike,
        survival: survival,
        esportes: sports,
        metroidvania: mtdvania,
        twoD: twoD,
        rpg: rpg,
        terror: terror,
        fps: fps,
        puzzle: puzzle,
        rts:rts,
        tiro: tiro,
        mmorpg: mmorpg,
        furtivo: furtivo,
        moba: moba,
        ritimo: rythm,
        simulacao: simulat,
        plataforma: platform
      });
      alert("Cadastrado com sucesso")
      setUid(Email)
      setCookies("id",Email, {post:"/"})
      history.push('/HomePage');
    
  }
  return(
<div>
        <header class="header">
          <Link to="/">
            <img
              src={gamertag__logo}
              alt="gamertag__logo"
              class="gamertag__logo2"
            />
          </Link>
        </header>
        <h1>Escolha seus estilos de jogo preferidos!</h1>
        <form>
          <div className="flex-component">
            <div className="grid-component">
              <article>
                <input type="checkbox" id="T3" name="3D" defaultChecked={false} onChange={((e) => setThreed(!threed))}/>
                
                <div>
                  <span>3D</span>
                </div>
              </article>
              <article>
                <input type="checkbox" id="LUTA" name="LUTA"defaultChecked={false} onChange={((e) => setLuta(!luta))}/>
                <div>
                  <span>LUTA</span>
                </div>
              </article>
              <article>
                <input type="checkbox" id="PARTY_GAMES" name="PARTY GAMES" defaultChecked={false} onChange={((e) => setPtgames(!ptgames))}/>
                <div>
                  <span>PARTY GAMES</span>
                </div>
              </article>
              <article>
                <input type="checkbox" id="ROGUELIKE" name="ROGUELIKE" defaultChecked={false} onChange={((e) => setRoguelike(!roguelike))}/>
                <div>
                  <span>ROGUELIKE</span>
                </div>
              </article>
              <article>
                <input
                  type="checkbox"
                  id="SOBREVIVÊNCIA"
                  name="SOBREVIVÊNCIA"
                  defaultChecked={false}
                  onChange={((e) => setSurvival(!survival))}
                />
                <div>
                  <span>SOBREVIVÊNCIA</span>
                </div>
              </article>
            </div>
            <div className="grid-component">
              <article>
                <input type="checkbox" id="ESPORTES" name="ESPORTES" defaultChecked={false} onChange={((e) => setSports(!sports))}/>
                <div>
                  <span>ESPORTES</span>
                </div>
              </article>
              <article>
                <input type="checkbox" id="METROIDVANIA" name="METROIDVANIA" defaultChecked={false}  onChange={((e) => setMtdVania(!mtdvania))}/>
                <div>
                  <span>METROIDVANIA</span>
                </div>
              </article>
              <article>
                <input type="checkbox" id="T2D" name="2D" defaultChecked={false}  onChange={((e) => setTwoD(!twoD))}/>
                <div>
                  <span>2D</span>
                </div>
              </article>
              <article>
                <input type="checkbox" id="RPG" name="RPG" defaultChecked={false}  onChange={((e) => setRpg(!rpg))}/>
                <div>
                  <span>RPG</span>
                </div>
              </article>
              <article>
                <input
                  type="checkbox"
                  id="TERROR"
                  name="TERROR"
                  defaultChecked={false}
                  onChange={((e) => setTerror(!terror))}
                />
                <div>
                  <span>TERROR</span>
                </div>
              </article>
            </div>
            <div className="grid-component">
              <article>
                <input type="checkbox" id="FPS" name="FPS"defaultChecked={false}  onChange={((e) => setFps(!fps))}/>
                <div>
                  <span>FPS</span>
                </div>
              </article>
              <article>
                <input type="checkbox" id="PUZZLE" name="PUZZLE" defaultChecked={false}  onChange={((e) => setPuzzle(!puzzle))}/>
                <div>
                  <span>PUZZLE</span>
                </div>
              </article>
              <article>
                <input type="checkbox" id="RTS" name="RTS" defaultChecked={false}  onChange={((e) => setRts(!rts))}/>
                <div>
                  <span>RTS</span>
                </div>
              </article>
              <article>
                <input type="checkbox" id="TIRO" name="TIRO" defaultChecked={false}  onChange={((e) => setTiro(!tiro))}/>
                <div>
                  <span>TIRO</span>
                </div>
              </article>
              <article>
                <input type="checkbox" id="MMORPG" name="MMORPG" defaultChecked={false}  onChange={((e) => setMmorpgg(!mmorpg))}/>
                <div>
                  <span>MMORPG</span>
                </div>
              </article>
            </div>
            <div className="grid-component">
              <article>
                <input type="checkbox" id="FURTIVO" name="FURTIVO" defaultChecked={false} onChange={((e) => setFurtivo(!furtivo))}/>
                <div>
                  <span>FURTIVO</span>
                </div>
              </article>
              <article>
                <input type="checkbox" id="MOBA" name="MOBA" defaultChecked={false} onChange={((e) => setMoba(!moba))}/>
                <div>
                  <span>MOBA</span>
                </div>
              </article>
              <article>
                <input type="checkbox" id="RITMICO" name="RITMICO" defaultChecked={false} onChange={((e) => setRythm(!rythm))}/>
                <div>
                  <span>RÍTMICO</span>
                </div>
              </article>
              <article>
                <input type="checkbox" id="SIMULACAO" name="SIMULACAO" defaultChecked={false} onChange={((e) => setSimulat(!simulat))}/>
                <div>
                  <span>SIMULAÇÃO</span>
                </div>
              </article>
              <article>
                <input
                  type="checkbox"
                  id="PLATAFORMA"
                  name="PLATAFORMA"
                  defaultChecked={false}
                  onChange={((e) => setPlatform(!platform))}
                />
                <div>
                  <span>PLATAFORMA</span>
                </div>
              </article>
            </div>
          </div>
        </form>
        <button class="avancar" onClick={registrarEstilos}>AVANÇAR</button>
      </div>
  )
}


export default Cadastro2