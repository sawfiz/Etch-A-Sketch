/* eslint-disable no-param-reassign */
/* eslint-disable no-loop-func */
import './style.css'

import canvasManager from './canvas';
import clicksHandler from './clicks';

const DEFAULT_SIZE = 45;

// Main program
window.onload = () => {
  canvasManager.makeGrid(DEFAULT_SIZE);
};
