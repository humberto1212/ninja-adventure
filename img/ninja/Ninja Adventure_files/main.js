 

//--------------
//   Selectors
//--------------
//Canvas
let canvas = document.querySelector('canvas');
//Pages
let startPage = document.querySelector('#start-page');
let gamePage = document.querySelector('#game-page');
let gameOverPage = document.querySelector('#game-over-page');
//Buttons
let startBtn = document.querySelector('#start-btn');
let restartBtn = document.querySelector('#restart-btn');
//Dom score
let gameScoreDec = document.querySelector('#score-number-dec');
let gameScoreUni = document.querySelector('#score-number-uni');
let totalScoreDec = document.querySelector('#total-number-dec');
let totalScoreUni = document.querySelector('#total-number-uni');


//--------------
//   Images
//--------------

let ground = new Image();
ground.src  = './img/background/ground.png'

let sun = new Image();
sun.src  = './img/background/sun.png'

let ninja = new Image();
ninja.src = './img/ninja/ninja-jump2.png'

// Buildings images
let building_1 = new Image();
building_1.src = './img/building/building1-removebg-preview.png'
let building_2 = new Image();
building_2.src = './img/building/building2-removebg-preview.png';
let building_3 = new Image();
building_3.src = './img/building/building3-removebg-preview.png';
let building_4 = new Image();
building_4.src = './img/building/building4-removebg-preview.png';
let building_5 = new Image();
building_5.src = './img/building/building5-removebg-preview.png';

// Trees images
let tree1 = new Image();
tree1.src = './img/background/tree1.png';
let tree2 = new Image();
tree2.src = './img/background/tree2.png';
let tree3 = new Image();
tree3.src = './img/background/tree3.png';


//--------------
//  Audio
//--------------
let gameAudio = new Audio('./sounds/yoitrax-ronin.mp3');
let gameOverAudio = new Audio('./sounds/purrple-cat-sugar-coat.mp3');
gameAudio.volume = 0.2;
gameOverAudio.volume = 0.2;


//--------------
//  Variables
//--------------
let ctx = canvas.getContext('2d');
let intervalJumpId = 0;
let intervalId = 0;
let gameOver = false;
// X and Y positions
let ninjaX = 150, ninjaY = 485;

let tree1X = 800 , tree1Y = 410;
let tree2X = 1500 , tree2Y = 410;
let tree3X = 2000 , tree3Y = 410;


let building_1X = 640, building_1Y = 420;
let building_2X = 1350, building_2Y = 430;
let building_3X = 1750, building_3Y = 423;
let building_4X = 2100, building_4Y = 420;
let building_5X = 2500, building_5Y = 460;
// let building_6X = 1950, building_6Y = 440;
// let building_7X = 2250, building_7Y = 460;

let groundX = 40, groundY = 485;
// Booleans
let jump = false;
//Gravity
let gravity = 0.99  ; // check functionality
let up = 10 ;
let down = 3;
//speed of objects
let speed = 2;
let speedTree = 1;

//arr of trees
let treeArr = [
    {img: tree1, x:tree1X , y:tree1Y },
    {img: tree2, x:tree2X , y:tree2Y },
    {img: tree3, x:tree3X , y:tree3Y },  
]

let treeImg = [tree1,tree2, tree3]

//arr of buildings
let buildingsArr = [ 
    {img: building_1, x:building_1X , y:building_1Y },
    {img: building_2, x:building_2X , y:building_2Y },
    {img: building_3, x:building_3X , y:building_3Y },  
    {img: building_4, x:building_4X , y:building_4Y },
    {img: building_5, x:building_5X , y:building_5Y },
    // {img: building_6, x:building_6X , y:building_6Y },
    // {img: building_7, x:building_7X , y:building_7Y }
];

let buildingImg = [building_1, building_2, building_3, building_4, building_5]

//--------------
// functions
//--------------

let onTopOfBuilding = false;
// Ninja jump 
function ninjaJump(){ 
    if (jump){
       up = up * gravity
        ninjaY -= up   
        
           if (ninjaY < 310){
                jump = false;
            }
    }

       else{  
            if (ninjaY < groundY && !onTopOfBuilding){ 
                down = down * 1.09
                ninjaY += down  
            }    
            
            if (ninjaY + ninja.height > groundY){
                ninjaY = 485
                down = 3; 
                up = 10;
              
             } 
       }
}

//Start function 
function start() {
    canvas.style.display = 'block' 
    gamePage.style.display = 'block' 
    startPage.style.display = 'none'
    gameOverPage.style.display = 'none'
    draw()
    score.start(printScore);
    gameAudio.play()
 } 

//Restart function 
 function restart() {
    location.reload();
    gameOverAudio.play()
 }

//Class for score
class time {
    constructor() {
     this.currentTime = 0;
     this.intervalId = null;
    }
  
    start( callback ) {
        
        this.intervalId = setInterval(() => { 
        this.currentTime += 1
          
        if( callback !== null ){
          callback();
        }
      }, 1000 );
   
    }

    getSeconds() {
        return Number( this.currentTime );
      }

      computeManyDigitNumber( value ) {
    
        if( value < 10 ){
            return '0' + value;
          }else {
            return '' + value;
          }
      }

      stop() {
        clearInterval( this.intervalId );
      }
}
const score =  new time(); // this const belongs to the class time

function printScore() {
    let seconds = score.computeManyDigitNumber( score.getSeconds() );
    gameScoreUni.innerHTML = seconds[1];
    gameScoreDec.innerHTML = seconds[0];
    totalScoreUni.innerHTML = seconds[1];
    totalScoreDec.innerHTML = seconds[0];
    
}



//Draw function to animate
function draw(){

    //Background image
    ctx.drawImage( sun, -25, -20 )

    //trees and clouds
    speedTree *= 1.0004 // Speed of trees
    for ( let i = 0; i < treeArr.length; i++ ){
        ctx.drawImage( treeArr[i].img, treeArr[i].x, treeArr[i].y )
         
        treeArr[i].x -= speedTree
        if( treeArr[i].x < 0 ) {
            treeArr[i].x = tree3X + 700;
            treeArr[i].img = treeImg[Math.floor( Math.random() * (treeImg.length) )]
        }
    }

    //Ninja image
   ctx.drawImage( ninja, ninjaX, ninjaY );


    //Buildings
    speed *= 1.00045 // Speed of objects

    for ( let i = 0; i < buildingsArr.length; i++) {
        ctx.drawImage( buildingsArr[i].img, buildingsArr[i].x, buildingsArr[i].y );

        //Collision detection
        if (
            ninjaX < buildingsArr[i].x && 
            (ninjaX + ninja.width) - 1.5 > buildingsArr[i].x &&  
            ninjaY > buildingsArr[i].y
            ) {

            gameOver = true;
        }

        if (
            ninjaX + ninja.width > buildingsArr[i].x &&
            ninjaX < buildingsArr[i].x +  buildingsArr[i].img.width &&
            ninjaY < buildingsArr[i].y + buildingsArr[i].img.height &&
            ninjaY + ninja.height > buildingsArr[i].y
          ) {
            onTopOfBuilding = true
        
            ninjaY = buildingsArr[i].y - ninja.height;
          }
          if (ninjaX > buildingsArr[i].x + buildingsArr[i].img.width) {
            onTopOfBuilding = false
          }
       
          

         
        buildingsArr[i].x -= speed
        if ( buildingsArr[i].x < 0 ) {
            buildingsArr[i].x = building_5X + 750;
            buildingsArr[i].img = buildingImg[Math.floor( Math.random() * (buildingImg.length) )]
        }  
    }           
   
    //Graund image
    ctx.drawImage( ground, groundX, groundY)

    //Invoked Functions
    //Ninja jump 
    ninjaJump()

    if ( gameOver ) {
        cancelAnimationFrame(intervalId)
        gameOverPage.style.display = 'block';
        canvas.style.display = 'none';
        startPage.style.display = 'none';
        gamePage.style.display = 'none';
        score.stop();
        gameAudio.pause();
        gameOverAudio.play();

    }else{
        intervalId = requestAnimationFrame( draw );
    }   
}

//--------------
// Event Listener
//--------------

window.addEventListener( 'load', () => {
     canvas.style.display = 'none';
     gamePage.style.display = 'none';
     gameOverPage.style.display = 'none';

    // varible to avoid keydown held press
    let fired = false;
    document.addEventListener( 'keydown', ( event ) => {
        if( !fired ) {
            fired = true;
           
            if ( event.code === 'Space' ) {
                jump = true; 
            }
        }
    })

    document.addEventListener( 'keyup', ( event ) => {
        fired = false;
        if ( event.code === 'Space' ){
            jump = false;
            onTopOfBuilding = false
        }
    })

    
     startBtn.addEventListener( 'click', () => {
         start()
     })

    restartBtn.addEventListener( 'click', () => {
        restart()
    })
})