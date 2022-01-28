class Spaceship {
  constructor(ctx, canvasDom) {
    this.ctx = ctx;
    this.canvasDom = canvasDom

    this.ssPosX = 20
    this.ssPosY = 500
    this.ssWidth = 100
    this.ssHeight = 100

    this.ssHealth = 50
    this.ssSpeed = 10
    this.ssAttack = 1

    this.init()

    this.bullets = [];
  }

  init() {
    this.image = new Image()
    this.image.src = "img/Animated-Blue.png"
    this.image.frames = 8
    this.image.framesIndex = 0
  }

  draw(framesCounter) {
    this.ctx.drawImage(

      this.image,
      this.image.framesIndex * (this.image.width / this.image.frames),
      0,
      this.image.width / this.image.frames,
      this.image.height,
      this.ssPosX,
      this.ssPosY,
      this.ssWidth,
      this.ssHeight
    )
    this.animate(framesCounter)

    this.bullets.forEach((elm) => elm.draw())
  }

  animate(framesCounter) {
    if (framesCounter % 2 === 0) {
      this.image.framesIndex++
    }
    if (this.image.framesIndex >= this.image.frames) {
      this.image.framesIndex = 0
    }
  }

  shoot() {
    let playerShoot = new Audio('./sounds/shoot-03.wav')
    playerShoot.play()
    playerShoot.volume = 0.1
    this.bullets.push(
      new SpaceshipShot(
        this.ctx,
        this.ssPosX,
        this.ssPosY,
        this.ssWidth,
        this.ssHeight,
        "Bullet-Blue"
      )
    )
  }


  //--> SPACESHIP MIOVEMENT
  moveUp() {
    if (this.ssPosY > 10) {
      this.ssPosY -= 30;
    }
  }

  moveRight() {
    if (this.ssPosX <= window.innerWidth - this.ssWidth) {
      this.ssPosX += 30;
    }
  }

  moveDown() {
    if (this.ssPosY <= window.innerWidth / 1.5 - this.ssHeight * 1.3) {
      this.ssPosY += 30;
    }
  }

  moveLeft() {
    if (this.ssPosX > 0 + this.ssWidth / 2) {
      this.ssPosX -= 30;
    }
  }
}

// // --> HERO 1
// class Xwing extends Spaceship {
//   constructor(ctx, canvasSize) {
//     this.ctx = ctx
//     this.canvasSize = canvasSize
//     this.ssPos = { x: 100, y: 100 };
//     this.ssSize = { w: 100, h: 100 };
//     this.ssHealth = 10;
//     this.ssSpeed = 10;
//     this.ssAttack = 10;
//     this.imageInstance = new Image();
//     this.imageInstance.src = "img/triangle.png";
//   }

//   // -->HERO DRAW
//   draw() {
//     this.ctx.drawImage(
//       this.imageInstance,
//       this.ssPos.x,
//       this.ssPos.y,
//       this.ssSize.w,
//       this.ssSize.h
//     );
//   }
// }

// // --> HERO 2
// class Ywing {
//   constructor(ctx, canvasSize) {
//       this.ctx = ctx;
//       this.canvasSize = canvasSize;
//     this.ssPos = { x: 100, y: 100 };
//     this.ssSize = { w: 100, h: 100 };
//     this.ssHealth = 15;
//     this.ssSpeed = 5;
//     this.ssAttack = 15;
//     this.imageInstance = new Image();
//     this.imageInstance.src = "triangle.png";
//   }

//   // -->HERO DRAW
//   draw() {
//     this.ctx.drawImage(
//       this.imageInstance,
//       this.ssPos.x,
//       this.ssPos.y,
//       this.ssSize.w,
//       this.ssSize.h
//     );
//   }
// }

// // --> HERO 3
// class Awing {
//   constructor(ctx, canvasSize) {
//       this.ctx = ctx;
//       this.canvasSize = canvasSize
//     this.ssPos = { x: 100, y: 100 };
//     this.ssSize = { w: 100, h: 100 };
//     this.ssHealth = 5;
//     this.ssSpeed = 15;
//     this.ssAttack = 5;
//     this.imageInstance = new Image();
//     this.imageInstance.src = "img/triangle.png";
//   }

//   // -->HERO DRAW
//   draw() {
//     this.ctx.drawImage(
//       this.imageInstance,
//       this.ssPos.x,
//       this.ssPos.y,
//       this.ssSize.w,
//       this.ssSize.h
//     );
//   }