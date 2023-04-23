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
        pos: undefined,
        size: { w: 100, h: 100 }
    },
    backgroundInstance: undefined,
    backgroundSpecs: {
        pos: undefined,
        size: { w: 1000, h: 600 }
    },
    invaders1: [],

    init() {
        this.setContext()
        this.setImageInstances()
        this.start()
    },

    start() {
        setInterval(() => {
            this.clearAll()
            this.drawAll()
            this.frameIndex++
        }, 50)
    },

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

    setImageInstances() {
        this.shipInstance = new Image()
        this.shipInstance.src = "../images/falcon.png"
        this.backgroundInstance = new Image()
        this.backgroundInstance.src = "../images/background.jpg"
        // dibujo invasor1. duda. ojo los specs están en la clase.
        this.invaders1Instance = new Image()
        this.invaders1Instance.src = "../images/invaders1.png"
    },


    drawShip() {
        this.ctx.drawImage(
            this.shipInstance,
            this.shipSpecs.pos.x,
            this.shipSpecs.pos.y,
            this.shipSpecs.size.w,
            this.shipSpecs.size.h
        )
    },
    drawBackground() {
        this.ctx.drawImage(
            this.backgroundInstance,
            this.backgroundSpecs.pos.x,
            this.backgroundSpecs.pos.y,
            this.backgroundSpecs.size.w,
            this.backgroundSpecs.size.h
        )
    },

    createInvaders1() {
        const invaders1Xposition = [50, 110, 160, 210]
        invaders1Xposition.forEach((duplicated) => {
            return this.invaders1.push(new Invaders1(this.ctx, this.canvasSize, this.invaders1Instance, duplicated))
        })

        // this.invaders1.push(
        //     new Invaders1(this.ctx, this.canvasSize, this.invaders1Instance, invaders1Xposition[randomIndexPosition]))
    },

    drawAll() {
        this.drawBackground()
        this.drawShip()
        // this.createInvaders1()
        this.invaders1.slice(0, 4).forEach((elm) => {
            return elm.drawInvaders1()
        })
        if (this.frameIndex % 80 === 0) {
            this.createInvaders1()
        }


    },



    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    }

}
