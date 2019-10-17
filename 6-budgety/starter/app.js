// export function tutto(){}


//BUDGET CONTROLLER
var budgetController = (function(){
 //some code
})();


//UI CONTROLLER
var UIController = (function(){
    return {
        getinput: function(){

        }
    }
})();


//GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl){

    var ctrlAddItem = function(){
        
        //1 get input data from field
        
        //2 add the item to the budget controler
        
        //3 add the item to UI
        
        //4 recalculate budget
        
        //5 dispaly budget on UI
        console.log('funziona');
    }
    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress',function(event){
        if (event.keyCode === 13 || event.which === 13){
            ctrlAddItem();
        }        
    });


})(budgetController,UIController);