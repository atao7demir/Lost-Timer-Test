let countdownTime = 108 * 60; // 108 minutes in seconds
let interval;
const correctCode = "4 8 15 16 23 42"; // Correct code sequence
let crashStarted = false; // Track if the crash effect has started
let soundInterval; // Interval for repeating the sound
let startTime; // Start time for real-time tracking

// Start the countdown when the page loads
window.onload = startCountdown;

function startCountdown() {
    startTime = Date.now(); // Record the start time in milliseconds
    interval = setInterval(updateCountdown, 1000); // Update every second
}

function updateCountdown() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Calculate elapsed time in seconds
    const remainingTime = countdownTime - elapsedTime; // Calculate remaining time

    if (remainingTime >= 0) {
        let minutes = Math.floor(remainingTime / 60);
        let seconds = remainingTime % 60;

        document.getElementById("countdown").innerText = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else if (!crashStarted) {
        // Trigger crash effect if time is up
        startCrashEffect();
    }
}

function startCrashEffect() {
    clearInterval(interval); // Stop countdown
    crashStarted = true;

    document.getElementById("alertMessage").style.display = "block";
    document.getElementById("codeInput").style.display = "inline";
    document.getElementById("submitCodeButton").style.display = "inline";

    // Start shaking effect
    document.body.classList.add("crash");

    // Play error sound initially
    let errorSound = document.getElementById("errorSound");
    errorSound.play();

    // Repeat the sound every 3 seconds
    soundInterval = setInterval(() => {
        errorSound.play();
    }, 3000);
}

function submitCode() {
    const userCode = document.getElementById("codeInput").value.trim();

    if (userCode === correctCode) {
        resetCountdown(); // If the correct code is entered, reset countdown
    } else {
        document.getElementById("errorMessage").style.display = "block"; // Show incorrect code message
    }
}

function resetCountdown() {
    countdownTime = 108 * 60; // Reset to 108 minutes
    startTime = Date.now(); // Reset start time for real-time tracking
    document.getElementById("alertMessage").style.display = "none";
    document.getElementById("codeInput").style.display = "none";
    document.getElementById("submitCodeButton").style.display = "none";
    document.getElementById("errorMessage").style.display = "none";
    document.getElementById("codeInput").value = ""; // Clear the code input
    document.body.classList.remove("crash"); // Remove crash effect
    crashStarted = false; // Reset crash status

    // Stop the error sound and clear the repeating sound interval
    let errorSound = document.getElementById("errorSound");
    errorSound.pause();
    errorSound.currentTime = 0; // Reset sound to the beginning
    clearInterval(soundInterval); // Stop the repeating sound

    startCountdown(); // Restart countdown
}
