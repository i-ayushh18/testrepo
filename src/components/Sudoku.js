import React, { useState } from 'react';
function Sudoku() {
 const [gameState, setGameState] = useState([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
 return (
 <div>
 <h1>Sudoku Game</h1>
 <p>Game State: {gameState}</p>
 </div>
 );
}
export default Sudoku;