export function getMovesForPiece(row, col, piece, boardState, isPlayer1Turn) {

    function pushIfValid(validMoves, piece, new_row, new_col) { // returns true if pushed and piece at new location
        let pieceAtThisMove = null;
        
        if (!(new_row < 0 || new_row > 7 || new_col < 0 || new_col > 7)) { // if not out of range
           
            pieceAtThisMove = boardState[new_row][new_col];
            if (pieceAtThisMove == null || !pieceAtThisMove.isOfSameColor(piece)) {
                validMoves.push([new_row, new_col]);
                return [true, pieceAtThisMove];
            }
        }
        return [false, pieceAtThisMove];
    }

    let validMoves = Array(0);
    if (piece.isPawn()) {
        let moveDirection = isPlayer1Turn ? 1 : -1;
        pushIfValid(validMoves, piece, row + moveDirection, col);
        if(row + moveDirection>=0 && row + moveDirection<=7 && col + 1>=0 && col + 1<=7){
            if(boardState[row + moveDirection][col + 1]!=null && !boardState[row + moveDirection][col + 1].isOfSameColor(piece) )
            pushIfValid(validMoves, piece, row + moveDirection, col + 1);
        }
        if(row + moveDirection>=0 && row + moveDirection<=7 && col - 1>=0 && col - 1<=7){
            if(boardState[row + moveDirection][col - 1]!=null && !boardState[row + moveDirection][col - 1].isOfSameColor(piece) )
            pushIfValid(validMoves, piece, row + moveDirection, col - 1);
        }
        if (row === 1 || row === 6) {
            pushIfValid(validMoves, piece, row + 2 * moveDirection, col);
        }
    }
    else if (piece.isKnight()) {
        pushIfValid(validMoves, piece, row + 2, col + 1);
        pushIfValid(validMoves, piece, row + 2, col - 1);
        pushIfValid(validMoves, piece, row - 2, col + 1);
        pushIfValid(validMoves, piece, row - 2, col - 1);
        pushIfValid(validMoves, piece, row + 1, col + 2);
        pushIfValid(validMoves, piece, row + 1, col - 2);
        pushIfValid(validMoves, piece, row - 1, col + 2);
        pushIfValid(validMoves, piece, row - 1, col - 2);
    }
    else if (piece.isRook()) {
        let pieceAtTargetSquare = null;
        let isPushed = true;
        let i = 1;
        while (isPushed) { //loop until column 0
            [isPushed, pieceAtTargetSquare] = pushIfValid(validMoves, piece, row, col - i);
            if (isPushed && pieceAtTargetSquare == null) i++;
            else break;
        }
        isPushed = true;
        i = 1;
        while (isPushed) { //loop until column 7
            [isPushed, pieceAtTargetSquare] = pushIfValid(validMoves, piece, row, col+i);
            if (isPushed && pieceAtTargetSquare == null) i++;
            else break;
        }
        isPushed = true;
        i = 1;
        while (isPushed) { //loop until row 0
            [isPushed, pieceAtTargetSquare] = pushIfValid(validMoves, piece, row - i, col);
            if (isPushed && pieceAtTargetSquare == null) i++;
            else break;
        }
        isPushed = true;
        i = 1;
        while (isPushed) { //loop until row 7
            [isPushed, pieceAtTargetSquare] = pushIfValid(validMoves, piece, row + i, col);
            if (isPushed && pieceAtTargetSquare == null) i++;
            else break;
        }
    }
    else if (piece.isKing()) {
        pushIfValid(validMoves, piece, row, col + 1);
        pushIfValid(validMoves, piece, row, col - 1);
        pushIfValid(validMoves, piece, row + 1, col);
        pushIfValid(validMoves, piece, row + 1, col - 1);
        pushIfValid(validMoves, piece, row + 1, col + 1);
        pushIfValid(validMoves, piece, row - 1, col);
        pushIfValid(validMoves, piece, row - 1, col + 1);
        pushIfValid(validMoves, piece, row - 1, col - 1);
    }
    else if (piece.isBishop()) {
        let pieceAtTargetSquare = null;
        let isPushed = true;
        let i = 1;
        while (isPushed) { //loop until column 0
            [isPushed, pieceAtTargetSquare] = pushIfValid(validMoves, piece, row + i, col + i);
            if (isPushed && pieceAtTargetSquare == null) i++;
            else break;
        }
        isPushed = true;
        i = 1;
        while (isPushed) { //loop until column 0
            [isPushed, pieceAtTargetSquare] = pushIfValid(validMoves, piece, row + i, col - i);
            if (isPushed && pieceAtTargetSquare == null) i++;
            else break;
        }
        isPushed = true;
        i = 1;
        while (isPushed) { //loop until column 0
            [isPushed, pieceAtTargetSquare] = pushIfValid(validMoves, piece, row - i, col + i);
            if (isPushed && pieceAtTargetSquare == null) i++;
            else break;
        }
        isPushed = true;
        i = 1;
        while (isPushed) { //loop until column 0
            [isPushed, pieceAtTargetSquare] = pushIfValid(validMoves, piece, row - i, col - i);
            if (isPushed && pieceAtTargetSquare == null) i++;
            else break;
        }
    }
    else if (piece.isQueen()) {
        let pieceAtTargetSquare = null;
        let isPushed = true;
        let i = 1;
        while (isPushed) { //loop until column 0
            [isPushed, pieceAtTargetSquare] = pushIfValid(validMoves, piece, row, col - i);
            if (isPushed && pieceAtTargetSquare == null) i++;
            else break;
        }
        isPushed = true;
        i = 1;
        while (isPushed) { //loop until column 7
            [isPushed, pieceAtTargetSquare] = pushIfValid(validMoves, piece, row, col + i);
            if (isPushed && pieceAtTargetSquare == null) i++;
            else break;
        }
        isPushed = true;
        i = 1;
        while (isPushed) { //loop until row 0
            [isPushed, pieceAtTargetSquare] = pushIfValid(validMoves, piece, row - i, col);
            if (isPushed && pieceAtTargetSquare == null) i++;
            else break;
        }
        isPushed = true;
        i = 1;
        while (isPushed) { //loop until row 7
            [isPushed, pieceAtTargetSquare] = pushIfValid(validMoves, piece, row + i, col);
            if (isPushed && pieceAtTargetSquare == null) i++;
            else break;
        }
        isPushed = true;
        i = 1;
        while (isPushed) { //loop until column 0
            [isPushed, pieceAtTargetSquare] = pushIfValid(validMoves, piece, row + i, col + i);
            if (isPushed && pieceAtTargetSquare == null) i++;
            else break;
        }
        isPushed = true;
        i = 1;
        while (isPushed) { //loop until column 0
            [isPushed, pieceAtTargetSquare] = pushIfValid(validMoves, piece, row + i, col - i);
            if (isPushed && pieceAtTargetSquare == null) i++;
            else break;
        }
        isPushed = true;
        i = 1;
        while (isPushed) { //loop until column 0
            [isPushed, pieceAtTargetSquare] = pushIfValid(validMoves, piece, row - i, col + i);
            if (isPushed && pieceAtTargetSquare == null) i++;
            else break;
        }
        isPushed = true;
        i = 1;
        while (isPushed) { //loop until column 0
            [isPushed, pieceAtTargetSquare] = pushIfValid(validMoves, piece, row - i, col - i);
            if (isPushed && pieceAtTargetSquare == null) i++;
            else break;
        }
    }
    return validMoves;
}