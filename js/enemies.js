class Enemies {
  constructor(ctx, canvasDom, enePosX, enePosY, eneWidth, eneHeight, eneHealth, eneSpeed, eneAttack, imageName) {
    this.ctx = ctx;
    this.canvasDom = canvasDom

    this.enePos = { x: enePosX, y: enePosY };
    this.eneSize = { w: eneWidth, h: eneHeight };

    this.eneHealth = eneHealth;
    this.eneSpeed = eneSpeed;
    this.eneAttack = eneAttack;

    this.enemyShots = [];

    this.imageInstance = new Image();
    this.imageInstance.src = `img/${imageName}`
    this.imageInstance.frames = 5
    this.imageInstance.frameIndex = 0

    this.move()
    this.shoot()
  }

  // -->ENEMY DRAW
  draw(framesCounter) {
    this.ctx.drawImage(
      this.imageInstance,
      this.imageInstance.frameIndex * (this.imageInstance.width / 5),
      0,
      this.imageInstance.width / this.imageInstance.frames,
      this.imageInstance.height,
      this.enePos.x,
      this.enePos.y,
      this.eneSize.w,
      this.eneSize.h
    )
    
    this.animate(framesCounter)

    this.enemyShots.forEach((elm) => elm.draw())

    this.move()
  }

  animate(framesCounter) {
    if (framesCounter % 2 === 0) {
      this.imageInstance.frameIndex++
    }
    if (this.imageInstance.frameIndex >= this.imageInstance.frames) {
      this.imageInstance.frameIndex = 0
    }
    
  }

  // -->ENEMY MOVEMENT
  move() {
    this.enePos.x -= this.eneSpeed
  }

  // -->ENEMY BULLETS
  shoot() {
    let enemyShoot = new Audio('./sounds/shoot-01.wav')
    enemyShoot.play()
    enemyShoot.volume = 0.1
    this.enemyShots.push(new EnemyShot(this.ctx, this.enePos.x, this.enePos.y, this.eneSize.w, this.eneSize.h))
  }

}