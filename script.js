let countdownTime = 108 * 60; // 1 minute (60 seconds)
let interval;
const correctCode = "4 8 15 16 23 42"; // Correct code sequence
let crashStarted = false; // Track if the crash effect has started

function startCountdown() {
    interval = setInterval(updateCountdown, 1000); // Update every second
}

function updateCountdown() {
    let minutes = Math.floor(countdownTime / 60);
    let seconds = countdownTime % 60;

    document.getElementById("countdown").innerText = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (countdownTime > 0) {
        countdownTime--;
    } else if (!crashStarted) {
        // Trigger crash effect
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

    // Play error sound
    let errorSound = document.getElementById("errorSound");
    errorSound.play();

    // Display the error effect every 3 seconds for added drama
    setInterval(() => {
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
    document.getElementById("alertMessage").style.display = "none";
    document.getElementById("codeInput").style.display = "none";
    document.getElementById("submitCodeButton").style.display = "none";
    document.getElementById("errorMessage").style.display = "none";
    document.getElementById("codeInput").value = ""; // Clear the code input
    document.body.classList.remove("crash"); // Remove crash effect
    crashStarted = false; // Reset crash status
    startCountdown(); // Restart countdown
}

// Start countdown on page load
window.onload = startCountdown;
