var player;
var AI;
var score;
var AIturn;
var player
var name;
var start;
window.onload = setName;

function setName(){
    player = {name,score};
    player.name = prompt("Please enter your name");
    initiate();
    
}
// adds a div with a card (taken from css class)  inside cards div 
    function cardTest(){
    var card = document.createElement("div");  
    card.className = "piece1"     
    if(AIturn){
        document.getElementById("cardsAI").appendChild(card);
    }
    else{
        document.getElementById("cardsP").appendChild(card);
    }
    return; 
}
                
function initiate() {
    AI = {name: "AI",score: 0};
    player.score = 0;
    AIturn = false;
    start = true;
    document.getElementById("cardsP").innerHTML = "";
    document.getElementById("cardsAI").innerHTML = "";
    document.getElementById("Player").innerHTML = player.name;
    document.getElementById("card").innerHTML = "Deal a card";
    document.getElementById("cards").innerHTML = "Player cards:";
    document.getElementById("Score").innerHTML = "Your score: " + player.score;
    document.getElementById("AIt").innerHTML = "AI Waiting...";
    document.getElementById("AIn").innerHTML = AI.name;
    document.getElementById("AIcards").innerHTML = "AIS cards:";
    document.getElementById("AIs").innerHTML = "AI score: " + AI.score;
    StartDeal();

}

function StartDeal(){
    getCard();
    Ai();
    start = false;
    AIturn = false;
    getCard();  
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
    else if (AI.score >= 17 &&  AI.score < player.score) {
        if (AIturn) {
            document.getElementById("Score").innerHTML = "You win! Your score: "+ player.score;
            Winpopup();
        }               
    }
    else {
        if (AIturn && !start) {
            setTimeout(Ai, 1000);
        
        } 
        else{
           return; 
        }
        
    }
}
            
function getValue(value) {
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
    cardTest();
    var value, valueN, suit, text = "The card dealt is ";
    suit = Math.floor((Math.random() * 4) + 1);
    switch (suit) {
        case 1: suit = "♥ "; break;
        case 2: suit = "♠ "; break;
        case 3: suit = "♦ "; break;
        case 4: suit = "♣ "; break;         
    }
    value = Math.floor((Math.random() * 13) + 1);
    switch (value) {
        case 1: valueN ="ace"; break;
        case 11: value= 10; valueN = "Jack"; break;
        case 12: value= 10; valueN = "Queen"; break;
        case 13: value= 10; valueN =" King"; break;
        default: valueN = value; break;      
    }
    if(AIturn) {
        document.getElementById("AIt").innerHTML = text + valueN + " of " + suit;
        document.getElementById("AIcards").innerHTML +=" "+ valueN + " of " + suit+",";
        getValue(value); 
    }
    else {
        document.getElementById("card").innerHTML = text + valueN + " of " + suit;
        document.getElementById("cards").innerHTML +=" "+ valueN + " of " + suit+",";
        getValue(value);  
    }
}
