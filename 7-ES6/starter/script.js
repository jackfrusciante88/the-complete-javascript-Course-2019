export function tutto(){};
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
/*

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
*/








/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1.  Tree density of each park in the town (formula: number of trees/park area)
2. Average age of each town's park (formula: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.
*/


class Elem {
    constructor(name, year){
        this.id = new Date().valueOf();
        this.name = name;
        this.year = year;
    }
};

class Park extends Elem{
    constructor(name, year, area, nTrees){
      super(name, year);
      this.nTrees = nTrees;
      this.area = area;
    }    
    density (){
      return this.nTrees/this.area;
    }
};

class Street extends Elem{
    constructor(name, year, length, size ='normal'){
        super(name, year);
        this.length = length;
        this.size = size;
    }
};

let data = {
    parks : [],
    streets: [],

    setParks : function(name,year,area,nTrees){
        this.parks.push(new Park(name,year,area,nTrees) )
    },
    setStreets : function(id, name, year, length, size){
        this.streets.push(new Street(id, name, year, length, size) )
    },

    getParks() {
     return this.parks;
    },

    getStreets() {
     return this.streets;
    },

    getDensity(){
      return this.parks.map( (e)=>`il parco ${e.name} ha una densita di ${e.density()} alberi`)
    },


    avgPark() {
        let avg = 0;
        let date = new Date().getFullYear()
        for (let i = 0 ; i < this.parks.length ; i++){
            avg += date - this.parks[i].year;
        };
        return avg/this.parks.length;
    },

    more1000(){ 
      return this.parks.filter( (e) => e.nTrees > 1000).map((e)=> e.name)     
    },

    totStreets(){
      return this.streets.map( (e)=> e.length).reduce((tot, e)=> tot+e)
    },

    avgStreets(){
      return this.totStreets()/this.streets.length
    },

    report(){
      console.log(``)
    }



    
/*
    fTest() {
      console.log(this.test.length);
      for (let i = 0 ; i < this.parks.length ; i++){
        console.log(`elemento ${i} e il parco  ${this.parks[i].name}`)
      }

    },
*/

}




data.setParks('sibillini','1996',254,1500);
data.setParks('stelvio','1986',1254,1990);

data.setStreets('via roma','1986',133);
data.setStreets('via salaria','1913',653,'big');
data.setStreets('via fortebracci','1998',3,'small');

console.log( data.totStreets());
console.log( data.avgStreets());
console.log( data.getDensity());
// console.log(`la citta ha ${var o method} ancora bla bla bla`);