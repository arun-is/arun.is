var system;

function setup() {
    createCanvas(windowWidth, windowHeight);
    system = new LineSystem();
}

function draw() {
    background(255, 180, 0);
    system.addLine();
    system.run();
}

var Line = function(position) {
    this.length = random(5, 20);
    this.speed = random(-15, -1);
    this.lifespan = random(250, 500);
    this.velocity = createVector(this.speed, this.speed);
    var x = random(0, 2*windowWidth);
    var y = -x * (2 * windowWidth / windowHeight) + 2 * width;
    this.position = createVector(x, y);
};

Line.prototype.run = function() {
    this.update();
    this.display();
};

Line.prototype.update = function() {
    this.position.add(this.velocity);
    this.lifespan -= 2;
};

Line.prototype.display = function() {
    line(this.position.x, this.position.y, this.position.x - this.length, this.position.y - this.length);
};

Line.prototype.isDead = function() {
    if (this.lifespan < 0) {
        return true;
    } else {
        return false;
    }
};

var LineSystem = function(position) {
    this.lines = [];
};

LineSystem.prototype.addLine = function() {
    this.lines.push(new Line());
    this.lines.push(new Line());
};

LineSystem.prototype.run = function() {
    for (var i = this.lines.length - 1; i >= 0; i--) {
        var p = this.lines[i];
        p.run();
        if (p.isDead()) {
            this.lines.splice(i, 1);
        }
    }
};