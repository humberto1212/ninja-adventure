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

let building_3 = new Image();
building_3.src = '../img/building/obj_3.png'

let building_4 = new Image();
building_4.src = '../img/building/obj_4.png'

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

let building_1X = 640, building_1Y = 490;
let building_2X = 750, building_2Y = 490;
let building_3X = 850, building_3Y = 490;
let building_4X = 950, building_4Y = 490;

let groundX = 40, groundY = 485;
// Booleans
let jump = false;
//Gravity
let gravity = 0.99  ; // check functionality
let up = 10 ;
let down = 3;

//random Buildings to be print
let buildingsArr = [ building_1, building_2, building_3, building_4 ];

let randombuilding_1 = buildingsArr[Math.floor( Math.random() * (buildingsArr.length) )]
let randombuilding_2 = buildingsArr[Math.floor( Math.random() * (buildingsArr.length) )]
let randombuilding_3 = buildingsArr[Math.floor( Math.random() * (buildingsArr.length) )]
let randombuilding_4 = buildingsArr[Math.floor( Math.random() * (buildingsArr.length) )]



//-------------- test ---------------


//let randombuildingArr= [randombuilding_1, randombuilding_2, randombuilding_3, randombuilding_4]

// function randomarr() {
//     for (let n = 0; n < randombuildingArr.lenght; n++){
//         return randombuildingArr[n]
//     }
// }

// let dist = [
//     {x:340 , y: 490},
    
//     {x:590 , y: 490},

//     {x:8040 , y: 490},

//     {x:1200 , y: 490}
// ]

//-------------- test ---------------





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



//building function
function Building(){

    building_1X = building_1X - 2
    building_2X = building_2X - 2
    building_3X = building_3X - 2
    building_4X = building_4X - 2

}



  

//Draw function to animate
function draw(){
    //Background image
    ctx.drawImage( sun, -25, -20 )

    //Ninja image
   ctx.drawImage( ninja, ninjaX, ninjaY )


   //-------------- test ---------------
    //Objects and buildings images printed random

        // for( let i = 0; i < randombuildingArr.length; i++ ) {
        // }
        //-----------------------------------------------------------------------------
                ctx.drawImage( randombuilding_1, building_1X , building_1Y )
                ctx.drawImage( randombuilding_2, building_2X , building_2Y )
                ctx.drawImage( randombuilding_3, building_3X , building_3Y ) 
                ctx.drawImage( randombuilding_4, building_4X , building_4Y )
                    

                // if (randombuilding_1 < 0 || randombuilding_2 < 0  ){
                // ctx.drawImage( randombuilding_1, building_1X , building_1Y )
            
                // }

         //-----------------------------------------------------------------------------


                // for( let i = 0; i < dist.length; i++ ) {
                // ctx.drawImage( randombuilding_1, dist[i].x , dist[i].y )
                // ctx.drawImage( randombuilding_2, dist[i].x , dist[i].y )
                // ctx.drawImage( randombuilding_3, dist[i].x , dist[i].y ) 
                // ctx.drawImage( randombuilding_4, dist[i].x , dist[i].y )
                //     dist[i].x -= 2

                //     if (dist[i].x < 0) {
                //         dist[i] = {
                //             x:800,
                //             y: 490
                //         }
                //     }
                // }
         //-----------------------------------------------------------------------------

                // for( let i = 0; i < dist.length; i++ ) {
                //     ctx.drawImage( randomaarr(), dist[i].x , dist[i].y )
                //     ctx.drawImage( randomarr(), dist[i].x , dist[i].y )
                //     ctx.drawImage( randomarr(), dist[i].x , dist[i].y ) 
                //     ctx.drawImage( randomarr(), dist[i].x , dist[i].y )
                //         dist[i].x -= 2
    
                //         if (dist[i].x < 0) {
                //             dist[i] = {
                //                 x:800,
                //                 y: 490
                //             }
                //         }
                //    }


             //-----------------------------------------------------------------------------    
          
            //     for (let n = 0; n < randombuildingArr.lenght; n++){
                       
            //         for( let i = 0; i < dist.length; i++ ) {
            //             ctx.drawImage( randombuildingArr[n], dist[i].x , dist[i].y )
            //             ctx.drawImage( randombuildingArr[n], dist[i].x , dist[i].y )
            //             ctx.drawImage( randombuildingArr[n], dist[i].x , dist[i].y ) 
            //             ctx.drawImage( randombuildingArr[n], dist[i].x , dist[i].y )
            //             dist[i].x -= 2

            //             // if (dist[i].x < 0) {
            //             //     dist[i] = {
            //             //         x:800,
            //             //         y: 490
            //             //     }
            //             // }
            //     }

            // }
    

            //-------------- test ---------------
                

                
              

            
              
    
    

   
    //Graund image
    ctx.drawImage( ground, groundX, groundY)

    //Invoked Functions
    //Ninja jump 
    ninjaJump()
    //Building movement 
    Building()
   
   


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


})