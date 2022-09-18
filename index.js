const defaultDimension = 30;
let drawing = false;
const gritContainerEl = document.querySelector(".grid-container");

function makeGrid(dim) {
    gritContainerEl.style.cssText = `grid-template-columns: repeat(${dim}, ${
        100 / dim
    }%); 
        grid-template-rows: repeat(${dim}, ${100 / dim}%)`;
    for (let row = 0; row < dim; row++) {
        for (let col = 0; col < dim; col++) {
            let dotEl = document.createElement("item");
            gritContainerEl.appendChild(dotEl);
        }
    }
}

function changeColor() {
    if (drawing === true) {
        this.style.cssText = "background: black;";
    }
}



makeGrid(defaultDimension);
const dotArray = Array.from(document.querySelectorAll("item"))

dotArray.forEach(dot => dot.addEventListener("mousedown", () => {
    drawing = true;
    dot.style.cssText = "background: black;";
}))

dotArray.forEach(dot => dot.addEventListener("mouseup", () => {drawing = false}))
dotArray.forEach(dot => dot.addEventListener("mouseover", changeColor))

