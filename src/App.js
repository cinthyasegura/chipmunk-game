import React, { Component } from 'react';
import './App.css';
import Score from './components/Score';


export class App extends Component {
  constructor() {
    super();
    const grid = [];
    for (let row = 0; row < 16; row++) {
      const cols = [];
      for (let col = 0; col < 16; col++) {
        cols.push({
          row,
          col
        });
      }
      grid.push(cols);
    }

    this.state = {
      grid,
      acorn: {
        row:  Math.floor(Math.random() * 16),
        col:  Math.floor(Math.random() * 16)
      },
      chipmunk: {
        head: {
          row: Math.floor(Math.random() * 16),
          col: Math.floor(Math.random() * 16)
        },
        tail: [],
        direction: {
          x: 1,
          y: 0
        },
      },
      gameOver: false
    };
  }

  
  setAcorn = (cell) => {
    const { acorn } = this.state;
    return acorn.row === cell.row 
      && acorn.col === cell.col;
  }

  setChipmunkHead = (cell) => {
    const { chipmunk: { head } } = this.state;
    return head.row === cell.row 
      && head.col === cell.col
  } 

  setChipmunkTail = (cell) => {
    const { chipmunk: { tail } } = this.state;
    return tail.find(theTail => theTail.row === cell.row && theTail.col === cell.col);   
  }


  setDirection = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 37:
        this.setState(({chipmunk}) => ({
          chipmunk: {
            ...chipmunk,
            direction: {
              x: 1,
              y: 0,
            }
          }
        }))
      break;
      case 38:
        this.setState(({chipmunk}) => ({
          chipmunk: {
            ...chipmunk,
            direction: {
              x: 0,
              y: 1,
            }
          }
        }))
      break;
      case 39:
        this.setState(({chipmunk}) => ({
          chipmunk: {
            ...chipmunk,
            direction: {
              x: -1,
              y: 0,
            }
          }
        }))
      break;
      case 40:
        this.setState(({chipmunk}) => ({
          chipmunk: {
            ...chipmunk,
            direction: {
              x: 0,
              y: -1,
            }
          }
        }))
      break;
      default:
        this.setState(({chipmunk}) => ({
          chipmunk: {
            ...chipmunk,
            direction: {
              x: -1,
              y: 0,
            }
          }
        }))
      break;
    }
  } 


  render() {
    const { grid, chipmunk, gameOver } = this.state;
    return (
      <>
        {
        gameOver
          ? <h1>Game Over! You scored {chipmunk.tail.length}!</h1>
          : <>
          <Score score={chipmunk.tail.length}/>
          <div className="grid">
          {
            grid.map(row => (
              row.map(cell => (
                <div  key={`${cell.row},${cell.col}`} className={`cell
                ${
                  this.setChipmunkHead(cell)
                  ? 'chipmunkHead': this.setAcorn(cell)
                  ? 'acorn': this.setChipmunkTail(cell)
                  ? 'tail': ''
                  }`
                }></div>
              ))
            ))
          }
        </div>
        </>
        }
      </>
    )
  }
}

export default App;

