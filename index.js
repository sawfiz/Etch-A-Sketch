const DEFAULT_SIZE = 45;
let drawing = false;
let mode = 'black';
let color = '#000000';
let personalColor = color;
let currentSize = DEFAULT_SIZE;

const gridContainerEl = document.querySelector('.grid-container');
const btnColorEl = document.querySelector('#btn-color');
const btnRainbowEl = document.querySelector('#btn-rainbow');
const btnEraseEl = document.querySelector('#btn-erase');
const btnClearEl = document.querySelector('#btn-clear');
const pointsEl = document.querySelector('#points');
const labelEl = document.querySelector('label');
const colorPickerEl = document.querySelector('#color-picker');

const modalEl = document.querySelector('.modal');
const cancelBtn = document.querySelector('#cancel-btn');
const confirmBtn = document.querySelector('#confirm-btn');

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

// Make a new grid and add an eventlistener to each item in the grid
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

function makeNewGrid(dim) {
  emptyGrid();
  makeGrid(dim);
  currentSize = dim;
}

// Clear status of all buttons
function removeActive() {
  btnEraseEl.classList.remove('active');
  btnColorEl.classList.remove('active');
  btnRainbowEl.classList.remove('active');
}

// Activate the event listeners
function activateButtons() {
  // Start with the single color button active, default to black
  btnColorEl.classList.add('active');
  btnColorEl.addEventListener('click', () => {
    mode = 'black';
    color = personalColor;
    removeActive();
    btnColorEl.classList.add('active');
  });

  // Switch to user personal color
  colorPickerEl.addEventListener('input', (e) => {
    mode = 'personal';
    color = e.target.value;
    personalColor = color;
    btnColorEl.innerText = `Current Color: ${color}`;
    removeActive();
    btnColorEl.classList.add('active');
  });

  // Switch to rainbow mode
  btnRainbowEl.addEventListener('click', () => {
    mode = 'rainbow';
    removeActive();
    btnRainbowEl.classList.add('active');
  });

  // Switch to erase mode
  btnEraseEl.addEventListener('click', () => {
    mode = 'erase';
    color = '#ffffff';
    removeActive();
    btnEraseEl.classList.add('active');
  });

  // Clear the grid
  btnClearEl.addEventListener('click', () => {
    modalEl.showModal();
  });

  // Ajust grid size and update label
  pointsEl.addEventListener('input', () => {
    modalEl.showModal();
  });
}

// Main program
window.onload = () => {
  makeGrid(DEFAULT_SIZE);
  activateButtons();
};

cancelBtn.addEventListener('click', () => {
  modalEl.close();
});

confirmBtn.addEventListener('click', () => {
  if (mode === 'erase') {
    mode = 'personal';
    color = personalColor;
    removeActive();
    btnColorEl.classList.add('active');
  }
  labelEl.innerText = `${pointsEl.value} x ${pointsEl.value} `;
  makeNewGrid(pointsEl.value);
  modalEl.close();
});
