import canvasManager from './canvas';

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

  let personalColor = canvasManager.color;

  // Clear status of all buttons
  function removeActive() {
    btnEraseEl.classList.remove('active');
    btnColorEl.classList.remove('active');
    btnRainbowEl.classList.remove('active');
  }

  // Start with the single color button active, default to black
  btnColorEl.classList.add('active');
  btnColorEl.addEventListener('click', () => {
    canvasManager.setMode('black');
    removeActive();
    btnColorEl.classList.add('active');
  });

  // Switch to user personal color
  colorPickerEl.addEventListener('input', (e) => {
    canvasManager.setMode('personal');
    personalColor = e.target.value;
    canvasManager.setColor(e.target.value);
    btnColorEl.innerText = `Current Color: ${canvasManager.color}`;
    removeActive();
    btnColorEl.classList.add('active');
  });

  // Switch to rainbow mode
  btnRainbowEl.addEventListener('click', () => {
    canvasManager.setMode('rainbow');
    removeActive();
    btnRainbowEl.classList.add('active');
  });

  // Switch to erase mode
  btnEraseEl.addEventListener('click', () => {
    canvasManager.setMode('erase');
    canvasManager.setColor('#ffffff');
    removeActive();
    btnEraseEl.classList.add('active');
  });

  // Dragging on grid size updates the label
  pointsEl.addEventListener('input', () => {
    labelEl.innerText = `${pointsEl.value} x ${pointsEl.value} `;
  });

  // Clear the grid
  btnClearEl.addEventListener('click', () => {
    // Remove 'open' to avoid an error in console
    modalEl.removeAttribute('open');
    modalEl.showModal();
  });
  
  // Change grid size brings up a confirmation modal
  pointsEl.addEventListener('change', () => {
    labelEl.innerText = `${pointsEl.value} x ${pointsEl.value} `;
    // Remove 'open' to avoid an error in console
    modalEl.removeAttribute('open');
    modalEl.showModal();
  });

  cancelBtn.addEventListener('click', () => {
    modalEl.close();
    const size = canvasManager.getCurrentSize();
    labelEl.innerText = `${size} x ${size} `;
    pointsEl.value = size;
  });

  confirmBtn.addEventListener('click', () => {
    if (canvasManager.getMode() === 'erase') {
      canvasManager.setMode('personal');
      canvasManager.setColor(personalColor);
      removeActive();
      btnColorEl.classList.add('active');
    }
    canvasManager.makeNewGrid(pointsEl.value);
    modalEl.close();
  });
})();

export default clicksHandler;
