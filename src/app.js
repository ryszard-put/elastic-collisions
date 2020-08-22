const environment = {
  particles: [],
  mass: 1,
  maxParticleSpeed: 4,
  maxParticleAmount: 300,
  standardRadius: 10,
};

environment.collisionTolerance = environment.standardRadius * 0.1;

const simulation = new Simulation();

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
  updateInterface();
  frameRate(simulation.frameRate);
  // let A = new Particle(190, 200, 0, 1, false);
  // let B = new Particle(210, 800, 0, -1, false);
  // environment.particles.push(A);
  // environment.particles.push(B);
  // A.parallelAndPerpendicular(B);
}

function draw() {
  background(51);
  translate(0, screen.availableSize);
  scale(1, -1);
  if (simulation.running && !simulation.paused) {
    updateMeta();
    simulation.framesElapsed++;
  }

  // for (let i = 0; i < environment.particles.length; i++) {
  //   for (let j = i + 1; j < environment.particles.length; j++) {
  //     let A = environment.particles[i];
  //     let B = environment.particles[j];
  //     if (A.collision(B)) A.colide(B);
  //   }
  // }
  for (i = 0; i < environment.particles.length; i++) {
    if (!simulation.paused)
      environment.particles[i].update([...environment.particles], i);
    environment.particles[i].draw();
  }
}

function windowResized() {
  screen.updateSize(windowWidth, windowHeight);
  resizeCanvas(screen.availableSize, screen.availableSize);
}
