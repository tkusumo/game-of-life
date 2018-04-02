import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import _ from 'lodash';

import Info from './Info';
import Results from './Results';

const cellColor = [
  { name: 'GREEN', color: '#4CAF50' },
  { name: 'RED', color: '#F44336' },
  { name: 'BLUE', color: '#2196F3' },
  { name: 'PURPLE', color: '#9C27B0' },
  { name: 'ORANGE', color: '#FF9800' },
  { name: 'BROWN', color: '#BCAAA4' },
];

class MainBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardArr: [],
      generationCount: 0,
      rows: 0,
      columns: 0,
      colorCount: { greenCount: 0, redCount: 0, blueCount: 0, purpleCount: 0, orangeCount: 0 },
      initialCount: { greenCount: 0, redCount: 0, blueCount: 0, purpleCount: 0, orangeCount: 0 },
      gamePausedOrEnded: false,
    };
  }

  componentDidMount() {
    this.initializeBoard(this.props.rows, this.props.columns);
  }

  componentWillReceiveProps(nextProps) {
    let rows = nextProps.rows;
    let columns = nextProps.columns;

    if (rows < 5) {
      rows = 5;
    };

    if (columns < 5) {
      columns = 5;
    };

    this.initializeBoard(rows, columns);
  }

  cloneArray(arr) {
    return arr.slice(0, arr.length);
  }

  generateNeighborCells = (i, rows, columns) => {
    let neightborsArr = [];

    for (let j = 0; j < 8; j++) {
      // top of the cell
      if (j < 3) {
        if (i >= columns) {
          if (i % columns !== 0 || j > 0) {
            if (!((i + 1) % columns === 0 && j === 2)) {
              neightborsArr.push(i - columns + (j - 1));
            }
          }
        }
      }

      // left side of the cell
      if (j === 3) {
        if (i % columns !== 0) {
          neightborsArr.push(i - 1);
        }
      }

      // right side of the cell
      if (j === 4) {
        if ((i + 1) % columns !== 0) {
          neightborsArr.push(i + 1);
        }
      }

      // bottom of the cell
      if (j > 4) {
        if ((rows * columns) - i > columns) {
          if (i % columns !== 0 || j > 5) {
            if (!((i + 1) % columns === 0 && j === 7)) {
              neightborsArr.push(i + columns - (6 - j));
            }
          }
        }
      }
    }

    return neightborsArr;
  };

  initializeBoard = (rows, columns) => {
    let board = [];

    for (let i = 0; i < (rows * columns); i++) {
      const neightborsArr = this.generateNeighborCells(i, rows, columns);

      board.push(
        {
          cell: false,
          color: 'BROWN',
          neighbors: neightborsArr,
        }
      );
    };

    this.setState(
      {
        boardArr: board,
        rows: rows,
        columns: columns,
        generationCount: 0,
        colorCount: { greenCount: 0, redCount: 0, blueCount: 0, purpleCount: 0, orangeCount: 0 },
        initialCount: { greenCount: 0, redCount: 0, blueCount: 0, purpleCount: 0, orangeCount: 0 },
        gamePausedOrEnded: false,
      });
  };

  populateCells = () => {
    let cellsArr = this.cloneArray(this.state.boardArr);

    for (let i = 0; i < cellsArr.length; i++) {
      let alive = false;
      let color = 'BROWN';

      const rand = Math.floor(Math.random() * 4);
      if (rand === 1) {
        const randColor = Math.floor(Math.random() * 5);

        color = cellColor[randColor].name;
        alive = true;
      }

      cellsArr[i].cell = alive;
      cellsArr[i].color = color;
    };

    const populations = this.countPopulations(cellsArr);

    this.setState(
      {
        boardArr: cellsArr,
        initialCount: {
          greenCount: populations.GREEN,
          redCount: populations.RED,
          blueCount: populations.BLUE,
          purpleCount: populations.PURPLE,
          orangeCount: populations.ORANGE,
        },
      });
  };

  countPopulations = (arr) => {
    let green = 0;
    let red = 0;
    let blue = 0;
    let purple = 0;
    let orange = 0;

    _.forEach(arr, function (item) {
      if (item.color === 'GREEN') {
        green++;
      } else if (item.color === 'RED') {
        red++;
      } else if (item.color === 'BLUE') {
        blue++;
      } else if (item.color === 'PURPLE') {
        purple++;
      } else if (item.color === 'ORANGE') {
        orange++;
      }
    });

    return { GREEN: green, RED: red, BLUE: blue, PURPLE: purple, ORANGE: orange };
  };

  playGame = () => {
    const stateCopy = this.state.boardArr.map((item) => {
      return item.cell;
    });

    let boardCopy = this.cloneArray(this.state.boardArr);
    let newCopy = [];

    for (let i = 0; i < boardCopy.length; i++) {
      const alive = boardCopy[i].cell;
      const neighbors = boardCopy[i].neighbors;
      let countAlive = 0;

      for (let j = 0; j < neighbors.length; j++) {
        if (boardCopy[neighbors[j]].cell) {
          countAlive++;
        }
      }

      if (alive) {
        if (countAlive < 2 || countAlive > 3) {
          boardCopy[i].cell = false;
          boardCopy[i].color = 'BROWN';
        }
      } else {
        if (countAlive === 3) {
          boardCopy[i].cell = true;
          const randColor = Math.floor(Math.random() * 5);

          boardCopy[i].color = cellColor[randColor].name;
        }
      }

      newCopy.push(boardCopy[i].cell);
    }

    if (_.isEqual(newCopy, stateCopy)) {
      clearInterval(this.playInterval);
      this.setState({ gamePausedOrEnded: true });
    } else {
      const populations = this.countPopulations(boardCopy);
      this.setState(
        {
          boardArr: boardCopy,
          generationCount: this.state.generationCount + 1,
          colorCount: {
            greenCount: populations.GREEN,
            redCount: populations.RED,
            blueCount: populations.BLUE,
            purpleCount: populations.PURPLE,
            orangeCount: populations.ORANGE,
          },
        });
    };
  };

  getColorIndex = (name) => {
    return _.findIndex(cellColor, function (c) { return c.name === name; });
  };

  renderCells() {
    return this.state.boardArr.map((item, i) => {
      return (
        <div
          className='cell'
          key={i}
          id={i}
          style={{ backgroundColor: cellColor[this.getColorIndex(item.color)].color }}
        />
      );
    });
  };

  handleSubmitSetup = (e) => {
    e.preventDefault();
    clearInterval(this.playInterval);
    this.setState(
      {
        generationCount: 0,
        gamePausedOrEnded: false,
        colorCount: { greenCount: 0, redCount: 0, blueCount: 0, purpleCount: 0, orangeCount: 0 },
      });
    this.populateCells();
  };

  handleSubmitPlay = (e) => {
    e.preventDefault();
    clearInterval(this.playInterval);
    this.setState({ gamePausedOrEnded: false });
    this.playInterval = setInterval(this.playGame, 500);
  };

  handlePausePlay = (e) => {
    e.preventDefault();
    clearInterval(this.playInterval);
    if (this.state.generationCount !== 0) {
      this.setState({ gamePausedOrEnded: true });
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className='main'>
        <div className='info'>
          <div style={{ padding: 10 }}>
            <Info />
          </div>
        </div>
        <div className='content'>
          <div style={styles.buttonsContainer}>
            <Button className={classes.button} color='primary' onClick={this.handleSubmitSetup}>
              Populate
            </Button>
            <Button className={classes.button} onClick={this.handleSubmitPlay}>
              Play
            </Button>
            <Button className={classes.button} color='secondary' onClick={this.handlePausePlay}>
              Pause
            </Button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
            <div
              style={
                {
                  display: 'flex',
                  width: this.state.columns * 21,
                  flexDirection: 'row',
                  flexFlow: 'row wrap',
                }
              }
            >
              {this.renderCells()}
            </div>
          </div>
        </div>
        <div className='results'>
          <Results
            generationCount= {this.state.generationCount}
            colorCount={this.state.colorCount}
            initialCount={this.state.initialCount}
            gamePausedOrEnded={this.state.gamePausedOrEnded} />
        </div>
      </div>
    );
  }
}

const styles = {
  buttonsContainer: {
    display: 'flex',
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
};

const materialStyles = theme => ({
  button: {
    margin: theme.spacing.unit,
    color: 'black',
    fontFamily: 'Roboto',
    fontSize: 16,
  },
});

MainBoard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(materialStyles)(MainBoard);
