# GravitySwitcher

Flip gravity to walk on the floor or ceiling, collect every key, and reach the open exit. Avoid pink spikes. Six levels progress automatically, ending with a victory screen.

## Run and controls

Download/extract the whole repository and open `index.html` in a desktop browser. No installation or build is needed. Alternatively, run `python3 -m http.server 8000` here and open http://localhost:8000.

- **Left/right arrows:** move.
- **Space:** reverse gravity, even in midair.
- **R:** restart the current level, restoring its keys; after victory, restart the whole game.
- **Sound button:** turn optional flip and completion sounds on/off. Sound starts off and needs a click to enable.

Gold keys unlock the exit only when all keys in the level are collected. The exit changes from purple **LOCK** to green **OPEN**. The display shows level, keys remaining, exit state, and gravity direction. Touching spikes resets the entire current level, including its keys.

## Acceptance criteria report

1. **Met:** arrow keys move the player horizontally.
2. **Met:** one Space press reverses gravity, including midair.
3. **Met:** the inherited collision functions block floors, ceilings, walls, and platforms; smaller physics steps address the documented thin-solid issue.
4. **Met:** touching a key removes it; collecting all keys unlocks the exit. Level 3 has two keys, so both are required.
5. **Met:** a locked exit cannot complete the level.
6. **Met:** level 1 has a verified complete route using movement, gravity switching, a key, and the exit.
7. **Met:** touching spikes returns the player to the current level's starting position.
8. **Met:** six levels progress automatically through unlocked exits.
9. **Met:** R resets the current level and its collectibles.
10. **Met:** the page displays the current level number and basic controls.
11. **Met:** completing the final level displays a victory message and stops movement.
12. **Met:** the player's eye changes with gravity, a brief border flashes on a flip, and the gravity arrow changes.
13. **Met (opt-in):** enabling sound plays synthesized tones on flips and level completion. Sound scheduling and the browser toggle were checked; audible output was not independently listened to.

## Visual update

Added a space-facility page theme, clearer keyboard controls and object legend, a six-part progress bar, a background grid, shaded platforms, and glowing player/keys/exits. These are decorative changes; collision shapes and the six tested routes are unchanged.

## What changed

Added keys, locked exits, spike resets, R restart, five more levels, automatic progression, victory, status text, flip feedback, and optional sound. The original first level's wall and start remain. Added smaller physics steps around the original collision routine rather than replacing it.

## Levels

1. **Learn to Flip:** cross the original wall, collect a key, and reach the exit.
2. **Watch Your Step:** avoid floor and ceiling spikes.
3. **Up, Down, Up:** collect two keys and use a platform above hazards.
4. **The Return Trip:** collect three keys across alternating walls, then navigate back to the starting exit.
5. **Ceiling First:** start upside down, collect four keys with an extra floor detour, and return to the ceiling exit.
6. **Final Circuit:** collect four keys on both surfaces and complete a return trip past floor and ceiling hazards.

The later levels are longer through out-and-back routes, rather than a larger scrolling map. The existing canvas and movement design are preserved.

## Code map

- `index.html`: canvas, controls, status text, and script order.
- `css/style.css`: page styling, including the added status and sound button.
- `js/config.js`:original size, speed, gravity, and color constants.
- `js/input.js`: held keys and one-time Space/R presses.
- `js/levels.js`: original floor/ceiling helper and first wall, plus keys, exits, spikes, and five new levels.
- `js/player.js`: original player creation and gravity switch.
- `js/physics.js`: original rectangle and axis-separated collision functions, with a small-step wrapper added.
- `js/renderer.js`: original background/solid/player drawing, plus keys, exits, spikes, flip border, and victory.
- `js/sound.js`: optional synthesized tones and sound button.
- `js/game.js`: original load/update/loop structure, extended with keys, restarts, hazards, progression, and victory.
- `tests/verify.cjs`: repeatable logic/route checks; optional Node.js command: `node tests/verify.cjs`.
- `PHASE2_PLAN.md`: targets recorded before implementation.
- `prompt_log.md`: original log followed by the Phase 2 record.

Keep scripts in their current order; game.js starts the game and must load last.

## Preservation and checks

The first commit (`e3da2c2`) contains all received files unchanged, with a fresh history. SPEC.md is unchanged. No original source file was discarded or renamed; the original movement, player model, collision routines, rendering functions, and overall architecture remain. Most changes are additions at the author's TODOs. A source comparison retains 492 of the original 517 source lines verbatim (about 95%); line retention is supporting evidence, while the original logic and design are also preserved.

The automated checks pass for locked exits, keys, spike resets, routes through all six levels, final victory, restart, immutable level data, thin-platform collisions, and sound scheduling. The routes use simulated directional input and flips rather than teleporting through levels. The locked-exit and spike-reset unit checks place the player directly at the object being tested.

Browser checks verified the unchanged baseline first, then keyboard movement, key collection, unlocking the first exit, automatic transition to level 2, and the sound toggle. No browser JavaScript errors were reported during those checks. Full six-level completion was verified in the simulation; only the first level was played through in the browser.

## Known limitations and shortcuts

- Gravity reversal changes acceleration, not existing vertical velocity: flipping while falling can take a moment to reverse motion. 
- Spike collision uses the full bounding rectangle of the drawn triangles, so visual gaps between spikes still count as hazards.
- Keyboard controls target desktop browsers; mobile/touch controls are not implemented.
- Audio needs browser support and an explicit click. Unsupported/blocked audio does not prevent play.
- No save system, moving platforms, or extra mechanics were added. Levels restart from the beginning after a spike hit.

## Remaining submission work

The repository is public and the baseline/spec preservation checks pass. The required README, SPEC, and prompt log are separate files, with the original author credited above.

Veer must personally write `HANDOFF_REPORT.md` without AI, as the assignment requires, after playing and reviewing the inherited project. This file has intentionally not been generated. Then commit/push it and submit both repository links through the course form.
