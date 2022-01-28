class SpaceshipLife {

    constructor(ctx, canvasDom, posLifeX, posLifeY, lifeWidth, lifeHeight) {
        this.ctx = ctx
        this.canvasDom = canvasDom

        this.posLifeX = posLifeX
        this.posLifeY = posLifeY

        this.lifeWidth = lifeWidth *2
        this.lifeHeight = lifeHeight
        this.draw()
    }

    draw() {
        this.ctx.fillStyle = "blue"
        this.ctx.fillRect(
            this.posLifeX,
            this.posLifeY,
            this.lifeWidth,
            this.lifeHeight
        )
        
    }
}

//    //document.getElementById("GFG");
//    //var contex = x.getContext("2d");
//    let gr = contex.createLinearGradient(50, 0, 350, 0);
//    gr.addColorStop(0, "blue");
//    gr.addColorStop(1, "white");
//    contex.fillStyle = gr;
//    contex.fillRect(50, 50, 350, 200);
//    contex.stroke();