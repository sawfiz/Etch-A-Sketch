// Object that manages the canvas
const canvasManager = (() => {
  let currentSize;
  let mode = 'black';
  let color = '#000000';
  let drawing = false;
  const gridContainerEl = document.querySelector('.grid-container');

  function getRandomColor() {
    // eslint-disable-next-line prefer-template
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  function changeColor(dot) {
    if (mode === 'rainbow') {
      dot.style.backgroundColor = getRandomColor();
    } else {
      dot.style.backgroundColor = color;
    }
  }

  function drawStuff() {
    if (drawing === true) {
      changeColor(this);
    }
  }

  // Make a new grid and add an eventlistener to each item in the grid
  function makeGrid(dim) {
    // gridContainerEl.style.cssText = `grid-template-columns: repeat(${dim}, 1fr); 
          // grid-template-rows: repeat(${dim}, 1fr)`;

    gridContainerEl.style.gridTemplateColumns = `repeat(${dim}, 1fr)`;
    gridContainerEl.style.gridTemplaRows = `repeat(${dim}, 1fr)`;

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

  const setMode = (newMode) => (mode = newMode);
  const getMode = () => mode;

  const setColor = (newColor) => (color = newColor);

  return { setMode, getMode, setColor, makeNewGrid, makeGrid, getCurrentSize };
})();

export default canvasManager;
