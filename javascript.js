// 1. Create 16x16 grid of square divs
//   a) create the divs using javascript
//   b) add the divs to container div
//   c) make the divs appear square, and in a grid with flexbox

let gridSize = 16;



const grid = document.querySelector('.gridContainer');
function selectSize() {
    for (let i = 0; i < gridSize; i++) {
        const div = document.createElement('div');
        div.classList.add('grid');
        grid.appendChild(div);
    }
}
selectSize();

// 2. Click and hover events. performance issues.

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

// 3. Add a button to select grid size
//   a) button should prompt for size of grid
//   b) limit size of grid to 100x100
//   c) grid should fill the same total space, regardless of grid size






// 4. Add five buttons.
//   a) button one will select color for color mode
//   b) button tw will select color mode
//   c) button three will select ghost mode
//     i) ghost mode will progressively increase opacity of grids by 10%
//   d) button four will select rainbow mode
//     i) rainbow mode will change color of divs randomly
//   e) button five will clear our workspace.

