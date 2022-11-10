  
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}


function draw() {
  background(255);
  // --------------------------------PRIMERO CREAR TORRE INFINITA ENCONTRANDO EL VALOR RESTANTE
  if(tower.y>400){
    tower.y=300
  }
  
  if (gameState === "play") {
    
    if(keyDown("left_arrow")){
      // ------------------------------------SEGUNDO MOVER FANTASMA A LA IZQUIERDA
      ghost.x=ghost.x-3

    }
    if(keyDown("right_arrow")){
      //---------------------------------------------TERCERO MOVER FANTASMA A LA DERECHA
      ghost.x=ghost.x+3
    }
    if(keyDown("space")){
      //-----------------------------------------------CUARTO MOVER FANTASMA HACIA ARRIBA
      ghost.velocityY=-5
      
    }
  
  ghost.velocityY = ghost.velocityY + 0.8;
  // --------------------------------------OCTAVO FANTASMA DESCANSA EN LA PARTE SUPERIOR DE LA BARANDA 
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0
  }
  // --------------------------------------------NOVENO FANTASMA SE DESTRUYE AL TOCAR SPRITES INVISIBLES
  if(invisibleBlockGroup.isTouching(ghost)|| ghost.y>600){
    ghost.destroy()
  }
   
      //escribir una condición para desplazar infinitamente la torre
    
      spawnDoors();

  
      //escribir el código para hacer que climbersGroup colisione con el fantasma y cambiar la velocidad del fantasma  
//escribir aquí el código para hacer que invisibleBlockGroup colisione con el fantasma, destruir el fantasma y cambiar gamestate a end.
  
  drawSprites();
}
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Fin del juego", 230,250)
  }
}

function spawnDoors()
 {
  //escribir aquí el código para aparecer los obstáculos
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;

    //---------------------------------------DECIMO agregar la función random para las ventanas
    door.x=Math.round(random(120,400))
    climber.x=door.x
    invisibleBlock.x= door.x



    door.addImage(doorImg);
    climber.addImage(climberImg);

    // ---------------------------------------------------QUINTO ASINGA LIFE TIME A LOS OBTACULOS
    door.lifeTime=800;
    climber.lifeTime=800;
    invisibleBlock.lifeTime=800;
    // ----------------------------------------------SEXTO ASIGNAR CADA OBSTACULO AL GRUPO
    doorsGroup.add(door)
    climbersGroup.add(climber)
    invisibleBlockGroup.add(invisibleBlock)
    invisibleBlock.debug=true
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    // ---------------------------------------------SÉPTIMO AGREGAR PROFUNDIDAD AL FANTASMA Y LA PUERTA
    ghost.depth=door.depth
    ghost.depth+=1
     

    


  }
}

