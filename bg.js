var system, width, height;

function setup() {
    createCanvas(document.body.clientWidth, document.body.clientHeight);
    system = new LineSystem();
    width = document.body.clientWidth;
    height = document.body.clientHeight;
}

function draw() {
    background(255, 180, 0);
    system.addLine();
    system.run();
}

var Line = function(position) {
    this.length = random(2, 15);
    this.speed = random(-10, -2);
    this.lifespan = random(200, 400);
    this.velocity = createVector(this.speed, this.speed);
    var x = random(0, width);
    var y = -x * (2 * width / height) + 2 * width;
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