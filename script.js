/* ======================
   DEMO PLACEHOLDER LOGIN
   ====================== */

/*
   Change this value to true to simulate
   an admin account during testing.
*/
const isAdmin = True;

/* Show Admin Panel */

const adminPanel = document.getElementById("adminPanel");

if (isAdmin) {
    adminPanel.style.display = "block";
}

/* ======================
   COUNTDOWN TIMER
   ====================== */

const timerElement = document.getElementById("timer");

const startDate = new Date();
startDate.setHours(startDate.getHours() + 2);

function updateTimer() {
    const now = new Date();
    const difference = startDate - now;

    if (difference <= 0) {
        timerElement.textContent = "We're Live!";
        return;
    }

    const hours = Math.floor(
        difference / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (difference % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (difference % (1000 * 60)) /
        1000
    );

    timerElement.textContent =
        `${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateTimer, 1000);
updateTimer();

/* ======================
   ADMIN VIDEO CONTROLS
   ====================== */

const streamFrame =
    document.getElementById("streamFrame");

const updateVideoBtn =
    document.getElementById("updateVideoBtn");

updateVideoBtn.addEventListener("click", () => {

    if (!isAdmin) {
        alert(
            "Only administrators can update the webcast video."
        );
        return;
    }

    const url =
        document.getElementById("videoUrl")
        .value
        .trim();

    if (!url) {
        alert("Please enter a video URL.");
        return;
    }

    streamFrame.src = url;

    alert("Video updated successfully.");
});

/* ======================
   LIVE CHAT
   ====================== */

const chatBox =
    document.getElementById("chatBox");

const messageInput =
    document.getElementById("messageInput");

const sendBtn =
    document.getElementById("sendBtn");

function addMessage(sender, text) {

    const message =
        document.createElement("div");

    message.className = "message";

    message.innerHTML =
        `<strong>${sender}:</strong> ${text}`;

    chatBox.appendChild(message);

    chatBox.scrollTop =
        chatBox.scrollHeight;
}

sendBtn.addEventListener("click", () => {

    const text =
        messageInput.value.trim();

    if (!text) return;

    addMessage("You", text);

    messageInput.value = "";

    setTimeout(() => {

        const replies = [
            "Thanks for joining!",
            "Welcome to the webcast!",
            "Stay tuned for updates.",
            "Great question!",
            "We're glad you're here!"
        ];

        const reply =
            replies[
                Math.floor(
                    Math.random() * replies.length
                )
            ];

        addMessage("Host", reply);

    }, 1000);
});

messageInput.addEventListener(
    "keypress",
    (e) => {
        if (e.key === "Enter") {
            sendBtn.click();
        }
    }
);
