import React from 'react';
import Cell from './Cell';

const cellColor = [
  { name: 'GREEN', color: '#4CAF50' },
  { name: 'RED', color: '#F44336' },
  { name: 'BLUE', color: '#2196F3' },
  { name: 'PURPLE', color: '#9C27B0' },
  { name: 'ORANGE', color: '#FF9800' },
  { name: 'BROWN', color: '#BCAAA4' },
];

const Results = (props) => {
  const displayResult = (color) => {
    if (props.gamePausedOrEnded) {
      let total = 0;
      let totalColorCount = 0;

      switch (color) {
        case 'GREEN':
          total = props.initialCount.greenCount - props.colorCount.greenCount;
          totalColorCount = props.colorCount.greenCount;
          break;
        case 'RED':
          total = props.initialCount.redCount - props.colorCount.redCount;
          totalColorCount = props.colorCount.redCount;
          break;
        case 'BLUE':
          total = props.initialCount.blueCount - props.colorCount.blueCount;
          totalColorCount = props.colorCount.blueCount;
          break;
        case 'PURPLE':
          total = props.initialCount.purpleCount - props.colorCount.purpleCount;
          totalColorCount = props.colorCount.purpleCount;
          break;
        case 'ORANGE':
          total = props.initialCount.orangeCount - props.colorCount.orangeCount;
          totalColorCount = props.colorCount.orangeCount;
          break;
        default:
          break;
      };

      if (totalColorCount === 0) {
        return 'eliminated';
      } else {
        if (total > 0) {
          return 'lost ' + total;
        } else if (total === 0) {
          return 'stay the same';
        } else {
          return 'gained ' + (~total + 1);
        }
      }
    };
  };

  return (
    <div style={styles.container}>
      <div style={{ paddingLeft: 10, paddingTop: 20, fontSize: 18 }}>
        Generations: <span>{props.generationCount}</span>
      </div>
      <div style={{ padding: 5 }}>
        <div style={styles.population}>
          <Cell color='white'>{props.colorCount.greenCount}</Cell>
          <Cell color={cellColor[0].color} fontColor='white'>{props.initialCount.greenCount}</Cell>
          <span style={{ paddingLeft: 10, fontSize: 14 }}>{cellColor[0].name}</span>
          <span style={{ paddingLeft: 10, color: 'red' }}>{displayResult('GREEN')}</span>
        </div>
        <div style={styles.population}>
          <Cell color='white'>{props.colorCount.redCount}</Cell>
          <Cell color={cellColor[1].color} fontColor='white'>{props.initialCount.redCount}</Cell>
          <span style={{ paddingLeft: 10, fontSize: 14 }}>{cellColor[1].name}</span>
          <span style={{ paddingLeft: 10, color: 'red' }}>{displayResult('RED')}</span>
        </div>
        <div style={styles.population}>
          <Cell color='white'>{props.colorCount.blueCount}</Cell>
          <Cell color={cellColor[2].color} fontColor='white'>{props.initialCount.blueCount}</Cell>
          <span style={{ paddingLeft: 10, fontSize: 14 }}>{cellColor[2].name}</span>
          <span style={{ paddingLeft: 10, color: 'red' }}>{displayResult('BLUE')}</span>
        </div>
        <div style={styles.population}>
          <Cell color='white'>{props.colorCount.purpleCount}</Cell>
          <Cell color={cellColor[3].color} fontColor='white'>{props.initialCount.purpleCount}</Cell>
          <span style={{ paddingLeft: 10, fontSize: 14 }}>{cellColor[3].name}</span>
          <span style={{ paddingLeft: 10, color: 'red' }}>{displayResult('PURPLE')}</span>
        </div>
        <div style={styles.population}>
          <Cell color='white'>{props.colorCount.orangeCount}</Cell>
          <Cell color={cellColor[4].color} fontColor='white'>{props.initialCount.orangeCount}</Cell>
          <span style={{ paddingLeft: 10, fontSize: 14 }}>{cellColor[4].name}</span>
          <span style={{ paddingLeft: 10, color: 'red' }}>{displayResult('ORANGE')}</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  population: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
};

export default Results;
