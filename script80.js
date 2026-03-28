let gameSeq = [];
let userSeq = [];

let btns = ["red","green","blue","yellow"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2"); 

document.addEventListener("keypress", function() {
    if(started == false){
        console.log("Game is started.")
        started = true;

        levelUp();
    }
});

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    },200);
}
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randomIdx = Math.floor(Math.random() * btns.length);
    let randomColor = btns[randomIdx];
    let randBtn = document.querySelector(`.${randomColor}`);

    // console.log(randomIdx);
    // console.log(randomColor);
    // console.log(randBtn);

    gameSeq.push(randomColor);
    console.log(gameSeq);
    btnFlash(randBtn);
    
}

function checkBtn(idx) {
    // console.log(level);
    // let idx = level - 1;a

    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length === gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }
    else{
        h2.innerHTML = `Game over! Your score was <b>${level - 1}</b>. Press any key to start.`;
        document.body.classList.add("game-over");
        setTimeout(function () {
            document.body.classList.remove("game-over");
        }, 150);
        reset();
    }
}
function btnPress() {
    // console.log("Button was pressed.");
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    // console.log(userColor);
    userSeq.push(userColor);

    checkBtn(userSeq.length-1);
}

function reset() {
    started = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
}
let allBtns = document.querySelectorAll(".btn");

for(let btn of allBtns){
    btn.addEventListener("click", btnPress);
}