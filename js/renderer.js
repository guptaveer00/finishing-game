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
  drawFacilityDetails(context);
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
    const panel = context.createLinearGradient(solid.x, solid.y, solid.x, solid.y + solid.height);
    panel.addColorStop(0, "#344b66");
    panel.addColorStop(1, "#24354b");
    context.fillStyle = panel;
    context.fillRect(solid.x, solid.y, solid.width, solid.height);
    context.strokeStyle = "#5b7792";
    context.lineWidth = 2;
    context.strokeRect(solid.x + 1, solid.y + 1, solid.width - 2, solid.height - 2);
    context.fillStyle = "#9fc7d233";
    context.fillRect(solid.x + 3, solid.y + 3, Math.max(0, solid.width - 6), 2);
  }
}

/**
 * Draws the player as a rectangle with an eye. The eye sits on the side of the
 * body facing away from gravity (the "head"), so you can see at a glance
 * whether the player is on the floor or the ceiling.
 */
function drawPlayer(context, player) {
  context.save();
  context.shadowColor = "#ffcc4d88";
  context.shadowBlur = 14;
  context.fillStyle = COLORS.player;
  context.fillRect(player.x, player.y, player.width, player.height);

  context.shadowBlur = 0;
  context.strokeStyle = "#fff0b5";
  context.lineWidth = 1.5;
  context.strokeRect(player.x + 1, player.y + 1, player.width - 2, player.height - 2);
  context.fillStyle = "#a56328";
  context.fillRect(player.x + 4, player.y + player.height - 5, player.width - 8, 2);
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
  context.restore();
}

function drawKeys(context, keys) {
  context.save();
  context.shadowColor = "#ffe28a";
  context.shadowBlur = 9;
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
  context.restore();
}

function drawExit(context, exit, unlocked) {
  context.save();
  context.shadowColor = unlocked ? "#82edba" : "#c19acb";
  context.shadowBlur = unlocked ? 16 : 6;
  context.fillStyle = unlocked ? "#326e60" : "#4a4058";
  context.fillRect(exit.x, exit.y, exit.width, exit.height);
  context.strokeStyle = unlocked ? "#82edba" : "#c19acb";
  context.lineWidth = 3;
  context.strokeRect(exit.x, exit.y, exit.width, exit.height);
  context.fillStyle = "#ffffff";
  context.font = "bold 10px system-ui";
  context.textAlign = "center";
  context.fillText(unlocked ? "OPEN" : "LOCK", exit.x + exit.width / 2, exit.y + exit.height / 2 + 4);
  context.restore();
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

// Decorative background only: these marks never affect collision geometry.
function drawFacilityDetails(context) {
  context.save();
  context.strokeStyle = "#86c5e00b";
  context.lineWidth = 1;
  for (let x = 0; x < CANVAS_WIDTH; x += 40) {
    context.beginPath(); context.moveTo(x, 40); context.lineTo(x, CANVAS_HEIGHT - 40); context.stroke();
  }
  for (let y = 50; y < CANVAS_HEIGHT - 40; y += 40) {
    context.beginPath(); context.moveTo(0, y); context.lineTo(CANVAS_WIDTH, y); context.stroke();
  }
  context.fillStyle = "#b5d9ed35";
  for (let i = 0; i < 30; i++) {
    context.fillRect((i * 173 + 37) % 800, 60 + (i * 97) % 320, 1.5, 1.5);
  }
  context.fillStyle = "#96b7cd16";
  context.font = "bold 52px system-ui";
  context.textAlign = "center";
  context.fillText("↑", 30, 210);
  context.fillText("↓", 770, 275);
  context.restore();
}
