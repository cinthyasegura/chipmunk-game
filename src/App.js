import React, { Component } from 'react';
import './App.css';
import Grid from './components/Grid';


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
      grid
    };
  }
  render() {
    const { grid } = this.state;
    return (
      <>
        <Grid />
        <div className="grid">
          {
            grid.map((row, i) => (
              row.map(cell => (
                <div className="cell"  key={`${cell.row} ${cell.col}`}></div>
              ))
            ))
          }
        </div>
      </>
    )
  }
}

export default App;

