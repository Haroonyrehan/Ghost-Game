var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlocksGroup, invisibleBlock;
var gameState = "play"
var score = 0

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  climbersGroup = new Group();
  doorsGroup = new Group();
  invisibleBlocksGroup = new Group();

  ghost = createSprite(300,150,20,20)
  ghost.addImage(ghostImg)
  ghost.scale=.4
  
  
}

function draw() {
  background(0);
  fill ("cyan")
  
  if(gameState === "play"){
    score = score + Math.round(frameCount/60)
    
    if(tower.y > 600){
      tower.y = 200
  }
  
  ghost.velocityY = ghost.velocityY +.3
  if(keyDown("space")){
    ghost.velocityY = -7
  }

  if(keyDown("right")&&ghost.x<470){
    ghost.x =ghost.x + 5
  }

  if(keyDown("left")&& ghost.x>130){
    ghost.x = ghost.x - 5
  }

  if(ghost.y >= 600||ghost.collide(invisibleBlocksGroup)){
    gameState = "End"
  }


  spawnDoors()

  ghost.collide(climbersGroup)
  }
  if(gameState === "End"){
    gameOver()
  }

  drawSprites()
  textSize(20)
  text("Score = " + score, 450,30)
  
}

function spawnDoors(){
  if(frameCount%250===0){
    door=createSprite(300,-100,20,20)
    door.x = Math.round(random(150,450))
    door.addImage(doorImg)
    door.velocityY = 1;
    doorsGroup.add(door)
    door.lifetime = 800
    //console.log(door.y)
    climber=createSprite(door.x,-50,25,20)
    //climber.x = door.x
    climber.addImage(climberImg)
    climber.velocityY = 1;
    climbersGroup.add(climber)
    climber.lifetime = 800
    //console.log(door.x)
    invisibleBlock=createSprite(door.x,-37,climber.width,5)
    invisibleBlock.velocityY = 1;
    invisibleBlocksGroup.add(invisibleBlock)
    invisibleBlock.lifetime = 800
    invisibleBlock.visible = false;
  }
}


function gameOver(){
ghost.destroy()
tower.destroy()
climbersGroup.destroyEach()
doorsGroup.destroyEach()
textSize(50)
fill ("cyan")
text("Game Over", 170,300)


}

