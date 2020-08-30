class Special extends Particle {
  constructor(...props) {
    super(...props);
    this.color = color(255, 0, 0);
    this.hitCount = 0;
    this.path = 0;
    this.paths = [];
  }

  get averagePath() {
    return this.paths.reduce((a, b) => a + b, 0) / this.paths.length || 0;
  }

  countAHit() {
    this.hitCount += 1;
  }

  update(particles, start) {
    // Odbicia ze ścianami
    this.colideWithWalls();
    // Odbicie z atomami
    this.colideWithAtoms(particles, start);
    // Aktualizacja pozycji
    this.position.add(
      // this.velocity.copy().multiplyScalar(1 / simulation.scale)
      this.velocity
    );

    // this.path += this.velocity.getMagnitude();
    this.path += pixelsToSpecialUnits(this.velocity.getMagnitude());
    return this;
  }
}
