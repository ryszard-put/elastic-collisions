class DOM {
  constructor() {
    // Settings

    this.startButton = document.querySelector('.settings #start-simulation');
    this.pauseButton = document.querySelector('.settings #pause-simulation');
    this.stopButton = document.querySelector('.settings #stop-simulation');

    this.optionInputs = document.querySelectorAll('.settings .option_input');

    this.particleAmount = document.querySelector('.settings #particle_amount');
    this.frameAmount = document.querySelector('.settings #frames');

    this.etaH = document.querySelector('.settings #eta_h');
    this.etaL = document.querySelector('.settings #eta_l');

    // Stats

    this.maxVelocity = document.querySelector('.stats #max_velocity');
    this.timeElapsed = document.querySelector('.stats #time_elapsed');
    this.hitCount = document.querySelector('.stats #hit_count');
    this.averagePath = document.querySelector('.stats #average_path');
    this.containerSize = document.querySelector('.stats #container_size');
    this.hitsPerTime = document.querySelector('.stats #hits_per_time');
    this.currentFreePath = document.querySelector('.stats #curr_free_path');

    // Listeners

    this.startButton.addEventListener('click', () => {
      this.updateToScale(+this.etaH.value / 20);
      simulation.start();
    });

    this.stopButton.addEventListener('click', () => simulation.stop());

    this.pauseButton.addEventListener('click', () => simulation.pause());

    this.particleAmount.addEventListener('input', () =>
      this.updateToScale(+this.etaH.value / 20)
    );

    this.frameAmount.addEventListener(
      'input',
      (e) => (e.target.value = Math.max(10, +e.target.value))
    );

    // Sync of etas etc
    [this.etaH, this.etaL].forEach((eta) => {
      eta.addEventListener('input', (e) =>
        this.updateToScale(+e.target.value / 20)
      );
    });

    // Pause on space
    window.addEventListener(
      'keypress',
      (e) => e.code === 'Space' && simulation.pause()
    );
  }

  toggleLockdown() {
    if (simulation.running) {
      this.startButton.disabled = true;
      this.pauseButton.disabled = false;
      this.stopButton.disabled = false;
      this.optionInputs.forEach((input) => (input.disabled = true));
    } else {
      this.startButton.disabled = false;
      this.pauseButton.disabled = true;
      this.stopButton.disabled = true;
      this.optionInputs.forEach((input) => (input.disabled = false));
    }
  }

  updateToScale(scale) {
    // Update Simulation and DOM on eta change

    // scale = scale >= 5 ? 5 : Math.max(1, scale);
    scale = Math.min(5, Math.max(1, scale));
    let eta = scale * 20;
    let velocity = simulation.frameRate / eta;
    let containerSize = scale * 200;
    let particleAmount = Math.floor(
      Math.max(0, Math.min(+this.particleAmount.value, eta ** 2 / 4))
    );

    // update DOM
    this.etaH.value = eta;
    this.etaL.value = eta;
    this.particleAmount.value = particleAmount;
    this.maxVelocity.value = velocity.toFixed(4);
    this.containerSize.value = containerSize.toFixed(0);

    // update Simulation
    simulation.scale = scale;
    simulation.maxVelocity = velocity;
    simulation.particleAmount = particleAmount;
    simulation.eta = eta;
    simulation.m = +this.frameAmount.value;
    simulation.initialM = +this.frameAmount.value;
  }

  updateStats() {
    // Update DOM each Frame
    this.hitsPerTime.value =
      (
        simulation.particles[0].hitCount /
        ((simulation.initialM - simulation.m) / simulation.frameRate)
      ).toFixed(4) || '-';
    this.timeElapsed.value = `${simulation.m - 1} (${(
      (simulation.m - 1) /
      simulation.frameRate
    ).toFixed(1)})`;
    this.hitCount.value = simulation.particles[0].hitCount;
    this.averagePath.value = !simulation.particles[0].paths.length
      ? simulation.particles[0].path.toFixed(2)
      : simulation.particles[0].averagePath
      ? simulation.particles[0].averagePath.toFixed(2)
      : '-';

    this.currentFreePath.value = simulation.particles[0].path.toFixed(2);
  }
}
