import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


class Board extends Component {

  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25
  }

  constructor(props) {
    super(props);
    this.state={
      hasWon:false,
      board: this.createBoard()
     }
  }


  createBoard() {
    let board = [];
    for(let y = 0; y < this.props.nrows; y++){
      let row = [];
      for(let x = 0; x < 5; x++){
        row.push(Math.random() < this.props.chanceLightStartsOn)
      }
      board.push(row);
    }
    return board
  }

  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    flipCell(y,x);
    flipCell(y-1,x);
    flipCell(y+1,x);
    flipCell(y,x-1);
    flipCell(y,x+1);

   let hasWon = board.every(row => row.every(cell => !cell));
    
    this.setState({board:board, hasWon:hasWon});
  }


  render() {
    if(this.state.hasWon){
      return <div className="winner">
        <div className="neon-orange">You</div>
        <div className="neon-blue">Won</div>
      </div>
    }

    let tableBoard = [];
    for (let y = 0; y < this.props.nrows; y++){
      let row = [];
      for(let x = 0; x < this.props.ncols; x++){
        let coord = `${y}-${x}`;
        row.push(
        <Cell 
        key={coord} 
        isLit={this.state.board[y][x]} 
        flipCellsAroundMe={() => this.flipCellsAround(coord)}
        />);
      }

    tableBoard.push(<tr>{row}</tr>);
    }
    return(
      <div>
        <div className="Board-title">
          <div className="neon-orange">Lights</div>
          <div className="neon-blue">Out</div>
        </div>
        <table className="Board">
          <tbody>
            {tableBoard}
          </tbody>
        </table>
      </div>
    )

  }
}


export default Board;
