// Function to get the current time in milliseconds
function getCurrentTime() {
    return Date.now();
}

// Function to calculate the current resource value based on derivatives
function calculateResourceValue(elapsedTime, derivatives) {
    const secondsPassed = elapsedTime / 1000; // Convert milliseconds to seconds
    let resourceValue = 0;
    let factorial = 1;
    let powerOfTime = 1;
 
    for (let i = 0; i < derivatives.length; i++) {
        resourceValue += derivatives[i] * powerOfTime / factorial;
        powerOfTime *= secondsPassed;
        factorial *= (i + 1);
    }

    return resourceValue;
}

// Function to update the resource based on real-time clock
function updateResource(totalElapsedTime, derivatives) {
    // Calculate resource value based on total elapsed time and derivatives
    const resourceValue = calculateResourceValue(totalElapsedTime, derivatives);

    // Update resource
    resource = resourceValue;

    // Limit resource to a maximum value, if needed
    if (resource > maxResource) {
        resource = maxResource;
    }

    // Display resource value
    console.log("Resource:", resource);
    document.getElementById("resource").innerHTML = "Resource: " + resource.toFixed(2);
}

// Placeholder variables
let resource = 0;
const maxResource = 100;
const startTime = getCurrentTime(); // Initialize start time

// Derivatives array, where each element represents the nth derivative of the resource
// For example: [initialValue, initialVelocity, initialAcceleration, initialJerk, ...]
let derivatives = [0, 1, 0.5, 0]; // Initial values for position, velocity, acceleration, and jerk

// Simulation loop
function mainLoop() {
    // Calculate total elapsed time since start
    const currentTime = getCurrentTime();
    const totalElapsedTime = currentTime - startTime;

    // Update resource
    updateResource(totalElapsedTime, derivatives);

    // Call main loop recursively
    requestAnimationFrame(mainLoop);
}

// Example functions to update derivatives dynamically
function setDerivative(index, value) {
    derivatives[index] = value;
}

// Start the simulation
mainLoop();
