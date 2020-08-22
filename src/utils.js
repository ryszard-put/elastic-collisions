function rand(min, max) {
  // <min, max) floating
  min = Math.ceil(min);
  max = Math.floor(max);
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
  let px = rand(
    environment.standardRadius,
    screen.availableSize - environment.standardRadius
  );
  let py = rand(
    environment.standardRadius,
    screen.availableSize - environment.standardRadius
  );
  let vx = rand(-environment.maxParticleSpeed, environment.maxParticleSpeed);
  let vy = rand(-environment.maxParticleSpeed, environment.maxParticleSpeed);
  let particle = new Particle(px, py, vx, vy);
  return particle;
}

function createSpecialParticle() {
  let px = environment.standardRadius;
  let py = environment.standardRadius;

  let vx = rand(0, environment.maxParticleSpeed);
  let vy = rand(0, environment.maxParticleSpeed);
  let particle = new Special(px, py, vx, vy);
  return particle;
}
