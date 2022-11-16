# Etch-A-Sketch

- [Etch-A-Sketch](#etch-a-sketch)
  - [Things I leaned](#things-i-leaned)
    - [HTML](#html)
    - [CSS](#css)
    - [JS](#js)
      - [Revisit on 2022-11-11](#revisit-on-2022-11-11)
  - [To do](#to-do)
  - [Resources](#resources)
  - [Live site](#live-site)

[Project: Etch-A-Sketch](https://www.theodinproject.com/lessons/foundations-etch-a-sketch) from the [Foundations](https://www.theodinproject.com/paths/foundations/courses/foundations) course, [the Odin Project](https://www.theodinproject.com/).

## Things I leaned
### HTML
- Adding buttons
- Adding the `range` type input
- Adding the `color` type input
- Adding labels for inputs
- The copyright icon is `&copy;`

### CSS
- Adding grid

### JS
- Generation random color
- Adding eventlistner to an array of items as each item is being created 
#### Revisit on 2022-11-11
- Refactor the code into 2 modules
- Move all global variables into the modules
- Fixed a bug when changing grid size, and click on Cancel, the grid size range and text should revert to current grid size
- Modularized the js code and use webpack to build package
- Learn to use getters and setters when working with objects
- Some thing to watch out for with modal based <dialog>
```js
// Clear the grid
btnClearEl.addEventListener('click', () => {
// Remove 'open' to avoid an error in console
modalEl.removeAttribute('open');
modalEl.showModal();
});
```

## To do
- How to add a favicon

## Resources

## Live site
https://sawfiz.github.io/Etch-A-Sketch/
