const board = document.querySelector('.board');
const select = document.querySelectorAll('.oponent button');
const marks = document.querySelector('.marks');
const start = document.createElement('button');
start.textContent = 'Start Game';
let sentence = document.createElement('h2');
let playerX,playerO,x,mark,symbol,squares,form,level,computerMark,playerMark,gameMode;
let div = document.createElement('div');
let counter = 0;
let xArr = [];
let oArr = [];
let boardArr = [];

createBoard()
/* function BoardObj(xArr,oArr) {
    this.xArr = xArr;
    this.oArr=oArr;
};
const g = new BoardObj
console.table(BoardObj) */

function createBoard() {
    for (let i=1; i<4; i++) {
        for (let j=1; j<4; j++) {
            //board.style.gridTemplate = 'repeat(3, 50px) / repeat(3, 50px)';
            const square = document.createElement('div');
            //square.textContent = `${i}${j}`;
            square.setAttribute('data-index',`${i}${j}`);
            symbol = document.createElement('img');
            symbol.classList = 'mark';
            square.classList = 'square';
            square.appendChild(symbol);
            //square.style.height = '1fr'
            board.appendChild(square);
        }
    }
}

select.forEach(button => button.addEventListener('click', computerOrPlayer));

function computerOrPlayer(e) {
    x = true;
    gameMode = e.target.textContent;
    if (e.target.textContent === 'Computer') {
        createSelectMenu();
        createMarkSelect();
    }
    else if (e.target.textContent === 'Player VS Player') playerVsPlayer(x);
}

function createSelectMenu() {
    if (div.innerHTML !== '') return;
    form = document.createElement('form');
    form.setAttribute('method','get');
    const select = document.createElement('select');
    select.setAttribute('id','levels');
    const label = document.createElement('label');
    label.setAttribute('label','levels');
    label.textContent = 'Chooce difficulty:'
    div.appendChild(label);
    for (let i=0;i<4;i++) {
        const option = document.createElement('option');
        if (i === 1) {
            option.textContent = 'easy';
            option.setAttribute('value','easy');
        }
        if (i === 2) {
            option.textContent = 'intermediate';
            option.setAttribute('value','intermediate');
        }
        if (i === 3) {
            option.textContent = 'impossible';
            option.setAttribute('value','impossible');
        }
        select.appendChild(option);
    }
    div.appendChild(select);
    form.appendChild(div);
    marks.appendChild(div);
}

function createMarkSelect() {
    const select = document.querySelector('select');
    select.addEventListener('change',() => {
        if (select.value === 'easy') level = 'easy';
        if (select.value === 'intermediate') level = 'intermediate';
        if (select.value === 'impossible') level = 'impossible';
        if (marks.childNodes.length > 2) return;
        const markSelect = document.createElement('div');
        const marksText = document.createElement('p');
        marksText.textContent = 'Chooce your mark:';
        const x = document.createElement('img');
        x.src = 'img/x.svg';
        x.classList = 'mark';
        const o = document.createElement('img');
        o.src = 'img/o.svg';
        o.classList = 'mark';
        markSelect.appendChild(marksText);
        markSelect.appendChild(x);
        markSelect.appendChild(o);
        marks.appendChild(markSelect);
        const markSelection = document.querySelectorAll('.mark');
        markSelection.forEach(mark => mark.addEventListener('click',(e) => {
            let playerArr,computerArr;
            playerMark = e.target.src[e.target.src.length-5];
            if (playerMark === 'x') {
                computerMark = 'o';
                playerArr = xArr;
                computerArr = oArr;
            }
            if (playerMark === 'o') {
                computerMark = 'x';
                playerArr = oArr;
                computerArr = xArr;
            }
            startGame();
        }))
        
    })
}

function startGame() {
    marks.appendChild(start);
    start.addEventListener('click',() => {
        marks.innerHTML='';
        computerChoice();
    })
    
}

function computerChoice() {
    
    const squares = document.querySelectorAll('.board .square');
    squares.forEach(square => {
        squareIndex = square.getAttribute('data-index');
        boardArr.push(squareIndex);
    });
    let computerMove;
    if (level === 'easy') {
        easyMode(computerMove);
    }
    if (level === 'intermediate') {
        mediumMode(computerMove)
    }
    if (level === 'impossible') {
        impossibleMode(computerMove)
    }
    addMark();
}


function easyMode(computerMove) {
    computerMove = boardArr[Math.floor(Math.random() * (boardArr.length-1))];
    console.log(computerMove)
}

function mediumMode(computerMove) {
    console.log('medium');
}

function impossibleMode(computerMove) {
    console.log('hadd');
}

function playerVsPlayer(x) {
    
    mark = document.createElement('img');
    mark.src = 'img/x.svg';
    mark.classList = 'mark';
    sentence.textContent = ' - turn';
    
    if (marks.childNodes.length>1) return;
    else {
        div.appendChild(mark);
        div.appendChild(sentence);
        marks.appendChild(div)
    }
    addMark();
    
   // marks.appendChild(text);
}

function addMark() {
    let target,mark;
    squares = document.querySelectorAll('.square');
    if (gameMode === 'Player VS Player') {
        squares.forEach(square => square.addEventListener('click', (e) => {
            target = e.target;
            console.log(target)
        }));
            
    }
    else {
        squares.forEach(square => () => {
            if (computerMove === square.getAttribute('data-index')) target = square.childNodes[0];
        });
    }
            target.classList = 'playerMark'
            let squareIndex = target.getAttribute('data-index');
            if (target.src !== '') return;
            if (x) {
                target.src = 'img/x.svg';
                setTimeout(() => mark.src = 'img/o.svg',300) ;
            }
            else {
                target.src = 'img/o.svg';
                setTimeout(() => mark.src = 'img/x.svg',300);
            }
            let squareMark = target.src[target.src.length-5];
            if (squareMark === 'x') xArr.push(squareIndex)
            else if (squareMark === 'o') oArr.push(squareIndex)
            x = !x;
            counter++;
            if (counter >= 5 && counter < 9) {
                check(xArr);
                check(oArr);
            }
            if (counter === 9) {
                check(xArr);
                check(oArr);
                draw();
            } 
}

function check(arr) {
    console.table(arr)
    let currentIndex = arr[arr.length-1];
    let firstDiagonalIndices = ['11','22','33']
    let secondDiagonalIndices = ['13','22','31']
    let rowCounter = 0;
    let colCounter = 0;
    let firstDiagonalCounter = 0;
    let secondDiagonalCounter = 0;
    for (let i=0;i<(arr.length-1);i++) {
        if (currentIndex[0] === arr[i][0] && currentIndex[1] !== arr[i][1]) rowCounter++;
        if (currentIndex[1] === arr[i][1] && currentIndex[0] !== arr[i][0]) colCounter++;
        console.log(`rowCounter=${rowCounter},colCounter=${colCounter}, firstDiagonalCounter=${firstDiagonalCounter},secondDiagonalCounter =${secondDiagonalCounter} `)
        
    };
    arr.forEach(index => {
        if (firstDiagonalIndices.includes(index)) firstDiagonalCounter++;
        if (secondDiagonalIndices.includes(index)) secondDiagonalCounter++;
    });
    if (rowCounter === 2 || colCounter ===2 || firstDiagonalCounter === 3 || secondDiagonalCounter === 3) {
        
        if (arr === xArr) clearGame('x');
        if (arr === oArr) clearGame('o');
    }

}

function draw() {
    marks.removeChild(mark);
    sentence.textContent = 'Draw!';
    squares = document.querySelectorAll('.square');
    squares.forEach(square => square.removeChild(square.children[0]));
}

function clearGame(symbol) {
    div.removeChild(mark);
    let winnerMark = document.createElement('img');
    winnerMark.classList = 'mark';
    winnerMark.src = `img/${symbol}.svg`;
    sentence.textContent = 'is the winner !';
    div.appendChild(winnerMark);
    div.style.flexDirection ='row-reverse';
    console.log(mark)
    squares = document.querySelectorAll('.square');
    squares.forEach(square => square.removeChild(square.children[0]));
}