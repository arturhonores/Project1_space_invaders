class Hard {
    constructor(ctx, canvasSize, invaders1Instance, posX, posY) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.hardInstance = hardInstance
        this.hardSpecs = {
            size: { w: 40, h: 40 },
            pos: { x: posX, y: posY }
        }
        this.levelUp()
    }

    levelUp() {
        this.hardInstance = new Image()
        this.hardInstance.src = "../images/hard.png"
    }

    drawLevelUp() {
        this.move()
        this.ctx.drawImage(
            this.hardInstance,
            this.hardSpecs.pos.x,
            this.hardSpecs.pos.y,
            this.hardSpecs.size.w,
            this.hardSpecs.size.h
        )
    }
}