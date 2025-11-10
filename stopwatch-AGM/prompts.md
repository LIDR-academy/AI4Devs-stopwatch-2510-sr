# Prompts Documentation

## Original Prompt

```
# Role

You are an expert frontend developer, proficient in the use of HTML and Javascript with no frameworks.

# Project

I want to create a webpage with simple Stopwatch / countdown functionality. When accessing the page, users will select whether they want to use a Stopwatch or a Countdown timer, which will the show the relevant view when clicked (stopwatch or timer).

The Stopwatch view will have the classical features of stopwatches, with a big area showing the current hours/minutes seconds (and milliseconds in smaller numbers), and two buttons: one to start/stop the count (if the stopwatch is not running it will show "Start" and start the stopwatch when clicked, and if the stopwatch is running it will show "Stop" and stop the timer when clicked). The other button is to clear the timer (set it back to 0). Besides that, there should be a link to go back to the main view (with the stopwatch / countdown selector).

The countdown view works in two steps: first, the user sets the starting time (hours, minutes, and seconds). Then, the view will show a "Start" button (to start the countdown to 0) and a Clear button (to reset the view). While the countdown is running, the "start" button shows "Pause", and when clicking on it, the countdown pauses and the button shows "Continue". When clicking "Continue", the countdown resumes. Once the countdown reaches 0, the timer text starts "blinking" (switching between its background color and a light red color every 500ms), and a an alert sound show be played. Besides that, there should be a link to go back to the main view (with the stopwatch / countdown selector).

# Requirements

## 3 views

### Main view (initial view)

- Displays two big icons, one with an arrow up and the text "Stopwatch" on the left, and one with an arrow down and the text "Countdown" on the right.
- When clicking the Stopwatch area, the user switches to the "Stopwatch" view.
- When clicking the Countdown area, the user switches to the "Countdown" view.

### Stopwatch view

- Displays a timer in hours, minutes, seconds, and milliseconds shown smaller. You have an example in the "stopwatch_example.png" file I am attaching.
- Shows two buttons: a "Start" and a "Clear" button.
- The "Clear" button resets the Stopwatch to its initial state (shows the start / clear buttons and the time is set to all 0s)
- When clicking the "Start" button:
    - The stopwatch starts, and the time input starts to increase in realtime, showing the ellapsed time in hours, minutes seconds and milliseconds.
    - The start button changes to the "Pause".
- When clicking the "Pause" button, the timer stops, showing the value it had when the button was clicked (not increasing again). Also, after clicking it the button becomes the "Continue" button. So for instance if the timer was at 00:01:23.088 when the button was clicked, the time will stop there and won't keep updating until the continue button is clicked.
- When clicking the "Continue" button, the stopwatch continues counting from where it was paused. So for instance if the stopwatch was paused at 00:09:27.123, it will continue counting up from that number.
- There is a "Back" button that takes the user back to the main view.

### Countdown view

- Starts showing counter inputs for hours, minutes and seconds. The user can type directly on each of these or can just click up/down to increase/decrease the value.
- It also shows a "Set" button and a "Clear" button.
- The "Clear" button resets the view, setting all inputs to 0 and showing the set button.
- The set button is disabled by default, and enabled as soon as one of hours. minutes or seconds has a non-zero value. After clicking set, the hours/minutes/seconds input changes to a single element, which shows the starting time in format hh:mm:ss (and a smaller 000 for the milliseconds part). It also shows the "Start" and "Clear" buttons.
- When clicking "Start", the timer starts to countdown from the time that was set, updating the values in real-time. Then, the Start button becomes the "Pause" button.
- When clicking "Pause", the countdown pauses (it stops counting down). And the Pause button becomes the "Continue" button.
- When clicking the "Continue" button, the countdown continues from where it currently is. So if it was at "00:07:44" when it was paused, when clicking the continue button the countdown resumes from there. Also, after clicking it the button becomes the "Pause" button again.
- When clicking "Clear", the timer is reset to the value that was set (e.g. if the user set the countdown to 00:26:11, clicking Clear will stop the countdown and set it back to that value). And the other button bnecomes the "Start" button again.
- Once the countdown reaches 0, the timer text starts "blinking" (switching between its background color and a light red color every 500ms), and a an alert sound show be played. Besides that, there should be a link to go back to the main view (with the stopwatch / countdown selector).
- There is a "Back" button that takes the user back to the main view.

# Output artifacts

The output should contain the updated index.html and script.js files, plus a markdown file called "prompts.md" which contains the prompt I used. If any clarification questions are needed, present me with options so that I can choose answers with A / B / C style, and include both the clarification questions and my responses in the prompts.md file as well. The prompts file should only contain the prompts and if clarification questions were needed, the questions and answers too, but nothing else like the reasoning you did.
```

---

## Clarification Questions and Answers

**Q1: Alert Sound** - For the countdown completion alert sound, would you prefer:
- A) Use the browser's built-in beep sound (simple but limited)
- B) Use a Web Audio API generated tone (customizable)
- C) No preference, choose what works best

**A1:** A

**Q2: Countdown Input Range** - For the countdown time inputs:
- A) Allow any positive number (with reasonable limits like 99 hours)
- B) Limit to specific ranges (e.g., 0-23 hours, 0-59 minutes/seconds)
- C) No preference

**A2:** B

**Q3: Blinking Behavior** - When countdown reaches 0 and starts blinking:
- A) Blink indefinitely until user clicks Clear or Back
- B) Stop blinking after a certain duration (e.g., 10 seconds)
- C) No preference

**A3:** B

---

## Second Iteration Prompt

```markdown
Let's add some improvements:

# Countdown

- It is counting an extra second. So for instance, when I start from 00:00:10.000, it goes immediatly to 00:00:10.999, so it takes an extra second to get back to 10. The expected behavior is that after starting, the countdown goes from 00:00:10.000 to 00:00:09.999 and continues counting down from there
- The beep only sounds once. Let's make it sound every 500ms for the same duration as the blinking.
- Include a button to "Reset" the view, so that the inputs to set the countdown time are shown again.

# Output artifacts

The output should contain the updated index.html and script.js files, plus a markdown file called "prompts.md" which contains all the prompts I used, the clarification questions and their answers. If any clarification questions are needed, present me with options so that I can choose answers with A / B / C style, and include both the clarification questions and my responses in the prompts.md file as well. The prompts file should only contain the prompts and if clarification questions were needed, the questions and answers too, but nothing else like the reasoning you did. This means that the expected prompts.md file after this iteration will have all the contents of the previous output + this prompt and any clarification questions / answers.
```

---

## Clarification Questions and Answers

**Q4: Reset Button Placement** - For the new "Reset" button in the countdown timer phase:
- A) Replace the existing "Clear" button with "Reset" (so there's only Start/Pause and Reset)
- B) Add "Reset" as a third button alongside Start/Pause and Clear
- C) Show "Reset" only after countdown completes (replacing Clear temporarily)

**A4:** B

---