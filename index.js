const DEFAULT_SIZE = 30;
let drawing = false;
let mode = "black";
let currentSize = DEFAULT_SIZE;

const gridContainerEl = document.querySelector(".grid-container");
const btnBlackEl = document.querySelector("#btn-black");
const btnRainbowEl = document.querySelector("#btn-rainbow");
const btnEraseEl = document.querySelector("#btn-erase");
const btnClearEl = document.querySelector("#btn-clear");
const inputEl = document.querySelector("input");

function makeGrid(dim) {
    gridContainerEl.style.cssText = `grid-template-columns: repeat(${dim}, 1fr); 
        grid-template-rows: repeat(${dim}, 1fr)`;

    for (let row = 0; row < dim; row++) {
        for (let col = 0; col < dim; col++) {
            let dotEl = document.createElement("item");
            gridContainerEl.appendChild(dotEl);
            dotEl.addEventListener("mouseover", drawStuff);
            dotEl.addEventListener("mousedown", () => {
                drawing = true;
                changeColor(dotEl);
            });
            dotEl.addEventListener("mouseup", () => {
                drawing = false;
            });
        }
    }
}

function drawStuff(e) {
    console.log(drawing);
    if (drawing === true) {
        changeColor(this);
    }
}

function changeColor(dot) {
    console.log(dot);
    switch (mode) {
        case "erase":
            dot.style.cssText = "background: white;";
            break;
        case "rainbow":
            dot.style.cssText = `background: #${getRandomColor()};`;
            break;
        default:
            dot.style.cssText = "background: black;";
            break;
    }
}

function getRandomColor() {
    return Math.floor(Math.random() * 16777215).toString(16);
}

function clearGrid() {
    gridContainerEl.innerHTML = "";
    makeGrid(currentSize);
}

function makeNewGrid(e) {
    emptyGrid();
    dotArray = [];
    makeGrid(e.target.value);
    currentSize = e.target.value;
}

function emptyGrid() {
    gridContainerEl.innerHTML = "";
}

function main() {
    btnBlackEl.addEventListener("click", () => {
        mode = "black";
    });
    btnRainbowEl.addEventListener("click", () => {
        mode = "rainbow";
    });
    btnEraseEl.addEventListener("click", () => {
        mode = "erase";
    });
    btnClearEl.addEventListener("click", clearGrid);

    inputEl.addEventListener("input", makeNewGrid);
}

// Main program
makeGrid(DEFAULT_SIZE);

main();
