let can;
let ctx;
let w;
let h;
let girlPic = new Image();
let starPic = new Image();
let num = 60;
let stars = [];
let lastTime;
let deltaTime;
let switchy = false;
let life = 0;
function init() {
    can = document.getElementById('canvas');
    ctx = can.getContext("2d");
    w = can.width;
    h = can.height;
    document.addEventListener("mousemove", mousemove, false);
    girlPic.src = "src/girl.jpg";
    starPic.src = "src/star.png";
    for (let i = 0; i < num; i++) {
        let obj = new starObj();
        stars.push(obj);
        stars[i].init();
    }
    lastTime = Date.now();
    gameloop();
    
}
document.body.onload = init;
function gameloop() {
    window.requestAnimFrame(gameloop);
    let now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    
    drawBackground();
    drawGirl();
    drawStars();
    aliveUpdate();
}
function drawBackground() {
    ctx.fillStyle = "#393550";
    ctx.fillRect(0, 0, w, h);
}
function drawGirl() {
    ctx.drawImage(girlPic, 100, 150, 600, 300);
}
function mousemove(e) {
    if (e.offsetX || e.layerX) {
        let px = e.offsetX == undefined ? e.layerX : e.offsetX;
        let py = e.offsetY == undefined ? e.layerY : e.offsetY;
        if (px > 100 && px < 700 && py > 150 && py < 450) {
            switchy = true;            
        } else {
            switchy = false;
        }
        console.log(switchy);        
    }
}