// Mobile Menu Toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-menu-open');
}

// Project Details with Images
function showProjectDetails(projectId) {
    const projects = {
        project1: { title: "Attendance System", description: "A futuristic system for managing class attendance with automated roll calls and sleek report generation.", image: "#" },
        project2: { title: "Tic Tac Toe", description: "A neon-styled Tic Tac Toe game built with JavaScript, featuring PvP and AI modes.", image: "#" },
        project3: { title: "Web Camera", description: "A browser-based app to capture images and record videos with a modern UI.", image: "#" },
        project4: { title: "Web-cloning", description: "A Python-powered tool to clone websites with precision for offline use or analysis.", image: "#" }
    };

    const project = projects[projectId];
    document.getElementById('projectTitle').textContent = project.title;
    document.getElementById('projectDescription').textContent = project.description;
    document.getElementById('projectImage').src = project.image;
    document.getElementById('projectDetails').classList.remove('hidden');
    document.getElementById('projectDetails').style.animation = 'fadeInUp 0.5s ease-out';
}

function hideProjectDetails() {
    const details = document.getElementById('projectDetails');
    details.style.animation = 'fadeInUp 0.5s ease-out reverse';
    setTimeout(() => details.classList.add('hidden'), 450);
}

// Contact Form (Send to Telegram Bot)
function sender() {
    const u_name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const botToken = "7239458839:AAHTXtF23O2Zfe7q1OSOTtpQvbCjXCflFAg";  // Replace with your Telegram bot token
    const chatId = "5541151768";      // Replace with your Telegram chat ID
    const formattedMessage = `\uD83D\uDCE9 New Contact Form Submission\n\n\uD83D\uDC64 Name: ${u_name}\n\uD83D\uDCE7 Email: ${email}\n\uD83D\uDCAC Message: ${message}`;

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: formattedMessage }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            showResponseMessage("Message sent successfully!");
        } else {
            showResponseMessage("Failed to send message. Try again.");
        }
    })
    .catch(() => showResponseMessage("Error sending message."));

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
    return false;
}

function showResponseMessage(message) {
    const responseDiv = document.getElementById("responseMessage");
    responseDiv.textContent = message;
    responseDiv.classList.remove("hidden");
    responseDiv.style.animation = 'fadeInUp 0.5s ease-out';
    setTimeout(() => {
        responseDiv.style.animation = 'fadeInUp 0.5s ease-out reverse';
        setTimeout(() => responseDiv.classList.add("hidden"), 450);
    }, 5000);
}

// Scroll Animation Trigger
document.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});

// Dino Jump Game (Fixed)
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let dino = { x: 50, y: 150, width: 40, height: 40, dy: 0, gravity: 0.6, jumpPower: -12, isJumping: false };
let obstacles = [];
let score = 0;
let gameRunning = false;
let animationFrameId;

function drawDino() {
    ctx.fillStyle = "#00eaff";
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
}

function drawObstacle(obstacle) {
    ctx.fillStyle = "#ff00ff";
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

function updateDino() {
    dino.dy += dino.gravity;
    dino.y += dino.dy;
    if (dino.y > 150) {
        dino.y = 150;
        dino.dy = 0;
        dino.isJumping = false;
    }
}

function spawnObstacle() {
    let obstacle = { x: 600, y: 170, width: 20, height: 30, speed: 4 };
    obstacles.push(obstacle);
}

function updateObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].x -= obstacles[i].speed;
        if (obstacles[i].x + obstacles[i].width < 0) {
            obstacles.splice(i, 1);
            score += 10;
            document.getElementById("scoreDisplay").textContent = `Score: ${score}`;
        }
    }
}

function checkCollision() {
    for (let obstacle of obstacles) {
        if (
            dino.x < obstacle.x + obstacle.width &&
            dino.x + dino.width > obstacle.x &&
            dino.y < obstacle.y + obstacle.height &&
            dino.y + dino.height > obstacle.y
        ) {
            return true;
        }
    }
    return false;
}

function gameLoop() {
    if (!gameRunning) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDino();
    updateDino();
    obstacles.forEach(drawObstacle);
    updateObstacles();
    if (Math.random() < 0.02) spawnObstacle();
    if (!checkCollision()) {
        animationFrameId = requestAnimationFrame(gameLoop);
    } else {
        gameOver();
    }
}

function startGame() {
    if (gameRunning) return;
    gameRunning = true;
    score = 0;
    obstacles = [];
    dino.y = 150;
    dino.dy = 0;
    document.getElementById("scoreDisplay").textContent = `Score: ${score}`;
    gameLoop();
}

function gameOver() {
    gameRunning = false;
    cancelAnimationFrame(animationFrameId);
    alert(`Game Over! Score: ${score}`);
}

document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && !dino.isJumping && gameRunning) {
        dino.dy = dino.jumpPower;
        dino.isJumping = true;
    }
});
