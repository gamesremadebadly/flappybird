var cv=document.getElementById("c");
var c=cv.getContext("2d");
//constants
const gravity = 0.0005; 
const jh = -0.3;
const xpos = 20;

const pipeT = 25;
const pipeG = 100;
const pipeS = 0.1;
const pipeD = 150;
//setup
var player = {ypos:180, width:25, timer:Date.now(),lh:180};
var pipes = [{xpos:480+pipeT/2, ypos:Math.round(random(pipeG/2,360-pipeG/2)), timer:Date.now(), active:true}];
var score = 0;
var run = setInterval(function () {update();}, 20);
var game = false;
cv.onclick = function () {jump()};

//start game
function start() {
    game = true;
    player = {ypos:180, width:25, timer:Date.now(),lh:180};
    pipes = [{xpos:480+pipeT/2, ypos:Math.round(random(pipeG/2,360-pipeG/2)), timer:Date.now(), active:true}];
    score = 0;
}
//jump code
function jump() {
    player.timer = Date.now();
    player.lh = player.ypos;
}
//random number between a and b
function random(a, b) {
    return Math.random()*(a-b)+b;
}
//everything
function update() {
    //resize
    if (window.innerWidth < window.innerHeight) {
        document.getElementById("c").style.height='';
        document.getElementById("c").style.width='100%';
    }  else {
        document.getElementById("c").style.width='';
        document.getElementById("c").style.height='100%';
    }
    //clear
    c.clearRect(0,0,480*4,360*4);
    if (game) {
        //update player
        player.ypos = gravity*Math.pow(Date.now()-player.timer,2)+jh*(Date.now()-player.timer)+player.lh;
        //draw player
        c.fillStyle="#FF0000";
        c.fillRect(4*(xpos-player.width/2), 4*(player.ypos-player.width/2), 4*player.width, 4*player.width);
        //update + draw pipes
        var i=0;
        for (i=0;i<pipes.length; i++) {
            pipes[i].xpos = 480+pipeT/2-pipeS*(Date.now()-pipes[i].timer);
            c.fillStyle="#4b8b3b"
            c.fillRect(4*(pipes[i].xpos-pipeT/2), 0, 4*pipeT, 4*(pipes[i].ypos-pipeG/2));
            c.fillRect(4*(pipes[i].xpos-pipeT/2), 4*(pipes[i].ypos+pipeG/2), 4*pipeT, 4*(360-((pipes[i].ypos-pipeG/2))-pipeG));
            if (i==0) {
                if (pipes[i].active) {
                    if (pipes[i].xpos+pipeT/2<xpos-player.width/2) {
                        pipes[i].active = false;
                        score++;
                    } else if (pipes[i].xpos-pipeT/2<xpos+player.width/2 && pipes[i].xpos+pipeT/2>xpos-player.width/2) {
                        if (player.ypos+player.width/2<pipes[i].ypos+pipeG/2 && player.ypos-player.width/2>pipes[i].ypos-pipeG/2) {

                        } else {
                            stop();
                        }
                    }
                } 
            } 
        }
        if (480-pipes[pipes.length-1].xpos>=pipeD) {
            //generate a new pipe
            pipes.push({xpos:480+pipeT/2, ypos:Math.round(random(pipeG/2,360-pipeG/2)), timer:Date.now(), active:true});
        } else if (pipes[0].xpos<=0-pipeT) {
            //be gone old pipe
            pipes.shift();
        }
    } else {
        c.font = "120px Arial";
        c.fillStyle="#000000"
        c.textAlign="center"
        c.fillText("Click start, click anywhere to jump.", cv.width/2, cv.height/2);
    }
    //draw score
    c.font = "120px Arial";
    c.fillStyle="#000000"
    c.textAlign="right"
    c.fillText("Score: "+score, 1900, 110);
} 
    function stop() {
        game = false;
    }
