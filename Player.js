class Player {
  constructor() {
    this.player = new Sprite();
    this.player.addAni("fly", "bun_fly1.png", "bun_fly2.png", "bun_fly3.png");
    this.player.addAni(
      "boost",
      "bun_boost1.png",
      "bun_boost2.png",
      "bun_boost3.png"
    );
    this.player.anis.frameDelay = 25;
    this.player.collider = "kinematic";
    this.player.offset.y = 2;
    this.player.width = 8;
    this.player.height = 14;
    this.player.layer = 1;
    playerGroup.add(this.player);
  }

  spawn() {
    animation(this.player);
    this.player.moveTowards(mouse, 0.08);
  }

  boost() {
    //CHANGE TO BOOST SPRITES per 1000 PWR
    //STAY BOOSTED WHEN OVER 8000 PWR
    if (
      (score >= 1000 && score < 1150) || //< + 150 so player doesnt miss animation
      (score >= 2000 && score < 2150) ||
      (score >= 3000 && score < 3150) ||
      (score >= 4000 && score < 4150) ||
      (score >= 5000 && score < 5150) ||
      (score >= 6000 && score < 6150) ||
      (score >= 7000 && score < 7150) ||
      score >= 8000
    ) {
      this.player.changeAni("boost");
    } else {
      this.player.changeAni("fly");
    }
  }
}
