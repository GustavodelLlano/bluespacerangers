class SpaceshipShot {
    constructor(ctx, ssPosX, ssPosY, ssWidth, ssHeight, imageSrc) {
        this.ctx = ctx

        this.shotPosX = ssPosX + ssWidth
        this.shotPosY = ssPosY + ssHeight / 2

        this.ssWidth = ssWidth
        this.ssHeight = ssHeight

        this.shotWidth = 20
        this.shotHeight = 10

        this.shotSpeed = 18

        this.image = new Image()
        this.image.src = `img/${imageSrc}.png`
    }

    draw() {
        this.ctx.drawImage(this.image, this.shotPosX, this.shotPosY, this.shotWidth, this.shotHeight)
        this.move()
    }
    move() {
        this.shotPosX += this.shotSpeed
    }
}