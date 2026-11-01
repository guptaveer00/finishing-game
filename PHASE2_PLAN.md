# Phase 2 implementation plan

Baseline: e3da2c2, Yash's unmodified downloaded files, committed before opening project files.

Read order: SPEC.md, README.md, prompt_log.md, then existing source. The unchanged game was opened in the browser before editing.

Targets, in author priority order:
1. Keep movement, gravity flipping, axis-separated collision functions, player structure, and plain-script file organization.
2. Add per-run copied keys and locked exits to finish the existing level.
3. Add spike resets, R restart, two more levels, automatic progression, and victory.
4. Add level/control/status display and simple gravity feedback; sound only after core behavior passes.
5. Address the documented thin-solid issue with smaller physics steps rather than replacing collision logic.
6. Verify routes and acceptance criteria, update README and prompt log. Veer must personally write HANDOFF_REPORT.md; AI will not write it.

SPEC.md remains unchanged. Proposed scope is completion within the inherited design, not a rewrite.
