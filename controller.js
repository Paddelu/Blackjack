var player;
var AI;
var score;
var AIturn;
var player
var name;
var start;
var value, valueN, suit, text = "The card dealt is ";
var cs = "cardsuit";
var cv = "cardvalue";
var winCount = 0;
window.onload = setName;

function setName(){
    player = {name,score};
    player.name = prompt("Please enter your name");
    initiate();
    
}
// adds a div with a card (taken from css class)  inside cards div 
    function cardGraph(){
    var card = document.createElement("div");  
    console.log(cs + cv);
    card.className = cs + cv;
    if(AIturn){
        document.getElementById("cardsAI").appendChild(card);
    }
    else{
        document.getElementById("cardsP").appendChild(card);
    }
    return; 
}
                
function initiate() {
    console.log("game starting");
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
    document.getElementById("wins").innerHTML = "Wins in a row: "+ winCount;
    document.getElementById("record").innerHTML = "Current record by "+localStorage.getItem("Playername")+" with a score of: "+ localStorage.getItem("Wincount");
    StartDeal();
}

function StartDeal(){
    getCard();
    Ai();
    start = false;
    AIturn = false;
    getCard();  
}

function winCounter(){
    winCount++;
    if(winCount > localStorage.getItem("Wincount")){
        localStorage.setItem("Wincount", winCount);
        localStorage.setItem("Playername", player.name);
    }
    return;
}

function resetWinCounter(){
    winCount = 0;
    return;
}

function Ai() {
    AIturn = true;
    getCard();
}

function Winpopup() {
    winCounter();
    var r = confirm("YOU WIN! Play again?");
    if (r === true) {
        initiate();
    }
    else {
        alert("Leaves with a win!");
        location.href='index.html';
    }
}
            
function Losepopup() {
    resetWinCounter();
    var r = confirm("YOU LOSE! Play again");
    if (r === true) {
        initiate();
    } 
    else {
        alert("RAGEQUIT!");
        location.href='index.html';
    }
}

function Drawpopup() {
    resetWinCounter();
    var r = confirm("DRAW! Play again");
    if (r === true) {
        initiate();
    } 
    else {
        alert("RAGEQUIT!");
        location.href='index.html';
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
    suit = Math.floor((Math.random() * 4) + 1);
    cs = suit;
    switch (suit) {
        case 1: suit = "♣ "; cs="c"; break;
        case 2: suit = "♦ "; cs="d"; break;
        case 3: suit = "♥ "; cs="h"; break; 
        case 4: suit = "♠ "; cs="s"; break;       
    }
    value = Math.floor((Math.random() * 13) + 1);
    cv = value;
    switch (value) {
        case 1: valueN ="ace"; break;
        case 11: value= 10; valueN = "Jack"; break;
        case 12: value= 10; valueN = "Queen"; break;
        case 13: value= 10; valueN =" King"; break;
        default: valueN = value; break;      
    }
    if(AIturn) {
        cardGraph();
        document.getElementById("AIt").innerHTML = text + valueN + " of " + suit;
        document.getElementById("AIcards").innerHTML +=" "+ valueN + " of " + suit+",";
        getValue(value); 
    }
    else {
        cardGraph();
        document.getElementById("card").innerHTML = text + valueN + " of " + suit;
        document.getElementById("cards").innerHTML +=" "+ valueN + " of " + suit+",";
        getValue(value);  
    }
}
