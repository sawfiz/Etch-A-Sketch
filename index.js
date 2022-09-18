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

function changeColor(e) {
    if (drawing === true) {
        this.style.cssText = "background: black;";
    }
}

function draw() {
    drawing = true;
}
function notDraw() {
    drawing = false;
}

makeGrid(defaultDimension);
const dotArray = Array.from(document.querySelectorAll("item"))

console.log(dotArray);

dotArray.forEach(dot => dot.addEventListener("mousedown", draw))
dotArray.forEach(dot => dot.addEventListener("mouseup", notDraw))
dotArray.forEach(dot => dot.addEventListener("mouseover", changeColor))

