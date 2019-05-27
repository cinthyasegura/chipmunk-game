import React from 'react'

const Board = ({ score }) => {

  return (
    <>
      <h3 className="mb-3">Board</h3>
      <table className="table table-hover">
        <thead>
            <tr>
            <th className="tb-header">Partidas</th>
            <th className="tb-header">Puntaje</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    Partida #1
                </td>
                <td>
                    {score}
                </td>
            </tr>
        </tbody>
      </table>
    </>
  )

}

export default Board;
