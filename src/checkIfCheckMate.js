import checkForDefenceMove from "./checkIfDefeceMoveExists";

export default function checkIfCheckMate(newBoardState, player){
   const [defenceMoveExists, defenceMove] = checkForDefenceMove(newBoardState, !player)
   return [!defenceMoveExists, defenceMove];
}