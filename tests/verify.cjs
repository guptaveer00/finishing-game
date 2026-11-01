// Run with Node.js: node tests/verify.cjs. No external packages required.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const elements = {};
const sandbox = vm.createContext({
  window: { addEventListener() {} },
  document: { getElementById(id) {
    return elements[id] ||= { getContext() { return {}; }, textContent: '', addEventListener() {}, setAttribute() {} };
  } },
  requestAnimationFrame() {},
});
for (const name of ['config', 'input', 'levels', 'player', 'physics', 'renderer', 'sound', 'game']) {
  const file = path.join(__dirname, '..', 'js', name + '.js');
  vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: file });
}
const results = vm.runInContext(`(() => {
  const results = [];
  const check = (ok, label) => { if (!ok) throw Error(label); results.push(label); };
  const tick = n => { for (let i = 0; i < n; i++) updateGame(1 / 120); };
  const flip = () => { gravitySwitchRequested = true; tick(1); };
  const move = x => {
    let limit = 1500, level = gameState.currentLevelIndex;
    while (Math.abs(gameState.player.x - x) > 2 && limit-- > 0 && gameState.currentLevelIndex === level && !gameState.hasWon) {
      heldKeys.clear(); heldKeys.add(gameState.player.x < x ? KEY_RIGHT : KEY_LEFT); tick(1);
    }
    heldKeys.clear();
    if (limit <= 0) throw Error('Route blocked at ' + JSON.stringify(gameState.player));
  };
  loadLevel(0); gameState.player.x = 735; tick(1);
  check(gameState.currentLevelIndex === 0, 'Locked exit does not complete a level');
  loadLevel(0); flip(); tick(90); move(540);
  check(gameState.isExitUnlocked, 'Collecting the key unlocks exit');
  flip(); tick(100); move(735);
  check(gameState.currentLevelIndex === 1, 'Level 1 has a full movement-based route');
  loadLevel(1); gameState.player.x = 210; tick(1);
  check(gameState.player.x === 60 && gameState.remainingKeys.length === 1, 'Spike resets player and keys');
  flip(); tick(90); move(290); move(355); flip(); tick(100); move(530); flip(); tick(100); move(590); flip(); tick(100); move(735);
  check(gameState.currentLevelIndex === 2, 'Level 2 has a full movement-based route');
  flip(); tick(100); move(310);
  check(gameState.remainingKeys.length === 1, 'Multiple keys collect independently');
  move(420); flip(); tick(100);
  check(gameState.isExitUnlocked, 'All keys required to unlock final exit');
  move(530); flip(); tick(100); flip(); tick(20); move(735); tick(100); flip(); tick(100);
  check(gameState.currentLevelIndex === 3 && !gameState.hasWon, 'Level 3 advances instead of ending early');
  flip(); tick(100); move(300); move(370); flip(); tick(100); move(500); move(550); flip(); tick(100); move(720);
  check(gameState.isExitUnlocked, 'Level 4 collects three keys');
  move(550); flip(); tick(100); move(370); flip(); tick(100); move(130); flip(); tick(100); move(60);
  check(gameState.currentLevelIndex === 4, 'Level 4 outbound and return route');
  flip(); tick(100); move(300); move(370); flip(); tick(100); move(500);
  flip(); tick(100);
  check(gameState.remainingKeys.length === 1, 'Level 5 requires its floor detour key');
  flip(); tick(100); move(550); flip(); tick(100); move(720);
  check(gameState.isExitUnlocked, 'Level 5 collects four keys');
  move(550); flip(); tick(100); move(370); flip(); tick(100); move(130); flip(); tick(100); move(60);
  check(gameState.currentLevelIndex === 5, 'Level 5 upside-down return route');
  move(130); flip(); tick(100); move(300); move(370); flip(); tick(100); move(500); move(550); flip(); tick(100); move(720);
  check(gameState.isExitUnlocked, 'Level 6 collects four keys across hazards');
  move(550); flip(); tick(100); move(370); flip(); tick(100); move(130); flip(); tick(100); move(60);
  check(gameState.hasWon && gameState.currentLevelIndex === 5, 'Level 6 return route reaches final victory');
  const wonX = gameState.player.x; heldKeys.add(KEY_LEFT); flip(); tick(20); heldKeys.clear();
  check(gameState.player.x === wonX, 'Victory stops player movement');
  restartRequested = true; tick(1);
  check(gameState.currentLevelIndex === 0 && !gameState.hasWon, 'R replays from victory');
  loadLevel(2); gameState.remainingKeys = []; restartRequested = true; tick(1);
  check(gameState.remainingKeys.length === 2 && LEVELS[2].keys.length === 2, 'Restart restores keys without mutating level data');
  const thin = { solids: [{ x: 0, y: 150, width: 800, height: 2 }] };
  const p = createPlayer({ x: 100, y: 100 }, GRAVITY_DOWN); p.velocityY = 1200;
  updatePlayerPhysics(p, thin, 0, 1 / 30);
  check(p.y <= 114, 'Fast fall does not skip a thin platform');
  const calls = [];
  soundEnabled = true;
  audioContext = {
    state: 'running', currentTime: 0, destination: {},
    createOscillator() { return { frequency: { setValueAtTime() {}, exponentialRampToValueAtTime() {} }, connect() {}, start() { calls.push('start'); }, stop() {} }; },
    createGain() { return { gain: { setValueAtTime() {}, exponentialRampToValueAtTime() {} }, connect() {} }; },
  };
  playGameSound('flip'); playGameSound('complete');
  check(calls.length === 2, 'Both sound cues schedule when enabled');
  return results;
})()`, sandbox);
for (const result of results) console.log('PASS: ' + result);
module.exports = results;
