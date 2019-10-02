/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/





// textContent inserisce il testo assegnato all`interno di un html esistente mentre innerHTML inserisce anche del odice html
// document.querySelector(`#current-` + activePlayer).textContent = dice;

export function tutto(){
}
  // import './style.css';
  // import './index.html';
  let score = [], roundScore, activePlayer;
  let image = 'https://raw.githubusercontent.com/jackfrusciante88/course2019js/master/dice-';

  init();

  document.querySelector(`.btn-roll`).addEventListener(`click`, function(){

      let dice = Math.ceil(Math.random()*6);

      let diceDom = document.querySelector(`.dice`);
      diceDom.src = image+dice+".png";
      diceDom.style.display = `block`;

      if(dice !== 1){
          roundScore += dice;
          document.querySelector(`#current-`+activePlayer).textContent = roundScore;
          document.querySelector(`.btn-hold`).style.display = `block`;
      }
      else{
          nextPlayer();
      }
  });

  document.querySelector(`.btn-hold`).addEventListener(`click`,function(){
      //add current sclore to global score
      score[activePlayer] += roundScore;
      document.querySelector(`#score-`+activePlayer).textContent = score[activePlayer];
  // check the winner
      if(score[activePlayer] >= 20){
          document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
          document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
          document.getElementById("name-"+activePlayer).textContent= "WINNER!";
          document.querySelector(`.btn-hold`).style.display = `none`;
          document.querySelector(`.dice`).style.display = `none`;
          // document.querySelector(`.btn-hold`).style.display = `none`;
          // document.querySelector(`.dice`).style.display = `none`;
          // document.querySelector(`.btn-roll`).style.display = `none`;
      }
      //reset match score
      else nextPlayer();
  });

  document.querySelector('.btn-new').addEventListener('click',init);



function nextPlayer(){
    roundScore =0;
    document.querySelector(`#current-`+activePlayer).textContent = 0;
    activePlayer  === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector(`.btn-hold`).style.display = `none`;
    document.querySelector(`.dice`).style.display = `none`;
    // document.querySelector(`.player-0-panel`).classList.remove(`active`);
    // document.querySelector(`.player-1-panel`).classList.add(`active`);
    document.querySelector(`.player-0-panel`).classList.toggle(`active`);
    document.querySelector(`.player-1-panel`).classList.toggle(`active`);
}

function init(){
    score = [0,0];
    roundScore = 0;
    activePlayer = 0;
    console.log(activePlayer);
    document.querySelector(`.dice`).style.display = `none`;
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
}

