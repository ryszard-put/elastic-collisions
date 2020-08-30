class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getMagnitude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  setMagnitude(magnitude) {
    if (this.getMagnitude()) {
      this.x = (this.x / this.getMagnitude()) * magnitude;
      this.y = (this.y / this.getMagnitude()) * magnitude;
    }
    return this;
  }

  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
    return this;
  }

  sub(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
  }

  distanceTo(vector) {
    return Math.sqrt(
      Math.pow(Math.abs(this.x - vector.x), 2) +
        Math.pow(Math.abs(this.y - vector.y), 2)
    );
  }

  copy() {
    return new Vector(this.x, this.y);
  }

  dotProduct(vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  multiplyScalar(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }
}

function addVectors(a, b) {
  return new Vector(a.x + b.x, a.y + b.y);
}

function subVectors(a, b) {
  return new Vector(a.x - b.x, a.y - b.y);
}
