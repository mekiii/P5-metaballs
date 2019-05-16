// Basile Pesin
// http://vertmo.github.io

// MetaBalls : p5.js implementation

let blob;
let yoff = 0;
let threshold = 400;

class Blob {

  constructor(x, y) {

    let angle = random(0, 2 * PI);
    this.xspeed = random(2, 5) * Math.cos(angle);
    this.yspeed = random(2, 5) * Math.sin(angle);
    this.r = random(100, 300);
    this.x = random(this.r, windowWidth - this.r);
    this.y = random(this.r, windowHeight - this.r);
  }

  update() {
    this.x += this.xspeed;
    this.y += this.yspeed;
    if (this.x > width || this.x < 0) this.xspeed *= -1;
    if (this.y > height || this.y < 0) this.yspeed *= -1;
  }

  show() {
    noStroke();
    fill(0,0.2);
    //ellipse(this.x, this.y, this.r);
    push();
    translate(this.x, this.y);
    beginShape();
    let xoff = 0;
    for (let a = 0; a < TWO_PI; a += 0.1) {
      let offset = map(noise(xoff, yoff), 0, 1, -25, 25);
      let r = this.r + offset;
      let x2 = r * cos(a);
      let y2 = r * sin(a);
      vertex(x2, y2);
      xoff += 0.2;
    }
    endShape();
    pop();
    yoff += 0.2;

  }
}

var blobs = []

function setup() {
  colorMode(RGB, 255, 255, 255, 1);
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  for (let i = 0; i < 4; i++) {
    blobs.push(new Blob(random(windowWidth), random(windowHeight)));
  };
}


function draw() {
  background(255);
  for (let w = 0; w < windowWidth; w += 10) {
    for (let h = 0; h < windowHeight; h += 10) {
      let sum = 0;
      for (let j = 0; j < blobs.length; j++) {
        let v1 = createVector(blobs[j].x, blobs[j].y)
        let v2 = createVector(w, h);
        let d = v1.dist(v2);
        sum += 150 * blobs[j].r / d;
        if (sum > threshold) {
          let color = map(sum, 0, sum, sum, 0);
          fill(color, 0.4);
          ellipse(w, h, 3, 3);
        }
      }
    }
  }

  for (let j = 0; j < blobs.length; j++) {
    blobs[j].show();
    blobs[j].update();
  }



}