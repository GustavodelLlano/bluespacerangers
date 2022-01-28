class EnemyShot {
  constructor(ctx, enemyPosX, enemyPosY, enemyWidth, enemyHeight,) {
    this.ctx = ctx;

    this.posX = enemyPosX - enemyWidth
    this.posY = enemyPosY + enemyHeight / 2;

    this.eneShotWidth = 20;
    this.eneShotHeight = 10;

    this.speed = 15;

    this.image = new Image()
    this.image.src = "img/Bullet-Red.png"
    }
    
    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.eneShotWidth, this.eneShotHeight)
        this.move()
    }
  
    move() {
    this.posX -= this.speed;
  }
}