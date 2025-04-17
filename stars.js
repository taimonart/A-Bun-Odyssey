//STAR SPAWNING
function spawnStars() {
  for (let i = 0; i < 1; i++) {
    star = new Sprite();
    star.x = random(20, width - 20);
    star.y = random(-50, -20);
    star.diameter = 8;
    star.drag = 10;
    star.collider = "dynamic";
    star.rotationLock = true;
    star.addAni(twinkle);
    star.ani.frameDelay = 30;
    star.layer = 0;
    starGroup.add(star);
    starGroup.diameter = 10;
    star.debug = false;
  }

  //set check to frame count
  starCheck = frameCount;
}

//COLLECT STAR
function collect(player, star) {
  star.remove();
  score += 100;
}