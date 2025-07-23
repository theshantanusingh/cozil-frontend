
let callStartTime = Date.now();
let isMuted = false;
let isVideoOff = false;
let isChatOpen = false;

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
    this.classList.toggle('muted', isMuted);
    this.innerHTML = isMuted ?
        '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 10-2 2-2-2"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19v4"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 23h8"></path><line x1="17" x2="7" y1="7" y2="17" stroke-width="2"></line><line x1="7" x2="17" y1="7" y2="17" stroke-width="2"></line></svg>' :
        '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 10-2 2-2-2"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19v4"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 23h8"></path></svg>';
});

// Video On/Off
document.getElementById('video-btn').addEventListener('click', function () {
    isVideoOff = !isVideoOff;
    this.classList.toggle('disabled', isVideoOff);
    this.innerHTML = isVideoOff ?
        '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m23 7-7 5 7 5V7z"></path><rect width="15" height="9" x="1" y="8" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" rx="2" ry="2"></rect><line x1="22" x2="2" y1="2" y2="22" stroke-width="2"></line></svg>' :
        '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m23 7-7 5 7 5V7z"></path><rect width="15" height="9" x="1" y="8" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" rx="2" ry="2"></rect></svg>';
});

// Chat Toggle
document.getElementById('chat-btn').addEventListener('click', function () {
    isChatOpen = !isChatOpen;
    this.classList.toggle('active', isChatOpen);
    document.getElementById('chat-panel').classList.toggle('open', isChatOpen);
});

document.getElementById('close-chat').addEventListener('click', function () {
    isChatOpen = false;
    document.getElementById('chat-btn').classList.remove('active');
    document.getElementById('chat-panel').classList.remove('open');
});

// Emoji Reactions
document.getElementById('emoji-btn').addEventListener('click', function () {
    const overlay = document.getElementById('emoji-overlay');
    const picker = document.getElementById('emoji-picker');
    overlay.style.display = 'flex';
    setTimeout(() => picker.classList.add('show'), 10);
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
    picker.classList.remove('show');
    setTimeout(() => overlay.style.display = 'none', 300);
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
    reaction.className = 'reaction-animation';
    reaction.textContent = emoji;
    reaction.style.left = Math.random() * (window.innerWidth - 100) + 'px';
    reaction.style.top = Math.random() * (window.innerHeight - 200) + 100 + 'px';
    document.body.appendChild(reaction);

    setTimeout(() => {
        reaction.remove();
    }, 3000);
}

// Chat Input
document.getElementById('chat-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && this.value.trim()) {
        const messagesContainer = document.getElementById('chat-messages');
        const message = document.createElement('div');
        message.className = 'message sent';
        message.textContent = this.value;
        messagesContainer.appendChild(message);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        this.value = '';

        // Simulate response
        setTimeout(() => {
            const response = document.createElement('div');
            response.className = 'message received';
            response.textContent = 'Thanks for the message! 😊';
            messagesContainer.appendChild(response);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 1000);
    }
});

// End Call
document.getElementById('end-call-btn').addEventListener('click', function () {
    if (confirm('Are you sure you want to end the call?')) {
        window.location.href = '/profile';
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
    } else if (e.key === 'd') {
        if (document.getElementById('emoji-overlay').style.display === 'flex') {
            closeEmojiPicker();
        } else if (isChatOpen) {
            document.getElementById('close-chat').click();
        }
    }
});
