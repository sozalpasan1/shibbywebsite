// Wait for the DOM to load before running the script
window.onload = function() {
    // Get the basketball element
    const basketball = document.getElementById('basketball');
    
    // Set initial position in the center of the screen
    let positionX = window.innerWidth / 2;
    let positionY = window.innerHeight / 2;

    // Random initial velocity between -5 and 5 for X and Y
    let velocityX = (Math.random() * 100) - 5;
    let velocityY = (Math.random() * 100) - 5;

    // Function to update the basketball's position and handle bouncing
    function updatePosition() {
        const ballWidth = basketball.offsetWidth;
        const ballHeight = basketball.offsetHeight;
        const maxX = window.innerWidth - ballWidth;
        const maxY = window.innerHeight - ballHeight;

        // Update position by adding velocity
        positionX += velocityX;
        positionY += velocityY;

        // Check for collisions with the walls and reverse direction if needed
        if (positionX <= 0 || positionX >= maxX) {
            velocityX = -velocityX; // Reverse direction on X-axis
            positionX = Math.max(0, Math.min(positionX, maxX)); // Ensure ball stays within bounds
        }
        if (positionY <= 0 || positionY >= maxY) {
            velocityY = -velocityY; // Reverse direction on Y-axis
            positionY = Math.max(0, Math.min(positionY, maxY)); // Ensure ball stays within bounds
        }

        // Apply the new position
        basketball.style.left = `${positionX}px`;
        basketball.style.top = `${positionY}px`;
    }

    // Start moving the basketball by updating its position every 20ms
    setInterval(updatePosition, 20);

    // Initialize the basketball's position
    basketball.style.left = `${positionX}px`;
    basketball.style.top = `${positionY}px`;
};

