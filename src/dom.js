const startButton = document.querySelector('.settings #start-simulation');
const pauseButton = document.querySelector('.settings #pause-simulation');
const stopButton = document.querySelector('.settings #stop-simulation');

const optionInputs = document.querySelectorAll('.settings .option_input');

const n = document.querySelector('.settings #particle_amount');

const etas = [
  document.querySelector('.settings #eta_h'),
  document.querySelector('.settings #eta_l'),
];

etas.forEach((eta) => {
  eta.addEventListener('input', (e) => {
    etas[0].value = Math.floor(Math.max(20, +e.target.value));
    etas[1].value = Math.floor(Math.max(20, +e.target.value));
    n.value = Math.floor(
      Math.max(0, Math.min(+n.value, (+e.target.value) ** 2 / 4))
    );
  });
});

n.addEventListener(
  'input',
  () =>
    (n.value = Math.floor(
      Math.max(0, Math.min(+n.value, (+etas[0].value) ** 2 / 4))
    ))
);

window.addEventListener(
  'keypress',
  (e) => e.code === 'Space' && simulation.pause()
);

startButton.addEventListener('click', () => {
  simulation.start({
    amount: +document.querySelector('.settings #particle_amount').value,
    eta: +document.querySelector('.settings #eta_h').value,
  });

  optionInputs.forEach((input) => (input.disabled = true));
});

stopButton.addEventListener('click', () => {
  simulation.stop();
  optionInputs.forEach((input) => (input.disabled = false));
});

pauseButton.addEventListener('click', () => simulation.pause());

function updateInterface() {
  if (simulation.running) {
    startButton.disabled = true;
    pauseButton.disabled = false;
    stopButton.disabled = false;
  } else {
    startButton.disabled = false;
    pauseButton.disabled = true;
    stopButton.disabled = true;
  }
}

function updateMeta() {
  // Update Time
  let { seconds, minutes, hours } = timeFromFrames({
    frameRate: simulation.frameRate,
    frames: simulation.framesElapsed,
  });
  document.querySelector('#timeElapsed').value = `${String(hours).padStart(
    2,
    '0'
  )}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Update Hit Count
  document.querySelector('#hitCount').value = environment.particles[0].hitCount;
}
