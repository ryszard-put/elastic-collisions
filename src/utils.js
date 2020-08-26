function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function timeFromFrames({ frameRate, frames }) {
  let seconds = Math.floor(frames / frameRate);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  return {
    seconds: seconds % 60,
    minutes: minutes % 60,
    hours,
  };
}

function createRandomParticle() {
  let px = rand(simulation.radius, screen.availableSize - simulation.radius);
  let py = rand(simulation.radius, screen.availableSize - simulation.radius);
  let vx = rand(-simulation.maxVelocity, simulation.maxVelocity);
  let vy = rand(-simulation.maxVelocity, simulation.maxVelocity);
  let particle = new Particle(px, py, vx, vy);
  return particle;
}

function createSpecialParticle() {
  let px = simulation.radius;
  let py = simulation.radius;

  // let vx = rand(0, simulation.maxVelocity);
  // let vy = rand(0, simulation.maxVelocity);
  let vx = (vy = simulation.maxVelocity);
  let particle = new Special(px, py, vx, vy);
  return particle;
}

function pixelsToSpecialUnits(pixels) {
  return (pixels / screen.availableSize) * dom.containerSize;
}
