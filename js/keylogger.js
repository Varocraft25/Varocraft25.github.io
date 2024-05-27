import { isChecked } from './switch.js';

var chxBox = document.querySelector(".ios-switch-control-input").value;
console.log(chxBox);

var keycodes = "";
var keychars = "";

document.onkeydown = function(e) {
    keycodes += `${e.code}, `;
    keychars += `${e.key}`;
    if (isChecked == true) {
        document.getElementById("key").innerHTML = `${e.key}`;
    }
    
    if(e.code === "Enter") { 
        console.log(keycodes); //print code
        console.log(keychars); //print char
        keycodes = ""; //make null
        keychars = ""; // make null 
    }

    return false;
};
