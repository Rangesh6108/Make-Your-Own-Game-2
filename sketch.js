
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var basket,GoldenEgg,SilverEgg,BronzeEgg,RedEgg,bg,bg_2,hen,hen_2;
 
var basketImg,GoldenEggImg,SilverEggImg,BronzeEggImg,RedEggImg,henImg,hen_2Img,gameOver;

var invisground;

var playbutton,playbuttonImg;

var goldenG,silverG,bronzeG,redG;

var eggselling;

var gameState="serve";

var score=0;

var	ge=0;

var se=0;

var be=0;

var re=0;

function preload(){

	basketImg=loadImage("Images/Basket.png");
	GoldenEggImg=loadImage("Images/Goldenegg.png");
	SilverEggImg=loadImage("Images/Silveregg.png");
	BronzeEggImg=loadImage("Images/Bronzeegg.png");
	RedEggImg=loadImage("Images/Redegg.png");
	playbuttonImg=loadImage("Images/Playbutton.png");
	bg=loadImage("Images/Farmimg.png");
	bg_2=loadImage("Images/Farming.png");
	henImg=loadImage("Images/Hen.png");
	hen_2Img=loadImage("Images/Hen_Flipped.png");
	gameOver=loadImage("Images/Gameoverbg.png");
	eggselling=loadImage("Images/SellingEggbg.png");
	
}

function setup() {
	createCanvas(1000, 700);


	engine = Engine.create();
	world = engine.world;

	playbutton=createSprite(500,350);
	playbutton.addImage(playbuttonImg);
	playbutton.scale=0.5;

	invisground=createSprite(400,600,2000,10);
	invisground.visible=false;

	basket=createSprite(400,600);
	basket.collide(invisground);
	basket.addImage(basketImg);
	basket.scale=0.2;
	basket.debug=false;

	hen=createSprite(350,100);
	hen.addImage(henImg);
	hen.scale=0.2;

	hen_2=createSprite(580,100);
	hen_2.addImage(hen_2Img);
	hen_2.scale=0.7;

	Engine.run(engine);

	goldenG = new Group();
	silverG = new Group();
	bronzeG = new Group();
	redG    = new Group();
  
}


function draw() {
  
  Engine.update(engine);

  mousePressed();

  keyPressed();

  collision();

  gameStates();

  changeEggImage();
  
  drawSprites();

  if(gameState==="play"||gameState=="end"||gameState==="finish"){
  textSize(20);
  strokeWeight(10);
  stroke("tan");
  fill("purple");
  text("Score : " + score,850,50);
  strokeWeight(10);
  stroke("salmon");
  fill("gold");
  text("Golden Egg: " + ge,250,680);
  stroke("green");
  fill("silver");
  text("Silver Egg: " + se,450,680);
  stroke("mistyrose");
  fill("#cd7f32");
  text("Bronze Egg: " + be,650,680);
  fill("red");
  text("Red Egg: " + re,50,50);
  }

  if(gameState==="serve"){
	strokeWeight(4);
	stroke("white");
	fill("Red");
	textSize(17);
	text("Story:",30,100);
	text("An old man is taking care of farm animals.",40,130);
	text("He use to collect the eggs and sell it, one day he saw the hens are sitting on a rope.",40,160);
	text("So help the old man to colect the eggs in a basket.",40,190);
	text("Press the PLAY button below to start the game.",200,250);
	strokeWeight(4);
	stroke("lavender");
	fill("indigo");
	textSize(18);
	text("Rules:",30,500);
	text("Earn 100 scores to sell the eggs.",40,560);
	text("If you collect 10 red eggs then you will loose.",40,590);
	text("Use left <- and right-> arrow keys to move the basket.",40,530);

}
 
}

function playGame(){

 gameState="play";

}

function createEggs(){


	var egg=Math.round(random(1,4));

	if(frameCount%50===0){

	if(egg===1){
		
		GoldenEgg=createSprite(500,192);
		GoldenEgg.addImage(GoldenEggImg);
		GoldenEgg.scale=0.1;

		GoldenEgg.x=Math.round(random(250,690));
		GoldenEgg.velocityY=15;
		goldenG.add(GoldenEgg);
		goldenG.setLifeTime=500;
	}

	if(egg===2){
		
		SilverEgg=createSprite(500,192);
		SilverEgg.addImage(SilverEggImg);
		SilverEgg.scale=0.1;

		SilverEgg.x=Math.round(random(250,690));
		SilverEgg.velocityY=15;
		silverG.add(SilverEgg);
		silverG.setLifeTime=500;
	}

	if(egg===3){

		BronzeEgg=createSprite(500,192);
		BronzeEgg.addImage(BronzeEggImg);
		BronzeEgg.scale=0.1;

		BronzeEgg.x=Math.round(random(250,690));
		BronzeEgg.velocityY=15;
		bronzeG.add(BronzeEgg);
		bronzeG.setLifeTime=500;
	}

	if(egg===4){

		RedEgg=createSprite(500,192);
		RedEgg.addImage(RedEggImg);
		RedEgg.scale=0.1;

		RedEgg.x=Math.round(random(250,690));
		RedEgg.velocityY=15;
		redG.add(RedEgg);
		redG.setLifeTime=1000;
	}

	}
}

function collision(){

	if(basket.isTouching(goldenG)){
		goldenG.destroyEach();
		score+=3;
		ge++;
	}
  
	if(basket.isTouching(silverG)){
		silverG.destroyEach();
		score+=2;
		se++;
	}

	if(basket.isTouching(bronzeG)){
		bronzeG.destroyEach();
		score++;
		be++;
	}

	if(basket.isTouching(redG)){
		redG.destroyEach();
		score-=5;
		re++;
	}

	if(invisground.isTouching(goldenG)){
		goldenG.destroyEach();
	}

	if(invisground.isTouching(silverG)){
		silverG.destroyEach();
	}

	if(invisground.isTouching(bronzeG)){
		bronzeG.destroyEach();
	}

	if(invisground.isTouching(redG)){
		redG.destroyEach();
	}

	if(re>9){
		gameState="end";
	}

	if(score>99){
		gameState="finish";
	}

}

function gameStates(){

	if(gameState==="serve"){
		playbutton.visible=true;
		background(bg_2);
		basket.visible=false;
		hen.visible=false;
		hen_2.visible=false;
	  }
	
	  if(gameState=="play"){
		playbutton.visible=false;
		background(bg);
		createEggs();
		hen.visible=true;
		hen_2.visible=true;
		basket.visible=true;
	  }

	  if(gameState==="end"){
		background(gameOver);
		basket.visible=false;
		hen_2.visible=false;
		hen.visible=false;
	}

	if(gameState==="finish"){
		background(eggselling);
		hen.visible=false;
		hen_2.visible=false;
		basket.visible=false;
	}

}

function keyPressed(){
  
	if(keyDown("LEFT_ARROW")){
	  basket.x-=15;
	}
  
	if(keyDown("RIGHT_ARROW")){
	  basket.x+=15;
  }

}

function mousePressed(){

	if(mousePressedOver(playbutton)){
		playGame();
	}

}

function changeEggImage(){

	
}



