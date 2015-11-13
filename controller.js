var player;
var AI;
var tulos;
var AIturn;
                        
function initiate() {
    player = {score: 0};
    AI = {score: 0};
    AIturn = false;
    document.getElementById("kortti").innerHTML = "Arvo kortti";
    document.getElementById("Tulos").innerHTML = "Your score: " + player.score;
    document.getElementById("AIt").innerHTML = "AI Waiting...";
    document.getElementById("AIs").innerHTML = "AI score: " + AI.score;
}

function Ai() {
    AIturn = true;
}

function Winpopup() {
    var r = confirm("YOU WIN! Play again?");
    if (r === true) {
        initiate();
    }
    else {
        alert("Lähtee voittajana!");
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

function logic(tulos) {
    if (tulos > 21) {
        if (AIturn) {
            Winpopup();
        }
        else {
        document.getElementById("Tulos").innerHTML = "Yli meni! Tuloksesi oli: "+ player.score;
        Losepopup();
        }
    }
    else if (tulos == 21) {
        if (AIturn) {
            Losepopup();
        }
        else {
            document.getElementById("Tulos").innerHTML = "Voitit! Tuloksesi oli tasan: "+ player.score;
            Winpopup();
        } 
    }
    else if (AI.score > player.score) {
        if (AIturn) {
            Losepopup();
        }               
    }
    else {
        return;
    }
}
            
function laskin(arvo) {
    if (AIturn) {
        AI.score = AI.score + arvo;
        document.getElementById("AIs").innerHTML = "AI score: " + AI.score;
        logic(AI.score);
    }
    else {
        player.score = player.score + arvo;
        document.getElementById("Tulos").innerHTML = "Your score: " + player.score;
        logic(player.score);     
    }
}
            
function Kortti() {
    var arvo, arvoN, maa, text = "Arpomani kortti on ";
    maa = Math.floor((Math.random() * 4) + 1);
    switch (maa) {
        case 1: maa = "Hertta "; break;
        case 2: maa = "Pata "; break;
        case 3: maa = "Ruutu "; break;
        case 4: maa = "Risti "; break;         
    }
    arvo = Math.floor((Math.random() * 13) + 1);
    switch (arvo) {
        case 1: arvoN ="Ässä"; break;
        case 11: arvoN ="Jätkä"; break;
        case 12: arvoN ="Rouva"; break;
        case 13: arvoN ="Kuningas"; break;
        default: arvoN = arvo; break;      
    }
    if(AIturn) {
        document.getElementById("AIt").innerHTML = text + maa + arvoN;
        laskin(arvo); 
    }
    else {
        document.getElementById("kortti").innerHTML = text + maa + arvoN;
        laskin(arvo);  
    }
}
initiate();