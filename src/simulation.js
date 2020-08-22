class Simulation {
  constructor() {
    this.paused = false;
    this.running = false;
    this.frameRate = 60;
    this.framesElapsed = 0;
  }

  pause() {
    this.paused = !this.paused;
    updateInterface();
  }

  clear() {
    environment.particles = [];
    this.running = false;
    this.paused = false;
    this.framesElapsed = 0;
    updateInterface();
  }

  stop() {
    this.clear();
  }

  start({ amount, eta }) {
    this.clear();
    this.running = true;
    environment.maxParticleAmount = amount;
    environment.eta = eta;
    environment.standardRadius = screen.availableSize / eta / 2;
    environment.particles.push(createSpecialParticle());
    for (let i = 0; i < environment.maxParticleAmount; i++) {
      let newParticle;
      do {
        newParticle = createRandomParticle();
        if (
          !environment.particles.filter((particle) =>
            newParticle.collision(particle)
          ).length
        )
          break;
      } while (true);
      environment.particles.push(newParticle);
    }
    updateInterface();
  }
}
