// Get the basketball element
const basketball = document.getElementById('basketball');

// Function to generate random positions
function moveBasketball() {
    const randomX = Math.random() * (window.innerWidth - 100);
    const randomY = Math.random() * (window.innerHeight - 100);

    basketball.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

// Add hover event to the basketball
basketball.addEventListener('mouseover', moveBasketball);
