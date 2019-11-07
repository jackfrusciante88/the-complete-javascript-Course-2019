// export function tutto(){}


//BUDGET CONTROLLER
var budgetController = (function(){

    var Expense = function(id,description,value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalIncome){
        if(totalIncome>0){
            this.percentage = Math.round((this.value/totalIncome)*100);
        } else{
             this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function(){
        return this.percentage;
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

        deleteItem: function(type , id){
            var ids, index;
            ids = data.allItems[type].map(function(current){
                return current.id;
            });
            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
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

        calculatePercentages: function(){
            data.allItems.exp.forEach(function(el){
                el.calcPercentage(data.totals.inc);
            })
        },

        getPercentages: function(){
            var allPerc = data.allItems.exp.map(function(el){
                return el.getPercentage();
            });            
            return allPerc;
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
        expensePercentages : '.item__percentage',
        dateLabel: '.budget__title--month'
    };

    var formatNumber = function(num, type){
        var numSplit, int, dec, type;
        //esattamente 2 decimali
        num = Math.abs(num);
        num = num.toFixed(2);
        // piu o meno davanti al numero

        // speratore migliaia 
        numSplit = num.split('.');
        
        int = numSplit[0];
        if (int.length > 3){
            int = int.substr(0 , int.length -3) + ',' + int.substr(int.length -3 , 3);
        }

        dec = numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
    };

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

                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp'){
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            };
            //replace the placeholder text with real data 
            newHtml = html.replace('%id%',obj.id);
            newHtml = newHtml.replace('%description%',obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

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
            var type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';

            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc,'inc') ;
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp,'exp') ;
            if(obj.totalPercentage > 0){
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.totalPercentage + ' %';

            } else{
                document.querySelector(DOMstrings.percentageLabel).textContent = '--';
            }
        },

        deleteListItem: function(selectorID){
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        displayPercentages: function(percentages){
            var fields = document.querySelectorAll(DOMstrings.expensePercentages);
            fields.forEach(function(el,index){
                if (percentages[index] > 0){
                    el.textContent= percentages[index]+' %';                    
                }
                else{
                    el.textContent= '---';
                }
            })
        },

        displayMonth: function (){
            var now, month, year;
            
            now = new Date();

            months = ['January','February','March','April','May','June','July','August','September','October','November','December']
            month = now.getMonth();

            year = now.getFullYear();
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
        },

        changeType: function(){

            var fields = document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue );
            fields.forEach(function(el){
                el.classList.toggle('red-focus');
            })      


        },
    };
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

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeType);
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
            //recalculate percentages
            updatePercentages();                        
        }
    };

    var ctrlDeleteItem = function(event){
        var itemID, splitID, type,ID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if(itemID){
            //inc-1 i want 1
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            //delete data from data structure
            budgetCtrl.deleteItem(type, ID);

            //delete item from UI
            UICtrl.deleteListItem(itemID);

            //update and show the budgets
            updateBudget();

            //update percentages
            updatePercentages();
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

    var updatePercentages = function(){
        //calculate percentage
        budgetCtrl.calculatePercentages();

        //readpercentages from budget controler
        var percentages = budgetCtrl.getPercentages();

        //updatte ui with percentage
        console.log(percentages);
        UICtrl.displayPercentages(percentages);
    };

    return{
        init: function(){
            UICtrl.displayMonth();
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