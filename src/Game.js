import React, { Component } from 'react';
import './Game.css';
import Board from './Board';

const getRandomPosition = () =>  Math.floor(Math.random() * 16)
const getRandomChipmunk =  Math.floor(Math.random() * 12 + 2)

export class Game extends Component {
  constructor() {
    super();
    const grid = [];
    for (let row = 0; row < 16; row++) {      
      const cols = [];
      for (let col = 0; col < 16; col++) {
        cols.push({ row, col });
      }
      grid.push(cols);
    }

    this.state = {
      grid,
      acorn: {
        row: getRandomPosition(),
        col: getRandomPosition()
      },
      gameOver: false,
      scores: [],
      chipmunk: {
        head: {
          row: getRandomChipmunk,
          col: getRandomChipmunk
        },
        tail: [
          {
            row: getRandomChipmunk,
            col: getRandomChipmunk - 1
          },
          {
            row: getRandomChipmunk,
            col: getRandomChipmunk - 2
          }
        ],
        direction: {
          x: 1,
          y: 0
        }
      }
    }
  };

  componentDidMount = () => {
    document.addEventListener('keydown', (e) => {
      this.setDirection(e);
    });
    setInterval(() => {
      this.game()
    }, this.state.chipmunk.tail.length ? (500 / this.state.chipmunk.tail.length) + 300 : 500); 
  };  

  componentWillUnmount = () => {
    clearInterval(this.game())
  }

  setAcorn = (cell) => {
    const { acorn } = this.state;
    return acorn.row === cell.row && acorn.col === cell.col;
  }
  setChipmunkHead = (cell) => {
    const { chipmunk: { head } } = this.state;
    return head.row === cell.row && head.col === cell.col
  } 
  setChipmunkTail = (cell) => {
    const { chipmunk: { tail } } = this.state;
    return tail.find(theTail => theTail.row === cell.row && theTail.col === cell.col); 
  }

  collidesWithEdge = () => {
    const { chipmunk: { head } } = this.state;
      if (head.col > 15
      || head.col < 0
      || head.row > 15
      || head.row < 0) {
    return true;
    }
  }

  collidesWithAcorn = () => {
    const { acorn, chipmunk: { head } } = this.state;
    return acorn.row === head.row && acorn.col === head.col;
  };

  getRandomAcorn = () => {
    const { chipmunk: { head } } = this.state;
    const newAcorn = {
      row: getRandomPosition(),
      col: getRandomPosition()
    };
    if (head.row === newAcorn.row && head.col === newAcorn.col) {
      return this.getRandomAcorn();
    } else {      
      return newAcorn;
    }
  };

  game = () => {
    if (this.state.gameOver) return;
    this.setState(({ chipmunk, acorn }) => {
      const nextState = {
        chipmunk: {
          ...chipmunk,
          head: {
            row: chipmunk.head.row + chipmunk.direction.y,
            col: chipmunk.head.col + chipmunk.direction.x
          },
          tail: [chipmunk.head, ...chipmunk.tail]
          },
          acorn: this.collidesWithAcorn() ? this.getRandomAcorn() : acorn,

        };
      if (!this.collidesWithAcorn()) nextState.chipmunk.tail.pop();
      return nextState;
    }, () => {
      if (this.collidesWithEdge()) {
        this.setState({
          gameOver: true,
        });
        return;
      }
    });
  }

  updateState = () => {
    this.setState(({ scores, chipmunk }) => {
      const nextState = {
        acorn: {
          row: getRandomPosition(),
          col: getRandomPosition()
        },
        gameOver: false,
        scores: [...scores, chipmunk.tail.length - 2],
        chipmunk: {
          head: {
            row: getRandomChipmunk,
            col: getRandomChipmunk
          },
          tail: [
            {
              row: getRandomChipmunk,
              col: getRandomChipmunk - 1
            },
            {
              row: getRandomChipmunk,
              col: getRandomChipmunk - 2
            }
          ],
          direction: {
            x: 1,
            y: 0
          }
        }
      };
      return nextState;
    });
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
    const { grid, chipmunk, gameOver, scores } = this.state;
    return (
      <>
        <div className="container">
          <h1 className="text-center mb-5">Chipmunk Game</h1> 
          <div className="col-md-6 mb-4">
            <h3 className="d-inline col-md-3">Score actual:  {chipmunk.tail.length - 2}</h3>
            {
            gameOver &&
            <button 
              type="button"
              className="btn btn-success d-inline ml col-md-4" 
              onClick={this.updateState}
            >Jugar de nuevo</button>
            } 
          </div>
                 
          <div className="row">
            <section className="col-md-6">
              <div className="grid">
                {
                  grid.map(row => (
                    row.map(cell => ( 
                      <div key={`${cell.row},${cell.col}`} className={`cell
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
            </section>
            <div className="col-md-4">
              <Board scores={scores} />
            </div>
          </div>
        </div>         
      </>
    )
  }
}

export default Game;