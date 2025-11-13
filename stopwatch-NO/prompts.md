Act as a Senior Software Engineer with extensive experience in web applications using HTML and JavaScript. 
We need to create an online stopwatch application with two main features. Follow good practices and write clean code —you are an expert.
1 -  Stopwatch: it's a chronometer with 2 buttons, start and clear.
  a. Start button:     
     * When the user clicks the start button, it changes the label to stop, and the chronometer starts counting until the user clicks the button again (with the label stop)
    * After the user click stop button, the chronometer stop change the label to continue, if the user click again the continue button, the chronmeter continue counting.  
 b. Clear button:
     * When the user clicks the clear button, the chronometer resets to 0, even when it is counting or stopped.
   
2 - Countdown: it's a chronometer that requires setting the initial time to count down. It contains number buttons, a set button, and a clear button.
 - Numbers buttons: It's a keyword with all number buttons from 0 to 9. When some of them are clicked, it adds time to the chronometer, starting from seconds and progressing to hours, to set the countdown time.
 - Set button: 
   * When the user clicks the set button, it changes the label to stop, and the chronometer starts counting down until the user clicks the button again (with the label pause)
    * After the user click pause button, the chronometer stop change the label to continue, if the user click again the continue button, the chronmeter continue counting.      

We will proceed to build this application in different tasks. I will pass prototypes for each one, and not continue with the next until I give you the OK.

Task 1: Landing page, which will contain two buttons for both features, the  stopwatch and the countdown

Task 2: Stopwatch feature

Task 3: Countdown feature

Ask clarifying questions if anything is ambiguous before generating the final input

My template input is: 
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Timer and Countdown</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<h1>Timer and Countdown</h1>
<script src="script.js"></script>
</body>
</html>

 You have to deliver index.html and script.js files with well-structured, clean code.

Let's start with the task 1: 
Landing page, I attached the prototype that we need to build
