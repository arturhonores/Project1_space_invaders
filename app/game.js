const game = {
    appName: 'Space Invaders',
    author: 'Rober y Arturo',
    version: '1.0.0',
    license: undefined,
    description: 'Proyecto Módulo 1',
    ctx: undefined,
    frameIndex: 0,
    canvasSize: {
        w: 1000,
        h: 600
    },
    shipInstance: undefined,
    shipSpecs: {
        pos: { x: undefined, y: undefined },
        size: { w: 70, h: 70 }
    },
    backgroundInstance: undefined,
    backgroundSpecs: {
        pos: undefined,
        size: { w: 1000, h: 600 }
    },
    invaders1: [],
    bullets: [],
    //PUNTO SE SEGURIDAD

    canShoot: true,
    //INIT
    init() {
        this.setContext()
        this.setImageInstances()
        this.setEventListeners()
        this.start()
    },
    // CORAZÓN
    start() {
        this.intervalId = setInterval(() => {
            this.clearAll()
            this.drawAll()
            this.collisionInvadersShip() ? this.gameOver() : null
            this.collisionbulletInvaders()
        }, 50)
    },
    //CTX
    setContext() {
        this.ctx = document.getElementById("myCanvas").getContext("2d")
        this.shipSpecs.pos = {
            x: this.canvasSize.w / 2 - this.shipSpecs.size.w / 2,
            y: this.canvasSize.h - this.shipSpecs.size.h
        }
        this.backgroundSpecs.pos = {
            x: 0,
            y: 0
        }
    },
    //METER IMÁGENES NAVE Y FONDO
    setImageInstances() {
        this.shipInstance = new Image()
        this.shipInstance.src = "../images/ship.png"

    },

    // DIBUJAR NAVE
    drawShip() {
        this.ctx.drawImage(
            this.shipInstance,
            this.shipSpecs.pos.x,
            this.shipSpecs.pos.y,
            this.shipSpecs.size.w,
            this.shipSpecs.size.h
        )
    },


    // CREAR INVASORES
    createInvaders1() {
        const invaders1Xposition = [110, 160, 210, 260, 310, 360, 410, 460, 510, 560, 610, 660, 710, 760, 810, 860]
        invaders1Xposition.forEach((duplicated) => {
            return this.invaders1.push(new Invaders1(this.ctx, this.canvasSize, this.invaders1Instance, duplicated))
        })
    },

    //DIBUJAR TODO
    drawAll() {
        this.frameIndex++
        this.drawShip()
        this.invaders1.slice(0, 48).forEach((eachInvader) => {
            return eachInvader.drawInvaders1()
        })


        if (this.frameIndex >= 60) {
            this.createInvaders1();
            this.frameIndex = 0;
        }
        this.bullets.forEach((eachBullet) => {
            eachBullet.drawBullets()
        })
    },

    // BORRAR TODO
    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    // CONTROLES NAVE
    setEventListeners() {
        document.onkeydown = event => {
            const { key } = event
            if (key == 'ArrowLeft') {
                this.shipSpecs.pos.x -= 30
                if (this.shipSpecs.pos.x < 0) {
                    this.shipSpecs.pos.x = 0
                }
            }

            if (key == 'ArrowRight') {
                this.shipSpecs.pos.x += 30
                if (this.shipSpecs.pos.x > 1000 - this.shipSpecs.size.w) {
                    this.shipSpecs.pos.x = 1000 - this.shipSpecs.size.w
                }
            }
            if (key == 'ArrowUp' && this.canShoot) {
                this.shipShoot()
                this.canShoot = false
                setTimeout(() => {
                    this.canShoot = true
                }, 500) // Tiempo de espera en milisegundos
            }
        }
    },

    // COLISIONES
    collisionInvadersShip() {
        console.log("MÉTODO COLISIÓN INVADER vs NAVE")
        return this.invaders1.some((inv) => {
            return this.shipSpecs.pos.x + this.shipSpecs.size.w >= inv.invaders1Specs.pos.x &&
                this.shipSpecs.pos.x <= inv.invaders1Specs.pos.x + inv.invaders1Specs.size.w &&
                this.shipSpecs.pos.y + this.shipSpecs.size.h >= inv.invaders1Specs.pos.y &&
                this.shipSpecs.pos.y <= inv.invaders1Specs.pos.y + 40 //40 = altura invaders
        })
    },

    collisionbulletInvaders() {
        for (let i = 0; i < this.bullets.length; i++) {
            for (let j = 0; j < this.invaders1.length; j++) {
                if (
                    this.bullets[i].shipBulletsSpecs.pos.x + this.bullets[i].shipBulletsSpecs.size.w >= this.invaders1[j].invaders1Specs.pos.x &&
                    this.bullets[i].shipBulletsSpecs.pos.x <= this.invaders1[j].invaders1Specs.pos.x + this.invaders1[j].invaders1Specs.size.w &&
                    this.bullets[i].shipBulletsSpecs.pos.y + this.bullets[i].shipBulletsSpecs.size.h >= this.invaders1[j].invaders1Specs.pos.y &&
                    this.bullets[i].shipBulletsSpecs.pos.y <= this.invaders1[j].invaders1Specs.pos.y + this.invaders1[j].invaders1Specs.size.h
                ) {

                    // Elimina la bala y el invasor de sus respectivos arrays
                    this.bullets.splice(i, 1);
                    this.invaders1.splice(j, 1);

                    // Detiene el bucle interno para evitar múltiples colisiones con la misma bala
                    break;
                }
            }
        }
    },





    // CREAR DISPARO
    shipShoot() {
        this.bullets.push(new ShipBullets(this.ctx, this.canvasSize, this.shipBulletsInstance, this.shipSpecs.pos.x + 30, 585 - this.shipSpecs.size.h))
    },


    gameOver() {
        clearInterval(this.intervalId)
    }

}
