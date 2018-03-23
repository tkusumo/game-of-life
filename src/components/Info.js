import React from 'react';

const Info = () => {
  return (
    <div>
      <p style={{ fontSize: 15 }}>
        There are five colors that representing five different populations.
        The initial board size is 8 columns by 6 rows. The minimum board size is
        5 columns by 5 rows, and the maximum size is 25 colums by 25 rows.
        <br /><br />
        <h3>How to play:</h3>
        Click on the <b>POPULATE</b> button to randomly place each population on to the board.
        <br />
        Click <b>PLAY</b> button to run the game.
        <br />
        Click <b>PAUSE</b> button to pause the game.
        <br />
        Update Rows and Columns fields to change the size of the board.
        <br />
        ENJOY!
      </p>
    </div>
  );
};

export default Info;
