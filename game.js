﻿endlessCanvas = true
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

class Line{
    constructor(x1, y1, x2, y2){
        this.x1 = x1
        this.x2 = x2
        this.y1 = y1
        this.y2 = y2
        this.color = colorPallete[Math.floor(Math.random()*colorPallete.length)]
        
    }

    draw(){
        context.strokeStyle = "black"
        //context.fillStyle = this.color
        context.beginPath()
        context.moveTo(this.x1, this.y1)
        context.lineTo(this.x2, this.y2)
        context.stroke()
        //context.fill()
    }
}

//let box = new Box(width/2 - 100, height/2 - 100, width/2 + 100, height/2 + 100)

//let line = new Line(400, 600, 800, 650)
let lines = [new Line(400, 100, 1000, 550), new Line(400, 100, 200, 700), new Line(400, 600, 800, 650)]

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

let angles = [], rayDistance = 300

for(let i = 0; i < 360; i ++){
    let alpha = (i * Math.PI) / 180 // Get radians from degrees
    angles.push(alpha) 
    console.log(i, angles[i])
}

function getIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
    // Check if any of the lines have zero length
    if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
        return null;
    }

    let denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

    // Check if lines are parallel
    if (denominator === 0) {
        return null;
    }

    let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
    let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

    // Check if intersection is within the segments
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
        return null;
    }

    // Calculate the intersection point
    let x = x1 + ua * (x2 - x1);
    let y = y1 + ua * (y2 - y1);

    return { x, y };
}

function update() {
    light.updateLight()
}

function draw() {
    //box.draw()
    //line.draw()
    for(let i = 0; i < lines.length; i ++){
        lines[i].draw()
    }

    light.drawLight()

    for (let i = 0; i < angles.length; i++) {
        let rayDirectionX = Math.cos(angles[i]);
        let rayDirectionY = Math.sin(angles[i]);

        let rayEndX = light.x + rayDirectionX * rayDistance;
        let rayEndY = light.y + rayDirectionY * rayDistance;

        let closestIntersection = null;
        let minDistance = rayDistance;

        // Loop through ALL lines to find the closest intersection
        for (let j = 0; j < lines.length; j++) {
            let intersection = getIntersection(
                light.x, light.y, rayEndX, rayEndY, // Ray start and end
                lines[j].x1, lines[j].y1, lines[j].x2, lines[j].y2 // Line segment start and end
            );

            if (intersection) {
                let distance = Math.sqrt(
                    (intersection.x - light.x) ** 2 + (intersection.y - light.y) ** 2
                );

                if (distance < minDistance) {
                    minDistance = distance;
                    closestIntersection = intersection;
                }
            }
        }

        // Draw the ray up to the intersection point
        context.strokeStyle = "yellow";
        context.beginPath();
        context.moveTo(light.x, light.y);

        if (closestIntersection) {
            context.lineTo(closestIntersection.x, closestIntersection.y);
        } else {
            context.lineTo(rayEndX, rayEndY);
        }

        context.stroke();
    }
}

function keyup(key) {
    //console.log("Pressed", key);

}

function mouseup() {
    //console.log("Mouse clicked at", mouseX, mouseY);

}