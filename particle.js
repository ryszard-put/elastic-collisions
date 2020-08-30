class Particle {
  constructor(px, py, vx, vy) {
    this.position = new Vector(px, py); // wektor położenia
    this.velocity = new Vector(vx, vy); // wektor prędkości
    this.mass = simulation.mass;
    this.radius = simulation.radius;
    this.color = color(0, 0, 255);
  }

  draw() {
    fill(this.color);
    circle(this.position.x, this.position.y, this.radius * 2);
    stroke(0, 0, 0);
    return this;
  }

  update(particles, start) {
    // Odbicia ze ścianami
    this.colideWithWalls();
    // Odbicie z atomami
    this.colideWithAtoms(particles, start);
    // Aktualizacja pozycji
    this.position.add(this.velocity);
    return this;
  }

  colideWithWalls() {
    if (
      this.position.x + this.radius - simulation.tolerance >=
      screen.availableSize
    ) {
      this.position.x = screen.availableSize - this.radius;
      this.velocity.x *= -1;
    }
    if (this.position.x - this.radius + simulation.tolerance < 0) {
      this.position.x = this.radius;
      this.velocity.x *= -1;
    }
    if (
      this.position.y + this.radius - simulation.tolerance >=
      screen.availableSize
    ) {
      this.position.y = screen.availableSize - this.radius;
      this.velocity.y *= -1;
    }
    if (this.position.y - this.radius + simulation.tolerance < 0) {
      this.position.y = this.radius;
      this.velocity.y *= -1;
    }
  }

  colideWithAtoms(particles, start) {
    for (let i = start + 1; i < particles.length; i++) {
      // let A = this.position.copy().add(this.velocity);
      // let B = other.position.copy().add(other.velocity);
      // if (A.distanceTo(B) <= A.radius + B.radius + 1 / 10) {
      let other = particles[i];
      if (
        // this.position.distanceTo(other.position) <
        // this.radius + other.radius
        this.collision(other)
      ) {
        var res = new Vector(
          this.velocity.x - other.velocity.x,
          this.velocity.y - other.velocity.y
        );

        if (
          res.x * (other.position.x - this.position.x) +
            res.y * (other.position.y - this.position.y) >=
          0
        ) {
          if (this instanceof Special) {
            this.countAHit();
            this.paths.push(this.path);
            this.path = 0;
          }
          if (other instanceof Special) {
            other.countAHit();
            other.paths.push(other.path);
            other.path = 0;
          }
          let parallelAxisA = new Vector(
            other.position.x - this.position.x,
            other.position.y - this.position.y
          );
          let parallelVelocityA = parallelAxisA
            .copy()
            .multiplyScalar(
              this.velocity.dotProduct(parallelAxisA) /
                parallelAxisA.getMagnitude() ** 2
            );
          let orthagonalVelocityA = this.velocity.copy().sub(parallelVelocityA);
          let parallelAxisB = parallelAxisA.copy().multiplyScalar(-1);
          let parallelVelocityB = parallelAxisB
            .copy()
            .multiplyScalar(
              other.velocity.dotProduct(parallelAxisB) /
                parallelAxisB.getMagnitude() ** 2
            );
          let orthagonalVelocityB = other.velocity
            .copy()
            .sub(parallelVelocityB);
          this.velocity = orthagonalVelocityA.copy().add(parallelVelocityB);
          other.velocity = orthagonalVelocityB.copy().add(parallelVelocityA);
        }
      }
    }
  }

  collision(particle) {
    return (
      this.position.distanceTo(particle.position) <=
      2 * simulation.radius + simulation.tolerance
    );
  }
}
