const DEFAULT_SIZE = 45;
let drawing = false;
let mode = 'black';
let color = '#000000';
let currentSize = DEFAULT_SIZE;

const gridContainerEl = document.querySelector('.grid-container');
const btnColorEl = document.querySelector('#btn-color');
const btnRainbowEl = document.querySelector('#btn-rainbow');
const btnEraseEl = document.querySelector('#btn-erase');
const btnClearEl = document.querySelector('#btn-clear');
const pointsEl = document.querySelector('#points');
const labelEl = document.querySelector('label');
const colorPickerEl = document.querySelector('#color-picker');

function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function changeColor(dot) {
  if (mode === 'rainbow') {
    color = getRandomColor();
  }
  dot.style.backgroundColor = color;
}

function drawStuff() {
  if (drawing === true) {
    changeColor(this);
  }
}

function makeGrid(dim) {
  gridContainerEl.style.cssText = `grid-template-columns: repeat(${dim}, 1fr); 
        grid-template-rows: repeat(${dim}, 1fr)`;

  // eslint-disable-next-line no-plusplus
  for (let row = 0; row < dim; row++) {
    // eslint-disable-next-line no-plusplus
    for (let col = 0; col < dim; col++) {
      const dotEl = document.createElement('item');
      gridContainerEl.appendChild(dotEl);
      dotEl.addEventListener('mouseover', drawStuff);
      dotEl.addEventListener('mousedown', () => {
        drawing = true;
        changeColor(dotEl);
      });
      dotEl.addEventListener('mouseup', () => {
        drawing = false;
      });
    }
  }
}

function emptyGrid() {
  gridContainerEl.innerHTML = '';
}

function clearGrid() {
  emptyGrid();
  makeGrid(currentSize);
}

function makeNewGrid(dim) {
  emptyGrid();
  //   dotArray = [];
  makeGrid(dim);
  currentSize = dim;
}

function removeActive() {
  btnEraseEl.classList.remove('active');
  btnColorEl.classList.remove('active');
  btnRainbowEl.classList.remove('active');
}

function activateButtons() {
  btnColorEl.classList.add('active');
  btnColorEl.addEventListener('click', () => {
    mode = 'black';
    color = '#000000';
    removeActive();
    btnColorEl.classList.add('active');
  });
  colorPickerEl.addEventListener('input', (e) => {
    mode = 'personal';
    color = e.target.value;
    btnColorEl.innerText = `Current Color: ${color}`;
    removeActive();
    btnColorEl.classList.add('active');
  });
  btnRainbowEl.addEventListener('click', () => {
    mode = 'rainbow';
    removeActive();
    btnRainbowEl.classList.add('active');
  });
  btnEraseEl.addEventListener('click', () => {
    mode = 'erase';
    color = '#ffffff';
    removeActive();
    btnEraseEl.classList.add('active');
  });
  btnClearEl.addEventListener('click', () => {
    clearGrid();
  });

  pointsEl.addEventListener('input', () => {
    labelEl.innerText = `${pointsEl.value} x ${pointsEl.value} `;
    makeNewGrid(pointsEl.value);
  });
}

// Main program
window.onload = () => {
  makeGrid(DEFAULT_SIZE);
  activateButtons();
};
