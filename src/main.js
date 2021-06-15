 

//--------------
//   Selectors
//--------------
//Canvas
let canvas = document.querySelector('canvas');
//Pages
let startPage = document.querySelector('#start-page')
let gamePage = document.querySelector('#game-page')
let gameOverPage = document.querySelector('#game-over-page')
//Buttons
let startBtn = document.querySelector('#start-btn')
let restartBtn = document.querySelector('#restart-btn')
//Dom score
let gameScoreDec = document.querySelector('#score-number-dec')
let gameScoreUni = document.querySelector('#score-number-uni')
let totalScoreDec = document.querySelector('#total-number-dec')
let totalScoreUni = document.querySelector('#total-number-uni')





//--------------
//   Images
//--------------

let ground = new Image();
ground.src  = '../img/background/ground.png'

let sun = new Image();
sun.src  = '../img/background/sun.png'

let ninja = new Image();
ninja.src = '../img/ninja/ninja.png'

let building_1 = new Image();
building_1.src = '../img/building/obj_1.png'

let building_2 = new Image();
building_2.src = '../img/building/obj_2.png'

let building_3 = new Image();
building_3.src = '../img/building/obj_3.png'

let building_4 = new Image();
building_4.src = '../img/building/obj_4.png'

let building_5 = new Image();
building_5.src = '../img/building/obj_5.png'

//--------------
//  Audio
//--------------



//--------------
//  Variables
//--------------
let ctx = canvas.getContext('2d');
let intervalJumpId = 0;
let intervalId = 0;
let gameOver = false;
// X and Y positions
let ninjaX = 150, ninjaY = 480;

let building_1X = 640, building_1Y = 490;
let building_2X = 850, building_2Y = 490;
let building_3X = 1050, building_3Y = 490;
let building_4X = 1250, building_4Y = 490;
let building_5X = 1450, building_5Y = 490;

let groundX = 40, groundY = 485;
// Booleans
let jump = false;
//Gravity
let gravity = 0.99  ; // check functionality
let up = 10 ;
let down = 3;




//--------------
// functions
//--------------

//ninja function
function ninjaJump(){ 
    
    if (jump){
        up = up * gravity
        ninjaY -= up   
        
            if (ninjaY < 310){
                jump = false;
            }

       }else{  
            if (ninjaY < groundY){ 
                down = down * 1.08
                ninjaY += down 
            }    
             if ( ninjaY > groundY){
                ninjaY 
                down = 3;
                up = 10;
             }
       }
}


//Class for score
class time {
    constructor() {
     this.currentTime = 0;
     this.intervalId = null;
    }
  
    start(callback) {
        
        this.intervalId = setInterval(() => { 
        this.currentTime += 1
          
        if(callback !== null){
          callback();
        }
      }, 1000);
   
    }

    getSeconds() {
        return Number(this.currentTime);
      }

      computeManyDigitNumber(value) {
    
        if(value < 10){
            return '0' + value
          }else {
            return '' + value
          }
      }

      stop() {
        clearInterval(this.intervalId)
      }
}

const score =  new time();

function printScore() {
    let seconds = score.computeManyDigitNumber(score.getSeconds())
    gameScoreUni.innerHTML = seconds[1];
    gameScoreDec.innerHTML = seconds[0];
    totalScoreUni.innerHTML = seconds[1];
    totalScoreDec.innerHTML = seconds[0];
    
}

let buildingsArr = [ 
    {img: building_1, x:building_1X , y:building_1Y },
    {img: building_2, x:building_2X , y:building_2Y },
    {img: building_3, x:building_3X , y:building_3Y },  
    {img: building_4, x:building_4X , y:building_4Y },
    {img: building_5, x:building_5X , y:building_5Y }
];

let buildingImg = [building_1,building_2,building_3,building_4,building_5]




//Draw function to animate
function draw(){
    //Background image
    ctx.drawImage( sun, -25, -20 )

    //Ninja image
   ctx.drawImage( ninja, ninjaX, ninjaY )


// for (let i = 0; i < buildingsArr.length; i++){
//     ctx.drawImage( buildingsArr[i].img, buildingsArr[i].x, buildingsArr[i].y )
//     buildingsArr[i].x -= 2
//     if( buildingsArr[i].x < 0 ) {
//         buildingsArr[i].x = building_1X
//         buildingsArr[i].img = buildingImg[Math.floor( Math.random() * (buildingImg.length) )]
//     }
// }

for (let i = 0; i < buildingsArr.length; i++){
    ctx.drawImage( buildingsArr[i].img, buildingsArr[i].x, buildingsArr[i].y )

    if (ninjaX < buildingsArr[i].x + buildingsArr[i].img.width && ninjaX + ninja.width > buildingsArr[i].x && ninjaY < buildingsArr[i].y + buildingsArr[i].img.height && ninjaY + ninja.height > buildingsArr[i].y){
        gameOver = true;
    }
    
    buildingsArr[i].x -= 3
    if( buildingsArr[i].x < 0 ) {
        buildingsArr[i].x = building_1X
        buildingsArr[i].img = buildingImg[Math.floor( Math.random() * (buildingImg.length) )]
    }
}
                
   
    //Graund image
    ctx.drawImage( ground, groundX, groundY)

    //Invoked Functions
    //Ninja jump 
    ninjaJump()
    
    //collision


    // if (ninjaX < building_1X + building_1.width && ninjaX + ninja.width >  building_1X && ninjaY < building_1Y + building_1.height && ninjaY + ninja.height > building_1Y){
    //     gameOver = true;
    // }



     //test collision
    // if(ninjaX < building_1X + building_5.width && ninjaX >= building_1X && ninjaY < building_1Y ){
    //     ninjaY  = (building_5.height)


    //     if (jump){
    //         up = up * gravity
    //         ninjaY -= up   
            
    //             if (ninjaY < 410){
    //                 jump = false;
    //             }
    
    //        }else{  

    //             if (ninjaY < building_1Y){ 
    //                 down = down * 1.08  
    //                 ninjaY += down 
    //             }    
    //              if ( ninjaY > building_1Y - 20){
    //                 ninjaY 
    //                 down = 3;
    //                 up = 10;
    //              }
    //        }

    // }

    //  if (ninjaX < building_1X && ninjaX + ninja.width >  building_1X + 22 && ninjaY < building_1Y + building_5.height && ninjaY + ninja.height > building_1Y){
    
    //         gameOver = true; 
            
    //     }   

 
    if (gameOver) {
        cancelAnimationFrame(intervalId)
        gameOverPage.style.display = 'block'
        canvas.style.display = 'none'
        startPage.style.display = 'none'
        gamePage.style.display = 'none'
        score.stop();

        
    }else{
        intervalId = requestAnimationFrame(draw)
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
 } 
//Restart function 
 function restart() {
    location.reload();
 }

//--------------
// Event Listener
//--------------

window.addEventListener('load', () => {
     canvas.style.display = 'none'
     gamePage.style.display = 'none'
     gameOverPage.style.display = 'none'
    //draw()

    // varible to avoid keydown held press
    let fired = false;
    document.addEventListener('keydown', (event) => {
        if(!fired) {
            fired = true;
           
            if (event.code === 'Space') {
                jump = true; 
            }
        }
    })

    document.addEventListener('keyup', (event) => {
        fired = false;
        if (event.code === 'Space'){
            jump = false;
        }
    })

    
     startBtn.addEventListener('click', () => {
         start()
     })

    restartBtn.addEventListener('click', () => {
        restart()
    })


})