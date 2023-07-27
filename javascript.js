// 1. Create 16x16 grid of square divs
let gridSize = 36;
let color = '#000000';
let ghostMode = false;
let rainbowMode = false;
let colorMode = true;
var r = document.querySelector(':root');

const grid = document.querySelector('.gridContainer');
const currentGrids = document.getElementsByClassName('grid');
const gridButton = document.querySelector('#gridButton');
const colorPicker = document.querySelector('#colorPicker');
const colorButton = document.querySelector('#colorButton');
const ghostButton = document.querySelector('#ghostButton');
const rainbowButton = document.querySelector('#rainbowButton');
const clearButton = document.querySelector('#clearButton');

colorPicker.addEventListener("input", watchColorPicker, false);
colorPicker.addEventListener("change", watchColorPicker, false);
colorButton.addEventListener('click', () => setModeColor());
rainbowButton.addEventListener('click', () => setRainbowMode());
ghostButton.addEventListener('click', () => setGhostMode());
clearButton.addEventListener('click', () => clearWorkspace());
gridButton.addEventListener('click', () => changeGridSize());
// Grid Functions
function removeGrids() {
    for (let i = currentGrids.length; i > 0; i--) {
        const div = document.querySelector(".grid")
        grid.removeChild(div);
    }
}
function addGrids() {
    let basis = (Math.floor(100 / Math.sqrt(gridSize)) - 1);
    for (let i = 0; i < gridSize; i++) {
        const div = document.createElement('div');
        div.classList.add('grid');
        div.setAttribute('style', `opacity: 1;`);
        r.style.setProperty('--basis', `${basis}%`);
        grid.appendChild(div);
    }
}
function changeGrids() {
    removeGrids();
    addGrids();
    colorSquares();
}
function changeGridSize() {
    gridSize = prompt(`Enter a square number between 1 and 100.
(16 - 25 - 36 - 49 - 64 - 81 - 100)`);
    if (gridSize == 16 || gridSize == 25 || gridSize == 36 || gridSize == 49 || gridSize == 64 || gridSize == 81 || gridSize == 100) {
        changeGrids();
        return;
    } else if (gridSize === null || gridSize === '') {
        return;
    } else {
        alert('That was not a square number between 1 and 100. Please try again.');
    }
}
// THis feels like an absolute mess. I'm sure there's a better way to do this.
function colorSquares() {
    const gridSquares = document.querySelectorAll('.grid');
    for(let i = 0; i < gridSquares.length; i++) {
        gridSquares[i].addEventListener('mouseover', function(e) {
            if ((e.buttons == 1 || e.buttons == 3) && (colorMode == true && ghostMode == false)) {
                gridSquares[i].setAttribute('style', `opacity: 1; background-color: ${color};`);
            } else if ((e.buttons == 1 || e.buttons == 3) && (rainbowMode == true)) {
                randomColor();
                gridSquares[i].setAttribute('style', `opacity: 1; background-color: ${currentRandomColor};`);
            } else if ((e.buttons == 1 || e.buttons == 3) && (ghostMode == true && colorMode == true)) {
                const currentOpacity = gridSquares[i].style.opacity;
                if (currentOpacity == 1) {
                    gridSquares[i].setAttribute('style', `background-color: ${color}; opacity: 0.1;`);
                } else {
                    let newOpacity = parseFloat(currentOpacity) + 0.1;
                    gridSquares[i].setAttribute('style', `background-color: ${color}; opacity: ${newOpacity};`);
                }
            }
        })
    }
    for(let i = 0; i < gridSquares.length; i++) {
        gridSquares[i].addEventListener('mousedown', function(e) {
            if (colorMode == true && ghostMode == false) {
                gridSquares[i].setAttribute('style', `opacity: 1; background-color: ${color};`);
            } else if (rainbowMode == true) {
                randomColor();
                gridSquares[i].setAttribute('style', `opacity: 1; background-color: ${currentRandomColor};`);
            } else if (colorMode == true && ghostMode == true) {
                const currentOpacity = gridSquares[i].style.opacity;
                if (currentOpacity == 1) {
                    gridSquares[i].setAttribute('style', `background-color: ${color}; opacity: 0.1;`);
                } else {
                    let newOpacity = parseFloat(currentOpacity) + 0.1;
                    gridSquares[i].setAttribute('style', `background-color: ${color}; opacity: ${newOpacity};`);
                }
            }
        })
    }
}
// Color Functions
function randomColor() {
    currentRandomColor ='#'+ Math.floor(Math.random()*16777215).toString(16);
}
function watchColorPicker(event) {
    color = `${event.target.value}`;
}
// Button Functions
function setModeColor() {
    if (colorMode == false) {
        colorMode = true;
        rainbowMode = false;
        ghostMode = false;
    }
}
function setGhostMode () {
    if (ghostMode == false) {
        ghostMode = true;
        rainbowMode = false;
        colorMode = true;
    }
}
function setRainbowMode() {
    if (rainbowMode == false) {
        rainbowMode = true;
        colorMode = false;
        ghostMode = false;
    }
}
function clearWorkspace() {
    for(let i = 0; i < currentGrids.length; i++) {
        currentGrids[i].setAttribute('style', `background-color: white; opacity: 1;`);
    }
}
function startUp() {
    addGrids();
    colorSquares();
}
startUp();