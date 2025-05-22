/** Setup **/
// {

textFont(createFont("Times New Roman Bold"));

//}

/** Global variables **/
// {

var money = 9;
var places = 2;
var superCash = 0;

//}

/** User interaction **/
// {

var keys = [];
keyPressed = function () {
    keys[keyCode] = true;
};
keyReleased = function () {
    keys[keyCode] = false;
};

//}

/** Crate **/
// {

var Crate = function (x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.lvl = 1;
    this.money = 0;
};
    Crate.prototype.draw = function () {
        fill(255, 0, 0);
        rect(this.x, this.y, this.w, this.h);
    };

//}

/** Worker **/
// {

var Worker = function (x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.digging = false;
    this.carrying = false;
    this.money = 0;
};
    Worker.prototype.update = function () {
        if (!this.digging && !this.carrying) {
            if (this.x < 300) {
                this.x++;
            }
        }
    };
    Worker.prototype.draw = function () {
        fill(0);
        rect(this.x, this.y, this.w, this.h);
    };
    Worker.prototype.display = function () {
        this.update();
        this.draw();
    };

//}

// Ignore these for now {

/** Elevator **/
// {

var Elevator = function (x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.loading = false;
    this.unloading = false;
    this.pageOut = false;
};
    Elevator.prototype.draw = function () {
        fill(0);
        rect(this.x, this.y, this.w, this.h);
    };
    
//}

/** Storehouse **/
// {

var Storehouse = function (x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.money = 0;
};
    Storehouse.prototype.draw = function () {
        fill(0);
        rect(this.x, this.y, this.w, this.h);
    };
    
//}

/** Carrier **/
// {

var Carrier = function (x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.loading = false;
    this.unloading = false;
};
    Carrier.prototype.draw = function () {
        fill(255);
        rect(this.x, this.y, this.w, this.h);
    };

//}

/** Warehouse **/
// {

var Warehouse = function (x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
};
    Warehouse.prototype.draw = function () {
        fill(0);
        rect(this.x, this.y, this.w, this.h);
    };

//}

//}

/** Shaft **/
// {

var Shaft = function (x, y, w, h) {
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
};
    Shaft.prototype.update = function () {};
    Shaft.prototype.draw = function () {
        fill(255);
        rect(this.x, this.y, this.w, this.h);
        for (var i = 0; i < this.numWorkers; i++) {
            this.workers[i].display();
        }
        this.crate.draw();
    };
    Shaft.prototype.display = function () {
        this.update();
        this.draw();
    };

//}

/** Barrier **/
// {

var Barrier = function (x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
};

//}

/** Mine **/
// {

var Mine = function () {
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
};
    Mine.prototype.update = function () {
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
    };
    Mine.prototype.draw = function () {
        background(135, 109, 47);
        for (var i = 0; i < this.numShafts; i++) {
            this.shafts[i].display();
        }
    };
    Mine.prototype.display = function () {
        this.update();
        this.draw();
    };

//}

/** Mines **/
// {

var coalMine = new Mine();

//}

/** Text box (for displaying money) **/
// {

var textBox = function (x, y, w, h, subject) {
    noStroke();
    fill(38, 147, 255);
    rect(x, y, w, h);
    fill(255, 255, 0);
    quad(x, y, x + w / 20, y + h / 10, x + w / 20, y + h * 9 / 10, x, y + h);
    quad(x + w * 19 / 20, y + h / 10, x + w * 19 / 20, y + h * 9 / 10, x + w * 9 / 10, y + h * 4 / 5, x + w * 9 / 10, y + h / 5);
    fill(245, 245, 0);
    quad(x, y, x + w, y, x + w * 19 / 20, y + h / 10, x + w / 20, y + h / 10);
    quad(x + w / 20, y + h * 9 / 10, x + w * 19 / 20, y + h * 9 / 10, x + w * 9 / 10, y + h * 4 / 5, x + w / 10, y + h * 4 / 5);
    fill(235, 235, 0);
    quad(x, y + h, x + w, y + h, x + w * 19 / 20, y + h * 9 / 10, x + w / 20, y + h * 9 / 10);
    quad(x + w / 20, y + h / 10, x + w * 19 / 20, y + h / 10, x + w * 9 / 10, y + h / 5, x + w / 10, y + h / 5);
    fill(225, 225, 0);
    quad(x + w, y, x + w, y + h, x + w * 19 / 20, y + h * 9 / 10, x + w * 19 / 20, y + h / 10);
    quad(x + w / 20, y + h / 10, x + w / 20, y + h * 9 / 10, x + w / 10, y + h * 4 / 5, x + w / 10, y + h / 5);
    
    pushMatrix();
        translate(x, y);
        scale(w * 0.013, h * 0.026);
        translate(-x, -y);
        fill(255);
        if (subject === "money") {
            if (money < 1000) {
                text("$" + money, 300 + 8, 300 + 23);
            }
            else if (money < 1000000) {
                text("$" + (money / 1000).toFixed(places) + "K", 300 + 8, 300 + 23);
            }
            else if (money < pow(1000, 3)) {
                text("$" + (money / 1000000).toFixed(places) + "M", 300 + 8, 300 + 23);
            }
            else if (money < pow(1000, 4)) {
                text("$" + (money / pow(1000, 3)).toFixed(places) + "B", 300 + 8, 300 + 23);
            }
            else if (money < pow(1000, 5)) {
                text("$" + (money / pow(1000, 4)).toFixed(places) + "T", 300 + 8, 300 + 23);
            }
            else if (money < pow(1000, 6)) {
                text("$" + (money / pow(1000, 5)).toFixed(places) + "aa", 300 + 8, 300 + 23);
            }
            else if (money < pow(1000, 7)) {
                text("$" + (money / pow(1000, 6)).toFixed(places) + "ab", 300 + 8, 300 + 23);
            }
            else if (money < pow(1000, 8)) {
                text("$" + (money / pow(1000, 7)).toFixed(places) + "ac", 300 + 8, 300 + 23);
            }
            else if (money < pow(1000, 9)) {
                text("$" + (money / pow(1000, 8)).toFixed(places) + "ad", 300 + 8, 300 + 23);
            }
            else if (money < pow(1000, 10)) {
                text("$" + (money / pow(1000, 9)).toFixed(places) + "ae", 300 + 8, 300 + 23);
            }
            else if (money < pow(1000, 11)) {
                text("$" + (money / pow(1000, 10)).toFixed(places) + "af", 300 + 8, 300 + 23);
            }
            else if (money < pow(1000, 12)) {
                text("$" + (money / pow(1000, 11)).toFixed(places) + "ag", 300 + 8, 300 + 23);
            }
            else if (money < pow(1000, 13)) {
                text("$" + (money / pow(1000, 12)).toFixed(places) + "ah", 300 + 8, 300 + 23);
            }
            else if (money < pow(1000, 14)) {
                text("$" + (money / pow(1000, 13)).toFixed(places) + "ai", 300 + 8, 300 + 23);
            }
            else if (money < pow(1000, 15)) {
                text("$" + (money / pow(1000, 14)).toFixed(places) + "aj", 300 + 8, 300 + 23);
            }
            else if (money < pow(1000, 16)) {
                text("$" + (money / pow(1000, 15)).toFixed(places) + "ak", 300 + 8, 300 + 23);
            }
            else if (money < pow(1000, 17)) {
                text("$" + (money / pow(1000, 16)).toFixed(places) + "al", 300 + 8, 300 + 23);
            }
            else if (money < pow(1000, 18)) {
                text("$" + (money / pow(1000, 17)).toFixed(places) + "am", 300 + 8, 300 + 23);
            }
            else if (money < pow(1000, 19)) {
                text("$" + (money / pow(1000, 18)).toFixed(places) + "an", 300 + 8, 300 + 23);
            }
            else if (money < pow(1000, 20)) {
                text("$" + (money / pow(1000, 19)).toFixed(places) + "ao", 300 + 8, 300 + 23);
            }
            else if (money < pow(1000, 21)) {
                text("$" + (money / pow(1000, 20)).toFixed(places) + "ap", 300 + 8, 300 + 23);
            }
            else if (money < pow(1000, 22)) {
                text("$" + (money / pow(1000, 21)).toFixed(places) + "aq", 300 + 8, 300 + 23);
            }
            else if (money < pow(1000, 23)) {
                text("$" + (money / pow(1000, 22)).toFixed(places) + "ar", 300 + 8, 300 + 23);
            }
            else if (money < pow(1000, 24)) {
                text("$" + (money / pow(1000, 23)).toFixed(places) + "as", 300 + 8, 300 + 23);
            }
            else if (money < pow(1000, 25)) {
                text("$" + (money / pow(1000, 24)).toFixed(places) + "at", 300 + 8, 300 + 23);
            }
        }
        else if (subject === "super cash") {
            text("💵" + superCash, x + 8, y + 23);
        }
    popMatrix();
};

//}

/** Buttons **/
// {

var Button = function (x, y, w, h, txt, func) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.txt = txt;
    this.func = func;
    this.s = 3;
    this.mouseOver = false;
    this.draw = function () {
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
    };
    this.clicked = function () {
        if (this.mouseOver) {
            this.func();
        }
    };
};

var upgradeButton = new Button(100, 300, 100, 50, "Build", function () {
    println("CLICKED");
});

//}

/** Draw and mouseClicked functions **/
// {

draw = function () {
    background(255);
    coalMine.display();
};
mouseClicked = function () {
    upgradeButton.clicked();
};

//}
