//CREDITS:
//I watched a LOT of these guys' videos:
//Tech Head Online (YouTube) - screens/modes, general info
//Matthew Bardin (YouTube) - sprite spawning + timing, sprite animation, general info
//flanniganable (YouTube) - timer, changing sprite animations
//Fonts are from dafont.com
//Credits accessible in-game on end screen

//NOTES:
//Timer doesn't reset when clicking to replay game, unsure how to make this happen
//For now, refresh to replay game
//Functions for stars/asteroids are in stars.js + asteroids.js fyi

//game mode variable for start/game/stop screens
let mode = 0;
let playing;

//text variables
let pFont; //regular text

//scorebox variables
let box, box2;
let score = 0;

//timer variables
let startTime;
let passedTime = 0;
let counting = true;
let playTime;

//player variables
var player;
let playerGroup;

//star variables
let star;
let starCheck = 0;
let starRate = 1.5; //star spawn rate/sec
let starGroup;

//rock variables
let rock;
let rockCheck = 0;
let rockRate = 1.2; //rock spawn rate/sec
let rockGroup;

//gravity
let grav = 10;

//bg imgs
let bgStart, bgEnd;

//time
let seconds;

function preload() {
  pFont = loadFont("Minecraftia.ttf");
  twinkle = loadAnimation("star1.png", "star2.png");
  asteroid = loadAnimation("asteroid1.png", "asteroid2.png", "asteroid3.png");
}

function setup() {
  new Canvas(120, 170, "pixelated x5");
  frameRate(60);
  startTime = millis();

  //BG IMAGES
  bgStart = loadImage("start.png");
  bgEnd = loadImage("end.png");

  //SPRITE GROUPS
  starGroup = new Group();
  rockGroup = new Group();
  playerGroup = new Group();

  //SCORE BOX
  box = new Sprite(width / 2, 144, 100, 24);
  box.collider = "none";
  box.color = "white";
  box.textSize = 16;

  //TIMER BOX
  box2 = new Sprite(width / 2, 160, 100, 14);
  box2.collider = "none";
  box2.color = "white";
  box2.textSize = 8;

  //SPAWN PLAYER
  player = new Player();

  //SPRITE FRAME CHECKS
  starCheck = frameCount;
  rockCheck = frameCount;

  //SPRITE GROUP INTERACTIONS
  playerGroup.overlaps(starGroup, collect);
  playerGroup.overlaps(rockGroup, hit);
  starGroup.overlaps(rockGroup);

  mode = 0;
}

function draw() {
  clear();
  if (mode == 1) {
    allSprites.visible = true;
    counting = true;
    background(22, 10, 70);
    world.gravity.y = grav;
    allSprites.pixelPerfect = true;

    //TIMER
    if (counting) {
      passedTime = millis() - startTime;
    } //calcs time passed since start
    seconds = int(passedTime / 1000); //integer of time passed

    //stop timer if score 10000
    if (score >= 10000) {
      counting = false;
    }

    //DRAW PLAYER
    player.spawn();
    player.boost();

    //if 1 second has passed, spawn star
    if (frameCount - starCheck > frameRate() * starRate) {
      spawnStars(1);
    }
    //if 1 second has passed, spawn rock
    if (frameCount - rockCheck > frameRate() * rockRate) {
      spawnRocks(1);
    }
    //SCOREBOX TEXT
    textFont(pFont);
    box.text = score;
    box.layer = 3;

    //TIMEBOX TEXT
    box2.text = "TIME: " + seconds;
    box2.layer = 3;

    //INCREASE GRAVITY per 1000 PWR
    if (score >= 1000 && score < 2000) {
      grav = 13;
    } else if (score >= 2000 && score < 3000) {
      grav = 16;
    } else if (score >= 3000 && score < 4000) {
      grav = 18;
    } else if (score >= 4000 && score < 5000) {
      grav = 20;
    } else if (score >= 5000 && score < 6000) {
      grav = 23;
    } else if (score >= 6000 && score < 7000) {
      grav = 26;
    } else if (score >= 7000 && score < 8000) {
      grav = 29;
    } else if (score >= 8000 && score < 9000) {
      grav = 31;
    } else if (score >= 9000 && score < 10000) {
      grav = 33;
    } else if (score >= 10000 && score < 20000) {
      grav = 35;
    }

    //INCREASE SPRITE SPAWN RATE AS SCORE INCREASES
    if (score >= 3000 && score < 5000) {
      rockRate = 1;
      starRate = 1.2;
    } else if (score >= 5000 && score < 8000) {
      rockRate = 0.8;
      starRate = 1;
    } else if (score >= 8000 && score < 10000) {
      rockRate = 0.3;
      starRate = 0.7;
    }

    //MODES + SCREENS CONDITIONALS
    //END SCREEN IF PWR REACHES 10000
    //if you don't want to play too long, just lower this number:
    if (score >= 10000) {
      mode = 2;
    }
  } else if (mode == 0) {
    //START
    //START SCREEN
    background(bgStart);
    playerGroup.visible = false;
    box.visible = false;
    box2.visible = false;
    counting = false;

    //START TEXT
    textFont(pFont);
    fill("white");
    textSize(8);
    text("Help Bun reach 10000", 4, 66);
    text("STAR POWER to get back", 4, 78);
    text("home! Collect STARS", 4, 90);
    text("and avoid ASTEROIDS.", 4, 102);
    text("CAUTION: as you gain", 4, 114);
    text("POWER, you go faster!", 4, 126);
    fill("white");
    text("CLICK SCREEN TO START", 4, 170);
  } else if (mode == 2) {
    //END
    //END SCREEN
    background(bgEnd);
    allSprites.visible = false;
    counting = false;

    //END TEXT
    textFont(pFont);
    fill("white");
    textSize(8);
    text("CREDITS - SHIFT", 22, 14);
    textSize(8);
    text("Congrats! You helped", 4, 66);
    text("Bun get back home in:", 4, 78);
    text(seconds + " seconds!", 4, 90);
    fill("black");
    text("Click to try again", 20, 145);
    text("and get an even", 20, 157);
    text("faster time!", 20, 169);
  } else if (mode == 3) {
    //CREDITS
    //CREDITS SCREEN
    background(22, 10, 70);
    allSprites.visible = false;
    counting = false;

    //CREDITS TEXT
    textFont(pFont);
    fill("white");
    textSize(8);
    text("A BUN ODYSSEY CREDITS:", 4, 20);
    text("Coding/Information:", 4, 32);
    text("Tech Head Online (YT)", 4, 44);
    text("Matthew Bardin (YT)", 4, 56);
    text("flanniganable (YT)", 4, 68);
    text("Fonts:", 4, 80);
    text("dafont.com", 4, 92);
    text("Click to play again!", 4, 116);
  }
}

function mouseClicked() {
  if (mode == 0) {
    //if click on start screen or credits screen
    mode = 1; //play game
  } else if (mode == 2 || mode == 3) {
    //if click on end screen
    mode = 1; //replay game
    score = 0; //reset score to zero
    grav = 10; //reset gravity
    rockRate = 1.2; //reset rock spawn rate
    starRate = 1.5; //reset star spawn rate
  }
}

function keyPressed() {
  if (keyCode == SHIFT && mode == 2) {
    //if click shift on end screen
    mode = 3; //credits screen
  }
}
