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
1.  Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (formula: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.
*/


class elem {
    constructor(name, year){
        this.id = new Date().valueOf();
        this.name = name;
        this.year = year;
    }
};

class park extends elem{
    constructor(name, year, area, nTrees){
        super(name, year);
        this.nTrees = nTrees;
        this.area = area;
        // density = function(){
        //     this.nTrees/this.area;
        
        // }
    }
};

class street extends elem{
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
        this.parks.push(new park(name,year,area,nTrees) )
    },
    setStreets : function(id, name, year, length, size){
        this.streets.push(new street(id, name, year, length, size) )
    },

    getParks : ()=> {
console.log( data.parks );
//      return this.parks;
    },


    avgPark : ()=>{
        let avg = 0;
        for (let i = 0 ; this.parks.length ; i++){
            avg += this.parks[i].year;
        };
        return avg/this.parks.length;
    },

}


data.setParks('sibillini','1996',254,1500)
console.log( data.getParks() );

// console.log(`la citta ha ${var o method} ancora bla bla bla`);