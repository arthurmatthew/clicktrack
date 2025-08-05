# Personal Notes

### Features & Fixes from testing session 2/5/25

- Gradual Tempo Changes
- Custom Start Position
- Custom Accents (Early versions prob just downbeat)
- Custom Metronome Sound (contributor implemented this, could be square triangle etc, more percussive sounds)

- More robust login requirements
- - no fake emails, password length requirement (8 is the limit but it doesn't say that)
- - similarly, implement firebase login errors rather than being vague
- - Microsoft Login
- - email verification (dont interrupt user flow)
- - forgot password feature
- - don't override email password login when logging in with google
- Display name limit stricter & purposeful
- Metronome sine wave overlaps at higher tempos
- fix light mode (darker bg, lighter elements)
- #### 1/1 not working, bad metronome logic . anything denominator of 1

NEW NOTES 6/25

autosave!!!
1/1 works now but the accent beats dont work right, actually they do but just test more

continue v7 migration , framework will take a while

probably rework UX flow, so go from landing page into default clicktrack which can be saved locally

transition drag and drop is buggy asf, how to update consistently?
actually add edits for transition

------ NEW NOTES 8/4/25

ai bullshit possibly

Accent Map
Add visual legend or tooltip to explain accent levels.

Consider using color/opacity instead of stacked bars.

Optional: use dots or vertical meter-style indicators (●○○).

Sequencer Layout
Use grid layout for consistent spacing.

Add vertical dividers every 4 subdivisions.

Alternate background colors per beat for visual chunking.

Playback Feedback
Add a playhead highlight or glow for current step.

Use animation or color shift (transition-colors, bg-purple-500 etc).

Time Signature UI
Replace buttons with a dropdown or grid selector.

Use “notation-style” (4 above 4) for readability.

Add tooltip: “X beats per measure, Y note gets the beat”

Interaction Feedback
Add hover/tap effects to accent blocks & buttons.

Tooltips: “Click to change accent level”, etc.

Layout Consistency
Align text sizes (text-sm, text-md) and paddings (p-4, gap-2).

Balance spacing across all panels for cleaner layout.
