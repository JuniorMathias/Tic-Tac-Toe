import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const Square = (props) => {

  return (
    <button
      className="square"
      onClick={props.onClickEvent}>
      {props.value}
    </button> // irá chamar quando tiver clicada e tá mostrando a posição 

  );
};

const Board = () => {
  const initialSquares = Array(9).fill(null);// passing the value null to all Squares initial
  const [squares, setSquares] = useState(initialSquares);
  const [xIsNext,setXIsNext] = useState(true); // checking who is the next player variable boolean

  const handleClickEvent = (i) => {
    // 1.make a copy of squares state array 
    const newSquares = [...squares]; // copying the value of Squares array
    const winnerDeclared = Boolean(calculateWinner(newSquares)); //this will return if we have a winner or not if yes will show who is
    const squareFilled = Boolean(newSquares[i]); // checking if the square has been clicked already
    if(winner || squareFilled){
      return;
    }
    
    //2. mutate the copy, setting the i - th element to 'X''
    newSquares[i] = xIsNext ? 'X' : 'O'; // checking who is the next and saying by conditional
    //3. call the setSquares function with the mutated copy
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }
  const renderSquare = (i) => {

    return (
      <Square value={squares[i]}
        onClickEvent={() => handleClickEvent(i)}
      /> // passing the value to array and get i as paramenter
    );
  }
const winner = calculateWinner(squares); // who calculate a winner and passes a paramenter  
const status = winner ? 
  `The Winner is the player ${winner} ` :
    ` Next Player : ${xIsNext ? 'X' : 'O'} ` ;
  return (
    <div className="status">

      <div>{status}</div>
      <div className="board-row">
        {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
      </div>
    </div>

  )
};
const Game = () => {
  return (
    <div className=" game" >
      Tic-Tac-Toe
      <Board />
    </div>
  );
};
ReactDOM.render(
  <Game />,
  document.getElementById('root')

);

function calculateWinner(squares){
  const lines = [
    [0,1,2],[3,4,5],[6,7,8], // this is the calculate of Horizontal combinations {rows} 
    [0,3,6],[1,4,7],[2,5,8], // this is the calculate of Vertical combinations {coluns}
    [0,4,8],[2,4,6], // this is the calculate of diagonals combinations
  ];

  for(let line of lines){ // creating a loop and a let LINE
    const [a,b,c] = line; //Array catching the values of lines
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){ // checking if the 3 lines are the same
      return squares[a]; // 'X'or 'O'
    }
  }
  return null;
}