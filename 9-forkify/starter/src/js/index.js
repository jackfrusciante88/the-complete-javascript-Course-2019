/*
import string from  './models/Search';
//import { add as a , multiply as m, ID} from './views/searchView';
import * as searchView from './views/searchView'

//console.log(`using imported funtions! ${a(ID,5)} sum, ${m(ID, 4)} multiply. ${string}`);
console.log(`using imported funtions! ${searchView.add(searchView.ID,5)} sum, ${searchView.multiply(searchView.ID, 4)} multiply. ${string}`);
*/

// http://forkify-api.herokuapp.com/

import axios from 'axios';


/*       ----  with axios implementation    ---  */

async function getResults(query){
    try{
        // const key = 'FDGFDG67F67SDF6SDF678S6D';
        // const proxy = 'https://crossorigin.me/'
        // const res = await axios(`${proxy}https://forkify-api.herokuapp.com/api/search?q=${query}&key=${key}`);
        const res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${query}`);
        const recipes = res.data.recipes;
        console.log(recipes);
    } catch (err){
        alert(err);
    }
}

/*       ----  with fetch implementation    ---  */
function getResultsF(query) {
    fetch(`https://forkify-api.herokuapp.com/api/search?q=${query}`)
    .then(result => {
        return result.json();
    })
    .then(data => {
        console.log(data)
    })
}

/*       ----  with async try catch fetch implementation    ---  */
async function getResultsT(query) {
    try{
        const result = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${query}`);
        const data = await result.json();
        console.log(data);
        return data;        
    } catch(error) {
        alert(error);
    }
}

/*       ----  with async try catch fetch implementation    ---  */
async function getResultsA(query) {
        const result = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${query}`);
        const data = await result.json();
        console.log(data.recipes);
        return data;        
}

getResults('pasta');
// getResultsA('pizzas');
