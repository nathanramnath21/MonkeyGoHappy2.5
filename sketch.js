var PLAY = 1;
var END = 0;
var gameState = PLAY;
var bg;
var monkey , monkey_running, monkeyImage;
var banana ,bananaImage, obstacle, obstacleImage, bananaGroup;
var FoodGroup, obstacleGroup, ground;

var survivalTime=0;
var bananas =0;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkeyImage = loadAnimation("sprite_0.png");
  bg = loadImage("bg.jpg")
 
}



function setup() {
  createCanvas(400,400)
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1
  
  ground = createSprite(400,350,900,10);
  ground.shapeColor = rgb(150, 73, 1);
  ground.velocityX= -6;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  bananaGroup= new Group();
  obstacleGroup= new Group();
  
  monkey.setCollider("circle",0,0,monkey.radius);
}


function draw() {
background(bg);
  monkey.collide(ground);
  camera.position.x = 200;
  camera.position.y = 200;


  //monkey.debug= true;
  
  if (gameState===PLAY){
  
  
  stroke("black");
  textSize(20);
  fill("white");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("SurvivalTime: "+ survivalTime, 100, 50);
    
  stroke("black");
  textSize(20);
  fill("white");
  text("Bananas Eaten: "+ bananas, 100, 75);
    
    createBanana();
  createObstacles();
    
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    if (bananaGroup.isTouching(monkey)) {
    
  bananas=bananas+1;
        
  }
  if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -10;
    }
  monkey.velocityY = monkey.velocityY + 0.8
    
  if(obstacleGroup.isTouching(monkey)){
      gameState = END;
  }
  }
  else if (gameState===END) {
    textSize(24)
    text("GAME OVER ", 150,200)
    monkey.addAnimation("moving",monkeyImage);
    ground.velocityX = 0;
      monkey.velocityY = 0
    obstacleGroup.setLifetimeEach(-1);
     obstacleGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
     bananaGroup.setVelocityXEach(0);
    survivalTime=0;
  
  }
  
  drawSprites();
  }

function createBanana(){

if(camera.position.x===200 && frameCount%80===0) {
  var banana = createSprite(390,Math.round(random(120,200)),20,20)
  banana.addImage(bananaImage);
  banana.velocityX= -10;
  banana.scale=0.1;
  banana.lifetime = 40;
  bananaGroup.add(banana);
}
}

function createObstacles() {
  if(camera.position.y===200 && frameCount%200===0) {
  var obstacle = createSprite(390,330,20,20)
  obstacle.addImage(obstacleImage);
  obstacle.velocityX= -10;
  obstacle.scale=0.1;
  obstacle.lifetime=40;
  obstacleGroup.add(obstacle);
  
}
}