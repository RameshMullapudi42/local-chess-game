export default class ChessPiece{
    constructor(name, color){
      this.name = name;
      this.color = color;
    }
    isOfSameColor(piece){
      if(piece.color===this.color)
        return true;
      else
        return false;
    }
    isColorBlack(){
      if(this.color==="black") return true;
      else return false;
    }
    isColorWhite(){
      if(this.color==="white") return true;
      else return false;
    }
    isPawn(){
      if(this.name.startsWith("pawn")) return true;
      else return false;
    }
    isKnight(){
        if(this.name.startsWith("knight")) return true;
        else return false;
    }
    isRook(){
        if(this.name.startsWith("rook")) return true;
        else return false;
    }
    isKing(){
        if(this.name.startsWith("king")) return true;
        else return false;
    }
    isBishop(){
        if(this.name.startsWith("bishop")) return true;
        else return false;
    }
    isQueen(){
        if(this.name.startsWith("queen")) return true;
        else return false;
    }
  }