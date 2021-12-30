
let player = {
    name: "Emme",
    chips: 100
};
const deck = {
    0: `<img src="images/backr.png">`,
    1: `<img src="images/af.png">`,
    2: `<img src="images/2q.png">`,
    3: `<img src="images/3f.png">`,
    4: `<img src="images/4q.png">`,
    5: `<img src="images/5f.png">`,
    6: `<img src="images/6q.png">`,
    7: `<img src="images/7f.png">`,
    8: `<img src="images/8q.png">`,
    9: `<img src="images/9f.png">`,
    10: `<img src="images/10q.png">`,
    11: `<img src="images/jf.png">`,
    12: `<img src="images/qq.png">`,
    13: `<img src="images/kf.png">`,
};

let cards = [];
let sum = 0 ;
let hasBlacJack = false;
let isAlive = false;
let message = ''; 
let pippo='';
let j=0; let k=0;
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el"); //let sumEl = document.querySelector("#sum-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");
const terrain = document.getElementById("cards-space");
const help = document.getElementById("help-btn")

playerEl.textContent= player.name + ': $' + player.chips;

function buttonMaker() {
    let newButton= document.createElement("button");
    newButton.innerHTML="CASH OUT";
    newButton.id="cash-out";
    newButton.onclick=()=>{  //cashOut function
        //aggiungi somma alle chips
        if(isAlive=true){
            player.chips+=sum;
            playerEl.textContent=player.name + ': $' + player.chips;
            //reset game (no clear!)
            erase(); j=0;
            pippo = document.getElementById("cash-out");
            pippo.style.backgroundColor="DarkGoldenRod";
            //document.getElementById("new-card").style.backgroundColor= 'DarkGoldenRod';
            pippo.remove();
            isAlive=false;
            messageEl.textContent=("You Cashed Out! ")
            document.getElementById("start-game").textContent= 'NEW GAME';
            terrain.innerHTML=deck[0]+deck[0];
        };
    };
    document.body.appendChild(newButton);
};

function killDaButton() {
    if (document.getElementById("cash-out")){
        pippo = document.getElementById("cash-out");
        pippo.remove();
    };
};

function getRandomCard() {
    let rnd = Math.floor(Math.random() * 13) + 1;
    console.log(rnd);
    showCards(rnd);
    if(rnd === 1) {k=1; return 11}
    else if (rnd >= 11) return 10;
    else return rnd;
};

function showCards(n) {
    k=0 ? terrain.innerHTML+=deck[1]
    : terrain.innerHTML+=deck[n];
}

function erase() {
    document.getElementById("new-card").style.backgroundColor= 'goldenrod';
    document.getElementById("start-game").textContent= 'START GAME';
    terrain.innerHTML='';
    hasBlacJack = false;
    isAlive = true;
};

function clearGame() {
    player.name="Emme";
    player.chips= 100;
    cards = [];
    sum = 0 ;
    j=0; k=0;
    hasBlacJack = false;
    isAlive = false;
    message = 'Want to play a round?'; 
    cardsEl.textContent='Cards: ';
    sumEl.textContent='Sum: ';
    document.getElementById("new-card").style.backgroundColor= 'goldenrod';
    document.getElementById("start-game").textContent= 'START GAME';
    terrain.innerHTML= `
                        <img src="images/backr.png">
                        <img src="images/backr.png">
                        `;
    playerEl.textContent=player.name + ': $' + player.chips;
    console.clear();
    console.log("Game Reset, console cleared");
        killDaButton();
};

function startGame() {
    isAlive = true;
    sum=0;
    j++;
    console.log("new game");
     erase();
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard]; 
    document.getElementById("start-game").textContent= "PASS";
    renderGame();
    if(j>1){
        killDaButton();
    };
};

function renderGame() {
    cardsEl.textContent = ('Cards: ');
    for(i=0;i<cards.length;i++){
        //console.log(cards[i]);
        cardsEl.textContent+= cards[i] + ' ';
        sum+=cards[i];
    };
    sumEl.textContent= ('Sum: ' + sum);
    if (sum<=20){
        message = "Do you want to draw a new card?";
        buttonMaker();
    } else if (sum === 21){
        message = "You've got a blackjack!";
        player.chips+=100;
        playerEl.textContent= player.name + ': $' + player.chips;
        hasBlacJack = true;
        console.log("win $100.  Chips: "+player.chips);
        document.getElementById("start-game").textContent= 'NEXT GAME';
        document.getElementById("new-card").style.backgroundColor= 'DarkGoldenRod';
        if (document.getElementById("cash-out"))
        killDaButton(); j=0;

    } else {
        message =  "You're out of the game!";
        player.chips-=10;
        playerEl.textContent= player.name + ': $' + player.chips;
        isAlive=false;
        console.log("Total= "+sum+ " you lose $10. Chips: "+player.chips);
        document.getElementById("start-game").textContent= 'NEXT GAME';
        document.getElementById("new-card").style.backgroundColor= 'DarkGoldenRod';
        if(player.chips<=0){
            playerEl.textContent= player.name + ': $0' ;
            setTimeout(()=>{window.alert("Game Over! Out of money"); 
                clearGame();},500);   
        };
        if (document.getElementById("cash-out"))
        killDaButton(); j=0;
    };
    messageEl.textContent = message;
};

function newCard() {
    if (isAlive===true && hasBlacJack===false){ 
        console.log("Drawing a new card from the deck!")
        let thirdCard = getRandomCard();
        k=0;
        cards.push(thirdCard);
        sum=0;
        renderGame();
        killDaButton();
    };
}

function status() {
    console.log( "chips"+player.chips+"cards"+ cards +"sum"+sum+"hasBJ"+hasBlacJack+"isAlive"+isAlive+"message"+message+"pippo"+pippo+"j"+j);
};

