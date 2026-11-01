// game.js
// Entry point: holds the game state, loads levels, and runs the main loop.
// Must be loaded last (see index.html).

const canvas = document.getElementById("game-canvas");
const context = canvas.getContext("2d");

const gameState = {
  currentLevelIndex: 0,
  currentLevel: null,
  player: null,
  remainingKeys: [],
  isExitUnlocked: false,
  hasWon: false,
  flipFlashSeconds: 0,
};

let lastFrameTimestamp = null;

/**
 * Loads a level by its index in LEVELS and puts the player at its start.
 * Also use this to restart the current level (Phase 2: R key and spikes).
 */
function loadLevel(levelIndex) {
  const level = LEVELS[levelIndex];
  gameState.currentLevelIndex = levelIndex;
  gameState.currentLevel = level;
  gameState.player = createPlayer(level.playerStart, level.startGravity);
  // Copy keys so restart restores collectibles without changing LEVELS.
  gameState.remainingKeys = level.keys.map(key => ({ ...key }));
  gameState.isExitUnlocked = gameState.remainingKeys.length === 0;
  gameState.hasWon = false;
  gameState.flipFlashSeconds = 0;
  updateStatus();
}

/**
 * Updates the game by one time step.
 */
function updateGame(deltaSeconds) {
  if (consumeRestartPress()) {
    loadLevel(gameState.hasWon ? 0 : gameState.currentLevelIndex);
    consumeGravitySwitchPress();
    return;
  }
  if (gameState.hasWon) {
    consumeGravitySwitchPress();
    return;
  }
  const { player, currentLevel } = gameState;
  gameState.flipFlashSeconds = Math.max(0, gameState.flipFlashSeconds - deltaSeconds);

  if (consumeGravitySwitchPress()) {
    switchPlayerGravity(player);
    gameState.flipFlashSeconds = 0.18;
    playGameSound("flip");
  }

  updatePlayerPhysics(player, currentLevel, getHorizontalInputDirection(), deltaSeconds);

  if (currentLevel.spikes.some(spike => rectanglesOverlap(player, spike))) {
    loadLevel(gameState.currentLevelIndex);
    return;
  }
  gameState.remainingKeys = gameState.remainingKeys.filter(key => !rectanglesOverlap(player, key));
  gameState.isExitUnlocked = gameState.remainingKeys.length === 0;
  if (gameState.isExitUnlocked && rectanglesOverlap(player, currentLevel.exit)) {
    playGameSound("complete");
    if (gameState.currentLevelIndex + 1 < LEVELS.length) {
      loadLevel(gameState.currentLevelIndex + 1);
    } else {
      gameState.hasWon = true;
      player.velocityX = 0;
      player.velocityY = 0;
    }
  }
  updateStatus();
}

function gameLoop(timestamp) {
  if (lastFrameTimestamp === null) {
    lastFrameTimestamp = timestamp;
  }
  const deltaSeconds = Math.min((timestamp - lastFrameTimestamp) / 1000, MAX_FRAME_SECONDS);
  lastFrameTimestamp = timestamp;

  updateGame(deltaSeconds);
  renderFrame(context, gameState.currentLevel, gameState.player, gameState);

  requestAnimationFrame(gameLoop);
}

function updateStatus() {
  document.getElementById("level-status").textContent = gameState.hasWon
    ? `You won! All ${LEVELS.length} levels complete. Press R to play again.`
    : `${gameState.currentLevel.name} · Keys left: ${gameState.remainingKeys.length} · Exit ${gameState.isExitUnlocked ? "OPEN" : "LOCKED"} · Gravity ${gameState.player.gravityDirection === GRAVITY_DOWN ? "↓" : "↑"}`;
}

loadLevel(0);
requestAnimationFrame(gameLoop);
