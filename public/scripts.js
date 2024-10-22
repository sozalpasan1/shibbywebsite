// Wait for the DOM to load before running the script
window.onload = function () {

    // Variable to keep track of the currently playing audio
    let currentAudio = null;

    // Function to stop the current audio (if any) and play the new one
    function playAudio(newAudio) {
        if (currentAudio && currentAudio !== newAudio) {
            currentAudio.pause();          // Pause the current audio
            currentAudio.currentTime = 0;  // Reset its play time to 0
        }
        currentAudio = newAudio;           // Set the new audio as the current one
        currentAudio.play();               // Play the new audio
    }

    // Add event listeners to the images to play corresponding audio
    document.getElementById('sigma').addEventListener('click', function () {
        const audio = document.getElementById('popsmoke');
        playAudio(audio);
    });

    document.getElementById('deez').addEventListener('click', function () {
        const audio = document.getElementById('tentacion');
        playAudio(audio);
    });

    document.getElementById('ksi').addEventListener('click', function () {
        const audio = document.getElementById('king');
        playAudio(audio);
    });



    // Create a scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // Create a renderer and attach it to the body
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add a rotating cube as an example
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const cube = new THREE.Mesh(geometry, material);

    // Set the cube's position higher up on the screen
    cube.position.y = 2;  // This moves the cube higher on the y-axis
    scene.add(cube);

    camera.position.z = 5;

    // Animation function
    function animate() {
        requestAnimationFrame(animate);

        // Rotate the cube for the animation effect
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
    }

    animate();

    // Make sure the 3D background scales with the window
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });

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
    document.addEventListener('mousemove', function (event) {
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
