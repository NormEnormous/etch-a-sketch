// 1. Create 16x16 grid of square divs
//   a) create the divs using javascript
//   b) add the divs to container div
//   c) make the divs appear square, and in a grid with flexbox
let gridSize = 36;
var r = document.querySelector(':root');

const grid = document.querySelector('.gridContainer');
const currentGrids = document.getElementsByClassName('grid');
const gridButton = document.querySelector('#gridButton');

gridButton.addEventListener('click', () => changeGridSize());

function removeGrids() {
    for (let i = currentGrids.length; i > 0; i--) {
        const div = document.querySelector(".grid")
        grid.removeChild(div);
        console.log(currentGrids.length);
    }
}
function addGrids() {
    let basis = (Math.floor(100 / Math.sqrt(gridSize)) - 1);
    for (let i = 0; i < gridSize; i++) {
        const div = document.createElement('div');
        div.classList.add('grid');
        r.style.setProperty('--basis', `${basis}%`);
        grid.appendChild(div);
        console.log(currentGrids.length);
        console.log(basis);
    }
}
function changeGrids() {
    removeGrids();
    addGrids();
    colorSquares();
}

// 2. Click and hover events. performance issues.
function colorSquares() {
const gridSquares = document.querySelectorAll('.grid');
for(let i = 0; i < gridSquares.length; i++) {
    gridSquares[i].addEventListener('mouseover', function(e) {
        if (e.buttons == 1 || e.buttons == 3) {
            gridSquares[i].classList.toggle('colored');
        }
    })
}
for(let i = 0; i < gridSquares.length; i++) {
    gridSquares[i].addEventListener('mousedown', function(e) {
        gridSquares[i].classList.toggle('colored');
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
//   a) button one will select color for color mode
//   b) button tw will select color mode
//   c) button three will select ghost mode
//     i) ghost mode will progressively increase opacity of grids by 10%
//   d) button four will select rainbow mode
//     i) rainbow mode will change color of divs randomly
//   e) button five will clear our workspace.

addGrids();
colorSquares();