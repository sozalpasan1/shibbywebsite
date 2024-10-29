// Firebase configuration and initialization
const firebaseConfig = {
    apiKey: "uh oh",
    authDomain: "shibbyprojectpleasework.firebaseapp.com",
    projectId: "shibbyprojectpleasework",
    storageBucket: "shibbyprojectpleasework.appspot.com",
    messagingSenderId: "uh oh",
    appId: "uh oh",
    measurementId: "uh oh"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Cookie functions
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Username handling
let userName = getCookie('username');

function showNameModal() {
    document.getElementById('nameModal').style.display = 'block';
}

function submitName() {
    const nameInput = document.getElementById('userNameInput');
    const name = nameInput.value.trim();
    if (name) {
        userName = name;
        setCookie('username', name, 365); // Store for 1 year
        document.getElementById('nameModal').style.display = 'none';
    }
}

// Check for username when page loads
window.onload = function () {
    // Show name modal if username isn't set
    if (!userName) {
        showNameModal();
    }

    // Previous audio functionality
    let currentAudio = null;

    function playAudio(newAudio) {
        if (currentAudio && currentAudio !== newAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        currentAudio = newAudio;
        currentAudio.play();
    }

    // Your existing audio event listeners
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

    // Updated comment creation with username
    function createCommentElement(comment) {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `
            <div class="comment-username">${comment.userName}</div>
            <div class="comment-text">${comment.text}</div>
            <div class="comment-timestamp">${comment.timestamp.toDate().toLocaleString()}</div>
        `;
        return commentElement;
    }

    // Function to load comments for a rapper
    function loadComments(rapperId) {
        const commentsContainer = document.getElementById(`${rapperId}-comments`);
        
        // Clear existing comments
        commentsContainer.innerHTML = '';
        
        // Listen for real-time updates
        db.collection('rappers')
            .doc(rapperId)
            .collection('comments')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === 'added') {
                        const comment = change.doc.data();
                        const commentElement = createCommentElement(comment);
                        commentsContainer.insertBefore(commentElement, commentsContainer.firstChild);
                    }
                });
            }, (error) => {
                console.error("Error loading comments:", error);
            });
    }

    // Initialize comments for all rappers
    ['ksi', 'xxx', 'popsmoke'].forEach(rapperId => {
        loadComments(rapperId);
    });

    // Updated function to add a new comment with username
    window.addComment = function(rapperId) {
        if (!userName) {
            showNameModal();
            return;
        }

        const input = document.getElementById(`${rapperId}-comment-input`);
        const commentText = input.value.trim();

        if (commentText) {
            db.collection('rappers')
                .doc(rapperId)
                .collection('comments')
                .add({
                    text: commentText,
                    userName: userName,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                })
                .then(() => {
                    input.value = '';
                })
                .catch((error) => {
                    console.error("Error posting comment:", error);
                    alert("Error posting comment. Please try again.");
                });
        }
    }

    // Add enter key support for comment submission
    const commentInputs = document.querySelectorAll('.comment-input');
    commentInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                const rapperId = this.id.split('-')[0];
                addComment(rapperId);
            }
        });
    });

    // Previous Three.js and basketball animation code remains the same
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.y = 2;
    scene.add(cube);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });

    const basketball = document.getElementById('basketball');
    let positionX = window.innerWidth / 2;
    let positionY = window.innerHeight / 2;
    let velocityX = (Math.random() * 4 - 2);
    let velocityY = (Math.random() * 4 - 2);

    function updatePosition() {
        const ballWidth = basketball.offsetWidth;
        const ballHeight = basketball.offsetHeight;
        const maxX = window.innerWidth - ballWidth;
        const maxY = window.innerHeight - ballHeight;

        positionX += velocityX;
        positionY += velocityY;

        if (positionX <= 0 || positionX >= maxX) {
            velocityX = -velocityX;
            positionX = Math.max(0, Math.min(positionX, maxX));
        }
        if (positionY <= 0 || positionY >= maxY) {
            velocityY = -velocityY;
            positionY = Math.max(0, Math.min(positionY, maxY));
        }

        basketball.style.left = `${positionX}px`;
        basketball.style.top = `${positionY}px`;
    }

    document.addEventListener('mousemove', function (event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const ballCenterX = positionX + basketball.offsetWidth / 2;
        const ballCenterY = positionY + basketball.offsetHeight / 2;
        const distanceX = mouseX - ballCenterX;
        const distanceY = mouseY - ballCenterY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance < 100) {
            const forceX = distanceX / distance;
            const forceY = distanceY / distance;
            velocityX += forceX * 0.5;
            velocityY += forceY * 0.5;
        }
    });

    setInterval(updatePosition, 20);
    basketball.style.left = `${positionX}px`;
    basketball.style.top = `${positionY}px`;
};