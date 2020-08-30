class Simulation {
  constructor() {
    this.paused = false;
    this.running = false;
    this.frameRate = 60;

    // Ustawienia projektu
    this.particles = [];
    this.mass = 1;
    this.maxVelocity = null;
    this.particleAmount = null;
    this.radius = null;
    this.scale = 1;
    this.eta = null;
    this.m = null;
    this.initialM = null;
    this.tolerance = null;
  }

  pause() {
    this.paused = !this.paused;
    dom.toggleLockdown();
  }

  clear() {
    this.running = false;
    this.paused = false;
    this.particles = [];
    dom.toggleLockdown();
  }

  stop() {
    this.clear();
  }

  start() {
    this.running = true;
    this.radius = screen.availableSize / 40 / this.scale;
    this.tolerance = this.radius / 10;
    this.particles.push(createSpecialParticle());
    let newParticle;
    for (let i = 0; i < this.particleAmount; i++) {
      do {
        newParticle = createRandomParticle();
        if (
          !this.particles.filter((particle) => newParticle.collision(particle))
            .length
        )
          break;
      } while (true);
      this.particles.push(newParticle);
    }
    dom.toggleLockdown();
  }
}
