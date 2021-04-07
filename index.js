var container=document.getElementById("grid-container");
var items=document.getElementsByClassName("grid-item");
var restartButton=document.getElementById("restart");
var i=0;
var resultbutton=document.getElementById("result");
var player=document.getElementById("player");
var TwoPlayer=document.getElementById("twoPlayer");
var loadPage=document.getElementById("load-page");
var onePlayer=document.getElementById("onePlayer");
var mode=document.getElementById("mode");
var member;
var userSymbol,computerSymbol;
var game=false;
// function to display result
function displayResult(){
    var newButton=document.createElement("button");
    var newDiv=document.createElement("div");
    var buttonText=document.createTextNode("START AGAIN");
    newButton.appendChild(buttonText);
    var text=document.createTextNode(member+" won!");
    newDiv.classList.add("result");
    newDiv.appendChild(text);
    document.body.appendChild(newDiv);
    newDiv.appendChild(newButton);
    // handle the working of start again button
    newButton.addEventListener('click',function()
    {
        document.body.removeChild(newDiv);
        game=false;
        restartGame();
    });
}

// function to check winning conditions
function check(){
    if (items[0].innerHTML!==" " && items[1].innerHTML!==" " && items[2].innerHTML!==" " && items[3].innerHTML!==" " && items[3].innerHTML!==" " && items[5].innerHTML!==" " && items[6].innerHTML!==" " && items[7].innerHTML!==" " && items[8].innerHTML!==" " )
    {
        member="Nobody";
        console.log("draw");
        game=true;
        displayResult();
    }
    else if((items[0].innerHTML===items[1].innerHTML && items[1].innerHTML===items[2].innerHTML && items[0].innerHTML!=" " && items[1].innerHTML!=" " && items[2].innerHTML!=" ") ||
    (items[3].innerHTML===items[4].innerHTML && items[4].innerHTML===items[5].innerHTML && items[3].innerHTML!=" " && 
    items[4].innerHTML!=" " && items[5].innerHTML!=" ") ||
     (items[6].innerHTML===items[7].innerHTML && items[7].innerHTML===items[8].innerHTML && items[6].innerHTML!=" " && items[7].innerHTML!=" " && items[8].innerHTML!=" ") ||
      (items[0].innerHTML===items[3].innerHTML && items[3].innerHTML===items[6].innerHTML && items[6].innerHTML!=" " && items[0].innerHTML!=" " && items[3].innerHTML!=" ")  || 
      (items[1].innerHTML===items[4].innerHTML && items[4].innerHTML===items[7].innerHTML && items[1].innerHTML!=" " && items[4].innerHTML!=" " && items[7].innerHTML!=" ") ||
       (items[2].innerHTML===items[5].innerHTML && items[5].innerHTML===items[8].innerHTML && items[2].innerHTML!=" " && items[5].innerHTML!=" " && items[8].innerHTML!=" ") ||
        (items[0].innerHTML===items[4].innerHTML && items[4].innerHTML===items[8].innerHTML && items[0].innerHTML!=" " && items[4].innerHTML!=" " && items[8].innerHTML!=" ") ||
        (items[2].innerHTML===items[4].innerHTML && items[4].innerHTML===items[6].innerHTML && items[2].innerHTML!=" " && items[4].innerHTML!=" " && items[6].innerHTML!=" "))
        {
            container.style.background="black";
            player.innerHTML="Game ends!";
            console.log("won");
            game=true;
            displayResult();
        }
    
}

// event to play one player
onePlayer.addEventListener("click",function(){
    console.log("one player");
    symbol();
    document.body.removeChild(loadPage);
    mode.innerHTML="MODE : ONE PLAYER";
    container.addEventListener('click',function(e)
    {
        var clicked=e.target;
        console.log(clicked);
        if(clicked.innerHTML===" ")
        {
            clicked.innerHTML=userSymbol;
            player.innerHTML="\"Computer\" : " + computerSymbol;
            member="Player 1";
            check();
            if((player.innerHTML==="\"Computer\" : " + computerSymbol) && game===false)
            {
                setTimeout(() => {
                    var num=Math.trunc(Math.random()*8);
                    if(items[num].innerHTML===" ")
                    {
                        items[num].innerHTML=computerSymbol;
                        player.innerHTML="\"Player 1\" : " + userSymbol;
                        member="Computer";
                    }
                    else{
                        do{
                            num=Math.trunc(Math.random()*8);
                        }while(items[num].innerHTML!==" ");
                        items[num].innerHTML="O";
                        player.innerHTML="\"Player 1\"";
                        member="Computer";
                    }
                    check();
                }, 1000);
            }
        }   
    });
});  

//event to play two player
TwoPlayer.addEventListener('click',function(){
    i=0;
    console.log("two player");
    mode.innerHTML="MODE : TWO PLAYER";
    document.body.removeChild(loadPage);
    container.addEventListener('click',function(e)
    {
        var itemClicked=e.target;
        if(itemClicked.innerHTML===" ")
        {
            if(i%2==0)
                {
                    player.innerHTML="\"Player 2\"";
                    itemClicked.innerHTML="X";
                    member="Player 1"
                    i++;
                }
            else{
                    player.innerHTML="\"Player 1\"";
                    itemClicked.innerHTML="O";
                    member="Player 2";
                    i++;
                }
            check();
        }    
    });
});

// function to restart game
function restartGame(){
    game=false;
    console.clear();
    i=0;
    location.reload();
}

// event to restart
restartButton.addEventListener('click',restartGame);

// give choice to select symbol
function symbol(){
    var selectSymbol=document.createElement("div");
    var selectMsg=document.createElement("div");
    var symbols=document.createElement("div");
    var selectText=document.createTextNode("SELECT YOUR SYMBOL");
    var buttonX=document.createElement("button");
    var buttonO=document.createElement("button");
    var valueX=document.createTextNode("X");
    var valueO=document.createTextNode("O");
    buttonX.appendChild(valueX);
    buttonO.appendChild(valueO);
    selectSymbol.classList.add("symbol");
    buttonO.classList.add("symbolOption");
    buttonX.classList.add("symbolOption");
    symbols.appendChild(buttonX);
    symbols.appendChild(buttonO);
    selectMsg.appendChild(selectText);
    selectSymbol.appendChild(selectMsg);
    selectSymbol.appendChild(symbols);
    document.body.appendChild(selectSymbol);
    buttonO.addEventListener("click",function(){
        document.body.removeChild(selectSymbol);
        userSymbol="O";
        computerSymbol="X";
        player.innerHTML="\"Player 1\" : " + userSymbol;
    });
    buttonX.addEventListener("click",function(){
        document.body.removeChild(selectSymbol);
        userSymbol="X";
        computerSymbol="O";
        player.innerHTML="\"Player 1\" : " + userSymbol;
    });
}