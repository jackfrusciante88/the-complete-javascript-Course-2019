// es5
/*
var name5 = 'Jane Smith';
var age5 = 23;
name5 = 'Jane Miller';
console.log(name5);

//es6

const name6 = 'Jane Smith';
let age6 = 23;
name6 = 'Jane Miller';
console.log(name5);



//es5
function driverLicense6(passedTest) {
    let firstname = 'John';
    const yearOfBirth = 1990;
    if (passedTest) {
        firstname = 'John';

    }

    console.log()

}

driverLicense6(true);

*/


///////////////////////
/// block and IFE


//es6
{
    let a = 4;
    const b = 2;
    var d =6;
}

// console.log(a+ b);


//es5
(function(){
    var c= 3;
})();

console.log(d)



////////////////////
///string 
//es5 
var a = "dsfasdf sdf sdfs ' " + d + "sdfsd sdfsdf sdf sdf ";

//es 6

let a = `adfasf ${d} fsdfsdf `;


/////////////////////
/// arrow function
const years = [1990, 5965, 1982, 1937];



//ES5
var ages5 = years.map(function(el){ return 2019 - el});

console.log (ages5);


//es6
const ages6 = years.map(el => 2016 - el)
console.log (ages6);

ages6 = years.map((el, index) => `Age element ${index + 1}  effective age ${2019 - el}.`)


ages6 = years.map((el,index)=> {
    const now = new Date().getFullYear();
    age = now - el;
    return `Age element ${index + 1}: ${age}.`
});