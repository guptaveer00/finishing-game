// renderer.js
// All drawing code. These functions only read game state and never change it.

/**
 * Draws one full frame.
 * @param {CanvasRenderingContext2D} context
 * @param {object} level  an entry from LEVELS
 * @param {object} player from createPlayer()
 */
function renderFrame(context, level, player, state) {
  drawBackground(context);
  drawSolids(context, level.solids);
  drawExit(context, level.exit, state.isExitUnlocked);
  drawKeys(context, state.remainingKeys);
  drawSpikes(context, level.spikes);
  drawPlayer(context, player);
  if (state.flipFlashSeconds > 0) {
    context.strokeStyle = player.gravityDirection === GRAVITY_UP ? "#8de1ff" : "#ffcc4d";
    context.lineWidth = 5;
    context.strokeRect(3, 3, CANVAS_WIDTH - 6, CANVAS_HEIGHT - 6);
  }
  if (state.hasWon) drawVictoryScreen(context);
}

function drawBackground(context) {
  context.fillStyle = COLORS.background;
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function drawSolids(context, solids) {
  for (const solid of solids) {
    context.fillStyle = COLORS.solid;
    context.fillRect(solid.x, solid.y, solid.width, solid.height);
    context.strokeStyle = COLORS.solidEdge;
    context.lineWidth = 2;
    context.strokeRect(solid.x + 1, solid.y + 1, solid.width - 2, solid.height - 2);
  }
}

/**
 * Draws the player as a rectangle with an eye. The eye sits on the side of the
 * body facing away from gravity (the "head"), so you can see at a glance
 * whether the player is on the floor or the ceiling.
 */
function drawPlayer(context, player) {
  context.fillStyle = COLORS.player;
  context.fillRect(player.x, player.y, player.width, player.height);

  const eyeSize = 6;
  const eyeOffsetFromEdge = 8;
  const eyeX =
    player.facingDirection > 0
      ? player.x + player.width - eyeOffsetFromEdge - eyeSize
      : player.x + eyeOffsetFromEdge;
  const eyeY =
    player.gravityDirection === GRAVITY_DOWN
      ? player.y + eyeOffsetFromEdge
      : player.y + player.height - eyeOffsetFromEdge - eyeSize;

  context.fillStyle = COLORS.playerEye;
  context.fillRect(eyeX, eyeY, eyeSize, eyeSize);
}

function drawKeys(context, keys) {
  for (const key of keys) {
    context.strokeStyle = "#ffe28a";
    context.lineWidth = 4;
    context.beginPath();
    context.arc(key.x + 7, key.y + 7, 5, 0, Math.PI * 2);
    context.moveTo(key.x + 11, key.y + 11);
    context.lineTo(key.x + 19, key.y + 19);
    context.moveTo(key.x + 15, key.y + 15);
    context.lineTo(key.x + 19, key.y + 12);
    context.stroke();
  }
}

function drawExit(context, exit, unlocked) {
  context.fillStyle = unlocked ? "#326e60" : "#4a4058";
  context.fillRect(exit.x, exit.y, exit.width, exit.height);
  context.strokeStyle = unlocked ? "#82edba" : "#c19acb";
  context.lineWidth = 3;
  context.strokeRect(exit.x, exit.y, exit.width, exit.height);
  context.fillStyle = "#ffffff";
  context.font = "bold 10px system-ui";
  context.textAlign = "center";
  context.fillText(unlocked ? "OPEN" : "LOCK", exit.x + exit.width / 2, exit.y + exit.height / 2 + 4);
}

function drawSpikes(context, spikes) {
  context.fillStyle = "#f38192";
  for (const spike of spikes) {
    const count = Math.ceil(spike.width / 20), width = spike.width / count;
    for (let i = 0; i < count; i++) {
      const x = spike.x + i * width;
      const base = spike.side === "ceiling" ? spike.y : spike.y + spike.height;
      const tip = spike.side === "ceiling" ? spike.y + spike.height : spike.y;
      context.beginPath();
      context.moveTo(x, base);
      context.lineTo(x + width / 2, tip);
      context.lineTo(x + width, base);
      context.closePath();
      context.fill();
    }
  }
}

function drawVictoryScreen(context) {
  context.fillStyle = "#14141fe8";
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  context.textAlign = "center";
  context.fillStyle = "#ffcc4d";
  context.font = "bold 38px system-ui";
  context.fillText("You won!", CANVAS_WIDTH / 2, 200);
  context.fillStyle = "#e6e6f0";
  context.font = "18px system-ui";
  context.fillText(`All ${LEVELS.length} levels complete. Press R to play again.`, CANVAS_WIDTH / 2, 240);
}
