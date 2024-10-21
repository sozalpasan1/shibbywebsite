// Get the basketball element
const basketball = document.getElementById('basketball');
let velocityX = 0;
let velocityY = 0;
let positionX = window.innerWidth / 2;
let positionY = window.innerHeight / 2;
let moving = false;
let intervalId;

// Function to start the ball movement
function moveBasketball() {
    if (!moving) {
        // Random initial velocity between -5 and 5
        velocityX = (Math.random() * 10) - 5;
        velocityY = (Math.random() * 10) - 5;
        // Start moving the ball
        intervalId = setInterval(updatePosition, 20);
        moving = true;
    }
}

// Function to update the basketball's position and handle bouncing
function updatePosition() {
    const ballWidth = basketball.offsetWidth;
    const ballHeight = basketball.offsetHeight;
    const maxX = window.innerWidth - ballWidth;
    const maxY = window.innerHeight - ballHeight;

    // Update position
    positionX += velocityX;
    positionY += velocityY;

    // Bounce off the walls by reversing velocity when hitting boundaries
    if (positionX <= 0 || positionX >= maxX) {
        velocityX = -velocityX;
        positionX = Math.max(0, Math.min(positionX, maxX));
    }
    if (positionY <= 0 || positionY >= maxY) {
        velocityY = -velocityY;
        positionY = Math.max(0, Math.min(positionY, maxY));
    }

    // Apply the new position
    basketball.style.left = `${positionX}px`;
    basketball.style.top = `${positionY}px`;
}

// Add click event to the basketball to start the movement
basketball.addEventListener('click', moveBasketball);

// Initialize the basketball's position
basketball.style.left = `${positionX}px`;
basketball.style.top = `${positionY}px`;