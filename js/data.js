/* PATTERNS.EXE v3 - data layer.
   Thirteen self-sabotage patterns: the original eight from a real builder
   audit, plus five universal ones, because most people never even reach
   the builder's problems. The intake locates you first. Then it adapts. */

const PATTERNS = {
  1: {
    name: 'THE COMFORT TRAP', short: 'COMFORT',
    diag: 'You don’t quit when it gets hard. You quit when it stops hurting.',
    tell: 'The streak that dies <b>the day after the win</b>. Momentum survives pressure and dies in relief.',
    cost: 'Every restart throws away the compound interest of the last run. You keep paying the entry fee and leaving before the payout.',
    rx: 'Do the uncomfortable thing <b>first on the good days</b>. Comfort is your trigger, so rig the trigger.',
    dare: 'You have 7 days to have one good day, and on that day, do the avoided thing FIRST. Before breakfast. Before you feel like it.',
    vignette: 'comfort'
  },
  2: {
    name: 'BUILDING INSTEAD OF SELLING', short: 'BUILDING',
    diag: 'You are a world-class builder who refuses to sell.',
    tell: 'Another feature instead of another conversation. The roadmap grows; the pipeline doesn’t.',
    cost: 'The market can’t reject what it never sees. That’s the point, isn’t it? Safety, dressed up as a work ethic.',
    rx: '<b>One ask per day</b> to someone who can pay, before you’re allowed to build anything.',
    dare: 'Within 7 days: ask one real person for real money for the thing you make. The answer matters less than the asking.',
    vignette: 'building'
  },
  3: {
    name: 'THE 80% PROBLEM', short: '80-PERCENT',
    diag: 'You finish the hard 80% and abandon the easy 20%. Because finished can be judged.',
    tell: 'A graveyard of “basically done.” Each corpse is one shipped afternoon away from being alive.',
    cost: 'A hundred hours of work producing zero hours of proof. Effort without evidence is invisible.',
    rx: 'Pick <b>one corpse</b>. Ship it this week. Ugly counts. Done is a door, not a grade.',
    dare: 'Pick ONE abandoned thing. Ship it inside 7 days, ugly. You are not allowed to improve it first.',
    vignette: 'eighty'
  },
  4: {
    name: 'PLANNING AS PROCRASTINATION', short: 'PLANNING',
    diag: 'The plan is perfect. The plan is also the hiding place.',
    tell: 'Version 3 of the roadmap, version 0 of the thing. The doc gets the craft the work was supposed to get.',
    cost: 'Planning feels exactly like progress, which is what makes it the most dangerous way to stand still.',
    rx: '<b>No new documents</b> until the scary action from the last one is done. The plan earns its sequel.',
    dare: '7 days, one rule: you may not write a single new plan, list, or note until the scariest item on the LAST one is done.',
    vignette: 'planning'
  },
  5: {
    name: 'PRIDE BLOCKING HELP', short: 'PRIDE',
    diag: 'You’d rather lose alone than win assisted.',
    tell: 'The drafted message you never sent. Reading it back daily like it’s doing something.',
    cost: 'Three days stuck on what costs someone else an hour. Pride is expensive and the invoice compounds.',
    rx: '<b>Send the message. Today.</b> Being helped is not being exposed.',
    dare: 'Not 7 days. TONIGHT: send the message you’ve been drafting to the person who can actually help.',
    vignette: 'pride'
  },
  6: {
    name: 'THE REBUILD LOOP', short: 'REBUILD',
    diag: 'Every collapse ends with a beautiful new system. None ends with the old promise kept.',
    tell: 'Fresh starts you could set a calendar by. New plan, new app, new identity. Same unkept promise underneath.',
    cost: 'You keep paying setup costs and never collect the yield. Year three of building year one.',
    rx: 'Next dip: <b>resume, don’t rebuild.</b> Boring continuity is the cure and you know it.',
    dare: 'For 7 straight days: resume yesterday’s thing. Zero new systems, zero fresh starts. Boring on purpose.',
    vignette: 'rebuild'
  },
  7: {
    name: 'OUTSOURCED IDENTITY', short: 'IDENTITY',
    diag: 'You’ve made your self-worth someone else’s decision.',
    tell: 'Checking the result more often than doing the work. Every glance at the numbers is a verdict on you.',
    cost: 'When outcomes judge you, you quietly avoid the ones that might lose. Which is all the ones that matter.',
    rx: 'Judge your weeks by <b>reps, not results</b>. Results are downstream. You only own the reps.',
    dare: '7 days of reps with the scoreboard covered: no metrics, no checking who saw, no asking what they think.',
    vignette: 'identity'
  },
  8: {
    name: 'THE BROKEN CLOCK', short: 'CLOCK',
    diag: 'Your schedule isn’t a quirk. It’s the first domino.',
    tell: 'The day starts at noon and the guilt starts at 12:01. Everything important happens pre-tired.',
    cost: 'You’re fighting every battle at 60% charge and calling the losses a motivation problem.',
    rx: '<b>One fixed anchor</b>, same time every day. Protect it like revenue, because it is.',
    dare: 'One anchor. Same wake time, 7 days straight, no negotiation. That’s the whole dare. It will be enough.',
    vignette: 'clock'
  },
  9: {
    name: 'THE SPECTATOR', short: 'SPECTATOR',
    diag: 'You’ve watched so much you think you’ve participated.',
    tell: 'You can describe other people’s journeys in detail. Yours has no chapters yet.',
    cost: 'Every hour in the audience trains you to need the audience. Watching is a skill, and you are becoming elite at it.',
    rx: 'Reverse the ratio for one week: <b>make more than you consume</b>, even if what you make is bad.',
    dare: 'Within 7 days: make ONE thing - a page, a video, a dish, a plan, anything - and put it where strangers can see it.',
    vignette: 'spectator'
  },
  10: {
    name: 'THE PERMISSION SEEKER', short: 'PERMISSION',
    diag: 'You’re waiting for a permission slip that was never going to arrive.',
    tell: 'You phrase your dreams as questions. “Do you think I could…?” You already know. You’re shopping for a yes.',
    cost: 'The people you’re waiting on are busy living. Nobody is coming to authorize you. That’s not cruelty, it’s freedom.',
    rx: 'Stop asking “can I” and start reporting “I did.” <b>Permission is taken, not granted.</b>',
    dare: 'Tomorrow, before 10 AM, start the thing you keep asking about. Badly. Without telling anyone first. Report back in 7 days.',
    vignette: 'permission'
  },
  11: {
    name: 'THE COMFORTABLE', short: 'COMFORTABLE',
    diag: 'Nothing is wrong with your life. That’s what’s wrong with it.',
    tell: 'You haven’t felt nervous-excited in months. Everything is handled, scheduled, and slightly beneath you.',
    cost: 'Comfort doesn’t feel like decay because decay is slow. Five more fine years and the door you won’t name closes quietly.',
    rx: 'Schedule discomfort like it’s cardio. <b>If nothing this month can fail, you aren’t doing anything.</b>',
    dare: 'This week, do one thing where failure would be VISIBLE: apply, publish, pitch, sign up, ask. Comfort is the opponent.',
    vignette: 'comfortable'
  },
  12: {
    name: 'THE SOMEDAY', short: 'SOMEDAY',
    diag: 'Your dream is real. Its start date is fiction.',
    tell: '“When things settle down.” They never do. The dream stays perfectly preserved, like furniture under a sheet.',
    cost: 'Someday is where dreams are stored, not where they live. Every year the gap between you and the version who started grows by one year.',
    rx: 'A dream with no date is a decoration. <b>Put a date inside this week, not this life.</b>',
    dare: 'Pick a real date within the next 7 days. Tell one person who will check on you. Then take the first step on that date, however small.',
    vignette: 'someday'
  },
  13: {
    name: 'ZERO RISK', short: 'ZERO-RISK',
    diag: 'You have never put anything on the table. The table noticed.',
    tell: 'Every choice you’ve made was reversible, refundable, and explainable to your relatives.',
    cost: 'No risk means no proof, and deep down you keep needing proof. That ache isn’t anxiety. It’s unspent courage.',
    rx: 'Bet something real on yourself: money, time, reputation. <b>Small stakes still count. Zero stakes never do.</b>',
    dare: 'Within 7 days, put something real at stake on yourself: pay for the course, book the ticket, make the public promise. Make it cost you to quit.',
    vignette: 'zerorisk'
  }
};

/* ---------------- ACT 1: THE INTAKE ----------------
   Three questions to locate the subject. Each option carries
   (a) seed scores and (b) a profile vote: doer | worker | drifter */
const INTAKE = [
  { q: 'Right now, today. Which one is true?',
    o: [['Studying. Or at least enrolled.',            { 12: 1 },        'worker'],
        ['Working a job.',                              { 11: 1 },        'worker'],
        ['Building something of my own.',               {},               'doer'],
        ['Between things. Drifting, if I’m honest.',    { 9: 1, 12: 1 },  'drifter']] },
  { q: 'The thing you secretly want to do. Does it exist anywhere outside your head?',
    o: [['No. Never started.',                          { 12: 2, 10: 1 }, 'drifter'],
        ['It started once. Then it stopped.',           { 3: 1, 6: 1 },   'worker'],
        ['It’s quietly in progress.',                   {},               'doer'],
        ['There is no thing. I haven’t found it.',      { 9: 2, 11: 1 },  'drifter']] },
  { q: 'When did you last do something that scared you, on purpose?',
    o: [['This month.',                                 {},               'doer'],
        ['This year. Probably.',                        { 11: 1 },        'worker'],
        ['I genuinely can’t remember.',                 { 13: 2 },        'drifter'],
        ['I avoid that on principle.',                  { 13: 2, 11: 1 }, 'drifter']] }
];

/* ---------------- ACT 2: THE EXAM ----------------
   Two banks. The intake profile decides the mix:
   doer    -> 6 builder + 2 universal
   worker  -> 4 builder + 4 universal
   drifter -> 2 builder + 6 universal */
const BANK_BUILDER = [
  { v: 'comfort',
    q: 'It’s 11:47 PM. The one action that would actually move things forward is sitting there, unstarted. What are you doing?',
    o: [['Polishing something that’s already done', { 3: 2, 1: 1 }],
        ['Reorganizing the plan. The notes. The workspace.', { 4: 2 }],
        ['Watching “educational” content about it', { 4: 1, 9: 1 }],
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
        ['Research. So much research.', { 4: 1, 9: 1 }],
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

const BANK_UNIVERSAL = [
  { v: 'spectator',
    q: 'Count yesterday, honestly. Hours spent consuming other people’s lives versus hours spent making anything at all?',
    o: [['All consuming. Bed, phone, repeat.', { 9: 2, 8: 1 }],
        ['Mostly consuming, but I call it research', { 9: 2, 4: 1 }],
        ['About even, on a good day', { 9: 1 }],
        ['I made more than I took in', {}]] },
  { v: 'permission',
    q: 'What, exactly, are you waiting for?',
    o: [['The right time', { 12: 2 }],
        ['Someone to tell me I’m ready', { 10: 2 }],
        ['Money or resources I “need” first', { 10: 1, 12: 1 }],
        ['Nothing. I’m already moving.', {}]] },
  { v: 'comfortable',
    q: 'Describe your life right now, in one honest word.',
    o: [['Fine. Comfortable. …Fine.', { 11: 2 }],
        ['Stressful, but it’s going somewhere', {}],
        ['Stuck. And I know it.', { 12: 1, 9: 1 }],
        ['On fire, by my own choice', {}]] },
  { v: 'someday',
    q: 'Your dream has a start date. What is it?',
    o: [['When things settle down', { 12: 2 }],
        ['After I finish this one other thing', { 12: 1, 4: 1 }],
        ['A real date, on a real calendar', {}],
        ['It already started', {}]] },
  { v: 'zerorisk',
    q: 'What have you ever actually put at risk for something you wanted?',
    o: [['Nothing. I play it safe.', { 13: 2 }],
        ['My comfort, once or twice', { 13: 1 }],
        ['Money, time, reputation. Properly.', {}],
        ['Everything, more than once', {}]] },
  { v: 'permission',
    q: 'If failure were guaranteed to stay private - nobody would ever know - would you start tomorrow?',
    o: [['Yes. Instantly.', { 7: 2, 10: 1 }],
        ['No. It’s not fear, it’s timing.', { 12: 2 }],
        ['I’d still find a reason not to', { 1: 1, 11: 1 }],
        ['I’d start tonight and tell everyone', {}]] },
  { v: 'eighty',
    q: 'Have you ever finished something hard purely because you said you would?',
    o: [['Yes. Recently.', {}],
        ['Yes. Years ago.', { 11: 1, 12: 1 }],
        ['I finish the easy ones', { 3: 2 }],
        ['Define “finish”', { 3: 1, 9: 1 }]] },
  { v: 'identity',
    q: 'Whose opinion is actually running your decisions?',
    o: [['Family. Their disappointment is loud.', { 7: 2 }],
        ['People online I’ve never met', { 7: 2, 9: 1 }],
        ['A version of me that doesn’t exist yet', { 7: 1 }],
        ['Mine. Expensive, but mine.', {}]] },
  { v: 'clock',
    q: 'Last night. What time did you sleep, and was it a choice?',
    o: [['Late, by choice. Night is mine.', { 8: 1 }],
        ['Late, by collapse. The evening just… went.', { 8: 2, 1: 1 }],
        ['Normal. Boring. Effective.', {}],
        ['Sleep is for people without a phone', { 8: 2, 9: 1 }]] }
];

const EXAM_MIX = { doer: [6, 2], worker: [4, 4], drifter: [2, 6] };

/* ---------------- voices ---------------- */
const INTAKE_ASIDES = ['locating you…', 'noted. the picture sharpens.', 'that’s enough. I know where you are now.'];
const ASIDES = [
  'noted.', 'interesting.', 'that one’s load-bearing.', 'the machine has seen this before.',
  'you answered that quickly.', 'filed.', 'we both know that wasn’t the honest option. or was it.', 'last one. stay still.'
];
const ANALYSIS_LINES = [
  'collating answers…',
  'cross-referencing avoidance signature… match',
  'isolating the load-bearing excuse…',
  'separating taste from fear… mostly fear',
  'checking what you finish against what you start…',
  'reading the gap between busy and moving…',
  'weighting thirteen patterns…',
  'discarding the flattering interpretation…',
  'verdict ready.'
];
