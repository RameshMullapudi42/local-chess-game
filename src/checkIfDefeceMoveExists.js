import { getMovesForPiece } from "./getMoves";
import { lookForCheck } from "./lookForCheck";


export default function checkForDefenceMove(newBoardState, player){
    const lookForCheckFromColor = player? "white":"black";
    for (let i=0;i<newBoardState.length;i++) {
        for (let j=0;j<newBoardState[i].length;j++) {
            let piece = newBoardState[i][j];
            if(piece===null) continue;
            if (piece.color === lookForCheckFromColor) { //for each target colored piece
                let validMoves = getMovesForPiece(i,j,piece,newBoardState, player); //obtain valid moves
                for(let k=0;k<validMoves.length;k++){ //within valid moves
                    const [row_tempMove, col_tempMove] = validMoves[k];
                    let newBoardStateTemp = newBoardState.map((array)=> array.slice());
                    newBoardStateTemp[row_tempMove][col_tempMove]=newBoardState[i][j];
                    newBoardStateTemp[i][j] = null;
                    let isCheck = false;
                    let checkFrom = null;
                    [isCheck, checkFrom] = lookForCheck(newBoardStateTemp, !player);
                    if(isCheck) continue;
                    else return [true,[i,j,row_tempMove, col_tempMove]];
                }
            }
        }
    }
    return [false, null];
}