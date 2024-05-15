// Function to calculate mana regeneration per second
function calculateManaRegen(elapsedTime) {
    // Example: 1 mana per second
    const manaPerSecond = 1;
    const secondsPassed = elapsedTime / 1000; // Convert milliseconds to seconds
    const manaRegen = manaPerSecond * secondsPassed;
    return manaRegen;
}

// Function to update mana based on real-time clock
function updateMana() {
    // Get current timestamp
    const currentTime = Date.now();

    // Calculate elapsed time since last update
    const elapsedTime = currentTime - lastUpdateTime;

    // Calculate mana regeneration based on elapsed time
    const manaRegen = calculateManaRegen(elapsedTime);

    // Update mana
    mana += manaRegen;

    // Limit mana to a maximum value, if needed
    if (mana > maxMana) {
        mana = maxMana;
    }

    // Update last update time
    lastUpdateTime = currentTime;

    // Display mana value
    console.log("Mana:", mana);
    document.getElementById("mana").innerHTML = ("Mana:", mana)
}

// Placeholder variables
let mana = 0;
const maxMana = 100;
let lastUpdateTime = Date.now(); // Initialize last update time to current time

// Simulation loop
function mainLoop() {
    // Perform game logic and rendering here

    // Update mana
    updateMana();

    // Call main loop recursively
    requestAnimationFrame(mainLoop);
}

// Start the simulation
mainLoop();
