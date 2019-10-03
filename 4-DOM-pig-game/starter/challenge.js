/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

export function tutto(){
};

let score = [], roundScore, activePlayer, activeMatch = false, goal = 100, previous = false;
let image = 'https://raw.githubusercontent.com/jackfrusciante88/course2019js/master/dice-';
init();

function init(){
    goal = prompt("Please set here your score", "100");
    score = [0,0];
    roundScore = 0;
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
};

function nextPlayer(){
    previous = false;
    roundScore =0;
    document.querySelector(`#current-`+activePlayer).textContent = 0;
    activePlayer  === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector(`.btn-hold`).style.display = `none`;
    document.querySelectorAll(`.dice`).forEach(function(e){e.style.display = `none`});
    document.querySelector(`.player-0-panel`).classList.toggle(`active`);
    document.querySelector(`.player-1-panel`).classList.toggle(`active`);
};

function roll(){
  if(activeMatch){
    let dice = [Math.ceil(Math.random()*6),Math.ceil(Math.random()*6)];
    roundScore = roundScore + dice[0] + dice [1];
    document.querySelectorAll(`.dice`).forEach(function(e){e.style.display = `block`});
    document.querySelectorAll(`.dice`).forEach(function(element,index){element.src = image+dice[index]+".png";});

    if(rule(dice)){
      //fai cos
      document.querySelector('#current-'+activePlayer).textContent = roundScore;
      document.querySelector('.btn-hold').style.display = 'block';
    }
    else{//passsa il turno
      nextPlayer();
    }
  }
};

function hold(){
  if(activeMatch){
  //aggionra score
  score[activePlayer] += roundScore;
  document.querySelector('#score-'+activePlayer).textContent = score[activePlayer];
    //controlla se ha vinto
    if(score[activePlayer]< goal){
      // passa il turno
      nextPlayer();
    }
    else{
      activeMatch = false;
      document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
      document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
      document.querySelector('#name-'+activePlayer).textContent= "WINNER!";
      document.querySelector('.btn-hold').style.display = 'none';
      document.querySelector('.dice').style.display = 'none'; 
    };
    

  };
};

function rule(array){
if(array[0] === 1 || array[1] === 1 ){
      return false;      
    }
else if(array [0] === 6 || [1] === 6){
  if(previous){
    score [activePlayer] = 0;
    document.querySelector('#score-'+activePlayer).textContent = 0;
    return false;  }
  else{
    previous = true;
    return true;  }
  }
else {
  previous = false;
  return true};
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