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

( function (){
  function Question (q,a,c){
    this.question = q;
    this.answer = a;
    this.correct = c;
  };
  
  Question.prototype.show = function(){
    console.log(this.question);
    this.answer.forEach(function(el,index) {
      console.log(index+': '+el)    
    });
  };

  var questions = [];
  questions.push(new Question('come ti chiami?',['Mattia','Paolo','Alberto'],0));
  questions.push(new Question('quanti anni hai?',['21','35','31'],2));
  questions.push(new Question('di che colore era il cavallo bianco di napoleone?',['Bianco','nero'],0));
  questions.push(new Question('dove vivi',['Katowice','L`Aquila,','Roma','Krakow'],3));
  let n = Math.floor(Math.random()*questions.length);
  
  questions[n].show();
  let answer = prompt(`inserisci il numero della risposta corretta`,'numero');
  if (answer == questions[n].correct){
    console.log('Risposta esatta')
  }
  else{
    console.log('risposta errata');
  }
 
})();