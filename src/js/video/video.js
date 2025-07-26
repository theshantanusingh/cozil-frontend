let callStartTime = Date.now();
let isMuted = false;
let isVideoOff = false;
let isChatOpen = false;
let isScreenSharing = false;

// Update call duration
function updateCallDuration() {
    const elapsed = Math.floor((Date.now() - callStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    document.getElementById('call-duration').textContent =
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
setInterval(updateCallDuration, 1000);

// Mute/Unmute
document.getElementById('mute-btn').addEventListener('click', function () {
    isMuted = !isMuted;
    const icon = this.querySelector('i');
    if (isMuted) {
        icon.className = 'fas fa-microphone-slash';
        this.classList.add('bg-primary', 'glow-primary-strong');
        this.classList.remove('glass-effect');
    } else {
        icon.className = 'fas fa-microphone';
        this.classList.remove('bg-primary', 'glow-primary-strong');
        this.classList.add('glass-effect');
    }
});

// Video On/Off
document.getElementById('video-btn').addEventListener('click', function () {
    isVideoOff = !isVideoOff;
    const icon = this.querySelector('i');
    if (isVideoOff) {
        icon.className = 'fas fa-video-slash';
        this.classList.add('bg-primary', 'glow-primary-strong');
        this.classList.remove('glass-effect');
    } else {
        icon.className = 'fas fa-video';
        this.classList.remove('bg-primary', 'glow-primary-strong');
        this.classList.add('glass-effect');
    }
});

// Screen Share
document.getElementById('screen-btn').addEventListener('click', function () {
    isScreenSharing = !isScreenSharing;
    const icon = this.querySelector('i');
    if (isScreenSharing) {
        this.classList.add('bg-primary', 'glow-primary-strong');
        this.classList.remove('glass-effect');
    } else {
        this.classList.remove('bg-primary', 'glow-primary-strong');
        this.classList.add('glass-effect');
    }
});

// Chat Toggle
document.getElementById('chat-btn').addEventListener('click', function () {
    isChatOpen = !isChatOpen;
    const chatPanel = document.getElementById('chat-panel');
    if (isChatOpen) {
        chatPanel.classList.remove('translate-x-full');
        this.classList.add('bg-primary', 'glow-primary-strong');
        this.classList.remove('glass-effect');
    } else {
        chatPanel.classList.add('translate-x-full');
        this.classList.remove('bg-primary', 'glow-primary-strong');
        this.classList.add('glass-effect');
    }
});

document.getElementById('close-chat').addEventListener('click', function () {
    isChatOpen = false;
    document.getElementById('chat-panel').classList.add('translate-x-full');
    document.getElementById('chat-btn').classList.remove('bg-primary', 'glow-primary-strong');
    document.getElementById('chat-btn').classList.add('glass-effect');
});

// Emoji Reactions
document.getElementById('emoji-btn').addEventListener('click', function () {
    const overlay = document.getElementById('emoji-overlay');
    const picker = document.getElementById('emoji-picker');
    overlay.classList.remove('opacity-0', 'pointer-events-none');
    setTimeout(() => picker.classList.remove('scale-90'), 10);
});

document.getElementById('close-emoji').addEventListener('click', function () {
    closeEmojiPicker();
});

document.getElementById('emoji-overlay').addEventListener('click', function (e) {
    if (e.target === this) {
        closeEmojiPicker();
    }
});

function closeEmojiPicker() {
    const overlay = document.getElementById('emoji-overlay');
    const picker = document.getElementById('emoji-picker');
    picker.classList.add('scale-90');
    setTimeout(() => overlay.classList.add('opacity-0', 'pointer-events-none'), 300);
}

// Emoji Selection
document.querySelectorAll('.emoji-item').forEach(item => {
    item.addEventListener('click', function () {
        const emoji = this.dataset.emoji;
        showReaction(emoji);
        closeEmojiPicker();
    });
});

function showReaction(emoji) {
    const reaction = document.createElement('div');
    reaction.className = 'fixed text-8xl pointer-events-none z-40 float-reaction';
    reaction.textContent = emoji;
    reaction.style.left = Math.random() * (window.innerWidth - 150) + 'px';
    reaction.style.top = Math.random() * (window.innerHeight - 300) + 150 + 'px';
    document.body.appendChild(reaction);
    setTimeout(() => {
        reaction.remove();
    }, 4000);
}

// Chat Input
document.getElementById('chat-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && this.value.trim()) {
        sendMessage(this.value);
        this.value = '';
    }
});

function sendMessage(text) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'slide-in flex justify-end';
    messageDiv.innerHTML = `
                <div class="gradient-primary rounded-2xl rounded-br-md p-4 max-w-xs">
                    <p class="text-sm text-white">${text}</p>
                </div>
            `;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Simulate response
    setTimeout(() => {
        const responses = [
            "That's awesome! 😄",
            "I totally agree! 👍",
            "Haha, that's funny! 😂",
            "Really? Tell me more! 🤔",
            "Nice! 🔥",
            "That sounds great! ✨"
        ];
        const responseDiv = document.createElement('div');
        responseDiv.className = 'slide-in';
        responseDiv.innerHTML = `
                    <div class="bg-white/10 rounded-2xl rounded-bl-md p-4 max-w-xs">
                        <p class="text-sm">${responses[Math.floor(Math.random() * responses.length)]}</p>
                    </div>
                `;
        messagesContainer.appendChild(responseDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1000 + Math.random() * 2000);
}

// End Call
document.getElementById('end-call-btn').addEventListener('click', function () {
    if (confirm('Are you sure you want to end the call?')) {
        window.location.href = '/';
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function (e) {
    if (e.key === 'm' || e.key === 'M') {
        document.getElementById('mute-btn').click();
    } else if (e.key === 'v' || e.key === 'V') {
        document.getElementById('video-btn').click();
    } else if (e.key === 'c' || e.key === 'C') {
        document.getElementById('chat-btn').click();
    } else if (e.key === 'Escape') {
        if (!document.getElementById('emoji-overlay').classList.contains('opacity-0')) {
            closeEmojiPicker();
        } else if (isChatOpen) {
            document.getElementById('close-chat').click();
        }
    }
});