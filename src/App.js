import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MainBoard from './components/MainBoard';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

class App extends Component {
  state = {
    inputRows: 6,
    inputColumns: 8,
  };

  componentWillMount() {
    this.setState({ rows: this.state.inputRows, columns: this.state.inputColumns });
  }

  handleChange = pos => event => {
    //let value = 0;
    if (event.target.value > 25) {
      event.target.value = 25;
    }

    // else if (event.target.value < 5 && event.target.value) {
    //   value = event.target.value;
    // };

    this.setState({ [pos]: parseInt(event.target.value, 10) });
  };

  checkInput = pos => event => {
    if (event.target.value < 5) {
      event.target.value = 5;
      this.setState({ [pos]: parseInt(event.target.value, 10) });
    }
  };

  gridSize = (e) => {
    if (e.target.value > 25) {
      e.target.value = 25;
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div style={styles.titleContainer}>
          <h1 style={{ color: 'white' }}>The Game of Life</h1>
        </div>
        <div style={styles.bodyContainer}>
          <div style={styles.settingContainer}>
            <div>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="inputRows">Rows</InputLabel>
                <Input
                  id="inputRows"
                  className={classes.inputField}
                  value={this.state.inputRows}
                  onChange={this.handleChange('inputRows')}
                  type='number' />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="inputColumns">Columns</InputLabel>
                <Input
                  id="inputColumns"
                  className={classes.inputField}
                  value={this.state.inputColumns}
                  onChange={this.handleChange('inputColumns')}
                  type='number' />
              </FormControl>
            </div>
          </div>
          <div style={styles.boardContainer}>
            <MainBoard
              rows={this.state.inputRows}
              columns={this.state.inputColumns}
            />
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#689F38',
  },
  bodyContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  settingContainer: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#C5E1A5',
    justifyContent: 'center',
  },
  boardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const materialStyles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
  },
  inputField: {
    width: 60,
    height: 27,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(materialStyles)(App);
