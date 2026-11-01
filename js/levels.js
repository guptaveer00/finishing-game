// levels.js
// Level data. Each level is a plain object, so adding a level means adding
// another object to the LEVELS array; no game code needs to change.
//
// Level format:
//   name          Display name for the level.
//   playerStart   { x, y }: top-left corner where the player spawns.
//   startGravity  GRAVITY_DOWN or GRAVITY_UP.
//   solids        Array of { x, y, width, height } rectangles the player
//                 cannot pass through from any side: floor, ceiling, walls
//                 and platforms. Add an obstacle by adding a rectangle here.
//                 Keep solids at least ~20 px thick (see README "Known
//                 limitations").
//
// Additional level objects:
//   keys:   [{ x, y, width, height }]   collectible keys
//   exit:   { x, y, width, height }     locked until all keys are collected
//   spikes: [{ x, y, width, height }]   touching one resets the level

const FLOOR_AND_CEILING_THICKNESS = 40;

// The wall in level 1 leaves this much room below the ceiling, so the player
// fits through only while walking on the ceiling.
const LEVEL_1_WALL_GAP_BELOW_CEILING = 110;

/**
 * Builds the floor and ceiling rectangles that span the whole canvas.
 * Most levels will start from these and add extra solids on top.
 */
function createFloorAndCeiling() {
  return [
    // Ceiling
    { x: 0, y: 0, width: CANVAS_WIDTH, height: FLOOR_AND_CEILING_THICKNESS },
    // Floor
    {
      x: 0,
      y: CANVAS_HEIGHT - FLOOR_AND_CEILING_THICKNESS,
      width: CANVAS_WIDTH,
      height: FLOOR_AND_CEILING_THICKNESS,
    },
  ];
}

const LEVELS = [
  {
    name: "Level 1: Learn to Flip",
    playerStart: {
      x: 60,
      y: CANVAS_HEIGHT - FLOOR_AND_CEILING_THICKNESS - PLAYER_HEIGHT,
    },
    startGravity: GRAVITY_DOWN,
    keys: [{ x: 540, y: 58, width: 20, height: 20 }],
    exit: { x: 730, y: 354, width: 36, height: 56 },
    spikes: [],
    solids: [
      ...createFloorAndCeiling(),
      // Wall rising from the floor. It is too tall to get past on the floor,
      // so the player has to flip to the ceiling and walk over it.
      {
        x: 380,
        y: FLOOR_AND_CEILING_THICKNESS + LEVEL_1_WALL_GAP_BELOW_CEILING,
        width: 40,
        height:
          CANVAS_HEIGHT - 2 * FLOOR_AND_CEILING_THICKNESS - LEVEL_1_WALL_GAP_BELOW_CEILING,
      },
      // The exit and key are on the far side; use the ceiling to cross.
    ],
  },
  {
    name: "Level 2: Watch Your Step",
    playerStart: { x: 60, y: 374 },
    startGravity: GRAVITY_DOWN,
    solids: [
      ...createFloorAndCeiling(),
      { x: 410, y: 40, width: 40, height: 160 },
      { x: 570, y: 300, width: 40, height: 110 },
    ],
    keys: [{ x: 290, y: 58, width: 20, height: 20 }],
    exit: { x: 730, y: 354, width: 36, height: 56 },
    spikes: [
      { x: 200, y: 386, width: 150, height: 24, side: "floor" },
      { x: 630, y: 40, width: 100, height: 24, side: "ceiling" },
    ],
  },
  {
    name: "Level 3: Up, Down, Up",
    playerStart: { x: 60, y: 374 },
    startGravity: GRAVITY_DOWN,
    solids: [
      ...createFloorAndCeiling(),
      { x: 230, y: 220, width: 40, height: 190 },
      { x: 480, y: 40, width: 40, height: 170 },
      { x: 570, y: 280, width: 150, height: 20 },
    ],
    keys: [
      { x: 310, y: 58, width: 20, height: 20 },
      { x: 420, y: 370, width: 20, height: 20 },
    ],
    exit: { x: 740, y: 40, width: 36, height: 56 },
    spikes: [
      { x: 560, y: 386, width: 100, height: 24, side: "floor" },
      { x: 570, y: 40, width: 100, height: 24, side: "ceiling" },
    ],
  },
  {
    name: "Level 4: The Return Trip",
    playerStart: { x: 60, y: 374 },
    startGravity: GRAVITY_DOWN,
    solids: [
      ...createFloorAndCeiling(),
      { x: 200, y: 200, width: 40, height: 210 },
      { x: 400, y: 40, width: 40, height: 210 },
      { x: 600, y: 200, width: 40, height: 210 },
    ],
    keys: [
      { x: 300, y: 58, width: 20, height: 20 },
      { x: 500, y: 370, width: 20, height: 20 },
      { x: 720, y: 58, width: 20, height: 20 },
    ],
    // Returning to the start makes the same obstacles a second puzzle.
    exit: { x: 60, y: 354, width: 36, height: 56 },
    spikes: [],
  },
  {
    name: "Level 5: Ceiling First",
    playerStart: { x: 60, y: 40 },
    startGravity: GRAVITY_UP,
    solids: [
      ...createFloorAndCeiling(),
      { x: 200, y: 40, width: 40, height: 210 },
      { x: 400, y: 200, width: 40, height: 210 },
      { x: 600, y: 40, width: 40, height: 210 },
    ],
    keys: [
      { x: 300, y: 370, width: 20, height: 20 },
      { x: 500, y: 58, width: 20, height: 20 },
      { x: 720, y: 370, width: 20, height: 20 },
      { x: 500, y: 370, width: 20, height: 20 },
    ],
    exit: { x: 60, y: 40, width: 36, height: 56 },
    spikes: [
      { x: 280, y: 40, width: 80, height: 24, side: "ceiling" },
      { x: 460, y: 386, width: 25, height: 24, side: "floor" },
    ],
  },
  {
    name: "Level 6: Final Circuit",
    playerStart: { x: 60, y: 374 },
    startGravity: GRAVITY_DOWN,
    solids: [
      ...createFloorAndCeiling(),
      { x: 200, y: 200, width: 40, height: 210 },
      { x: 400, y: 40, width: 40, height: 210 },
      { x: 600, y: 200, width: 40, height: 210 },
    ],
    keys: [
      { x: 130, y: 370, width: 20, height: 20 },
      { x: 300, y: 58, width: 20, height: 20 },
      { x: 500, y: 370, width: 20, height: 20 },
      { x: 720, y: 58, width: 20, height: 20 },
    ],
    exit: { x: 60, y: 354, width: 36, height: 56 },
    spikes: [
      { x: 280, y: 386, width: 80, height: 24, side: "floor" },
      { x: 460, y: 40, width: 80, height: 24, side: "ceiling" },
      { x: 680, y: 386, width: 80, height: 24, side: "floor" },
    ],
  },
];
