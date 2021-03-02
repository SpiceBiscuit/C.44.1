var PLAY = 1;
var END = 0;
var gameState = PLAY;

var man, man_running, man_jumping, man_collided;
var ground, invisibleGround, groundImage;

var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;


function preload(){
  restartImg = loadImage("restart.png");
  man_jumping = loadAnimation("Images/man3.png", "Images/man1.png", "Images/man2.png");
  man_running = loadAnimation("Images/man(1).png", "Images/man(2).png", "Images/man1.png", "Images/man2.png", "Images/man3.png", "Images/man(2).png");

  groundImage = loadImage("Images/Run.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);


  ground = createSprite(width/2 +555, height/2, width, height);
  ground.addImage("bg", groundImage);
  ground.scale = 2.59;
  ground.velocityX = -15
  
  invisibleGround = createSprite(width/2, height/4*3, width, 10);

  man = createSprite(width/4, height/2);
  man.addAnimation("run", man_running);
}

function draw() {
  background(0);

  if(gameState === PLAY){
    text("Score: "+ score, 500,50);
    invisibleGround.visible = false;
    if (keyDown("space") && man.y>height/2){
      jump()
    } else{
      man.changeAnimation("run", man_running)
    } 
    man.velocityY += 0.5
    man.collide(invisibleGround);
    if (ground.x<0){
      ground.x = width/2 +555
    }
  } else{

  }
  drawSprites();
}


function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}

function jump(){
  man.velocityY = -15;
  man.addAnimation("jump", man_jumping);
  man.changeAnimation("jump", man_jumping);
}