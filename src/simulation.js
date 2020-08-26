class Simulation {
  constructor() {
    this.paused = false;
    this.running = false;
    this.frameRate = 60;

    // Ustawienia projektu
    this.particles = [];
    this.mass = 1;
    this.maxVelocity = 2;
    this.particleAmount = null;
    this.baseRadius = 5;
    this.scale = 1;
    this.eta = null;
    this.m = null;
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
    this.particles.push(createSpecialParticle());
    for (let i = 0; i < this.particleAmount; i++) {
        newParticle = createRandomParticle();
        if (
          !this.particles.filter((particle) => newParticle.collision(particle))
            .length
        ) {
          break;
      } while (true);
      this.particles.push(newParticle);
    }
  }
    dom.toggleLockdown();
  }