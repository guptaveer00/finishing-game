Claude Code used in VS Code so no Ai output in words.

1 - Read the SPEC.md file in this repository and understand what GravitySwitcher is supposed to be.
I only have about 45 minutes for the initial implementation, and another student will be finishing the game afterward.
Before writing code, understand what the basic foundation should include, what files we should create, and which features should be left for Phase 2.
Keep the project simple and avoid unnecessary complexity.

Create a basic game screen with a dark background, a player character, and solid floor and ceiling boundaries. Add left and right movement using the arrow keys.
Keep the code organized into separate files

- Set up the initial HTML and JavaScript files.
- Created the game screen, player character, and floor/ceiling boundaries.
- Added horizontal player movement using arrow keys.

2 - Now implement the main gravity switching mechanic.
When the player presses Space, gravity should reverse, causing the character to fall toward the ceiling instead of the floor. Pressing Space again should return gravity to normal.

- Added gravity switching using the Space key.
- Implemented upward and downward gravity so the character can move between the floor and ceiling.

3 - Make gravity switching feel responsive, including when the player is already falling and stop the player from falling outside the game screen.

- Improved gravity switching while the player is midair.
- Adjusted player movement to keep the character within the game boundaries.


4 - Fix the gravity code for collision issues, the gravity cancels out when the player fits a wall so have the gravity continue as is until space is pressed again.
Make sure the player lands correctly on both the floor and ceiling without passing through them or getting stuck.

- Addressed an issue where collisions interfered with the current gravity direction.
- Improved floor and ceiling collisions to prevent the player from passing through boundaries or getting stuck.
- Kept gravity direction controlled by the Space key rather than collisions.


5 -  Add one simple obstacle to the game, such as a wall rising from the floor that forces the player to switch gravity to get past it.
The player should not be able to pass through the wall.
Do not add spikes, keys, exits, additional completed levels yet as shown in the spec.

- Added a solid wall obstacle to the level.
- Added wall collision detection.
- Created a basic obstacle that requires the player to use gravity switching to get past it.

6 - Make sure functions and variables have clear names and that different responsibilities are separated. Add useful comments explaining anything that might be confusing to someone looking at the project.
Add todo comments showing where the next person should implement key collection, hazards, locked exits, and additional levels.
Do not implement these features or change the spec

- Reviewed code organization and variable naming for readability.
- Added comments explaining parts of the game logic.
- Added TODO comments for features intended for Phase 2, including keys, hazards, exits, and additional levels.

---

# Phase 2 — Veer Gupta

## Tool/model

OpenAI Codex desktop assistant (exact model version unavailable in this chat), shell/Git, JavaScript execution, and browser automation. Existing vanilla HTML/CSS/JavaScript was retained; no dependencies or new framework were introduced.

## Important user prompts, verbatim

> i dowloaded the zip and unziped it, and moved the entire file to my dekstop. now can u do the next steps, i created this new repo:
> [https://github.com/guptaveer00/finishing-game](https://github.com/guptaveer00/finishing-game)

## AI actions (summaries, not additional user prompts)

1. Located the extracted Desktop folder. Initialized a fresh Git history and committed all received files unchanged before opening their contents. Pushed the baseline to the new repository.
2. Read SPEC.md first, then README.md, prompt_log.md, and the source. Opened the unchanged game in a browser. Recorded priorities in PHASE2_PLAN.md.
3. Extended existing files at the author's TODOs: copied collectible-key state, locked exit checks, spikes, R restart, additional levels, automatic progression, victory, status text, and flip feedback. Kept original player and axis-separated physics logic, adding small physics steps for the documented tunneling issue. Added optional synthesized sound in one new file.
4. Checked complete routes and core interactions using a repeatable JavaScript harness, and verified the first level through keyboard browser play. Updated README criterion by criterion and credited Yash.

## AI behavior that needed correction

The AI's initial final-level design and proposed route did not work together: the late platform allowed a fall into spikes, and moving it too far left then blocked the intended ascent. A route check failed with the player resetting and becoming stuck at the first wall on the attempted route. The AI adjusted only the new platform's position/width and allowed time to drop below the ceiling spikes before moving. The full route then reached the final exit. No inherited collision logic was thrown away to solve the level-design error.

The first version of the route-test helper also kept moving toward the previous level's target after an automatic transition. It was corrected to stop when the level changes. These are actual implementation/testing mistakes, not invented user prompts.

## Boundaries and result

SPEC.md was preserved unchanged, and no original source files were deleted or renamed. The original prompt log above is retained. AI did not write HANDOFF_REPORT.md; Veer needs to write his own account of inheriting the project. The Google form has not been submitted by AI.


## Level expansion prompt (verbatim)

> can u add more levels, this seems more simple. or like if not more levels make them longer and stuff

Added levels 4–6 within the existing LEVELS array. These use three/four keys, alternating wall paths, return trips, a ceiling start, and additional hazards. Preserved levels 1–3 and the inherited movement/collision architecture. Updated the victory text to use LEVELS.length, extended the route tests through all six levels, and updated the README. All 20 checks passed, including complete movement-based routes through every added level.
