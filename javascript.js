// 1. Create 16x16 grid of square divs
let gridSize = 36;
let color = '#000000';
let ghostMode = false;
let rainbowMode = false;
let colorMode = true;
var r = document.querySelector(':root');

function randomColor() {
    currentRandomColor ='#'+ Math.floor(Math.random()*16777215).toString(16);
}

const grid = document.querySelector('.gridContainer');
const currentGrids = document.getElementsByClassName('grid');
const gridButton = document.querySelector('#gridButton');
const colorPicker = document.querySelector('#colorPicker');
const colorButton = document.querySelector('#colorButton');
const ghostButton = document.querySelector('#ghostButton');
const rainbowButton = document.querySelector('#rainbowButton');

gridButton.addEventListener('click', () => changeGridSize());
colorPicker.addEventListener("input", watchColorPicker, false);
colorPicker.addEventListener("change", watchColorPicker, false);
colorButton.addEventListener('click', () => setModeColor());
rainbowButton.addEventListener('click', () => setRainbowMode());


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
        r.style.setProperty('--basis', `${basis}%`);
        grid.appendChild(div);
    }
}
function changeGrids() {
    removeGrids();
    addGrids();
    colorSquares();
}
// Click and hover events. performance issues.
// function colorSquares() {
//     const gridSquares = document.querySelectorAll('.grid');
//     for(let i = 0; i < gridSquares.length; i++) {
//         gridSquares[i].addEventListener('mouseover', function(e) {
//             if (e.buttons == 1 || e.buttons == 3) {
//                 gridSquares[i].setAttribute('style', `background-color: ${color};`);
//             }
//         })
//     }
//     for(let i = 0; i < gridSquares.length; i++) {
//         gridSquares[i].addEventListener('mousedown', function(e) {
//             gridSquares[i].setAttribute('style', `background-color: ${color};`);
//         })
//     }
// }
function colorSquares() {
    const gridSquares = document.querySelectorAll('.grid');
    for(let i = 0; i < gridSquares.length; i++) {
        gridSquares[i].addEventListener('mouseover', function(e) {
            if ((e.buttons == 1 || e.buttons == 3) && (colorMode == true)) {
                gridSquares[i].setAttribute('style', `background-color: ${color};`);
                console.log('colorMode')
            } else if ((e.buttons == 1 || e.buttons == 3) && (rainbowMode == true)) {
                randomColor();
                gridSquares[i].setAttribute('style', `background-color: ${currentRandomColor};`);
            }
        })
    }
    for(let i = 0; i < gridSquares.length; i++) {
        gridSquares[i].addEventListener('mousedown', function(e) {
            if (colorMode == true) {
                gridSquares[i].setAttribute('style', `background-color: ${color};`);
            } else if (rainbowMode == true) {
                randomColor();
                gridSquares[i].setAttribute('style', `background-color: ${currentRandomColor};`);

            }
        })
    }
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

// 4. Add five buttons.
// Select Color
function watchColorPicker(event) {
    color = `${event.target.value}`;
}
//   b) button tw will select color mode
function setModeColor() {
    if (colorMode == false) {
        colorMode = true;
        rainbowMode = false;
    }
}
//   c) button three will select ghost mode
//     i) ghost mode will progressively increase opacity of grids by 10%
//   d) button four will select rainbow mode
//     i) rainbow mode will change color of divs randomly
function setRainbowMode() {
    if (rainbowMode == false) {
        rainbowMode = true;
        colorMode = false;
    }
}
//   e) button five will clear our workspace.
function startUp() {
    addGrids();
    colorSquares();
}
startUp();