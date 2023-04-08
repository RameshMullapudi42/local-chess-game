import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import styles from './chess.module.css';

function CapturePlayers({localplayers, handlePlayersChange}, ref) {
    const [playersToCapture, setPlayersToCapture] = useState(localplayers);
    const [showMe, setShowMe] = useState(true);
    const localRef = useRef();

    function onCaptureDetailsFormSubmit(e){
        e.preventDefault();
        setShowMe(false);
        handlePlayersChange(playersToCapture);
    }

    function handleCancel(e){
        e.preventDefault();
        if(localplayers[0].playerName==='' || localplayers[1].playerName==='') return;
        setShowMe(false);
    }

    useImperativeHandle(ref,()=>({
        show(){
            setShowMe(true);
        },
    }));

    return (
        <div ref={localRef}>
        {showMe &&
        <div id='capturePlayersComponent'>
     
            <div className={styles.modal}>
            <div className={`${styles.capturePlayersModal}`}>
            <h2>Players</h2>
            
                <form id="captureDetailsForm" onSubmit={onCaptureDetailsFormSubmit}>
                    <div className={styles.field}>
                        <label className={styles.fieldLabel}><span>Player 1</span>
                        <input id="player1Input" tabIndex='1'
                            value={playersToCapture[0].playerName} 
                            onChange={
                                (e)=>{
                                    var tmpPlayersToCapture = null;
                                    tmpPlayersToCapture = playersToCapture.slice();
                                    tmpPlayersToCapture[0].playerName=e.target.value;
                                    setPlayersToCapture(tmpPlayersToCapture);
                                }
                            }
                            required={true}>
                            </input>
                        </label>
                    </div>
                    <div className={styles.field}>

                        <label className={styles.fieldLabel}><span>Player 2</span>
                        <input id="player2Input" tabIndex='2' value={playersToCapture[1].playerName} 
                            onChange={
                                (e)=>{
                                    var tmpPlayersToCapture = null;
                                    tmpPlayersToCapture = playersToCapture.slice();
                                    tmpPlayersToCapture[1].playerName=e.target.value;
                                    setPlayersToCapture(tmpPlayersToCapture);
                                }
                            }
                            required={true}></input></label>
                    </div>
                    <div className={styles.capturePlayersModalButtons}>
                    
                        <div><button onClick={handleCancel}>Cancel</button></div>
                        <div><input type='submit' tabIndex='3' value='Submit'></input></div>    
                    </div>
                </form>
            </div>
            </div>
            </div>}
        </div>);
}

export default forwardRef(CapturePlayers);