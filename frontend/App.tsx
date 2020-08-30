import * as React from 'react'
import TitleBar from './components/TitleBar'
import menu from "./Menu"
import EV from "../shared/Events"
import { ipcRenderer } from 'electron'
import { HashRouter, Switch, Route } from "react-router-dom"
import "./App.scss"
import GameMenu from './components/GameMenu'
import Board from './components/Board'

const App: React.FC<{}> = () => {
    const emitter: emitter = React.useCallback(({  ev, payload  })=>{
        switch (ev) {
            case EV.APP_MAXIMIZE:
                return new Promise((resolve, reject)=>{
                    ipcRenderer.send(EV.APP_MAXIMIZE)
                    ipcRenderer.once(EV.APP_MAXIMIZE_COMPLETE, (e)=> {
                        resolve()
                    })
                })
            case EV.APP_MINIMIZE:
                return new Promise((resolve, reject)=>{
                    ipcRenderer.send(EV.APP_MINIMIZE)
                    ipcRenderer.once(EV.APP_MINIMIZE_COMPLETE, (e)=> {
                        resolve()
                    })
                })
            case EV.APP_QUIT:
                return new Promise((resolve, reject)=>{
                    ipcRenderer.send(EV.APP_QUIT)
                    ipcRenderer.once(EV.APP_QUIT_COMPLETE, (e)=> {
                        resolve()
                    })
                })
            case EV.APP_UNMAXIMIZE:
                return new Promise((resolve, reject)=>{
                    ipcRenderer.send(EV.APP_UNMAXIMIZE)
                    ipcRenderer.once(EV.APP_UNMAXIMIZE_COMPLETE, (e)=> {
                        resolve()
                    })
                })
            case EV.APP_IS_MAXIMIZED:
                return new Promise((resolve, reject)=>{
                    ipcRenderer.send(EV.APP_IS_MAXIMIZED)
                    ipcRenderer.once(EV.APP_IS_MAXIMIZED_RETURN, (e, d)=> {
                        resolve(d)
                    })
                })
            case EV.APP_OPEN_DEVTOOLS:
                return new Promise((resolve, reject)=>{
                    ipcRenderer.send(EV.APP_OPEN_DEVTOOLS)
                    ipcRenderer.once(EV.APP_OPEN_DEVTOOLS_COMPLETE, (e)=>{
                        resolve()
                    })
                })
        }
        
    }, [])
    const bgRef = React.useRef<HTMLDivElement>();
    React.useLayoutEffect(()=>{
        function ev(){
            document.body.style.height = window.innerHeight + 'px'
            bgRef.current.style.height = window.innerHeight - 38 + 'px'
        }
        ev()
        window.addEventListener('resize', ev)
        return () => {window.removeEventListener('resize', ev)}
    }, [])
    return ( 
        <>
            <TitleBar {...{emitter, menu}} />
            <HashRouter>
                <div ref={bgRef} className="bg">
                <Switch>
                    <Route path="/" exact render={(props)=><GameMenu {...props} />} />
                    <Route path="/board/" exact render={(props)=> <Board {...props} />} />
                </Switch>
                </div>
            </HashRouter>
        </> 
     );
}
 
export default App