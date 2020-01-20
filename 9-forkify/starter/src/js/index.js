/*
import string from  './models/Search';
//import { add as a , multiply as m, ID} from './views/searchView';
import * as searchView from './views/searchView'

//console.log(`using imported funtions! ${a(ID,5)} sum, ${m(ID, 4)} multiply. ${string}`);
console.log(`using imported funtions! ${searchView.add(searchView.ID,5)} sum, ${searchView.multiply(searchView.ID, 4)} multiply. ${string}`);
*/

// http://forkify-api.herokuapp.com/

/*

import axios from 'axios';


//       ----  with axios implementation    ---  

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

//        ----  with fetch implementation    ---  
function getResultsF(query) {
    fetch(`https://forkify-api.herokuapp.com/api/search?q=${query}`)
    .then(result => {
        return result.json();
    })
    .then(data => {
        console.log(data)
    })
}

//        ----  with async try catch fetch implementation    ---  
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

//        ----  with async try catch fetch implementation    ---  
async function getResultsA(query) {
        const result = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${query}`);
        const data = await result.json();
        console.log(data.recipes);
        return data;        
}

getResults('pasta');
// getResultsA('pizzas');

*/

import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader} from './views/base';

/** global state of the app
 * search object
 * current recipe object
 * shopping list object
 * liked recipe
 */
const state ={};

//    SEARCH CONTROLLER

const controlSearch = async() =>{
    //get query from the view
    const query= searchView.getInput();
    console.log(query);
    if (query) {
        // 2 new search object and add to state
        state.search = new Search(query);
        //3 prepare ui foe results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            //4 search recipes
            await state.search.getResults();
    
            //5 render the results on ui
            clearLoader();
            searchView.renderResults(state.search.result);

        } catch (err){
            alert('something went wrong with the search '+err)
        }
    }
};

elements.searchForm.addEventListener('submit', e =>{
    e.preventDefault();
    controlSearch();
});




elements.searchResPages.addEventListener('click', e =>{
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage)
    }
})

// RECIPE CONTROLLER
const controlRecipe = async () => {
    //get id from url
    const id =window.location.hash.replace('#','')

    if(id){
        //prepare the ui for chanf

        //create new recipe object
        state.recipe =  new Recipe(id);

        try {
            //get the recipe data and pars eingredients
            await state.recipe.getRecipe();
            //error in parse ingredients to debug
            state.recipe.parseIngredients();

            //calcualte serving and time
            state.recipe.calcTime();
            state.recipe.calcServing();


            //render the recipe
            console.log(state.recipe)
        } catch (err) {
            alert('error processing recipe! '+err)
        }


    }
}

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
['hashchange','load'].forEach(event => window.addEventListener(event, controlRecipe));