import React, { useRef, useState } from 'react';
import styles from './chess.module.css';
import Player from './Player.js'

import ChessBoard from './ChessBoard';
import CapturePlayers from './capturePlayers';

function Chess() {
  const [players, setPlayers] = useState([new Player(''), new Player('')]);
  const [gameId, setGameId] = useState(Date.now());
  const capturePlayersRef = useRef();

  function handlePlayersChange(newPlayers) {
    setPlayers(newPlayers);
    setGameId(Date.now());
  }

  return (
    <>
      <div className={`${styles["col-12"]} ${styles.chessBoardHeader}`}>
        <h1>Chess</h1>
        <div className={styles.chessBoardHeaderMenu}>
          <div><button className={styles.buttonAsLink} onClick={() => { capturePlayersRef.current.show() }}>Reset</button></div>
        </div>
      </div>
      <ChessBoard key={gameId} players={players} />

      <CapturePlayers
        localplayers={players}
        handlePlayersChange={handlePlayersChange}
        ref={capturePlayersRef} />
    </>
  );
}

export default Chess;
