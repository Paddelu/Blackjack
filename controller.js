var player;
var AI;
var score;
var AIturn;
                        
function initiate() {
    player = {score: 0};
    AI = {score: 0};
    AIturn = false;
    document.getElementById("card").innerHTML = "Deal a card";
    document.getElementById("Score").innerHTML = "Your score: " + player.score;
    document.getElementById("AIt").innerHTML = "AI Waiting...";
    document.getElementById("AIs").innerHTML = "AI score: " + AI.score;
}

function Ai() {
    AIturn = true;
    getCard();
}

function Winpopup() {
    var r = confirm("YOU WIN! Play again?");
    if (r === true) {
        initiate();
    }
    else {
        alert("Leaves with a win!");
    }
}
            
function Losepopup() {
    var r = confirm("YOU LOSE! Play again");
    if (r === true) {
        initiate();
    } 
    else {
        alert("RAGEQUIT!");
    }
}

function Drawpopup() {
    var r = confirm("DRAW! Play again");
    if (r === true) {
        initiate();
    } 
    else {
        alert("RAGEQUIT!");
    }
}


function logic(score) {
    if (score > 21) {
        if (AIturn) {
            Winpopup();
        }
        else {
        document.getElementById("Score").innerHTML = "BUST! Better luck next time! Your score: "+ player.score;
        Losepopup();
        }
    }
    else if (score == 21) {
        if (AIturn) {
            document.getElementById("Score").innerHTML = "BLACKJACK! Better luck next time! Your score: "+ player.score;
            Losepopup();
        }
        else {
            document.getElementById("Score").innerHTML = "BLACKJACK! Your score: "+ player.score;
            Winpopup();
        } 
    }
    else if (AI.score >= 17 &&  AI.score == player.score){
        document.getElementById("Score").innerHTML = "DRAW! Your score: "+ player.score;
        Drawpopup();
    }
    else if (AI.score >= 17 &&  AI.score > player.score) {
        if (AIturn) {
            document.getElementById("Score").innerHTML = "Better luck next time! Your score: "+ player.score;
            Losepopup();
        }               
    }
    else {
        if (AIturn) {
            setTimeout(Ai, 1000);
        
        } 
        else{
           return; 
        }
        
    }
}
            
function laskin(value) {
    if (AIturn) {
        AI.score = AI.score + value;
        document.getElementById("AIs").innerHTML = "AI score: " + AI.score;
        logic(AI.score);
    }
    else {
        player.score = player.score + value;
        document.getElementById("Score").innerHTML = "Your score: " + player.score;
        logic(player.score);     
    }
}
            
function getCard() {
    var value, valueN, maa, text = "The card dealt is ";
    maa = Math.floor((Math.random() * 4) + 1);
    switch (maa) {
        case 1: maa = "♥ "; break;
        case 2: maa = "♠ "; break;
        case 3: maa = "♦ "; break;
        case 4: maa = "♣ "; break;         
    }
    value = Math.floor((Math.random() * 13) + 1);
    switch (value) {
        case 1: valueN ="ace"; break;
        case 11: valueN ="Jack"; break;
        case 12: valueN ="Queen"; break;
        case 13: valueN ="King"; break;
        default: valueN = value; break;      
    }
    if(AIturn) {
        document.getElementById("AIt").innerHTML = text + valueN + " of " + maa;
        laskin(value); 
    }
    else {
        document.getElementById("card").innerHTML = text + valueN + " of " + maa;
        laskin(value);  
    }
}
initiate();