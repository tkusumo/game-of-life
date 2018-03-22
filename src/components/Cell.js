import React from 'react';

const Cell = (props) => {
  return (
    <div style={
      {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 25,
        height: 25,
        backgroundColor: props.color,
      }}>
      <span style={{ color: 'white', fontFamily: 'Roboto', fontSize: 14 }}>
        {props.children}
      </span>
    </div>
  );
};

export default Cell;
