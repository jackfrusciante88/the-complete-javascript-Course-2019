export function tutto (){

}
console.log('inizio');
var budgetController = (function(){

  //insriamo il codice del modulo budget budgetController
  var x = 23;
  var add = function(a){
      x + a;
  }

  return {
    publicTest: function(b) {
        console.log(add(b));
    }
  }

})()

console.log('fine');