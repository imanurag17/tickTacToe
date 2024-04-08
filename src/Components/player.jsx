import { useState} from "react"

export default function Player({initialName, symbol, isActive, onNameChange}) {
    const [playerName, setPlayerName] = useState(initialName)
    const [isEditing, SetisEditing] = useState(false)

    const handleClick = () => {
        SetisEditing((editing) => !editing)
        if(isEditing){
            onNameChange(symbol, playerName)
        }
    }
    

    const handleChange = (event) => {
        setPlayerName(event.target.value)
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>
    let btnCaption = 'Edit'
    if (isEditing) {
        editablePlayerName = <input type="text" value={playerName} onChange={handleChange} required/>
        btnCaption= "Save"
    }
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick = {handleClick}>{btnCaption}</button>
        </li>
    )
}