class Special extends Particle {
  constructor(...props) {
    super(...props);
    this.color = color(255, 0, 0);
    this.hitCount = 0;
  }

  countAHit() {
    this.hitCount += 1;
  }
}
