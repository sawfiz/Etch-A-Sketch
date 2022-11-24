const Display = (() => {
  const gridContainerEl = document.querySelector('.grid-container');
  function addDot(dot, index) {
    const dotEl = document.createElement('div');
    dotEl.classList.add('dot');
    dotEl.setAttribute('data-key', index);
    dotEl.style.background = dot.color;
    return dotEl;
  }

  function render(grid) {
    gridContainerEl.innerHTML = '';
    gridContainerEl.style.display = 'grid';
    const dim = Math.sqrt(grid.length);
    gridContainerEl.style.gridTemplateColumns = `repeat(${dim}, 1fr)`;
    gridContainerEl.style.gridTemplateRows = `repeat(${dim}, 1fr)`;
    gridContainerEl.append(...grid.map(addDot));
  }
  return {
    render,
    get gridContrainerEl() {
      return gridContainerEl;
    },
  };
})();

export default Display;
