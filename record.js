window.onload = setRecord;
function setRecord(){
    document.getElementById("streak").innerHTML = "Record by player "+localStorage.getItem("Playername")+" with a of score: "+ localStorage.getItem("Wincount"); 
    
}
