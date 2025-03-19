// 0% of this code was written using GenAI

class templedit{
    constructor(cellsX, cellsY, pixelsPerCell){
        this.cellsX = cellsX;
        this.cellsY = cellsY;
        this.pixelsPerCell = pixelsPerCell;
        this.mouseX = 0;
        this.mouseY = 0;
        this.running = false;
    }

    init(){
        const canvas = document.getElementById('templedit-editor');;
        this.ctx = canvas.getContext('2d');

        this.vw = 800;
        this.vh = 800;

        canvas.width = this.vw;
        canvas.height = this.vh;

        canvas.addEventListener('mousemove', (event) => {
            const rect = canvas.getBoundingClientRect();
            this.mouseX = event.clientX - rect.left;
            this.mouseY = event.clientY - rect.top;
        });

        this.startLoop();
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

    startLoop() {
        if (this.running) return;
        this.running = true;

        const loop = () => {
            this.ctx.clearRect(0, 0, this.vw, this.vh);
            this.drawGrid();
            
            this.ctx.fillStyle = 'red';
            this.ctx.beginPath();
            this.ctx.arc(this.mouseX, this.mouseY, 5, 0, Math.PI * 2);
            this.ctx.fill();

            requestAnimationFrame(loop);
        };

        loop();
    }

    get width(){
        return this.cellsX * this.pixelsPerCell;
    }

    get height(){
        return this.cellsY * this.pixelsPerCell;
    }
}