// 0% of this code was written using GenAI

class templedit{
    constructor(){
        this.running = false;
        this.mouseMode = "snap";

        this.images = [
            "imgs/block.png", //0
            "imgs/slope_ground-right.png", //1
            "imgs/slope_ground-left.png", //2
            "imgs/slope_ceiling-right.png", //3
            "imgs/slope_ceiling-left.png", //4
            "imgs/gem_f.png", //5
            "imgs/gem_w.png", //6
            "imgs/fireboy.png", //7
            "imgs/watergirl.png", //8
            "imgs/exit_f.png", //9
            "imgs/exit_w.png", //10
            "imgs/fluid_f.png", //11
            "imgs/fluid_w.png", //12
            "imgs/fluid_g.png", //13
        ];

        this.loadedImages = [];
    }

    preloadImages(callback) {
        var loadedImages = 0;
        var numImages = this.images.length;
    
        var images = [];
    
        function imageLoaded() {
            loadedImages++;
            if (loadedImages === numImages) {
                callback(images);
            }
        }
    
        for (var i = 0; i < numImages; i++) {
            var img = new Image();
            img.onload = imageLoaded;
            img.src = this.images[i];
            this.loadedImages.push(img);
        }
    }

    init(){
        const canvas = document.getElementById('templedit-editor');
        this.ctx = canvas.getContext('2d');

        canvas.addEventListener('mousemove', (event) => {
            const rect = canvas.getBoundingClientRect();
            this.mouseX = event.clientX - rect.left;
            this.mouseY = event.clientY - rect.top;
        });

        this.pixelsPerCell = 1000 / this.cellsX;

        canvas.width = this.width;
        canvas.height = this.height;

        this.preloadImages(this.images, function(images) {
            this.loadedImages = images;
        });

        this.startLoop();
    }

    async loadFile(event){
        var file = event.target.files.item(0)
        var text = await file.text();
        this.loadlevel(text);
    }

    loadlevel(text){
        this.lvl = JSON.parse(text);
        this.cellsX = this.lvl.width;
        this.cellsY = this.lvl.height;

        console.log(this.lvl);

        this.init();
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

    drawTiles(){
        for(let row = 0; row < this.cellsY; row++){
            for(let col = 0; col < this.cellsX; col++){
                let currentCell = this.lvl.layers[0].data[row * this.cellsX + col];               

                this.drawCell(col, row, currentCell);
            }
        } 
    }

    drawCell(x,y,type){
        if(type == 1){ // Square
            this.ctx.fillStyle="#000";
            this.ctx.drawImage(this.loadedImages[0], x * this.pixelsPerCell, y * this.pixelsPerCell, this.pixelsPerCell, this.pixelsPerCell);
        }
        if(type == 2){ // Ground-right slope
            this.ctx.fillStyle="#000";
            this.ctx.drawImage(this.loadedImages[1], x * this.pixelsPerCell, y * this.pixelsPerCell, this.pixelsPerCell, this.pixelsPerCell);
        }
        if(type == 3){ // Ground-left slope
            this.ctx.fillStyle="#000";
            this.ctx.drawImage(this.loadedImages[2], x * this.pixelsPerCell, y * this.pixelsPerCell, this.pixelsPerCell, this.pixelsPerCell);
        }
        if(type == 4){ // Ceiling-right slope
            this.ctx.fillStyle="#000";
            this.ctx.drawImage(this.loadedImages[3], x * this.pixelsPerCell, y * this.pixelsPerCell, this.pixelsPerCell, this.pixelsPerCell);
        }
        if(type == 5){ // Ceiling-left slope
            this.ctx.fillStyle="#000";
            this.ctx.drawImage(this.loadedImages[4], x * this.pixelsPerCell, y * this.pixelsPerCell, this.pixelsPerCell, this.pixelsPerCell);
        }
        if(type == 6){ // Fire
            this.ctx.fillStyle="#00f";
            this.ctx.drawImage(this.loadedImages[12], x * this.pixelsPerCell, y * this.pixelsPerCell, this.pixelsPerCell, this.pixelsPerCell);
        }
        if(type == 7){ // Water
            this.ctx.fillStyle="#f00";
            this.ctx.drawImage(this.loadedImages[11], x * this.pixelsPerCell, y * this.pixelsPerCell, this.pixelsPerCell, this.pixelsPerCell);
        }
        if(type == 8){ // Slime
            this.ctx.fillStyle="#0f0";
            this.ctx.drawImage(this.loadedImages[13], x * this.pixelsPerCell, y * this.pixelsPerCell, this.pixelsPerCell, this.pixelsPerCell);
        }
    
    }

    startLoop() {
        if (this.running) return;
        this.running = true;

        const loop = () => {
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.drawGrid();
            this.drawTiles();
            
            this.ctx.fillStyle = 'red';
            this.ctx.beginPath();

            var snappedMousePos = this.getSnappedPosition(this.mouseX, this.mouseY);

            this.ctx.arc(snappedMousePos.x, snappedMousePos.y, 5, 0, Math.PI * 2);
            this.ctx.fill();

            $('p#hoveredcell').text(`x${this.hoveredCell.x} y${this.hoveredCell.y}`);

            requestAnimationFrame(loop);
        };

        loop();
    }

    getSnappedPosition(x, y){
        return {"x": (Math.floor(x/this.pixelsPerCell)*this.pixelsPerCell) + this.pixelsPerCell/2,
                "y": (Math.floor(y/this.pixelsPerCell)*this.pixelsPerCell) + this.pixelsPerCell/2
        };
    }

    get hoveredCell(){
        return {"x": Math.floor(this.mouseX/this.pixelsPerCell),
                "y": Math.floor(this.mouseY/this.pixelsPerCell)
        };
    }

    get width(){
        return this.cellsX * this.pixelsPerCell;
    }

    get height(){
        return this.cellsY * this.pixelsPerCell;
    }
}