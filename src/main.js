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

let ninja = new Image();
ninja.src = '../img/ninja/ninja.png'

let building_1 = new Image();
building_1.src = '../img/building/obj_1.png'

let building_2 = new Image();
building_2.src = '../img/building/obj_2.png'

//--------------
//  Audio
//--------------



//--------------
//  Variables
//--------------
let intervalJumpId = 0;
let intervalId = 0;
let gameOver = false;
// X and Y positions
let ninjaX = 150, ninjaY = 480;
let building_1X = 340, building_1Y = 490;
let building_2X = 650, building_2Y = 470;
let groundX = 40, groundY = 485;
// Booleans
let jump = false;
//Gravity
let gravity = 0.9  ; // check functionality
let n = 40 ;

//--------------
// functions
//--------------

//ninja function
  function ninjaJump(){ 
    
    if (jump){
        n = n * gravity
        console.log(n)
        ninjaY -= n   
        
            if (ninjaY < 330){
                jump = false;
            }

       }else{
            if (ninjaY < groundY){ 
                ninjaY += 10  
            }
             if ( ninjaY > groundY){
                ninjaY
                n = 40;
             }
       }
}

//building function
  

//Draw function to animate
function draw(){
    //Background image
    ctx.drawImage( sun, -25, -20 )

    //Ninja image
   ctx.drawImage( ninja, ninjaX, ninjaY )

    //Objects and buildings images
    ctx.drawImage( building_1, building_1X, building_1Y )
    ctx.drawImage( building_2, building_2X, building_2Y )
    //Graund image
    ctx.drawImage( ground, groundX, groundY)

    //Invoked Functions
    //Ninja jump 
    ninjaJump()
    
    

       


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

    // varible to avoid keydown held press
    let fired = false;
    document.addEventListener('keydown', (event) => {
        if(!fired) {
            fired = true;
           
            if (event.code ===  'Space') {
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


})