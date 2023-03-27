import { getMovesForPiece } from "./getMoves";

export default function isValidMove(row, col, selectedSquare, boardState, isPlayer1Turn) {
    let validMoves = Array(0);
    let old_row = selectedSquare[0];
    let old_col = selectedSquare[1];
    let oldPiece = boardState[old_row][old_col];

    validMoves = getMovesForPiece(old_row, old_col, oldPiece, boardState, isPlayer1Turn, false);
   

    for (let i in validMoves) {
      if (row === validMoves[i][0] && col === validMoves[i][1]) {
        return true;
      }
    }
  }