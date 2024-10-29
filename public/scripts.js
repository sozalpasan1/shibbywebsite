// Firebase configuration and initialization
const firebaseConfig = {
    apiKey: "AIzaSyDuweC9uS8GMLEs0M8q6c-Ssm2mcqSSd9Y",
    authDomain: "shibbyprojectpleasework.firebaseapp.com",
    projectId: "shibbyprojectpleasework",
    storageBucket: "shibbyprojectpleasework.appspot.com",
    messagingSenderId: "93344780820",
    appId: "1:93344780820:web:3310c2309c0ecd4bff0d01",
    measurementId: "G-2J69QSN0SK"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Wait for the DOM to load before running the script
window.onload = function () {
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

    // Firestore Comments functionality
    function createCommentElement(comment) {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `
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

    // Function to add a new comment
    window.addComment = function(rapperId) {
        const input = document.getElementById(`${rapperId}-comment-input`);
        const commentText = input.value.trim();

        if (commentText) {
            db.collection('rappers')
                .doc(rapperId)
                .collection('comments')
                .add({
                    text: commentText,
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