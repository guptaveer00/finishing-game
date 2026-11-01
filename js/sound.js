// Small synthesized cues, enabled only after the player opts in.
let soundEnabled = false;
let audioContext = null;
const soundToggle = document.getElementById("sound-toggle");
soundToggle.addEventListener("click", () => {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    soundToggle.textContent = "Sound unavailable";
    return;
  }
  try {
    if (!audioContext) audioContext = new AudioContextClass();
    soundEnabled = !soundEnabled;
    if (soundEnabled) audioContext.resume().catch(() => {});
    soundToggle.textContent = `Sound: ${soundEnabled ? "on" : "off"}`;
    soundToggle.setAttribute("aria-pressed", String(soundEnabled));
  } catch (_) {
    soundEnabled = false;
    soundToggle.textContent = "Sound unavailable";
  }
});

function playGameSound(kind) {
  if (!soundEnabled || !audioContext || audioContext.state !== "running") return;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const start = audioContext.currentTime;
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(kind === "flip" ? 320 : 660, start);
  oscillator.frequency.exponentialRampToValueAtTime(kind === "flip" ? 640 : 990, start + 0.12);
  gain.gain.setValueAtTime(0.06, start);
  gain.gain.exponentialRampToValueAtTime(0.001, start + 0.16);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(start);
  oscillator.stop(start + 0.17);
}
