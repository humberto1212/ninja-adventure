//Canvas 
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
 

//--------------
//   Images
//--------------

let ground = new Image();
ground.src  = '../img/background/ground.png'

let sun = new Image();
sun.src  = '../img/background/sun.png'

//--------------
//  Audio
//--------------



//--------------
//  Variables
//--------------
let intervalId = 0;
let isGameOver = false;

//--------------
// functions
//--------------

function draw(){

    ctx.drawImage( sun, -25, -20 )
    //ctx.drawImage( ground, 0, 0 )

    if (gameOver) {
        cancelAnimationFrame(intervalId)
    }else{
        intervalId = requestAnimationFrame(draw)
    }   
}

//--------------
// Event Listener
//--------------

window.addEventListener('load', () => {
    draw()
})