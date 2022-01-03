  
var t_rex ,t_rexRunning,t_rexCollided;
var edges;
var ground,groundImg
var ground_2
var cloud,cloudImg 
var cacto
var cactoImg1,cactoImg2,cactoImg3,cactoImg4,cactoImg5,cactoImg6
var cactosGrupo,nuvensGrupo;
var PLAYING=1;
var END=0;
var gameState=PLAYING;
var score=0;
var Gameover,GameoverImg
var start,startImg
var checkpoint
var die
var jump
var record=0;
//pre carrega as midias
function preload(){
  t_rexRunning = loadAnimation("trex3.png","trex4.png");
  t_rexCollided=loadAnimation("trex_collided.png");
  groundImg=loadImage("ground2.png") ;
  cloudImg=loadImage("cloud.png");
  cactoImg1=loadImage("obstacle1.png");
  cactoImg2=loadImage("obstacle2.png");
  cactoImg3=loadImage("obstacle3.png");
  cactoImg4=loadImage("obstacle4.png");
  cactoImg5=loadImage("obstacle5.png");
  cactoImg6=loadImage("obstacle6.png");
  GameoverImg=loadImage("gameOver.png");
  startImg=loadImage("restart.png");
  checkpoint=loadSound("checkPoint.mp3");
  die=loadSound("die.mp3");
  jump=loadSound("jump.mp3");
}


function setup(){
  createCanvas(windowWidth,windowHeight);

  //crie o sprite do trex
  t_rex = createSprite(50,height-50,20,30);
  t_rex.addAnimation("run",t_rexRunning);
  t_rex.addAnimation("collide",t_rexCollided);
  t_rex.scale = 0.5;
  //t_rex.debug=true;
  t_rex.setCollider("circle",0,0,30)
  //t_rex.setCollider("rectangle",0,0,80,100,180)
  edges = createEdgeSprites();
  ground=createSprite(width/2,height-20,width,10);
  ground.addImage(groundImg);
  ground_2=createSprite(width/2,height-10,width,1)   
  ground_2.visible=false;

  cactosGrupo = new Group();
  nuvensGrupo = new Group();

  Gameover=createSprite(width/2,height-100,40,40);
  Gameover.addImage(GameoverImg);
  Gameover.scale=0.5;
  start=createSprite(width/2,height-70,40,40);
  start.addImage(startImg);
  start.scale=0.5;
  Gameover.visible=false;
  start.visible=false;

}

function draw(){
  background("white");
  
 

  //criar pontuação
  text("pontução: "+score,width-200,height-180);
  text("record: "+record,width-100,height-180)
  if(t_rex.isTouching(cactosGrupo)){
    gameState=END;
    //die.play();
  
  }

  if (gameState===PLAYING){
    if (touches>0||keyDown("space")&& t_rex.y>height-34) {
      t_rex.velocityY = -10;
      jump.play();
      touches=[]
    }
    ground.velocityX=-(2+score/100)
    if (ground.x<0){
   ground.x=ground.width/2;
    }
    spawnClouds();
    spawnCactus();

    //pontuação
    score=Math.round(frameCount/5);

    if(score%100==0&& score>0){
      checkpoint.play();
  
    }
  }

  else if (gameState===END){
    t_rex.changeAnimation("collide",t_rexCollided);
    ground.velocityX=0
    cactosGrupo.setVelocityXEach(0);
    nuvensGrupo.setVelocityXEach(0);
    cactosGrupo.setLifetimeEach(-1);
    nuvensGrupo.setLifetimeEach(-1);
    Gameover.visible=true;
    start.visible=true;

    if(score>record){
      record = score; 
    }

    if(mousePressedOver(start)){

      gameState = PLAYING
      t_rex.changeAnimation("run",t_rexRunning);
      Gameover.visible=false;
      start.visible=false;
      cactosGrupo.destroyEach();
      nuvensGrupo.destroyEach();
      score=0;
      frameCount=0;
    }

  }

  
  //criando a gravidade
  t_rex.velocityY += 0.5;

  //colisão do Trex
  t_rex.collide(ground_2);  
 

  drawSprites();
}

function spawnClouds(){

  if (frameCount%80==0) {
    cloud=createSprite(width,height-150,30,30);
    cloud.velocityX=-(2+score/100);
    cloud.addImage(cloudImg);
    cloud.y=random(height-170,height-100);
    cloud.depth=t_rex.depth-1;
    cloud.scale=random(0.5,1);
    cloud.lifetime=width/cloud.velocityX;

    nuvensGrupo.add(cloud);
  }


}
function spawnCactus(){
  if (frameCount%95==0) {
    cacto=createSprite(width,height-30,30,30)
    cacto.velocityX=-(3+score/100);
    cacto.lifetime=width/cacto.velocityX;
    var sortCacto=Math.round(random(1,6));
    switch (sortCacto) {
      case 1:
       cacto.addImage(cactoImg1) ;
       break;
      case 2:
        cacto.addImage(cactoImg2) ;
        break;
      case 3:
        cacto.addImage(cactoImg3) ;
       break;
      case 4:
        cacto.addImage(cactoImg4) ;
       break;
      case 5:
        cacto.addImage(cactoImg5) ;
       break;
      case 6:
        cacto.addImage(cactoImg6) ;
       break;
      
        
    }
    cacto.scale=0.4;

   //console.log(sortCacto);

    cactosGrupo.add(cacto);
  }
}