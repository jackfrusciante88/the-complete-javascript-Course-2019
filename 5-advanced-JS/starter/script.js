// export function tutto (){  
// }


// Lecture: Function constructor
/*
var john = {
    name: 'John',
    yearOfBirth: 1990,
    job: 'teacher'
};

var Person = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person.prototype.calculateAge  = function() {
    console.log(2016 - this.yearOfBirth);
};

Person.prototype.lastName = 'Smith';

var john = new Person('John', 1990, 'teacher');
var jane = new Person('Jane', 1969, 'designer');
var mark = new Person('Mark', 1948, 'retired');

john.calculateAge();
jane.calculateAge();
mark.calculateAge();
console.log(john.lastName);
console.log(jane.lastName);
console.log(mark.lastName);
*/

//object.create
/*
var personProto = {
  calculateAge: function (){
    console.log(2019 - this.yearOfBirth);
  }
};

var john = Object.create(personProto);
john.name = 'John';
john.yearOfBirth = 1988;
john.job = 'teacher';

john.calculateAge();

var jane = Object.create(personProto,{
  name: { value: 'Jane'},
  yearOfBirth: { value: 1969},
  job: { value: 'streetworker'}
});
*/


// Lecture: Functions returning functions
/*
function interviewQuestion(job) {
    if (job === 'designer') {
        return function(name) {
            console.log(name + ', can you please explain what UX design is?');
        }
    } else if (job === 'teacher') {
        return function(name) {
            console.log('What subject do you teach, ' + name + '?');
        }
    } else {
        return function(name) {
            console.log('Hello ' + name + ', what do you do?');
        }
    }
}

var teacherQuestion = interviewQuestion('teacher');
var designerQuestion = interviewQuestion('designer');


teacherQuestion('John');
designerQuestion('John');
designerQuestion('jane');
designerQuestion('Mark');
designerQuestion('Mike');

interviewQuestion('teacher')('Mark');
*/

//Closures
/*
function interview(job,question){
  let statement = 'if you are a '+job+', '+question;
  return function (name){
    console.log('Hello '+name+', '+statement);
  }
}

let funMinatore = interview('minatore','what color carbon is?');
let funTeacher = interview('teacher','when they discover America?');
let funPlayer = interview('Player','how long is a football field?');

funMinatore('Karol');
funMinatore('George');
funTeacher('Gervasio');
*/
//dal corso
/*
function interview(job) {
  return function(name) {
    if (job === 'designer') {
          console.log(name + ', can you please explain what UX design is?');      
    } else if (job === 'teacher') {
            console.log('What subject do you teach, ' + name + '?');
    } else {
            console.log('Hello ' + name + ', what do you do?');
    }

  }
}

interview('teacher')('John');
*/



//CHALLENGE 

/*
function Question (q,a,c){
  this.question = q;
  this.answer = a;
  this.correct = c;
}

Question.prototype.show = function(){
  console.log(this.question);
  this.answer.forEach(function(el,index) {
    console.log(index+': '+el)    
  });
}


var questions = [];

questions.push(new Question('come ti chiami?',['Mattia','Paolo','Alberto'],0));
questions.push(new Question('quanti anni hai?',['21','35','31'],2));
questions.push(new Question('di che colore era il cavallo bianco di napoleone?',['Bianco','nero'],0));
questions.push(new Question('dove vivi',['Katowice','L`Aquila,','Roma','Krakow'],3));




function Rdn(){
  let n = Math.floor(Math.random()*questions.length);
  questions[n].show();
  let answer = prompt(`inserisci il numero della risposta corretta`,'numero');
  if (answer == questions[n].correct){
    console.log('Risposta esatta')
  }
  else{
    console.log('risposta errata');
  }

}

Rdn()
*/


//IIFE
/*
( function (){

  function Question (q,a,c){
    this.question = q;
    this.answer = a;
    this.correct = c;
  }

  Question.prototype.show = function(){
    console.log(this.question);
    this.answer.forEach(function(el,index) {
      console.log(index+': '+el)    
    });
  }

  Question.prototype.check = function(ans){
    if (ans === questions[n].correct){
      console.log('Risposta esatta')
    }
    else{
      console.log('risposta errata');
    }
  }

  var questions = [];

  questions.push(new Question('come ti chiami?',['Mattia','Paolo','Alberto'],0));
  questions.push(new Question('quanti anni hai?',['21','35','31'],2));
  questions.push(new Question('di che colore era il cavallo bianco di napoleone?',['Bianco','nero'],0));
  questions.push(new Question('dove vivi',['Katowice','L`Aquila,','Roma','Krakow'],3));

  let n = Math.floor(Math.random()*questions.length);

  questions[n].show();

  let answer = parseInt(prompt(`inserisci il numero della risposta corretta`,'numero'));

  questions[n].check(answer);
})();
*/



/*
--- Expert level ---

8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)

9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.

10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).

11. Display the score in the console. Use yet another method for this.
*/

( function (){

  function Question (q,a,c){
    this.question = q;
    this.answer = a;
    this.correct = c;
  }

  Question.prototype.show = function(){
    console.log(this.question);
    this.answer.forEach(function(el,index) {
      console.log(index+': '+el)    
    });
  }

  Question.prototype.check = function(ans, fn){
  let points;
    if (ans === questions[n].correct){
      console.log('Risposta esatta');
      points = fn (true);
    }
    else{
      console.log('risposta errata');
      points = fn (false);
    }
    this.pointsDisplay(points);
  }

  Question.prototype.pointsDisplay = function (tot){
    console.log('il tuo punteggio attuale è '+tot);
    console.log('------------------------------');
  }

  var questions = [];
  let n;
  questions.push(new Question('come ti chiami?',['Mattia','Paolo','Alberto'],0));
  questions.push(new Question('quanti anni hai?',['21','35','31'],2));
  questions.push(new Question('di che colore era il cavallo bianco di napoleone?',['Bianco','nero'],0));
  questions.push(new Question('dove vivi',['Katowice','L`Aquila,','Roma','Krakow'],3));



  function nextQuestion(){
    n = Math.floor(Math.random()*questions.length);

    questions[n].show();
  
    let answer = prompt(`inserisci il numero della risposta corretta`,'numero');
    if (answer !== 'exit'){
      questions[n].check(parseInt(answer), totalScore);
      nextQuestion();
    }    
  }
  let totalScore = score();

  function score(){
    var cs = 0;
    return function (valid){
      if (valid) {
        cs ++;
      }
      return cs;
    }
  }
   
  nextQuestion();
})();