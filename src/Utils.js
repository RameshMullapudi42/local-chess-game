import styles from './chess.module.css';

import { Howl } from "howler";

export function playSound(fileName){
    var sound=new Howl({
        src: [fileName]
    });
    sound.play();
}

export function hideElement(event){
    event.target.classList=[styles.hidden];
}

export function showInvalidMove(textContent){
    playSound("./local-chess-game/invalidstep.mp3");
    var invalidMoveDiv = document.getElementById("invalidMoveDiv");
    invalidMoveDiv.textContent = "Invalid move!";
    invalidMoveDiv.classList.add(styles.moveStatus);
    invalidMoveDiv.classList.add(styles["easeinout-animator"]);
}