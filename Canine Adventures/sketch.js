var car1, car2, car3;
var cone;
var dogImg, dog;
var food, water;
var road;
var track;
var truckImg;
var invisaground;
var nutrientGroup;
var health = 10;
var gameState = "play";

function preload() {
  car1 = loadImage("car1.png");
  car2 = loadImage("car2.png");
  car3 = loadImage("car3.png");
  cone = loadImage("cone.png");
  dogImg = loadAnimation("dog1.png","dog2.png","dog3.png");
  road = loadImage("road.jpeg");
  food = loadImage("food_bowl.png");
  water = loadImage("water_bowl.png");
  truckImg = loadImage("animal_control.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  track = createSprite(width/2,height/2-500);
  track.addImage(road);
  track.scale = 4.8;

  dog = createSprite(width/2-400,height-350);
  dog.addAnimation("woof",dogImg)

  invisaground = createSprite(width/2-400,height-300,width,5);
  invisaground.visible = false;

  truck = createSprite(width/2-800,height-400);
  truck.addImage("evil",truckImg)
  truck.scale = 1.5

  nutrientGroup = createGroup();
}

function draw() {
  background("pink");
  track.velocityX = -7;
  if (track.x < 0) {
    track.x = width/2
  }

  if (keyDown("space") && dog.y > height-420) {
    dog.velocityY = -10;
  }

  dog.velocityY += 0.5;

  dog.collide(invisaground);

  nutrients();

  for (var i = 0; i < nutrientGroup.length; i++) {
    var one_nutrient = nutrientGroup.get(i);
    if (dog.isTouching(one_nutrient)) {
      one_nutrient.destroy();

      if (health <= 135) {
        health += 50;
      }
      if (health> 135) {
        health = 185;
      }
    }
  }

  if (health <= 0) {
    gameState = "end";
  }

  if (gameState == "end") {
    gameOver();
  }

  drawSprites();

  showHealthBar();
}

function nutrients() {
  if (frameCount % 60 === 0) {
    var nutrient;
  nutrient = createSprite(width,random(height-500,height-400));
  nutrient.velocityX = -7;
  var rand = Math.round(random(1,2));
  if (rand == 1) {
    nutrient.addImage(food);
    nutrient.scale = 0.2;
  }
  else {
    nutrient.addImage(water);
    nutrient.scale = 0.5;
  }

  nutrient.lifetime = width;
  nutrientGroup.add(nutrient);

  }
  
}

function showHealthBar() {
  noStroke();
  fill("white");
  rect(75,90,185,20);
  fill("green");
  rect(75,90,health,20);
  image(food,15,70,60,60);

  if (frameCount % 45 == 0 && gameState == "play") {
      health -= 185/9;
    }

  if (health < 5) {
    gameState = "end";
  }
}

function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      imageUrl:
        "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}