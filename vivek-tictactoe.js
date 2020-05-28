const x_ele = 'x'
const circle_ele = 'circle'
const redSelect = 'redselect'
const greenSelect = 'greenselect'
const disabled = 'disabled'
let elementArray;

const totalCells = document.querySelectorAll('.cell')
const placedCell = totalCells.clickedCell;
const board = document.getElementById('board')
const winningMessage = document.getElementById('winningMessage')
const restartButton = document.getElementById('resetButton')
const winningMessageTextElement = document.querySelector('.datawinningmessagetext')
let circleTurn ;
let remainingCells;

console.log(winningMessageTextElement)




startGameClass()
restartButton.addEventListener('click',startGameClass);


function startGameClass(){
    circleTurn = false;
    remainingCells = 9;
    elementArray = [
        ['','',''],
        ['','',''],
        ['','',''],
    ];
    totalCells.forEach(cell => {
        cell.classList.remove(x_ele,circle_ele,redSelect,greenSelect,disabled);
        // cell.classList.remove(circle_ele);
        // cell.classList.remove(redSelect);
        // cell.classList.remove(greenSelect);
        // cell.classList.remove(disabled);
        cell.removeEventListener('click',toClickClass)
        cell.addEventListener('click',toClickClass,{once:true})

    
    })
    hoverClass()
    winningMessage.classList.remove('show');

}

function toClickClass(e){
    const cell = e.target
    const currentEle = circleTurn ? circle_ele : x_ele ;

    let row = Math.floor(cell.id/3);
    let col = cell.id%3;
    remainingCells -= 1
    console.log(remainingCells)
    //console.log(row+" ",col);
    elementArray[row][col] = currentEle
    //console.log(elementArray)
    markClass(cell,currentEle);
    if (checkWin(currentEle,row,col)){

        endGame(false);

    }
    else if(isDraw()){
        endGame(true)
    }

    else{
        swapTurnsClass()
        hoverClass()
    }

}

function endGame(draw){
    if (draw){
        
        winningMessageTextElement.innerText = 'Draw!'
      
        
    }
    else
    {
      
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
       

        
    }
    makeDisable()
    setTimeout(function(){
        winningMessage.classList.add('show')
    },2000)
    
}
function isDraw(){
    if (remainingCells == 0){
        return true
    }
    return false

}

function swapTurnsClass(){
    circleTurn = !circleTurn;
    //return circleTurn
    //console.log(circleTurn)
    // totalCells.forEach(cell => { 
    //     console.log(cell);


}

function markClass(cell,currentEle){
    //console.log(cell)
    //console.log(currentEle)
    cell.classList.add(redSelect);
    cell.classList.add(currentEle);

}

function hoverClass(){
    board.classList.remove(x_ele);
    board.classList.remove(circle_ele);
    if(circleTurn){
        board.classList.add(circle_ele);

    }
    else{
        board.classList.add(x_ele);

    }
}
function makeDisable(){
    totalCells.forEach(cell => {
        cell.classList.add("disabled");
    });
};
function turnColorRow(row){
    if (row === 0){

        document.getElementById('0').classList.add(greenSelect);
        document.getElementById('1').classList.add(greenSelect);
        document.getElementById('2').classList.add(greenSelect);
        //console.log(document.querySelectorAll('.cell'))   
    }
    else if (row === 1){

        document.getElementById('3').classList.add(greenSelect);
        document.getElementById('4').classList.add(greenSelect);
        document.getElementById('5').classList.add(greenSelect);
        //console.log(document.querySelectorAll('.cell'))   
    }
    if (row === 2){

        document.getElementById('6').classList.add(greenSelect);
        document.getElementById('7').classList.add(greenSelect);
        document.getElementById('8').classList.add(greenSelect);
        //console.log(document.querySelectorAll('.cell'))   
    }

}

function turnColorCol(col){
    if (col === 0){

        document.getElementById('0').classList.add(greenSelect);
        document.getElementById('3').classList.add(greenSelect);
        document.getElementById('6').classList.add(greenSelect);
        //console.log(document.querySelectorAll('.cell'))   
    }
    else if (col === 1){

        document.getElementById('1').classList.add(greenSelect);
        document.getElementById('4').classList.add(greenSelect);
        document.getElementById('7').classList.add(greenSelect);
        //console.log(document.querySelectorAll('.cell'))   
    }
    if (col === 2){

        document.getElementById('2').classList.add(greenSelect);
        document.getElementById('5').classList.add(greenSelect);
        document.getElementById('8').classList.add(greenSelect);
        //console.log(document.querySelectorAll('.cell'))   
    }

}
function turnColorDiag1(){
    

    document.getElementById('0').classList.add(greenSelect);
    document.getElementById('4').classList.add(greenSelect);
    document.getElementById('8').classList.add(greenSelect);
        //console.log(document.querySelectorAll('.cell'))   

}
function turnColorDiag2(){
    

    document.getElementById('2').classList.add(greenSelect);
    document.getElementById('4').classList.add(greenSelect);
    document.getElementById('6').classList.add(greenSelect);
        //console.log(document.querySelectorAll('.cell'))   

}
function checkWin(currentEle,row,col){
    let fail = true;
    //console.log(currentEle,row)
    // for row
    for(let i=0;i<3;i++){
        //console.log(elementArray[row][i])
        if (elementArray[row][i] !== currentEle){
            //console.log(elementArray[row][i] == currentEle)
            fail = false;
            break;
        }
    }
    //console.log(fail)
    if(fail){
        turnColorRow(row);
        return true;
    }
    // for col
    fail = true
    for(let i=0;i<3;i++){
        //console.log(elementArray)
        //console.log(elementArray[row][i] === currentEle)
        if (elementArray[i][col] !== currentEle){
           fail = false;
           break;
        }
    }
    //console.log(fail)
    if(fail){
        turnColorCol(col);
        return true;
    }
    //for diag-1
    fail = true
    for(let i = 0; i < 3; i++) {
        if(elementArray[i][i] !== currentEle) {
            fail = false;
            break;
            
        }
    }
    if(fail){
        turnColorDiag1();
        return true;
    }
    // for diag-2
    fail = true
    for(let i = 0; i < 3; i++) {
        if(elementArray[i][2 - i] !== currentEle) {
            fail = false;
            break;
        }
    }
    if(fail){
        turnColorDiag2();
        return true;
    }
    return false;
}