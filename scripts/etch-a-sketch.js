function initializeGrid(gridDiv, squareLength) {
    if(!validateSquareSize(squareLength)) {
        return;
    }

    let width = Number(getComputedStyle(gridDiv).width.split('px')[0]);
    let gridSquareLength = width / squareLength;

    for(let i = 0; i < squareLength; i++) {
        let gridRowDiv = document.createElement('div');
        gridRowDiv.className = 'grid-row';
        gridRowDiv.style.width = width + 'px';
        gridRowDiv.style.height = gridSquareLength + 'px';
        for(let j = 0; j < squareLength; j++) {
            let gridSquareDiv = document.createElement('div');
            gridSquareDiv.className = 'grid-square';
            gridSquareDiv.style.width = gridSquareLength + 'px';
            gridSquareDiv.style.height = gridSquareLength + 'px';
            gridSquareDiv.style.display = 'inline-block';
            gridSquareDiv.style.filter = 'brightness(1.0)';
            gridRowDiv.appendChild(gridSquareDiv);
        }
        gridDiv.appendChild(gridRowDiv);
    }
}

function addHoverColorToSquares(hoverColor) {
   let squares = document.getElementsByClassName('grid-square');
   for(let i = 0; i < squares.length; i++) {
        squares[i].addEventListener('mouseover', (e) => {
            if(hoverColor === 'random') {
                e.target.style.backgroundColor = randomColorHover();
            } else {
                e.target.style.backgroundColor = hoverColor;
            }
        })
   }
}

function resetSquares() {
   let squares = document.getElementsByClassName('grid-square');
   for(let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = 'white';
   }
}

function deleteGridContents() {
    document.querySelectorAll('.grid-row').forEach(e => e.remove());
}

function validateSquareSize(squareSize) {
    message = 'please enter an integer between 1 and 100.'
    if(!Number.isInteger(squareSize)) {
        alert(`Error: Decimal given instead of integer, ${message}`);
        return false;
    } else if(isNaN(squareSize)) {
        alert(`Error: Invalid type, ${message}`);
        return false;
    } else if(squareSize < 1 || squareSize > 100) {
        alert(`Error: Invalid number, ${message}`);
        return false;
    } else {
        return true;
    }
}

function reset() {
    resetSquares()
    let promptMessage = 'How many pixels do you wants per side of the Etch-a-sketch sqaure?';
    deleteGridContents();
    let newGridSize = Number(prompt(promptMessage));
    initializeGrid(grid, newGridSize);
    addHoverColorToSquares('black');
}

// https://stackoverflow.com/a/1527834
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColorHover() {
    let red = getRandomInt(0, 255);
    let green = getRandomInt(0, 255);
    let blue = getRandomInt(0, 255);
    return `rgb(${red}, ${green}, ${blue})`;
}

const grid = document.getElementById('grid');
initializeGrid(grid, 16);
addHoverColorToSquares('black');

const clear = document.getElementById('clear');
clear.addEventListener('click', reset);

const rainbowMode = document.getElementById('rainbow-mode');
rainbowMode.addEventListener('click', () => {
    resetSquares()
    addHoverColorToSquares('random');
});