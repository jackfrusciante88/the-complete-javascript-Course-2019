// export function tutto(){}


//BUDGET CONTROLLER
var budgetController = (function(){
 //some code
})();


//UI CONTROLLER
var UIController = (function(){

    var DOMstrings = {
        inputType : '.add__type',
        inputDescription: '.add__description',
        inputValue : '.add__value',
        inputBtn : '.add__btn'

    }
    return {
        getInput: function(){
            return{
                type : document.querySelector(DOMstrings.inputType).value, //will be inc or exp
                description : document.querySelector(DOMstrings.inputDescription).value,
                value : document.querySelector(DOMstrings.inputValue).value
            }
        },

        getDOMstrings : function(){
            return DOMstrings;
        }
    }
})();


//GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl){
    var DOM = UICtrl.getDOMstrings();

    var ctrlAddItem = function(){
        
        //1 get input data from field
        var input = UICtrl.getInput();
        console.log(input);
        //2 add the item to the budget controler
        
        //3 add the item to UI
        
        //4 recalculate budget
        
        //5 dispaly budget on UI
        console.log('funziona');
    }
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress',function(event){
        if (event.keyCode === 13 || event.which === 13){
            ctrlAddItem();
        }        
    });


})(budgetController,UIController);