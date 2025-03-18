class templedit{
    constructor(cellsX, cellsY, pixelsPerCell){
        this.cellsX = cellsX;
        this.cellsY = cellsY;
        this.pixelsPerCell = pixelsPerCell;
    }

    init(){
        const canvas = document.getElementById('templedit-editor');;
        this.ctx = canvas.getContext('2d');
    }

    drawLine(x1, y1, x2, y2){
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }

    drawGrid(){
        for(let row = 0; row < this.cellsY; row++){
            let yPos = row * this.pixelsPerCell;
            this.drawLine(0, yPos, this.width, yPos);
        }

        for(let col = 0; col < this.cellsX; col++){
            let xPos = col * this.pixelsPerCell;
            this.drawLine(xPos, 0, xPos, this.height);
        }
    }

    cellsX;
    cellsY;
    pixelsPerCell;
    ctx;

    get width(){
        return this.cellsX * this.pixelsPerCell;
    }

    get height(){
        return this.cellsY * this.pixelsPerCell;
    }
}