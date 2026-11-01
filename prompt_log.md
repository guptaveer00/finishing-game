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

# Phase 2

## Tool/model

OpenAI Codex desktop assistant

1) Find the extracted CodeHandoff-main folder on my Desktop. Before opening or editing its files, create a new Git repository and commit all received files unchanged with the message “Initial commit: unmodified code as received.” Connect it to https://github.com/guptaveer00/finishing-game and push. Don’t implement anything yet.

2) Read SPEC.md first, then README.md, prompt_log.md, and the source. Run the original game before changing it. Explain the file structure, which acceptance criteria already work, and what remains. Flag unclear requirements and differences between the documentation and actual behavior. Don’t edit files yet.

3) Make a prioritized Phase 2 plan based on the author’s acceptance criteria and roughly two hours of work. Preserve the original architecture and at least 75% of the original work. Identify the existing functions and TODOs we can extend. Prioritize a complete playable game before extra levels, visuals, or sound.

4) Implement key collection and locked exits using the existing level format and rectanglesOverlap() helper. Copy collectible state when loading a level so restarting can restore it without changing the original level data. An exit should open only after all keys are collected. Keep the original movement and collision logic. Verify locked exits, collection, and unlocking, then commit this change separately.

5) Add spikes that reset the current level and an R-key restart using the existing loadLevel() function. Both should restore the player and keys. Follow the existing one-press input pattern so holding R does not repeatedly restart. Check these behaviors and review the diff for unrelated changes before committing.

6) Add automatic progression through three levels and a victory screen after the final exit. Stop player movement after victory, and let R restart from level one. Reuse the existing level-loading and rendering structure. Verify a complete route through every level using movement and gravity switches rather than teleporting the player.

7) Now that the core game works, add a brief visual effect when gravity switches and optional sounds for flipping and completing a level. Keep these changes separate from physics. Sound should require user interaction and should never prevent gameplay if unavailable. Explain which audio behavior you can test and which remains unverified.

8) Add three more levels using the existing level-data format. Make them longer through multiple keys, alternating floor and ceiling obstacles, and return trips to the exit. Keep the first three levels intact. Check that every key is reachable and every level has a complete route. Update victory text to use the actual level count.

9) Improve the visuals with a consistent space-facility theme, readable controls, clear pocket sorry, key and exitstates, and level progress. Keep collision shapes, movement, controls, and level geometry unchanged. Preserve the existing rendering functions where practical. Check the layout at desktop and narrow widths, then rerun the gameplay checks.

10) Update the README with run instructions, controls, a simple code map, known limitations, and a numbered report against every original acceptance criterion. Mark each met, partially met, or not met using verified evidence.

11) Check the unchanged baseline commit, unchanged SPEC.md, preservation of original work, public repository status, required files, documentation accuracy, and published commits.
