import Dot from './dot';

const Grid = (() => {
  const grid = [];
  let dimension;

  function initGrid(dim) {
    // Empty the array first
    grid.splice(0, grid.length);
    dimension = dim;
    for (let row = 0; row < dimension; row++) {
      for (let col = 0; col < dimension; col++) {
        const newDot = Dot('#FFF');
        grid.push(newDot);
      }
    }
  }

  return {
    initGrid,
    get dimension() {
      return dimension;
    },
    get grid() {
      return [...grid];
    },
  };
})();

export default Grid;
