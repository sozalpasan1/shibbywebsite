// Wait for the DOM to load before running the script
window.onload = function() {
    // Get the basketball element
    //document.getElementById("my_audio").play();
    const basketball = document.getElementById('basketball');
    
    // Set initial position in the center of the screen
    let positionX = window.innerWidth / 2;
    let positionY = window.innerHeight / 2;

    // Slower random initial velocity between -2 and 2 for X and Y
    let velocityX = (Math.random() * 4 - 2);
    let velocityY = (Math.random() * 4 - 2);

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

    // Add mouse proximity detection
    document.addEventListener('mousemove', function(event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        // Calculate the distance between the mouse and the basketball
        const ballCenterX = positionX + basketball.offsetWidth / 2;
        const ballCenterY = positionY + basketball.offsetHeight / 2;
        const distanceX = mouseX - ballCenterX;
        const distanceY = mouseY - ballCenterY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        // If the mouse is close to the ball (less than 100px), push the ball away
        if (distance < 100) {
            // Calculate the direction to push the ball away
            const forceX = distanceX / distance;
            const forceY = distanceY / distance;

            // Apply a force to the velocity to push the ball away
            velocityX += forceX * 0.5;
            velocityY += forceY * 0.5;
        }
    });

    // Start moving the basketball by updating its position every 20ms
    setInterval(updatePosition, 20);

    // Initialize the basketball's position
    basketball.style.left = `${positionX}px`;
    basketball.style.top = `${positionY}px`;

};
