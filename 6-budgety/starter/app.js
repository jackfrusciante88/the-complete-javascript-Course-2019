// export function tutto(){}


//BUDGET CONTROLLER
var budgetController = (function(){

    var Expense = function(id,description,value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var Income = function(id,description,value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function (type){
        var sum = 0;
        data.allItems[type].forEach(function(elem){
            sum += elem.value;
        })
        data.totals[type] = sum;
    };


    var data = {
        allItems: {
             exp:[],
             inc:[],
        },
        totals:{
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };


    return {
        addITem: function(type, des, val){
            var newItem, ID;
            //create new ID
            if(data.allItems[type].length === 0){
            ID = 0;
            }
            else{
                ID = data.allItems[type][data.allItems[type].length-1].id +1;
            }
            //Create new item based on 'inc' or 'exp'
            if(type === 'exp'){
                newItem = new Expense(ID, des, val)
            } else if (type ==='inc'){
                newItem = new Income(ID, des, val)
            }
            //push it into data structure            
            data.allItems[type].push(newItem);
            
            //return the new element
            return newItem;         
        },

        calculateBudget: function() {
            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            // calculate the budget
            data.budget = data.totals.inc - data.totals.exp;

            // calculate the expense percentage
            if(data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            }else {
                data.percentage = -1
            }
        },

        getBudget: function(){
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                totalPercentage: data.percentage
            }
        },

        testing: function(){
            console.log(data)
        }
    }
 //some code
})();


//UI CONTROLLER
var UIController = (function(){

    var DOMstrings = {
        inputType : '.add__type',
        inputDescription: '.add__description',
        inputValue : '.add__value',
        inputBtn : '.add__btn',
        incomeContainer : '.income__list',
        expenseContainer : '.expenses__list',
        budgetLabel : '.budget__value',
        incomeLabel : '.budget__income--value',
        expensesLabel : '.budget__expenses--value',
        percentageLabel : '.budget__expenses--percentage',
        container :'.container',
    }
    return {
        getInput: function(){
            return{
                type : document.querySelector(DOMstrings.inputType).value, //will be inc or exp
                description : document.querySelector(DOMstrings.inputDescription).value,
                value : parseFloat(document.querySelector(DOMstrings.inputValue).value)
            }
        },

        addListedItem: function(obj, type){
            var html, newHtml, element;
            //create html string with placeholder text
            if (type === 'inc'){
                element = DOMstrings.incomeContainer;

                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp'){
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            };
            //replace the placeholder text with real data 
            newHtml = html.replace('%id%',obj.id);
            newHtml = newHtml.replace('%description%',obj.description);
            newHtml = newHtml.replace('%value%',obj.value);

            //insert html in DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields: function(){
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);
            fieldsArr = Array.prototype.slice.call(fields,);

            fieldsArr.forEach(function(c, i, a){
                c.value = "";
            });
            fieldsArr[0].focus();

        },

        getDOMstrings : function(){
            return DOMstrings;
        },

        displayBudget : function (obj){
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = '+ ' + obj.totalInc;
            document.querySelector(DOMstrings.expensesLabel).textContent = '- ' + obj.totalExp;
            if(obj.totalPercentage > 0){
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.totalPercentage + ' %';

            } else{
                document.querySelector(DOMstrings.percentageLabel).textContent = '--';
            }
        }
    }
})();


//GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl){

    var setupEventListener = function(){

        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress',function(event){
            if (event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }        
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem)
    };


    var ctrlAddItem = function(){
        var input,newItem;

        //1 get input data from field
        input = UICtrl.getInput();

        if(input.description !== "" && !isNaN(input.value) && input.value > 0){

            //2 add the item to the budget controler
            newItem = budgetCtrl.addITem(input.type, input.description, input.value);
            //3 add the item to UI
            UICtrl.addListedItem(newItem,input.type);
            //4 clear all fiends
            UICtrl.clearFields();
            updateBudget();            
        }
    };

    var ctrlDeleteItem = function(event){
        var itemID, splitID, type,ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(itemID){
            //inc-1 i want 1
            spliID = itemID.split('-');
            type = splitID[0];
            ID = splitID;

            //delete data from data structure

            //delete item from UI

            //update and show the budgets
        }

    }

    var updateBudget = function(){
        //1 recalculate budget
        budgetCtrl.calculateBudget();
        //2 return budget
        var budget = budgetCtrl.getBudget();
        
        //5 dispaly budget on UI
        UICtrl.displayBudget(budget);
    };

    return{
        init: function(){
            console.log('applicazione started correctly');
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                totalPercentage: -1
            });
            setupEventListener();
        }
    };

})(budgetController,UIController);


controller.init();