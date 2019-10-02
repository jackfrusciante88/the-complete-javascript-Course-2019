/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

export function tutto(){
};

let score = [], roundScore = [], activePlayer, activeMatch = false, goal = 100;
let image = 'https://raw.githubusercontent.com/jackfrusciante88/course2019js/master/dice-';

function init(){
    goal = prompt("Please set here your score", "100");
    score = [0,0];
    roundScore = [0,0];
    activePlayer = 0;
    document.querySelectorAll(`.dice`).forEach(function(element){element.style.display = `none`});
    document.querySelector(`.btn-hold`).style.display = `none`;
    document.getElementById(`score-0`).textContent = `0`;
    document.getElementById(`score-1`).textContent = `0`;
    document.getElementById(`current-0`).textContent = `0`;
    document.getElementById(`current-1`).textContent = `0`;
    document.getElementById('name-0').textContent= "Player1";
    document.getElementById('name-1').textContent= "Player2";
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    activeMatch = true;
}

function nextPlayer(){
    roundScore =[0,0];
    document.querySelector(`#current-`+activePlayer).textContent = 0;
    activePlayer  === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector(`.btn-hold`).style.display = `none`;
    document.querySelectorAll(`.dice`).forEach(function(e){e.style.display = `none`});
    document.querySelector(`.player-0-panel`).classList.toggle(`active`);
    document.querySelector(`.player-1-panel`).classList.toggle(`active`);
}

function roll(){
  if(activeMatch){
    let dice = [Math.ceil(Math.random()*6),Math.ceil(Math.random()*6)];


  }

};



function hold(){

};


document.querySelector('.btn-new').addEventListener('click',init);
document.querySelector('.btn-roll').addEventListener('click',roll);
document.querySelector('.btn-hold').addEventListener('click',hold);

// document.querySelector(".forminput").addEventListener("submit", e => {
//   console.log(e);
//   e.preventDefault();
//   let path = document.querySelector(".input-score")
//   goal = path.value;
//   console.log(goal);
//   path.value = "";
// });