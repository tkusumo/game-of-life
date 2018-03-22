import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import _ from 'lodash';

import Cell from './Cell';

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
      greenCount: 0,
      redCount: 0,
      blueCount: 0,
      purpleCount: 0,
      orangeCount: 0,
    };
  }

  componentDidMount() {
    this.initializeBoard(this.props.rows, this.props.columns);
  }

  componentWillReceiveProps(nextProps) {
    this.initializeBoard(nextProps.rows, nextProps.columns);
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
    //const { rows, columns } = this.props;
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
        greenCount: 0,
        redCount: 0,
        blueCount: 0,
        purpleCount: 0,
        orangeCount: 0,
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
        greenCount: populations[0].GREEN,
        redCount: populations[1].RED,
        blueCount: populations[2].BLUE,
        purpleCount: populations[3].PURPLE,
        orangeCount: populations[4].ORANGE,
      });
  };

  countPopulations = (arr) => {
    let green = 0;
    let red = 0;
    let blue = 0;
    let purple = 0;
    let orange = 0;

    _.forEach(arr, function(item) {
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

    return [{ GREEN: green }, { RED: red}, { BLUE: blue }, { PURPLE: purple }, { ORANGE: orange }];
  }

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
      let color = 'BROWN';

      for (let j = 0; j < neighbors.length; j++) {
        if (boardCopy[neighbors[j]].cell) {
          countAlive++;
        }
      }

      if (alive) {
        if (countAlive < 2 || countAlive > 3) {
          boardCopy[i].cell = false;
          boardCopy[i].color = color;
        }
      } else {
        if (countAlive === 3) {
          boardCopy[i].cell = true;
          const randColor = Math.floor(Math.random() * 5);

          color = cellColor[randColor].name;
          boardCopy[i].color = color;
        }
      }

      newCopy.push(boardCopy[i].cell);
    }

    if (_.isEqual(newCopy, stateCopy)) {
      clearInterval(this.playInterval);
    } else {
      const populations = this.countPopulations(boardCopy);
      this.setState(
        {
          boardArr: boardCopy,
          generationCount: this.state.generationCount + 1,
          greenCount: populations[0].GREEN,
          redCount: populations[1].RED,
          blueCount: populations[2].BLUE,
          purpleCount: populations[3].PURPLE,
          orangeCount: populations[4].ORANGE,
        });
    };
  };

  getColorIndex = (name) => {
    return _.findIndex(cellColor, function(c) { return c.name === name });
  } ;

  renderCells() {
    return this.state.boardArr.map((item, i) => {
      return (
        <div
          className={item.cell ? 'cell alive' : 'cell'}
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
    this.setState({ generationCount: 0 });
    this.populateCells();
  };

  handleSubmitPlay = (e) => {
    e.preventDefault();
    clearInterval(this.playInterval);
    this.playInterval = setInterval(this.playGame, 500);
  };

  handlePausePlay = (e) => {
    e.preventDefault();
    clearInterval(this.playInterval);
  };

  render() {
    const { classes } = this.props;

    return (
      <div style={styles.container}>
        <div style={styles.leftContainer}>
          <div style={{ padding: 20 }}>
            <p>
              There are five colors that representing five different populations.
              The initial board size is 8 columns by 6 rows.
              <hr />
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
        </div>
        <div style={styles.boardContainer}>
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
                  width: this.props.columns * 21,
                  flexDirection: 'row',
                  flexFlow: 'row wrap',
                }
              }
            >
              {this.renderCells()}
            </div>
          </div>
        </div>
        <div style={styles.rightContainer}>
          <div style={{ paddingLeft: 10, paddingTop: 20, fontFamily: 'Roboto', fontSize: 18 }}>
            Generations: <span>{this.state.generationCount}</span>
          </div>
          <div style={{ padding: 20 }}>
            <div style={styles.population}>
              <Cell color={cellColor[0].color}>{this.state.greenCount}</Cell>
              <span style={{ paddingLeft: 10 }}>{cellColor[0].name}</span>
            </div>
            <div style={styles.population}>
              <Cell color={cellColor[1].color}>{this.state.redCount}</Cell>
              <span style={{ paddingLeft: 10 }}>{cellColor[1].name}</span>
            </div>
            <div style={styles.population}>
              <Cell color={cellColor[2].color}>{this.state.blueCount}</Cell>
              <span style={{ paddingLeft: 10 }}>{cellColor[2].name}</span>
            </div>
            <div style={styles.population}>
              <Cell color={cellColor[3].color}>{this.state.purpleCount}</Cell>
              <span style={{ paddingLeft: 10 }}>{cellColor[3].name}</span>
            </div>
            <div style={styles.population}>
              <Cell color={cellColor[4].color}>{this.state.orangeCount}</Cell>
              <span style={{ paddingLeft: 10 }}>{cellColor[4].name}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flex: 1,
  },
  buttonsContainer: {
    display: 'flex',
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  boardContainer: {
    flex: 2,
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    flex: 1,
  },
  population: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    fontFamily: 'Roboto',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
};

const materialStyles = theme => ({
  button: {
    margin: theme.spacing.unit,
    color: 'black',
    fontFamily: 'Roboto'
  },
});

MainBoard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(materialStyles)(MainBoard);
