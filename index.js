/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-loop-func */
const DEFAULT_SIZE = 45;

// Click handlers
const clicksHandler = (() => {
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

  let mode = 'black';
  let color = '#000000';
  let personalColor = color;

  // Clear status of all buttons
  function removeActive() {
    btnEraseEl.classList.remove('active');
    btnColorEl.classList.remove('active');
    btnRainbowEl.classList.remove('active');
  }

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

  // Dragging on grid size updates the label
  pointsEl.addEventListener('input', () => {
    labelEl.innerText = `${pointsEl.value} x ${pointsEl.value} `;
  });

  // Clear the grid
  btnClearEl.addEventListener('click', () => {
    modalEl.showModal();
  });

  // Change grid size brings up a confirmation modal
  pointsEl.addEventListener('change', () => {
    labelEl.innerText = `${pointsEl.value} x ${pointsEl.value} `;
    modalEl.showModal();
  });

  cancelBtn.addEventListener('click', () => {
    modalEl.close();
    const size = canvasManager.getCurrentSize();
    labelEl.innerText = `${size} x ${size} `;
    pointsEl.value = size;
  });

  confirmBtn.addEventListener('click', () => {
    if (mode === 'erase') {
      mode = 'personal';
      color = personalColor;
      removeActive();
      btnColorEl.classList.add('active');
    }
    canvasManager.makeNewGrid(pointsEl.value);
    modalEl.close();
  });

  const getColor = () => color;

  const getMode = () => mode;

  return { getColor, getMode };
})();

// Object that manages the canvas
const canvasManager = (() => {
  let currentSize = DEFAULT_SIZE;
  let drawing = false;
  const gridContainerEl = document.querySelector('.grid-container');

  function getRandomColor() {
    // eslint-disable-next-line prefer-template
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  function changeColor(dot) {
    if (clicksHandler.getMode() === 'rainbow') {
      dot.style.backgroundColor = getRandomColor();
    } else {
      dot.style.backgroundColor = clicksHandler.getColor();
    }
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

  const getCurrentSize = () => currentSize;

  return { makeNewGrid, makeGrid, getCurrentSize };
})();

// Main program
window.onload = () => {
  canvasManager.makeGrid(DEFAULT_SIZE);
};
