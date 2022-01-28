class Powerup {
    constructor(ctx, canvasDom, powerPosX, powerPosY, getHealth, getAttack, killThem, imageName) {
        this.ctx = ctx
        this.canvasDom = canvasDom
        
        this.powerSize = { w: 50, h: 50 }
        this.powerSpeed = 6

        this.powerPosX = powerPosX
        this.powerPosY = powerPosY
     
        this.imageInstance = new Image()
        this.imageInstance.src = `img/${imageName}`
        

        this.getHealth = getHealth
        this.getAttack = getAttack
        this.killThem = killThem

    }
    
    draw() {
        this.ctx.drawImage(this.imageInstance, this.powerPosX, this.powerPosY, this.powerSize.w, this.powerSize.h)
        this.move()
    }
    
    move() {
        this.powerPosX -= this.powerSpeed
    }
}