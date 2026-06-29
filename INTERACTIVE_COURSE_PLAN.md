# Interactive Course Plan

## Purpose

This plan defines what the interactive websites should do for the three courses:

- `web_dev_two/interactive-course/`
- `intro_python/interactive-course/`
- `game_dev/interactive-course/`

The original goal for `web_dev_two/interactive-course/` was to give students an easy way to review lessons they have already learned. That remains the right model for Web Dev because the class has already finished Week 9 and the site can focus on review, practice, and debugging traces.

For `intro_python` and `game_dev`, the sites should still support review, but they should also help students repair understanding and prepare for final projects. Both courses are close to project mode:

- Intro Python has finished Week 8.
- Game Dev has finished Week 9.

So the two new interactive sites should serve a broader role than the Web Dev review site.

---

## High-Level Decision

| Course | Interactive site should serve as |
|---|---|
| Web Dev 102 | Lesson review site |
| Intro Python | Concept review + debugging practice + project readiness site |
| Game Dev | Visual debugging guide + Space Shooter repair center + final game project bridge |

---

# 1. Web Dev Interactive Course

## Main Role

`web_dev_two/interactive-course/` should remain a **lesson review site**.

Students have already learned most of the material, so the site should help them revisit concepts in a lower-pressure way.

## Student Promise

> If you forgot a Web Dev concept, this site helps you review it, trace it, practice it, and explain it again.

## Best Features

- Weekly lesson review
- React state/event tracing
- Practice exercises
- Code reading
- Feynman checks
- Debugging traces

## Why the Debugging Trace Matters

The debugging trace is valuable because it makes invisible behavior visible.

For Web Dev, students often need to see:

```text
event → handler runs → state changes → component re-renders → UI updates
```

This is hard to understand from code alone. A trace helps students see the flow.

---

# 2. Intro Python Interactive Course

## Main Role

`intro_python/interactive-course/` should serve as a:

```text
Concept Review + Debugging Practice + Project Bridge
```

Students have finished Week 8, so the site should help them consolidate core Python skills and prepare for Week 9 Tic-Tac-Toe and the final project.

## Student Promise

> If you can pass these traces, bug fixes, and mini checks, you are ready to build Tic-Tac-Toe and your final Python project.

## Core Question the Site Should Answer

```text
Do I understand enough Python to build a small project by myself?
```

## Skills to Review

The site should help students review and test themselves on:

- input and output
- variables
- strings and numbers
- type conversion
- conditionals
- `while` loops
- `for` loops
- functions
- return values
- lists
- dictionaries
- error handling
- project structure
- console game flow

---

## Recommended Site Structure

```text
1. Review by Week
2. Review by Skill
3. Debug Common Bugs
4. Project Readiness
5. Final Project Ideas
```

---

## Review by Week

Suggested pages:

```text
Week 1 — Python Basics
Week 2 — Variables and Types
Week 3 — Conditionals and Loops
Week 4 — Functions
Week 5 — Lists and Dictionaries
Week 6 — Debugging and Errors
Week 7 — Number Guessing Game Plus
Week 8 — Rock Paper Scissors Tournament
Week 9 — Tic-Tac-Toe Prep
```

Even though students have only finished Week 8, include Week 9 prep as a bridge.

---

## Review by Skill

Students often do not think, “I need Week 5.” They think, “I forgot lists.”

So the site should let them review by skill:

```text
Input / Output
Variables
Strings and Numbers
Conditionals
While Loops
For Loops
Functions
Lists
Dictionaries
Try / Except
Project Structure
```

Each skill page should contain:

```text
What it means
Tiny example
Debug trace
Common mistake
Practice check
Explain it simply
```

---

## Debug Common Bugs

This should be a major section of the Intro Python site.

Suggested bug pages:

```text
Bug: input is a string
Bug: infinite loop
Bug: score resets to 0
Bug: function prints instead of returns
Bug: list index out of range
Bug: dictionary key error
Bug: ValueError from int(input())
Bug: code is outside the loop by mistake
Bug: indentation changes the program
```

Each bug page should include:

```text
Broken code
What the student expected
What actually happens
Trace
Fix
Mini challenge
```

---

## Debug Trace Style for Intro Python

Intro Python traces should show:

```text
line → variable change → output
```

Example:

```python
score = 0
score = score + 5
score = score - 2
print(score)
```

Trace:

| Step | Line | Variables | Output |
|---:|---|---|---|
| 1 | `score = 0` | `score: 0` | |
| 2 | `score = score + 5` | `score: 5` | |
| 3 | `score = score - 2` | `score: 3` | |
| 4 | `print(score)` | `score: 3` | `3` |

This helps students understand what happens between lines.

---

## Tic-Tac-Toe Readiness

Because Week 9 is Tic-Tac-Toe, the site should include a readiness checklist.

```text
Before Week 9, can you...

[ ] print a list as a board
[ ] ask a player for a position
[ ] check if a position is valid
[ ] change one item in a list
[ ] switch turns
[ ] write a function that returns True or False
[ ] repeat until the game ends
```

This turns review into preparation.

---

## Final Project Ideas

The site should help students choose realistic final projects.

Suggested project cards:

```text
Beginner:
- Quiz Game
- Number Guessing Game
- Rock Paper Scissors Plus
- Shopping List
- Pet Simulator

Medium:
- Text Adventure
- Tic-Tac-Toe Variant
- Inventory RPG
- Typing Speed Game
- Flashcard Study App
```

Each project card should show:

```text
skills needed
minimum version
stretch ideas
```

Example:

```text
Project: Virtual Pet

Skills:
[ ] variables
[ ] loops
[ ] functions
[ ] dictionary for pet stats
[ ] input validation

Minimum version:
- feed pet
- play with pet
- show hunger/happiness

Stretch:
- random events
- save pet name
- shop system
```

---

## Recommended First Version for Intro Python

Do not build everything at once.

Build this first:

```text
1. Review by Skill
2. Debug Common Bugs
3. Week 9 Tic-Tac-Toe Readiness
```

Minimum pages:

```text
Conditionals
Loops
Functions
Lists
Dictionaries
Try/Except
Number Guessing Review
Rock Paper Scissors Review
Tic-Tac-Toe Prep
```

Minimum components:

```text
PythonTrace
PredictOutput
BugFix
ProjectChecklist
```

---

# 3. Game Dev Interactive Course

## Main Role

`game_dev/interactive-course/` should serve as a:

```text
Visual Debugging Guide + Space Shooter Repair Center + Final Game Project Bridge
```

Students have finished Week 9, so they are near the end of the guided Space Shooter build. The site should help them understand and repair their game before moving into final project mode.

## Student Promise

> If your game is broken, this site helps you find where. If you are ready to build your own game, this site helps you choose and scope it.

## Core Question the Site Should Answer

```text
Can I understand, debug, and modify my own Pygame game?
```

---

## Why Game Dev Needs a Different Kind of Review

For Game Dev, normal code review is not enough. The hard part is visual and time-based.

Students need to understand:

```text
What happens every frame?
What gets drawn first?
Where is the Rect?
Why does collision happen?
Why does speed depend on dt?
Why is a Sprite useful?
Why do groups update/draw many objects?
```

So the Game Dev site should focus on:

```text
visual explainers
frame-by-frame traces
bug diagnosis
project checkpoints
```

---

## Recommended Site Structure

```text
1. Review by Week
2. Visual Concepts
3. Space Shooter Repair Center
4. Final Game Project Builder
5. Debug Checklist
```

---

## Review by Week

Suggested pages:

```text
Week 1 — Window and Game Loop
Week 2 — Drawing and Coordinates
Week 3 — Input
Week 4 — Collision and Score
Week 5 — Space Shooter Setup
Week 6 — Assets and Passive Movement
Week 7 — Delta Time and Shooting
Week 8 — Player Class
Week 9 — Sprites and Groups
```

Each week page should include:

```text
Mission recap
Visual trace
Common bugs
Mini checkpoint
```

---

## Visual Concepts

This should be the heart of the Game Dev site.

Suggested visual concept pages:

```text
Game Loop Visualizer
Coordinate System
Draw Order
Rect Collision
Event Input vs Continuous Input
Delta Time
Class/Object
Sprite Group
Timer Events
Collision Groups
```

Each visual concept should include:

```text
animation
small code snippet
debug trace
common mistake
```

---

## Debug Trace Style for Game Dev

Game Dev traces should show:

```text
frame → input → update → collision → draw
```

Example:

```text
Frame 1
1. handle events
2. read keys
3. update player position
4. update lasers
5. update meteors
6. check collisions
7. draw background
8. draw sprites
9. update display

Frame 2
1. repeat
```

This is the Game Dev version of the Web Dev debugging trace.

---

## Visual Demos to Build

### 1. Game Loop Visualizer

Show:

```text
events → update → draw → display update → next frame
```

Students should see:

- current frame number
- event queue
- player position
- screen redraw
- why `screen.fill()` is needed
- why `pygame.display.update()` is needed

---

### 2. Coordinate System Demo

Interactive canvas:

```text
Drag the player to x=300, y=200.
Watch rect.center change.
```

---

### 3. Draw Order Demo

Let students reorder drawing commands:

```python
screen.fill("black")
pygame.draw.circle(...)
pygame.draw.rect(...)
```

Show how later drawing appears on top.

---

### 4. Event vs Key-State Demo

Compare event-based input:

```python
for event in pygame.event.get():
    if event.type == pygame.KEYDOWN:
        ...
```

With continuous key-state input:

```python
keys = pygame.key.get_pressed()
if keys[pygame.K_RIGHT]:
    ...
```

This is important for movement and shooting.

---

### 5. Rect Collision Demo

Let students drag two rectangles and watch:

```python
player_rect.colliderect(item_rect)
```

Change between:

```text
False → True
```

---

### 6. Delta Time Demo

Show two players:

```text
Without dt: speed changes by frame rate
With dt: speed stays stable in real time
```

Code:

```python
player_pos.x += speed * dt
```

---

### 7. Sprite Group Demo

Visualize:

```python
all_sprites.update(dt)
all_sprites.draw(display_surface)
```

Example groups:

```text
all_sprites:
- Player
- Star
- Laser
- Meteor

collision_sprites:
- Player
- Meteor
```

Show that one object can belong to multiple groups.

---

## Space Shooter Repair Center

This should be one of the most useful sections of the Game Dev site.

Organize it by symptom, because students usually ask for help this way:

```text
My window opens then closes
My image does not appear
My player does not move
My player moves too fast
My laser does not shoot
My meteor does not spawn
My collision does not work
My score resets
My game lags
My class has an error
My sprite group does not draw
```

Each repair page should include:

```text
Likely cause
Where to check
Debug trace
Fix checklist
```

Example:

```text
Problem: My score always stays 0

Check:
[ ] Is score created before the game loop?
[ ] Are you setting score = 0 inside the loop?
[ ] Does collision actually become True?
[ ] Does score += 1 run?
[ ] Are you drawing the new score after updating it?
```

---

## Final Game Project Builder

After Week 9, students need help choosing and scoping final game projects.

The site should include a final project builder.

Flow:

```text
1. Choose game type
2. Choose player action
3. Choose objective
4. Choose obstacles/enemies
5. Choose scoring/win/lose condition
6. Generate project checklist
```

Example output:

```text
Your game: Coin Collector

Core checklist:
[ ] window opens
[ ] player moves
[ ] coin appears
[ ] collision increases score
[ ] coin respawns
[ ] game ends at 10 coins

Stretch:
[ ] timer
[ ] bad coins
[ ] sound effect
[ ] start screen
```

---

## Final Game Project Ideas

Suggested project cards:

```text
Collector Game
Dodge Game
Space Shooter Variant
Maze Escape
Clicker Game
Falling Objects Game
Platform Avoider
Boss Fight
```

Each card should include:

```text
minimum version
skills needed
assets needed
stretch features
what to copy from Space Shooter
what to change
```

Example:

```text
Project: Dodge the Meteors

Minimum:
- player moves
- meteors fall
- collision ends game
- survival timer

Skills:
[ ] player movement
[ ] meteor spawn
[ ] sprite groups
[ ] collision
[ ] score/timer

Stretch:
- powerups
- levels
- lives
- restart screen
```

---

## Recommended First Version for Game Dev

Do not build everything at once.

Build this first:

```text
1. Visual Concepts
2. Space Shooter Repair Center
3. Final Game Project Builder
```

Minimum pages:

```text
Game Loop
Coordinates
Rect Collision
Input
Delta Time
Classes
Sprites/Groups
Space Shooter Debug Checklist
Final Project Ideas
```

Minimum components:

```text
GameLoopTrace
RectVisualizer
CollisionDemo
DeltaTimeDemo
SpriteGroupDemo
RepairChecklist
ProjectBuilder
```

---

# 4. Difference Between the Three Sites

| Site | Main role | Best features |
|---|---|---|
| Web Dev | Lesson review | state trace, React event flow, weekly practice, Feynman checks |
| Intro Python | Concept repair + project readiness | variable trace, predict output, bug fixing, console checks, Tic-Tac-Toe prep |
| Game Dev | Visual debugging + project launchpad | frame trace, Rect/collision demos, delta time demo, Space Shooter repair, final game builder |

---

# 5. Suggested Content Balance

## Web Dev

```text
70% lesson review
20% debugging trace
10% practice / explanation
```

## Intro Python

```text
60% review/debugging
25% project readiness
15% final project ideas
```

## Game Dev

```text
40% review
40% debugging/repair
20% final project planning
```

---

# 6. Implementation Priority

## Phase 1 — Intro Python Vertical Slice

Build:

```text
intro_python/interactive-course/
```

First focus:

```text
Review by Skill
Debug Common Bugs
Week 9 Tic-Tac-Toe Readiness
```

Initial pages:

```text
Conditionals
Loops
Functions
Lists
Dictionaries
Try/Except
Number Guessing Review
Rock Paper Scissors Review
Tic-Tac-Toe Prep
```

Initial components:

```text
PythonTrace
PredictOutput
BugFix
ProjectChecklist
```

---

## Phase 2 — Game Dev Vertical Slice

Build:

```text
game_dev/interactive-course/
```

First focus:

```text
Visual Concepts
Space Shooter Repair Center
Final Game Project Builder
```

Initial pages:

```text
Game Loop
Coordinates
Rect Collision
Input
Delta Time
Classes
Sprites/Groups
Space Shooter Debug Checklist
Final Project Ideas
```

Initial components:

```text
GameLoopTrace
RectVisualizer
CollisionDemo
DeltaTimeDemo
SpriteGroupDemo
RepairChecklist
ProjectBuilder
```

---

# 7. Guiding Principle

The sites should not become prettier slide decks.

They should help students do three things:

```text
1. Remember what they learned.
2. See what the code is doing.
3. Fix or prepare their own project.
```

For Web Dev, the main job is review.

For Intro Python, the main job is confidence and readiness.

For Game Dev, the main job is visual debugging and project rescue.

---

# Final Decision

Create both interactive websites, but give each one a different job:

```text
web_dev_two/interactive-course/
→ lesson review

intro_python/interactive-course/
→ concept review + debugging practice + project readiness

game_dev/interactive-course/
→ visual debugging + Space Shooter repair + final project planning
```

This matches where each class is right now and avoids building the same site three times.
