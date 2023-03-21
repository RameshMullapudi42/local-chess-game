import React, { useState } from 'react';
import styles from './chess.module.css';
import Square from './Square';
import { lookForCheck } from './lookForCheck';
import isValidMove from './checkIfValidMove';
import initiateBoardState from './initiateBoardState';
import checkIfCheckMate from './checkIfCheckMate'

function ChessBoard() {
  function handleMove(row, col) {
    if(gameStatus==="Checkmate") return;
    const newPiece = boardState[row][col];
    if (selectedSquare === null) { //First selection of non-empty square
      if (newPiece != null) { // allow player to select only his/her pieces
        if (isPlayer1Turn && newPiece.isColorBlack()) {
          return;
        }
        else if (!isPlayer1Turn && newPiece.isColorWhite()) {
          return;
        }
        setSelectedSquare([row, col]);
      }
    }
    else { //second selection
      let oldRow = selectedSquare[0];
      let oldCol = selectedSquare[1];
      let oldPiece = boardState[oldRow][oldCol];
      if (newPiece!=null && oldPiece.isOfSameColor(newPiece)) { //if both of of same color, ignore old selection and take this as new selection
        setSelectedSquare([row, col]);
        return;
      }
      if (isValidMove(row, col, selectedSquare, boardState, isPlayer1Turn)) { 
        let newBoardState = boardState.map((array) => array.slice());
        newBoardState[row][col] = oldPiece;
        newBoardState[oldRow][oldCol] = null;
        let willBeCheckFromOpp=false;
        let checkFrom = [];
        [willBeCheckFromOpp, checkFrom] = lookForCheck(newBoardState, !isPlayer1Turn)
        if(willBeCheckFromOpp) {
          alert("Invalid move. Leads to check for opponent.");
          return;
        }

        let isCheck=false;
        checkFrom = [];
        [isCheck, checkFrom] = lookForCheck(newBoardState, isPlayer1Turn)

        let isCheckMate=false;
        let defenceMove = null;
        if(isCheck) [isCheckMate,defenceMove] = checkIfCheckMate(newBoardState, isPlayer1Turn);

        newBoardState = boardState.map((array) => array.slice());
        newBoardState[row][col] = oldPiece;
        newBoardState[oldRow][oldCol] = null;
        setSelectedSquare(null);
        setBoardState(newBoardState);
        setMoveCount(moveCount + 1);
        setIsPlayer1Turn(!isPlayer1Turn);
        if(isCheck) 
        {
          if(isCheckMate) setGameStatus("Checkmate");
          else{
            setGameStatus("Check");
            setCheckFromSquare(checkFrom);
            setDefenceMove(defenceMove);
          } 

        }
        else setGameStatus("");        
      }
      else {
        alert('invalid move');
        return;
      }
    }
  }

  const [boardState, setBoardState] = useState(initiateBoardState());
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [moveCount, setMoveCount] = useState(0);
  const [isPlayer1Turn, setIsPlayer1Turn] = useState(true);
  const [gameStatus, setGameStatus] = useState("");
  const [checkFromSquare, setCheckFromSquare] = useState(null);
  const [defenceMove, setDefenceMove] = useState(null);


  const rows = new Array(8).fill(null);
  const columns = new Array(8).fill(null);

  var gameStatusHTML = "";
  if(gameStatus!==""){
    
    
       if(gameStatus==="Checkmate"){
        gameStatusHTML = <div className={styles.gameStatusSection}>
           <div> Game Status: Checkmate! Game over</div>
           </div>
        }
        if(gameStatus==="Check"){
          gameStatusHTML = <div className={styles.gameStatusSection}>
          <div>Game Status: Check!</div>
          </div>
        }
        
   
  }

  return (
    <div className={styles.chessBoardPage}>
      <div className={styles.chessBoardHeader}>Welcome!</div>
      <div className={styles.chessBoardBody}>
        <div className={styles.chessBoard}>
          {rows.map((row_item, row_idx) =>
            <div className={styles.chessBoardRow} key={row_idx}>
              {columns.map((col_item, col_idx) =>
                <Square row={row_idx} col={col_idx}
                  chessPiece={boardState[row_idx][col_idx]}
                  key={row_idx + "" + col_idx}
                  isSelected={(selectedSquare != null && selectedSquare[0] === row_idx && selectedSquare[1] === col_idx) ? true : false}
                  handleClick={() => handleMove(row_idx, col_idx)}
                />
              )}
            </div>
          )}
        </div>
        <div className={styles.gameStats}>
          <div className={styles.playerNamesSection}> 
            <div>Player1: Rishita</div>
            <div>Player2: Rajani</div>
          </div>
          <div className={styles.playerTurnSection}>
            <div>Next turn: {(isPlayer1Turn) ? "Rishita" : "Rajani"}</div>
            <div>Total moves: {moveCount}</div>
          </div>
          {gameStatusHTML}
        </div>
      </div>
    </div>
  );
}



export default ChessBoard;
