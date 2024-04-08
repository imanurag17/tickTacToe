import { useState } from "react"

import Player from "./Components/player"
import GameBoard from "./Components/GameBoard"
import Log from "./Components/Log"
import GameOver from "./Components/GameOver"
import { WINNING_COMBINATIONS } from './winning-combinations'

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function deriveActivePlayer(gameTurn) {
  let currentPlayer = 'X'
  if (gameTurn.length > 0 && gameTurn[0].player === 'X') {
    currentPlayer = 'O'
  }
  return currentPlayer
}

function App() {
  const [players, setPlayers] = useState({
    X: 'Player 1',
    O: 'Player 2'
  })
  const [gameTurn, setGameTurn] = useState([])
  //const [activePlayer, setActivePalyer] = useState('X')
  const activePlayer = deriveActivePlayer(gameTurn)

  let gameBoard = [...initialGameBoard.map(array => [...array])]

  for (const turn of gameTurn) {
    const { square, player } = turn
    const { row, col } = square
    gameBoard[row][col] = player
  }

  let winner = null

  for (let combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol]
    }

  }

  const hasDraw = gameTurn.length === 9 && !winner

  const handleSelectSquare = (rowIndex, colIndex) => {
    //setActivePalyer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X')

    setGameTurn((prevTurns) => {
      // let currentPlayer = 'X'
      // if(prevTurns.length > 0 && prevTurns[0].player === 'X'){
      //   currentPlayer = 'O'
      // }
      const currentPlayer = deriveActivePlayer(prevTurns)
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer },
      ...prevTurns]
      return updatedTurns
    })
  }

  function handleRestart() {
    setGameTurn([])
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }

  return (
    <menu>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === 'X'}
            onNameChange = {handlePlayerNameChange} />
          <Player
            initialName="Player 2"
            symbol="0"
            isActive={activePlayer === 'O'} 
            onNameChange = {handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && (<GameOver winner={winner} onRestart={handleRestart} />)}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurn} />
    </menu>
  )
}

export default App
