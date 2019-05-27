import React from 'react'

const Header = ({ score, playHandler }) => {
    return (
        <div>
            <h1 className="text-center mb-5">Chipmunk Game</h1> 
            <h3 className="d-inline">Score: {score}</h3>
            <button className="d-inline" onClick={() => playHandler()}>Jugar!</button>
        </div>
    )
}

export default Header
