// Import stylesheets

var targetId = "et_pb_contact_form_1"// idlub klasa elementu w ktory jest th text
var text = "test6" 
var formIndex = 0;
var index = 0;
text = text.toLowerCase()

var checkEveryMilliseconds = 1000;

formTrackerInterval = window.setInterval(function(){
    console.log(Math.random())
    index++;
    var target = "test"+index;
    console.log(target);
    if (target.indexOf(text) > -1) {
    window.clearInterval(formTrackerInterval);
    console.log('trovato');
    //dataLayer.push({event: 'formSubmitted'})
    } 
},checkEveryMilliseconds)





