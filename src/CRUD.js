import { useState, useEffect } from 'react';
import './CRUD.css'

function CRUD () {
const API_URL = 'https://64f3c773932537f40519fc39.mockapi.io/Users/Users'
const [game, setGame] = useState([{
    game_title: 'Ratchet and Clank',
    developer: 'Insomniac',
    release: 'November 4, 2002'
}])

const [newGameTitle, setNewGameTitle] = useState('')
const [newDeveloper, setNewDeveloper] = useState('')
const [newReleaseDate, setNewReleaseDate] = useState('')

const [updatedGameTitle, setUpdatedGameTitle] = useState('')
const [updatedDeveloper, setUpdatedDeveloper] =  useState('')
const [updatedReleaseDate, setUpdatedReleaseDate] = useState('')

function getGames() {
    fetch(API_URL)
    .then(data => data.json())
    .then(data => setGame(data))
}

useEffect(() => {
    getGames()
}, [])

function deleteGame(id) {
    fetch(`${API_URL}/${id}`,{ 
    method: "DELETE"})
    .then(() => getGames())
}

function updateGame(e, gameObject) {
    e.preventDefault()

    let updatedGameObject = {
        ...gameObject,
        game_title: updatedGameTitle,
        developer: updatedDeveloper,
        release: updatedReleaseDate
    }
    fetch(`${API_URL}/${gameObject.id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updatedGameObject)
    }).then(() => getGames())
}

function postNewGame(e) {
    e.preventDefault() 
    
    fetch(`${API_URL}` ,{  
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        game_title: newGameTitle,
        developer: newDeveloper,
        release: newReleaseDate
    })
}).then(() => getGames())
}

return(
    <div>
        <form className= 'container m-5 form-control'>
            <h3 className='text-center'>POST NEW GAME</h3>
            <div>
            <label className='m-2'>Game Title</label>
            <input className='m-2 form-control' onChange={(e) => setNewGameTitle(e.target.value)} placeholder='Input here:'></input>
            </div>
            <div>
            <label className='m-2'>Developer</label>
            <input className='m-2 form-control' onChange={(e) => setNewDeveloper(e.target.value)} placeholder='Input here:'></input>
            </div>
            <div>
            <label className='m-2'>Release Date</label>
            <input className='m-2 form-control' onChange={(e) => setNewReleaseDate(e.target.value)} placeholder='Input here:'></input>
            </div>
            <button className='btn btn-primary form-control' onClick={(e) => postNewGame(e)}>POST</button>
        </form>
        {game.map((game, index) => (
            <div className='card container m-5' key = {index} >
                <div className='card-header'>
                <p><strong>Game Title: </strong> {game.game_title}</p>
                <p><strong> Developer:</strong> {game.developer}</p>
                <p> <strong> Release Date: </strong>{game.release}</p>
                </div>
                
                
                <form className='card-body' key={index}>
                    <h4>Update This Game:</h4>
                    <label className='m-2'>Change Title:
                    <input className='m-2' onChange={(e) => setUpdatedGameTitle(e.target.value)}></input></label>
                     <br></br>

                    <label className='m-2'>Change Developer:
                    <input className='m-2' onChange={(e) => setUpdatedDeveloper(e.target.value)}></input></label>
                     <br></br>

                    <label className='m-2'>Change Release:
                    <input className='m-2' onChange={(e) => setUpdatedReleaseDate(e.target.value)}></input></label>
                    
                    <button className='btn btn-warning' onClick={(e) => updateGame(e, game)}>UPDATE</button> <br></br>
                    <button onClick={() => deleteGame(game.id)} className='btn btn-danger'>🗑DELETE GAME🗑</button>
                </form>
            </div> 
    ))}
    </div>
)

}
export default CRUD

