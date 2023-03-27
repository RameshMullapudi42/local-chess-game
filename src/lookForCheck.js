import { getMovesForPiece } from "./getMoves";

export function lookForCheck(newBoardState, isPlayer1Turn) {
    //Find if we are checking for check on white or black King
    let lookForCheckFromColor = "";
    let king_position = [];
    if (isPlayer1Turn) {
        lookForCheckFromColor = "white";
    }
    else lookForCheckFromColor = "black";
    //find the position of target king
    for (let i=0;i<newBoardState.length;i++) {
        for (let j=0;j<newBoardState[i].length;j++) {
            if(newBoardState[i][j]!=null){
                if(lookForCheckFromColor==="white")
                    if(newBoardState[i][j].name==='king_black') king_position = [i,j];
                if(lookForCheckFromColor==="black")
                    if(newBoardState[i][j].name==='king_white') king_position = [i,j];
            }
            
        }
    }

    for (let i=0;i<newBoardState.length;i++) {
        for (let j=0;j<newBoardState[i].length;j++) {
            let piece = newBoardState[i][j];
            if(piece===null) continue;
            if (piece.color === lookForCheckFromColor) { //for each target colored piece
                let validMoves = getMovesForPiece(i,j,piece,newBoardState, isPlayer1Turn, true); //obtain valid moves
                for(let k=0;k<validMoves.length;k++){ //within valid moves
                    if(validMoves[k][0]===king_position[0] && validMoves[k][1]===king_position[1]){ // if move matches with king's position
                        return [true, [i,j]]; //declare check
                    }
                }
            }
        }
    }
    return [false,null];
}