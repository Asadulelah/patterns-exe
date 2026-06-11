/* PATTERNS.EXE - data layer
   Eight self-sabotage patterns, distilled from a real builder audit.
   Copy voice: blunt, two-part detonations. No mercy setting. */

const PATTERNS = {
  1: {
    name: 'THE COMFORT TRAP',
    short: 'COMFORT',
    diag: 'You don’t quit when it gets hard. You quit when it stops hurting.',
    tell: 'The streak that dies <b>the day after the win</b>. Momentum survives pressure and dies in relief.',
    cost: 'Every restart throws away the compound interest of the last run. You keep paying the entry fee and leaving before the payout.',
    rx: 'Do the uncomfortable thing <b>first on the good days</b>. Comfort is your trigger, so rig the trigger.',
    vignette: 'comfort'
  },
  2: {
    name: 'BUILDING INSTEAD OF SELLING',
    short: 'BUILDING',
    diag: 'You are a world-class builder who refuses to sell.',
    tell: 'Another feature instead of another conversation. The roadmap grows; the pipeline doesn’t.',
    cost: 'The market can’t reject what it never sees. That’s the point, isn’t it? Safety, dressed up as a work ethic.',
    rx: '<b>One ask per day</b> to someone who can pay, before you’re allowed to build anything.',
    vignette: 'building'
  },
  3: {
    name: 'THE 80% PROBLEM',
    short: '80-PERCENT',
    diag: 'You finish the hard 80% and abandon the easy 20%. Because finished can be judged.',
    tell: 'A graveyard of “basically done.” Each corpse is one shipped afternoon away from being alive.',
    cost: 'A hundred hours of work producing zero hours of proof. Effort without evidence is invisible.',
    rx: 'Pick <b>one corpse</b>. Ship it this week. Ugly counts. Done is a door, not a grade.',
    vignette: 'eighty'
  },
  4: {
    name: 'PLANNING AS PROCRASTINATION',
    short: 'PLANNING',
    diag: 'The plan is perfect. The plan is also the hiding place.',
    tell: 'Version 3 of the roadmap, version 0 of the thing. The doc gets the craft the work was supposed to get.',
    cost: 'Planning feels exactly like progress, which is what makes it the most dangerous way to stand still.',
    rx: '<b>No new documents</b> until the scary action from the last one is done. The plan earns its sequel.',
    vignette: 'planning'
  },
  5: {
    name: 'PRIDE BLOCKING HELP',
    short: 'PRIDE',
    diag: 'You’d rather lose alone than win assisted.',
    tell: 'The drafted message you never sent. Reading it back daily like it’s doing something.',
    cost: 'Three days stuck on what costs someone else an hour. Pride is expensive and the invoice compounds.',
    rx: '<b>Send the message. Today.</b> Being helped is not being exposed.',
    vignette: 'pride'
  },
  6: {
    name: 'THE REBUILD LOOP',
    short: 'REBUILD',
    diag: 'Every collapse ends with a beautiful new system. None ends with the old promise kept.',
    tell: 'Fresh starts you could set a calendar by. New stack, new plan, new identity. Same unkept promise underneath.',
    cost: 'You keep paying setup costs and never collect the yield. Year three of building year one.',
    rx: 'Next dip: <b>resume, don’t rebuild.</b> Boring continuity is the cure and you know it.',
    vignette: 'rebuild'
  },
  7: {
    name: 'OUTSOURCED IDENTITY',
    short: 'IDENTITY',
    diag: 'You’ve made your self-worth someone else’s decision.',
    tell: 'Checking the result more often than doing the work. Every metric refresh is a verdict on you.',
    cost: 'When outcomes judge you, you quietly avoid the ones that might lose. Which is all the ones that matter.',
    rx: 'Judge your weeks by <b>reps, not results</b>. Results are downstream. You only own the reps.',
    vignette: 'identity'
  },
  8: {
    name: 'THE BROKEN CLOCK',
    short: 'CLOCK',
    diag: 'Your schedule isn’t a quirk. It’s the first domino.',
    tell: 'The day starts at noon and the guilt starts at 12:01. Everything important happens pre-tired.',
    cost: 'You’re fighting every battle at 60% charge and calling the losses a motivation problem.',
    rx: '<b>One fixed anchor</b>, same time every day. Protect it like revenue, because it is.',
    vignette: 'clock'
  }
};

/* Each option: [label, {pattern: weight}] */
const QUESTIONS = [
  { v: 'comfort',
    q: 'It’s 11:47 PM. The one action that would actually move things forward is sitting there, unstarted. What are you doing?',
    o: [['Polishing something that’s already done', { 3: 2, 1: 1 }],
        ['Reorganizing the plan. The notes. The workspace.', { 4: 2 }],
        ['Watching “educational” content about it', { 4: 1, 1: 1 }],
        ['Starting it now. Midnight is when I finally begin.', { 8: 2 }]] },
  { v: 'building',
    q: 'Your work is genuinely good. How many people who could PAY for it saw it this week?',
    o: [['Zero. I’ll show it when it’s ready.', { 2: 2, 3: 1 }],
        ['I posted once and never followed up', { 2: 1, 1: 1 }],
        ['A few. Then I let the conversations die.', { 2: 1, 1: 1 }],
        ['None. I was busy making it better.', { 2: 2, 4: 1 }]] },
  { v: 'eighty',
    q: 'Your last three projects. Where are they right now?',
    o: [['Shipped. Live. In use.', {}],
        ['“Basically done.” For weeks.', { 3: 2 }],
        ['Abandoned. A better idea showed up.', { 3: 1, 6: 1 }],
        ['Still inside the planning doc', { 4: 2 }]] },
  { v: 'planning',
    q: 'New goal. First 48 hours. What exists at the end of them?',
    o: [['A beautiful roadmap with named phases', { 4: 2 }],
        ['The scariest part, attempted ugly', {}],
        ['Research. So much research.', { 4: 1, 1: 1 }],
        ['A rebuilt setup, “to do it properly this time”', { 6: 1, 4: 1 }]] },
  { v: 'pride',
    q: 'Three days stuck on the same problem. Someone who’d solve it in an hour is one message away.',
    o: [['I’ll crack it myself. I always do.', { 5: 2 }],
        ['The message is drafted. It stays drafted.', { 5: 1, 1: 1 }],
        ['Asking feels like admitting I’m behind', { 5: 2, 7: 1 }],
        ['Already asked. That’s what people are for.', {}]] },
  { v: 'rebuild',
    q: 'Your last collapse. The week everything stopped. What restarted you?',
    o: [['A brand-new plan. Fresh start. Clean slate.', { 6: 2 }],
        ['Shame, followed by a 16-hour day', { 6: 1, 8: 1 }],
        ['Watching someone else win, and hating it', { 7: 2 }],
        ['Nothing dramatic. I just resumed.', {}]] },
  { v: 'identity',
    q: 'Finish it honestly: “I’ll finally feel like I’m enough when…”',
    o: [['…the money lands', { 7: 2 }],
        ['…they see they were wrong about me', { 7: 2, 5: 1 }],
        ['…the thing I’m building finally works', { 7: 1, 3: 1 }],
        ['…nothing. I already do. The work is just work.', {}]] },
  { v: 'clock',
    q: 'Last night. What time did you sleep, and was it a choice?',
    o: [['Late, by choice. Night is when I work.', { 8: 1 }],
        ['Late, by collapse. The evening just… went.', { 8: 2, 1: 1 }],
        ['Normal. Boring. Effective.', {}],
        ['Sleep is for people without deadlines and guilt', { 8: 2, 6: 1 }]] }
];

const ASIDES = [
  'noted.',
  'interesting.',
  'that one’s load-bearing.',
  'the machine has seen this before.',
  'you answered that quickly.',
  'filed.',
  'we both know that wasn’t the honest option. or was it.',
  'last one. stay still.'
];

const ANALYSIS_LINES = [
  'collating answers…',
  'cross-referencing avoidance signature… match',
  'isolating the load-bearing excuse…',
  'separating taste from fear… mostly fear',
  'checking what you ship against what you start…',
  'reading the gap between busy and moving…',
  'weighting eight patterns…',
  'discarding the flattering interpretation…',
  'verdict ready.'
];
