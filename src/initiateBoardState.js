import ChessPiece from "./ChessPiece";

export default function initiateBoardState() {
    const initialBoardState = [
      [
        new ChessPiece('rook_white', "white"),
        new ChessPiece('knight_white', "white"),
        new ChessPiece('bishop_white', "white"),
        new ChessPiece('king_white', "white"),
        new ChessPiece('queen_white', "white"),
        new ChessPiece('bishop_white', "white"),
        new ChessPiece('knight_white', "white"),
        new ChessPiece('rook_white', "white")
      ],
      [
        new ChessPiece('pawn_white', "white"),
        new ChessPiece('pawn_white', "white"),
        new ChessPiece('pawn_white', "white"),
        new ChessPiece('pawn_white', "white"),
        new ChessPiece('pawn_white', "white"),
        new ChessPiece('pawn_white', "white"),
        new ChessPiece('pawn_white', "white"),
        new ChessPiece('pawn_white', "white")
      ],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [
        new ChessPiece('pawn_black', "black"),
        new ChessPiece('pawn_black', "black"),
        new ChessPiece('pawn_black', "black"),
        new ChessPiece('pawn_black', "black"),
        new ChessPiece('pawn_black', "black"),
        new ChessPiece('pawn_black', "black"),
        new ChessPiece('pawn_black', "black"),
        new ChessPiece('pawn_black', "black")
      ],
      [
        new ChessPiece('rook_black', "black"),
        new ChessPiece('knight_black', "black"),
        new ChessPiece('bishop_black', "black"),
        new ChessPiece('king_black', "black"),
        new ChessPiece('queen_black', "black"),
        new ChessPiece('bishop_black', "black"),
        new ChessPiece('knight_black', "black"),
        new ChessPiece('rook_black', "black")
      ],
    ]
    return initialBoardState;
  }
  