import React from 'react';

const Cell = (props) => {
  return (
    <div style={
      {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 27,
        height: 27,
        backgroundColor: props.color,
      }}>
      <span style={{ color: props.fontColor, fontFamily: 'Roboto', fontSize: 14 }}>
        {props.children}
      </span>
    </div>
  );
};

export default Cell;
