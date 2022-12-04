import Grid from './Grid';
import Display from './Display';
import './style.css';

const Controller = (() => {
  // Manu buttons
  const btnColorEl = document.querySelector('#btn-color');
  const colorPickerEl = document.querySelector('#color-picker');
  const btnRainbowEl = document.querySelector('#btn-rainbow');
  const btnEraseEl = document.querySelector('#btn-erase');
  const btnClearEl = document.querySelector('#btn-clear');
  const labelEl = document.querySelector('label');
  const pointsEl = document.querySelector('#points');

  // Modal buttons
  const modalEl = document.querySelector('.modal');
  const cancelBtn = document.querySelector('#cancel-btn');
  const confirmBtn = document.querySelector('#confirm-btn');

  // Variables
  let drawing;
  let color = '#000';
  let personalColor = '#000';
  let mode = 'black';

  // Clear status of all buttons
  function removeActive() {
    btnEraseEl.classList.remove('active');
    btnColorEl.classList.remove('active');
    btnRainbowEl.classList.remove('active');
  }

  // Start with the single color button active, default to black
  btnColorEl.classList.add('active');
  btnColorEl.addEventListener('click', () => {
    mode = 'personal';
    removeActive();
    btnColorEl.classList.add('active');
  });

  // Switch to user personal color
  colorPickerEl.addEventListener('change', (e) => {
    mode = 'personal';
    personalColor = e.target.value;
    btnColorEl.innerText = `Current Color: ${personalColor}`;
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
    removeActive();
    btnEraseEl.classList.add('active');
  });

  // Clear the grid
  btnClearEl.addEventListener('click', () => {
    // Remove 'open' to avoid an error in console
    modalEl.removeAttribute('open');
    modalEl.showModal();
  });

  cancelBtn.addEventListener('click', () => {
    modalEl.close();
    const size = Math.sqrt(Grid.grid.length);
    labelEl.innerText = `${size} x ${size} `;
    pointsEl.value = size;
  });

  confirmBtn.addEventListener('click', () => {
    if (mode === 'erase') {
      mode = 'personal';
      removeActive();
      btnColorEl.classList.add('active');
    }
    Grid.initGrid(pointsEl.value);
    Display.render(Grid.grid);
    modalEl.close();
  });

  // Dragging on grid size updates the label
  pointsEl.addEventListener('input', () => {
    labelEl.innerText = `${pointsEl.value} x ${pointsEl.value} `;
  });

  // Change grid size brings up a confirmation modal
  pointsEl.addEventListener('change', () => {
    labelEl.innerText = `${pointsEl.value} x ${pointsEl.value} `;
    // Remove 'open' to avoid an error in console
    modalEl.removeAttribute('open');
    modalEl.showModal();
  });

  Display.gridContrainerEl.addEventListener('mousemove', draw);
  Display.gridContrainerEl.addEventListener('mousedown', () => {
    drawing = true;
  });
  Display.gridContrainerEl.addEventListener('mouseup', () => {
    drawing = false;
  });

  function getRandomColor() {
    // eslint-disable-next-line prefer-template
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  function draw(e) {
    const index = e.target.getAttribute('data-key');
    if (index && drawing === true) {
      switch (mode) {
        case 'black':
          color = '#000';
          break;
        case 'personal':
          color = personalColor;
          break;
        case 'rainbow':
          color = getRandomColor();
          break;
        case 'erase':
          color = '#ffffff';
          break;

        default:
          break;
      }
      Grid.grid[index].color = color;
      Display.render(Grid.grid);
    }
  }

  function init(dim) {
    Grid.initGrid(dim);
    Display.render(Grid.grid);
  }

  return { init };
})(Grid, Display);

export default Controller;
