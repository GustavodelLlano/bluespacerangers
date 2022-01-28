const spaceGame = {
  title: "endless runner",
  authors: "Gustavo del Llano and Ricardo Ronchetti",
  license: undefined,
  version: "0.0",
  canvasDom: undefined,
  ctx: undefined,
  gameWidth: undefined,
  gameHeight: undefined,
  interval: undefined,
  FPS: 60,
  framesCounter: 0,
  spaceship: undefined,
  background: undefined,
  enemy: undefined,
  enemyArr: [],
  power: undefined,
  points: undefined,
  powerArr: [],
  canvasSize: {
    w: undefined,
    h: undefined,
  },
  

  // --> GAME DIMENSIONS
  setDimensions() {
    this.gameWidth = window.innerWidth ;
    this.gameHeight = window.innerHeight ;
    this.canvasDom.width = this.gameWidth -10;
    this.canvasDom.height = this.gameHeight -10;
  },

  // --> INIT GAME
  init(id) {
    this.canvasDom = document.getElementById(id)
    this.ctx = this.canvasDom.getContext("2d")
    this.setDimensions()
    this.setEventHandlers()
    this.start()
    this.createPlayer()
    this.createBackground()

    this.audio = new Audio()
    this.audio.src = "sounds/background.mp3"
    document.addEventListener("click", () => {
      this.audio.play()
      this.audio.loop = true
      this.audio.volume = 0.2
    })
  },

  // --> GAME START
  start() {
    
    this.interval = setInterval(() => {
      this.framesCounter > 5000
        ? (this.framesCounter = 0)
        : this.framesCounter++;
      

      this.clearAll();
      this.drawAll()

      this.hasCollision();
      this.enemyBulletCollision();
      this.spaceshipBulletCollision();

      if (this.spaceship.ssHealth <= 0) {
        this.gameOver();
      }
     
      this.createHealthPower()
      this.createKillPower()
      this.createAttackPower()
      this.powerCollision()

      this.createLife();

      this.createEnemyArr();
      this.createEnemy2Arr();
      this.createEnemy3Arr();
     
      this.score();
    }, 1000 / this.FPS);
  },

  //--> DRAW ALL
  drawAll() {
this.background.draw()

    this.spaceship.draw(this.framesCounter)

    this.enemyArr.forEach((element) => {
      element.draw(this.framesCounter);
    });

    this.powerArr.forEach((element) => {
      element.draw()
    })
  },

  // --> CLEAR ALL
  clearAll() {
    this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
  },

  // --> CREATE PLAYER
  createPlayer() {
    this.spaceship = new Spaceship(
      this.ctx,
      this.canvasSize,
    )
  },

  //--> CREATE BACKGROUND
  createBackground() {
    this.background = new Background(this.ctx, this.gameWidth, this.gameHeight, "./img/background.png")
  },

  // --> DRAW LIFE BAR
  createLife() {
    this.ctx.font = "30px Sans-serif";
    this.ctx.fillStyle = 'white'
    this.ctx.fillText("Health", 10, 45);
    this.spaceshipLife = new SpaceshipLife(
      this.ctx,
      this.canvasDom,
      110,
      20,
      this.spaceship.ssHealth * 2,
      30
    );
  },


  // --> CREATE ENEMY 1 ARRAY
  createEnemyArr() {
    if (this.framesCounter % 30 === 0) {
      this.enemy = new Enemies(
        this.ctx,
        this.gameHeight,
        this.gameWidth,
        Math.random() * this.gameHeight - 30,
        75,
        75,
        2,
        10,
        15,
        "Animated-Enemy1.png"
      );
      return this.enemyArr.push(this.enemy);
    }
  },

  // --> CREATE ENEMY 2 ARRAY
  createEnemy2Arr() {
    if (this.framesCounter % 70 === 0 && this.framesCounter > 600) {
      this.enemy = new Enemies(
        this.ctx,
        this.gameHeight,
        this.gameWidth,
        Math.random() * this.gameHeight - this.enemy.eneSize.h / 2,
        150,
        150,
        3,
        8,
        20,
        "Animated-Enemy2.png"
      );
      return this.enemyArr.push(this.enemy);
    }
  },

  // --> CREATE ENEMY 3 ARRAY
  createEnemy3Arr() {
    if (this.framesCounter % 100 === 0 && this.framesCounter > 1000) {
      this.enemy = new Enemies(
        this.ctx,
        this.gameHeight,
        this.gameWidth,
        Math.random() * this.gameHeight - this.enemy.eneSize.h / 2,
        200,
        200,
        8,
        5,
        30,
        "Animated-Enemy3.png"
      );
      return this.enemyArr.push(this.enemy);
    }
  },

  // --> CLEAR ENEMY ARRAY
  clearEnemies() {
    this.enemyArr = this.enemyArr.filter(
      (elm) => elm.enePos.x >= 0 - elm.eneSize.w
    );
  },
  //--> CREATE HEALTH PWUP

  createHealthPower() {

    if (this.framesCounter % 400 === 0) {
      this.power = new Powerup(
        this.ctx,
        this.gameHeight,
        this.gameWidth,
        Math.random() * this.gameHeight - 25,
        true,
        false,
        false,
        "Static-Spacebombs.png"
      )
      if (this.power.getHealth) {
        this.powerArr.push(this.power)
        this.spaceship.ssHealth += 10
      }
    }
  },


  //--> CREATE ATTACK PWUP

  createAttackPower() {
    if (this.framesCounter % 500 === 0) {
      this.power = new Powerup(
        this.ctx,
        this.gameHeight,
        this.gameWidth,
        Math.random() * this.gameHeight - 25,
        false,
        true,
        false,
        "Static-Spacemines.png"
      )
      return this.powerArr.push(this.power)
    }
  },



  //--> CREATE KILLALL PWUP
  createKillPower() {
    if (this.framesCounter % 700 === 0) {
      this.power = new Powerup(
        this.ctx,
        this.gameHeight,
        this.gameWidth,
        Math.random() * this.gameHeight - 25,
        false,
        false,
        true,
        "Static-Comm-Ship.png"
      )
      return this.powerArr.push(this.power)
    }
  },

  //--> CHECK POWER COLLISION

  powerCollision() {
    this.powerArr.some((pow) => {
      if (
        this.spaceship.ssPosX + this.spaceship.ssWidth > pow.powerPosX &&
        this.spaceship.ssPosX < pow.powerPosX + pow.powerSize.w &&
        this.spaceship.ssPosX < pow.powerPosY + pow.powerSize.h &&
        this.spaceship.ssPosY + this.spaceship.ssHeight > pow.powerPosY
      ) {
        pow.powerPosX = this.canvasDom - 1;
        if (pow.getHealth) {
          this.spaceship.ssHealth += 15
          let powerupSpawn = new Audio('./sounds/spawn-01.wav')
          powerupSpawn.play()
          powerupSpawn.volume = 0.1
        }
        if (pow.getAttack) {
          this.spaceship.ssAttack += 1
          this.actualFrame = this.framesCounter
          let powerupSpawn = new Audio('./sounds/spawn-01.wav')
          powerupSpawn.play()
          powerupSpawn.volume = 0.1
        }
        if (pow.killThem) {
          this.enemyArr = []
          let powerupSpawn = new Audio('./sounds/spawn-01.wav')
          powerupSpawn.play()
          powerupSpawn.volume = 0.1
        }
      }
    }
    )
  },



  //--> TIMER FOR ATTACK BONUS

  checkAttack() {
    if (this.framesCounter >= this.actualFrame + 500) {
      return this.spaceship.ssAttack = 1
    }
  },

  //--> CHECK ENEMY COLLISIONS
  hasCollision() {
    this.enemyArr.some((ene) => {
      if (
        this.spaceship.ssPosX + this.spaceship.ssWidth > ene.enePos.x &&
        this.spaceship.ssPosX < ene.enePos.x + ene.eneSize.w &&
        this.spaceship.ssPosY < ene.enePos.y + ene.eneSize.h &&
        this.spaceship.ssPosY + this.spaceship.ssHeight > ene.enePos.y
      ) {
        ene.enePos.x = this.canvasDom - 1;
        this.spaceship.ssHealth -= ene.eneAttack;
        let enemyExplosion = new Audio('./sounds/explosion-01.wav')
        enemyExplosion.play()
        enemyExplosion.volume = 0.1
      }
    });
  },


  // --> CHECK ENEMY BULLET COLLISION
  enemyBulletCollision() {
    this.enemyArr.forEach((eachEnemy) => {
      eachEnemy.enemyShots.forEach((eachShot) => {
        if (
          this.spaceship.ssPosX + this.spaceship.ssWidth > eachShot.posX &&
          this.spaceship.ssPosX < eachShot.posX + eachShot.eneShotWidth &&
          this.spaceship.ssPosY < eachShot.posY + eachShot.eneShotHeight &&
          this.spaceship.ssPosY + this.spaceship.ssHeight > eachShot.posY
        ) {
          eachShot.posX = this.canvasDom - 1;
          this.spaceship.ssHealth -= eachEnemy.eneAttack;
        }
      });
    });
  },

  //--> CHECK SPACESHIP BULLET COLLISION
  spaceshipBulletCollision() {
    this.enemyArr.some((enem) => {
      this.spaceship.bullets.forEach((bullet) => {
        if (
          bullet.shotPosX + bullet.shotWidth > enem.enePos.x &&
          bullet.shotPosX < enem.enePos.x + enem.eneSize.w &&
          bullet.shotPosY < enem.enePos.y + enem.eneSize.h &&
          bullet.shotPosY + bullet.shotHeight > enem.enePos.y
        ) {
          bullet.shotPosX = this.canvasDom - 1;
          enem.eneHealth -= this.spaceship.ssAttack;
          if (enem.eneHealth <= 0) {
            enem.enePos.x = this.canvasDom - 1;
          }
          let enemyExplosion = new Audio('./sounds/explosion-01.wav')
          enemyExplosion.play()
          enemyExplosion.volume = 0.1
        }
      });
    });
  },

  //--> CREATE SCORE
  score() {
   points = Math.floor(this.framesCounter / 5);
    this.ctx.font = "18px Sans-serif";
    this.ctx.fillStyle = 'white'
    this.ctx.fillText(`Score: ${points}`, this.gameHeight * 1.4, 45);
  },

  
// make_base();

// function make_base() {
//   base_image = new Image();
//   base_image.src = 'img/gameover.png';
//   base_image.onload = function(){
//     ctx.drawImage(base_image, 0, 0);
//   }
// },



  //--> GAME OVER
  gameOver() {
    clearInterval(this.interval);
    clearInterval(spaceGame.interval)
    document.querySelector("#gameover").style.display = "flex"
    document.querySelector("#mycanvas").style.display = "none"
    document.querySelector("#score span").innerHTML = Math.floor(this.framesCounter / 5)
  },

  // --> EVENT HANDLERS
  setEventHandlers() {
    document.addEventListener("keydown", (event) => {
      const { key } = event;
      key === "ArrowUp" ? this.spaceship.moveUp() : null;
      key === "ArrowRight" ? this.spaceship.moveRight() : null;
      key === "ArrowDown" ? this.spaceship.moveDown() : null;
      key === "ArrowLeft" ? this.spaceship.moveLeft() : null;
      key === " " ? this.spaceship.shoot() : null;
    });
  },
};