/** Global variables **/
// {

let money = 0;
let places = 0;
let superCash = 0;

//}

/** Game classes **/
// {

class Crate {

    constructor (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.lvl = 1;
        this.money = 0;
    }

    draw () {
        fill(255, 0, 0);
        rect(this.x, this.y, this.w, this.h);
    }

}

class Worker {

    constructor (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.digging = false;
        this.carrying = false;
        this.money = 0;
    }

    update () {
        if (!this.digging && !this.carrying) {
            if (this.x < 300) {
                this.x++;
            }
        }
    }

    draw () {
        fill(0);
        rect(this.x, this.y, this.w, this.h);
    }

    display () {
        this.update();
        this.draw();
    }

}

class Elevator {

    constructor (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.loading = false;
        this.unloading = false;
        this.pageOut = false;
    }

    draw () {
        fill(0);
        rect(this.x, this.y, this.w, this.h);
    }

}

class Storehouse {

    constructor (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.money = 0;
    }

    draw () {
        fill(0);
        rect(this.x, this.y, this.w, this.h);
    }

}

class Carrier {

    constructor (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.loading = false;
        this.unloading = false;
    }

    draw () {
        fill(255);
        rect(this.x, this.y, this.w, this.h);
    }

}

class Warehouse {

    constructor (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    draw () {
        fill(0);
        rect(this.x, this.y, this.w, this.h);
    }

}

class Shaft {

    constructor (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.crate = new Crate(this.x + this.w / 20, this.y + this.h * 2 / 3, this.w / 6, this.h / 3);
        this.workersX = 0;
        this.numWorkers = 1;
        this.workers = [
            new Worker(this.x + this.workersX, this.y + this.h / 3, this.w / 10, this.h * 2 / 3),
            new Worker(this.x + this.workersX, this.y + this.h / 3, this.w / 10, this.h * 2 / 3),
            new Worker(this.x + this.workersX, this.y + this.h / 3, this.w / 10, this.h * 2 / 3),
            new Worker(this.x + this.workersX, this.y + this.h / 3, this.w / 10, this.h * 2 / 3),
            new Worker(this.x + this.workersX, this.y + this.h / 3, this.w / 10, this.h * 2 / 3),
            new Worker(this.x + this.workersX, this.y + this.h / 3, this.w / 10, this.h * 2 / 3)
        ];
        this.built = false;
        this.pageOut = false;
    }

    update () {}

    draw () {
        fill(255);
        rect(this.x, this.y, this.w, this.h);
        for (var i = 0; i < this.numWorkers; i++) {
            this.workers[i].display();
        }
        this.crate.draw();
    }

    display () {
        this.update();
        this.draw();
    }

}

class Barrier {

    constructor (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

}

class Mine {

    constructor () {
        this.y = 0;
        this.numShafts = 1;
        this.shafts = [
            new Shaft(150, this.y + 300, 300, 100),
            new Shaft(150, this.y + 450, 300, 100),
            new Shaft(150, this.y + 600, 300, 100),
            new Shaft(150, this.y + 750, 300, 100),
            new Shaft(150, this.y + 900, 300, 100),
            
            new Shaft(150, this.y + 1200, 300, 100),
            new Shaft(150, this.y + 1350, 300, 100),
            new Shaft(150, this.y + 1500, 300, 100),
            new Shaft(150, this.y + 1650, 300, 100),
            new Shaft(150, this.y + 1800, 300, 100),
            
            new Shaft(150, this.y + 2100, 300, 100),
            new Shaft(150, this.y + 2250, 300, 100),
            new Shaft(150, this.y + 2400, 300, 100),
            new Shaft(150, this.y + 2550, 300, 100),
            new Shaft(150, this.y + 2700, 300, 100),
            
            new Shaft(150, this.y + 3000, 300, 100),
            new Shaft(150, this.y + 3150, 300, 100),
            new Shaft(150, this.y + 3300, 300, 100),
            new Shaft(150, this.y + 3450, 300, 100),
            new Shaft(150, this.y + 3600, 300, 100),
            
            new Shaft(150, this.y + 3900, 300, 100),
            new Shaft(150, this.y + 4050, 300, 100),
            new Shaft(150, this.y + 4200, 300, 100),
            new Shaft(150, this.y + 4350, 300, 100),
            new Shaft(150, this.y + 4500, 300, 100),
            
            new Shaft(150, this.y + 4800, 300, 100),
            new Shaft(150, this.y + 4950, 300, 100),
            new Shaft(150, this.y + 5100, 300, 100),
            new Shaft(150, this.y + 5250, 300, 100),
            new Shaft(150, this.y + 5400, 300, 100),
        ];
        this.elevator = new Elevator();
        this.storeHouse = new Storehouse();
        this.warehouse = new Warehouse();
        this.numCarriers = 1;
        this.carriers = [
            
        ];
    }

    update () {
        if (keys[UP]) {
            this.y += 5;
            for (var i = 0; i < this.shafts.length; i++) {
                this.shafts[i].y += 5;
                this.shafts[i].crate.y += 5;
                for (var j = 0; j < this.shafts[i].workers.length; j++) {
                    this.shafts[i].workers[j].y += 5;
                }
            }
        }
        if (keys[DOWN]) {
            this.y -= 5;
            for (var i = 0; i < this.shafts.length; i++) {
                this.shafts[i].y -= 5;
                this.shafts[i].crate.y += 5;
                for (var j = 0; j < this.shafts[i].workers.length; j++) {
                    this.shafts[i].workers[j].y -= 5;
                }
            }
        }
    }

    draw () {
        background(135, 109, 47);
        for (var i = 0; i < this.numShafts; i++) {
            this.shafts[i].display();
        }
    }

    display () {
        this.update();
        this.draw();
    }

}

//}

/** Buttons **/
// {

class Button {

    constructor (x, y, w, h, txt, func) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.txt = txt;
        this.func = func;
        this.s = 3;
        this.mouseOver = false;
    }

    draw () {
        noStroke();
        pushMatrix();
            translate(this.x + this.w / 2, this.y + this.h / 2);
            scale(this.s);
            translate(-(this.x + this.w / 2), -(this.y + this.h / 2));
            fill(219, 243, 255);
            quad(this.x + 5, this.y, this.x + 95, this.y, this.x + 92, this.y + 3, this.x + 8, this.y + 3);
            fill(185, 227, 247);
            quad(this.x + 5, this.y, this.x + 8, this.y + 3, this.x + 4, this.y + 8, this.x, this.y + 7);
            quad(this.x + 95, this.y, this.x + 92, this.y + 3, this.x + 96, this.y + 8, this.x + this.w, this.y + 7);
            fill(150, 222, 255);
            beginShape();
                //vertex(this.x + 
            endShape();
            
            pushMatrix();
                translate(this.x + this.w / 2, this.y + this.h / 2);
                scale(this.w / 40, this.h / 20);
                translate(-(this.x + this.w / 2), -(this.y + this.h / 2));
                fill(0);
                textAlign(CENTER, CENTER);
                text(this.txt, this.x + this.w / 2, this.y + this.h / 2);
            popMatrix();
            
        popMatrix();
        
        if (this.mouseOver) {
            this.s = lerp(this.s, 1.2, 0.1);
        }
        else {
            this.s = lerp(this.s, 1, 0.1);
        }
        
        this.mouseOver = mouseX > this.x && mouseX < this.x + this.w &&
                         mouseY > this.y && mouseY < this.y + this.h;
    }

    clicked () {
        if (this.mouseOver) {
            this.func();
        }
    }

}

//}

/** Draw and mouseClicked functions **/
// {

function draw () {

    requestAnimationFrame(draw);

}

draw();

//}
