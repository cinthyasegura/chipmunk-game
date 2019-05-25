import React, { Component } from 'react';
import Header from './Header'
import './Grids.css';

const getRandomPosition = () =>  Math.floor(Math.random() * 16)

export class Grids extends Component {
  constructor() {
    super();
    const grid = []
    for (let row = 0; row < 16; row++) {
      
      const cols = [];
      for (let col = 0; col < 16; col++) {
        cols.push({ row, col });
      }
      grid.push(cols);
    }
  
    this.state = {
      grid,
      gameOver: false,
      acorn: {
        row: getRandomPosition(),
        col: getRandomPosition()
      },
      chipmunk: {
        head: {
          row: getRandomPosition(),
          col: getRandomPosition()
        },
        tail: [],
        direction: {
          x: 1,
          y: 0
        }
      },
    }
  };

  componentDidMount = () => {
    document.addEventListener('keydown', (e) => {
      this.setDirection(e);
    });
    setTimeout(() => {
      this.moveChipmunk()
    }, 500); 
  }

  componentDidUpdate() {
    this.isOffEdge();
    this.checkIfEat();
  }
  

  setAcorn = (cell) => {
    const { acorn } = this.state;
    return acorn.row === cell.row && acorn.col === cell.col;
  }

  setChipmunkHead = (cell) => {
    const { chipmunk: { head } } = this.state;
    return head.row === cell.row && head.col === cell.col
  } 

  isOffEdge = () => {
    const { chipmunk: { head } } = this.state;
      if (head.col > 15 || head.col < 0 || head.row > 15 || head.row < 0) {
        return true;
    }
  }

  checkIfEat() {
    const { acorn, chipmunk } = this.state;
    if (acorn.row === chipmunk.head.row && acorn.col === chipmunk.head.col) {
      this.setState({
        acorn: {
          row: getRandomPosition(),
          col: getRandomPosition()
        }
      })
      return true;
      // this.enlargeSnake();
    }
  }

  enlargeTail() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([])
    this.setState({
      snakeDots: newSnake
    })
  }

  moveChipmunk() {
    if (this.isOffEdge()) { 
      this.setState({
        gameOver: true
      })
    }
    this.setState(({ chipmunk }) => ({
        chipmunk: {
          ...chipmunk,
          head: {
            row: chipmunk.head.row + chipmunk.direction.y,
            col: chipmunk.head.col + chipmunk.direction.x
          },
          tail: [chipmunk.head, ...chipmunk.tail]
        }
      }));
    setTimeout(() => {
      this.moveChipmunk()
    }, 500);
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
          ? <h1>Game Over! You scored {chipmunk.head.length}!</h1>
          : <>
            <Header score={chipmunk.tail.length}/>
            <div className="grid">
              {
              grid.map(row => (
                row.map(cell => (
                  <div key={`${cell.row},${cell.col}`} className={`cell
                  ${
                  this.setChipmunkHead(cell)
                  ? 'chipmunkHead': this.setAcorn(cell)
                  ? 'acorn': ''
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

export default Grids;