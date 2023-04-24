class ShipBullets {
    // constructor(ctx, canvasSize, shipBulletsInstance, shipPosX, shipW, shipH) {
    constructor(ctx, canvasSize, shipBulletsInstance, shipH) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.shipBulletsInstance = shipBulletsInstance
        this.shipBulletsSpecs = {
            size: { w: 10, h: 30 },
            pos: { x: 500, y: shipH },
        }
        this.velY = 10
        this.initBullets()
    }

    initBullets() {
        this.shipBulletsInstance = new Image()
        this.shipBulletsInstance.src = "../images/bullet.png"
        console.log("FUNCIONA INITBULLETS")
    }

    drawBullets() {
        this.move()
        this.ctx.drawImage(
            this.shipBulletsInstance,
            this.shipBulletsSpecs.pos.x,
            this.shipBulletsSpecs.pos.y,
            this.shipBulletsSpecs.size.w,
            this.shipBulletsSpecs.size.h
        )
    }

    move() {
        this.shipBulletsSpecs.pos.y -= this.velY
    }
}