endlessCanvas = true
document.getElementById("canvas-id").style.backgroundColor = "#FED2E2"

let colorPallete = ["#C68EFD", "#E9A5F1", "#8F87F1"]
let width = window.innerWidth, height = window.innerHeight

class Box{
    constructor(x1, y1, x2, y2){
        this.x1 = x1
        this.x2 = x2
        this.y1 = y1
        this.y2 = y2
        this.color = colorPallete[Math.floor(Math.random()*colorPallete.length)]
        
    }

    draw(){
        context.strokeStyle = "black"
        context.fillStyle = this.color
        context.beginPath()
        context.moveTo(this.x1, this.y1)
        context.lineTo(this.x1, this.y2)
        context.lineTo(this.x2, this.y2)
        context.lineTo(this.x2, this.y1)
        //context.stroke()
        context.fill()
    }

}

let box = new Box(width/2 - 100, height/2 - 100, width/2 + 100, height/2 + 100)

let light = {
    x: 0,
    y: 0,
    rad: 3,
    updateLight(){
        this.x = mouseX
        this.y = mouseY
    },
    drawLight(){  
        context.fillStyle = "orange"
        context.beginPath();
        context.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);
        context.fill();
    }
}


function update() {
    light.updateLight()
}

function draw() {
    box.draw()

    light.drawLight()
}

function keyup(key) {
    //console.log("Pressed", key);

}

function mouseup() {
    //console.log("Mouse clicked at", mouseX, mouseY);

}
