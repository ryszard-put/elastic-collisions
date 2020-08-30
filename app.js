const simulation = new Simulation();
const dom = new DOM();

const screen = {
  windowWidth: null,
  windowHeight: null,
  availableSize: null,
  updateSize: function (width, height) {
    this.windowWidth = width;
    this.windowHeight = height;
    this.availableSize = Math.min(width, height);
  },
};

let canvas = null;

function setup() {
  screen.updateSize(windowWidth, windowHeight);
  canvas = createCanvas(screen.availableSize, screen.availableSize);
  canvas.parent('canvas-div');
  frameRate(simulation.frameRate);
  dom.toggleLockdown();
}

function draw() {
  background(51);
  translate(0, screen.availableSize);
  scale(1, -1);
  if (simulation.running && !simulation.paused) {
    dom.updateStats();
    simulation.m--;
    if (!simulation.m) {
      simulation.stop();
      dom.toggleLockdown();
    }
  }

  for (i = 0; i < simulation.particles.length; i++) {
    if (!simulation.paused) {
      simulation.particles[i].update([...simulation.particles], i);
    }
    simulation.particles[i].draw();
  }
}

function windowResized() {
  screen.updateSize(windowWidth, windowHeight);
  resizeCanvas(screen.availableSize, screen.availableSize);
}
