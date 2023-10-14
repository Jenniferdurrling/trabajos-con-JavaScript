var character = document.getElementById("character");
var game = document.getElementById("game");
var interval;
var both = 0;
var counter = 0;
var currentBlock = [];

/*Crea movimientos*/
function moveLeft(){
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(left>0){
        character.style.left = left - 2 + "px";
    }
};

function moveRight(){
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(left<380){
        character.style.left = left + 2 + "px";
    }
};

document.addEventListener("keydown", Event => {
    if(both==0){
        both++;
        if(Event.key==="ArrowLeft"){
            interval = setInterval(moveLeft, 1);
        }
        if(Event.key==="ArrowRight"){
            interval = setInterval(moveRight, 1);
        }
    }
});

document.addEventListener("keyup", Event => {
    clearInterval(interval);
    both = 0;
});

/* Crea bloques y agujeros*/

var blocks = setInterval(function() {
    var blockLast = document.getElementById("block" + (counter-1));
    var holeLast = document.getElementById("hole" + (counter-1));
    if(counter>0){
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
        var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
    }
    if(blockLastTop<400||counter==0){
        var block = document.createElement("div");
        var hole = document.createElement("div");
        block.setAttribute("class", "block");
        hole.setAttribute("class", "hole");
        block.setAttribute("id", "block" + counter);
        hole.setAttribute("id", "hole" + counter);
        block.style.top = blockLastTop + 60 + "px";
        hole.style.top = holeLastTop + 60 + "px";
        var random = Math.floor(Math.random() * 360);
        hole.style.left = random + "px";
        game.appendChild(block);
        game.appendChild(hole);
        currentBlock.push(counter);
        counter++;
    }

    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var drop = 0
    if(characterTop <= 0){
        alert("Game Over. Score: " + (counter-9));
        clearInterval(block);
        location.reload();
    }
    for(var i = 0; i<currentBlock.length; i++){
        let current = currentBlock[i];
        let iblock = document.getElementById("block" + current);
        let ihole = document.getElementById("hole" + current);
        let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
        let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));
        iblock.style.top = iblockTop - 0.5 + "px";
        ihole.style.top = iblockTop - 0.5 + "px";
        if(iblockTop<-20){
            currentBlock.shift();
            iblock.remove();
            ihole.remove();
        }
        if(iblockTop-20 < characterTop && iblockTop > characterTop){
            drop++;
            if(iholeLeft <= characterLeft && iholeLeft + 20 >= characterLeft){
                drop = 0;
            }
        }
    }
    if(drop==0){
        if(characterTop < 480){
            character.style.top = characterTop + 2 + "px";
        }
    }else{
        character.style.top = characterTop - 0.5 + "px";
    }
},1);
