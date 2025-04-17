//ROCK SPAWNING
function spawnRocks() {
  for (let i = 0; i < 1; i++) {
    rock = new Sprite();
    rock.x = random(20, width - 20);
    rock.y = random(-50, -20);
    rock.diameter = 20;
    rock.drag = 15;
    rock.rotationLock = true;
    rock.addAni(asteroid);
    rock.ani.frameDelay = 20;
    rock.layer = 0;
    rockGroup.add(rock);
    rockGroup.diameter = 20;
    rockGroup.offset.y = 3;
    rock.debug = false;
  }

  //set check to frame count
  rockCheck = frameCount;
}

//HIT ROCK
function hit(player, rock) {
  rock.remove();
  score -= 150;
}
