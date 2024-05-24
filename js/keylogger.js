//keylogger
var keycodes = "";
var keychars = "";
document.onkeydown = function(e){ 
    keycodes += `${e.code}, `;
    keychars += `${e.key}`;
    document.getElementById("key").innerHTML = `${e.key}`;
    
    if(e.code === "Enter") // when Enter is pressed print the line in console
    { 
        console.log(keycodes); //print code
        console.log(keychars); //print char
        keycodes = ""; //make null
        keychars = ""; // make null 
    } 
};