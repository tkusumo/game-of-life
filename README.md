## The Game of Life

Click this link [The Game of Life](https://tkusumo.github.io/game-of-life/) to play the game.
There's no need to install anything.

Below you will find some information regarding this project.

## Introduction

This project is using:
- ReactJS
- MaterialUI
- lodash
- Flexbox and CSS Grid

The initial size of the board is 8 columns by 6 rows. The minimum size of the board is 5 columns by 5 rows,
and the maximum size is 25 columns by 25 rows. There are 5 colors and each color is representing a population.
Brown color is for dead cell.

### Design

The board is an array of cells. For example, if the board size is 8 columns by 6 rows then there are 48 cells in the board array.
Each cell in the board array is an object that contains the status of the cell, the color of the cell and its neighbors.
The board is drawn by using Flexbox. For the initial state, live cells are randomly placed on to the board, and each live cell
is randomly assigned a color. When running the game, each cell from the the first to the last is being processed by looking at
its neighbors to see how many are live cells. The cell then is being updated according to the game of life rules. 
