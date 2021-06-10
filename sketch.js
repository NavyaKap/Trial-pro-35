var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var database;
var position;
var height;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  var balloonPosition=database.ref('balloon/height');
  balloonPosition.on("value",readheight,showError);

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale = balloon.scale-0.01;
  }
  if(keyDown(DOWN_ARROW)){
    updateHeight(0,10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale = balloon.scale-0.01;
  }
  if(position!==undefined){

    if(keyDown(LEFT_ARROW)){
      
      balloon.addAnimation("hotAirBalloon",balloonImage2);writePosition(-1,0)
      console.log("left")
    }
    else if(keyDown(RIGHT_ARROW)){
      balloon.addAnimation("hotAirBalloon",balloonImage2);  
      writePosition(1,0)
        console.log("right")  
    }
    else if(keyDown(UP_ARROW)){
      balloon.addAnimation("hotAirBalloon",balloonImage2);
      writePosition(0,-1) 
        console.log("up") 
    }
    else if(keyDown(DOWN_ARROW)){
      balloon.addAnimation("hotAirBalloon",balloonImage2);
      writePosition(0,1)   
   console.log("down")
    }
  }

  // if(keyDown(LEFT_ARROW)){
  //   balloon.addAnimation("hotAirBalloon",balloonImage2);
  //   //write code to move air balloon in left direction
  //   writePosition(-1,0)
  // }
  // else if(keyDown(RIGHT_ARROW)){
  //   balloon.addAnimation("hotAirBalloon",balloonImage2);
  //   //write code to move air balloon in right direction
  //    writeHeight(1,0)
  // }
  // else if(keyDown(UP_ARROW)){
  //   balloon.addAnimation("hotAirBalloon",balloonImage2);
  //   //write code to move air balloon in up direction
  //   writeHeight(0,-1)
  // }
  // else if(keyDown(DOWN_ARROW)){
  //   balloon.addAnimation("hotAirBalloon",balloonImage2);
  //   //write code to move air balloon in down direction
  //   writeHieght(0,-1)
  // }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}
function readheight(data){
  height=data.val()
  balloon.x=position.x;
  balloon.y=position.y;
}
function showError(){
  console.log("Error in writingt the database");
}


function writeHeight(x,y){
  database.ref('balloon/height').set({
      'x':position.x+x,
      'y':position.y+y
     
  })
}

