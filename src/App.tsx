import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Game from './pages/Game'
import Home from './pages/Home'
import OnlineLobby from './pages/OnlineLobby'
import OnlineGame from './pages/OnlineGame'
import GameContextProvider from './contexts/GameContextProvider'

function App() {

  return (
    <>
      <Router>
        <GameContextProvider>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/game' Component={Game}/>
          <Route path='/online-lobby' Component={OnlineLobby}/>
          <Route path='/online-game' Component={OnlineGame}/>
        </Routes>
        </GameContextProvider>
      </Router>
    </>
  )
}

export default App
