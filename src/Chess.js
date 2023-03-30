import React, { useState, useEffect } from 'react';
import styles from './chess.module.css';
import Square from './Square';
import { lookForCheck } from './lookForCheck';
import isValidMove from './checkIfValidMove';
import initiateBoardState from './initiateBoardState';
import checkIfCheckMate from './checkIfCheckMate'
import * as Utils from './Utils.js';

function Chess() {
  function handleMove(row, col) {
    if (gameStatus === "Checkmate") return;
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
      if (newPiece != null && oldPiece.isOfSameColor(newPiece)) { //if both of of same color, ignore old selection and take this as new selection
        setSelectedSquare([row, col]);
        return;
      }
      if (isValidMove(row, col, selectedSquare, boardState, isPlayer1Turn)) {
        let newBoardState = boardState.map((array) => array.slice());
        newBoardState[row][col] = oldPiece;
        newBoardState[oldRow][oldCol] = null;
        let willBeCheckFromOpp = false;
        let checkFrom = [];
        [willBeCheckFromOpp, checkFrom] = lookForCheck(newBoardState, !isPlayer1Turn)
        if (willBeCheckFromOpp) {
          Utils.showInvalidMove('Invalid move!');
          return;
        }

        let isCheck = false;
        checkFrom = [];
        [isCheck, checkFrom] = lookForCheck(newBoardState, isPlayer1Turn)

        let isCheckMate = false;
        let defenceMove = null;
        if (isCheck) [isCheckMate, defenceMove] = checkIfCheckMate(newBoardState, isPlayer1Turn);

        newBoardState = boardState.map((array) => array.slice());
        if (newBoardState[row][col] !== null)
          if (lostPieces === null) setLostPieces([newBoardState[row][col]])
          else setLostPieces([...lostPieces, newBoardState[row][col]]);
        newBoardState[row][col] = oldPiece;
        newBoardState[oldRow][oldCol] = null;
        setSelectedSquare(null);
        setBoardState(newBoardState);
        setMoveCount(moveCount + 1);
        setIsPlayer1Turn(!isPlayer1Turn);
        if (isCheck) {
          if (isCheckMate) setGameStatus("Checkmate");
          else {
            setGameStatus("Check");
            setCheckFromSquare(checkFrom);
            setDefenceMove(defenceMove);
          }
        }
        else setGameStatus("");
      }
      else {
        Utils.showInvalidMove('Invalid move!');
        return;
      }
    }
  }

  const [boardState, setBoardState] = useState(initiateBoardState());
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [moveCount, setMoveCount] = useState(0);
  const [isPlayer1Turn, setIsPlayer1Turn] = useState(true);
  const [gameStatus, setGameStatus] = useState("");
  const [lostPieces, setLostPieces] = useState(null);
  const [checkFromSquare, setCheckFromSquare] = useState(null);
  const [defenceMove, setDefenceMove] = useState(null);

  if(false){ //to suppress warning
    console.log(checkFromSquare, defenceMove);
  }

  useEffect((effect) => {
    if (gameStatus !== "") {
      if (gameStatus === "Checkmate") {
        Utils.playSound('checkmate.mp3');
      }
      if (gameStatus === "Check") {
        Utils.playSound('check.mp3');
      }
    }
  }, [gameStatus]);

  const rows = new Array(8).fill(null);
  const columns = new Array(8).fill(null);

  return (
    <>
      <div className={`${styles["col-12"]} ${styles.chessBoardHeader}`}>
        <h1>Chess</h1>
      </div>
      {/* <div className={styles["col-2"]}>

      </div> */}
      <div className={`${styles["col-12"]} ${styles.chessBoardPage}`}>
        <div className={styles.player1Stats}>
            <div className={`${styles.playerStatsHeader} ${styles.player1Avatar} ${ isPlayer1Turn && styles.nextPlayerStyle}`}>
            </div>
          <div className={styles.playerStatsBody}>
            {
              lostPieces !== null && lostPieces.map(element => {
                if (element.color === "white") return <span className={`${styles[element.name]} ${styles.lostPiece}`}></span>
                return null;
              })
            }
          </div>
        </div>
      
      
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
      
      
        <div className={styles.player2Stats}>
            <div className={`${styles.playerStatsHeader} ${styles.player2Avatar} ${ !isPlayer1Turn && styles.nextPlayerStyle}`}>
            </div>

          <div className={styles.playerStatsBody}>
            {
              lostPieces !== null && lostPieces.map(element => {
                if (element.color === "black") return <span className={`${styles[element.name]} ${styles.lostPiece}`}></span>
                return null;
              })
            }
          </div>
        </div>
       
      </div>
      {/* <div className={styles["col-2"]}>
        
        </div> */}
        {gameStatus === "Checkmate" &&
          <div id="gameStatusSection" className={`${styles.gameStatusSection} ${styles.checkmate}`}>
              Checkmate! <br/>Game over
          </div>
        }
        {gameStatus === "Check" &&
          <div id="gameStatusSection" className={`${styles.gameStatusSection} ${styles["easeinout-animator"]}`}
            onAnimationEnd={Utils.hideElement}>
            Check!
          </div>
        }
        <div id="invalidMoveDiv" className={styles.hidden} onAnimationEnd={Utils.hideElement}>Invalid move!</div>
    </>
  );
}

export default Chess;
