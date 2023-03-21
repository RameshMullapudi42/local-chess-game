import styles from './chess.module.css';

export default function Square({ row, col, chessPiece, isSelected, handleClick }) {
    let square_style = "";
    if ((row + col) % 2 === 0)
      square_style = `${styles.square} ${styles.whiteSquare}`;
    else
      square_style = `${styles.square} ${styles.blackSquare}`;
  
    if (chessPiece != null) {
      square_style = square_style + " " + `${styles[chessPiece.name]}`;
    }
    if (isSelected) {
      square_style = square_style + " " + `${styles.selected_square}`;
    }
    return (
      <button className={square_style} onClick={handleClick}></button>
    )
  }
  