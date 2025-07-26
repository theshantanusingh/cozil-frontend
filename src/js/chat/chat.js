// Auto-resize textarea
function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
}

// Add message to chat
function addMessage(content, isSent = true) {
    const messagesList = document.getElementById('messages-list');
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const messageDiv = document.createElement('div');
    messageDiv.className = 'slide-up';

    if (isSent) {
        messageDiv.innerHTML = `
                    <div class="flex justify-end">
                        <div class="flex flex-col items-end max-w-md">
                            <div class="message-sent px-5 py-4">
                                <p class="text-white font-medium">${content}</p>
                            </div>
                            <span class="text-white/50 text-xs mt-2 mr-2">${timeString}</span>
                        </div>
                    </div>
                `;
    } else {
        messageDiv.innerHTML = `
                    <div class="flex items-start space-x-4">
                        <div class="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-lg font-bold flex-shrink-0">
                            AU
                        </div>
                        <div class="flex flex-col max-w-md">
                            <div class="message-received px-5 py-4">
                                <p class="text-white">${content}</p>
                            </div>
                            <span class="text-white/50 text-xs mt-2 ml-2">${timeString}</span>
                        </div>
                    </div>
                `;
    }

    // Remove typing indicator
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }

    messagesList.appendChild(messageDiv);

    // Scroll to bottom
    const messagesContainer = document.getElementById('messages-container');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Add typing indicator back for received messages
    if (!isSent) {
        setTimeout(() => {
            addTypingIndicator();
        }, 1500);
    }
}

// Add typing indicator
function addTypingIndicator() {
    const messagesList = document.getElementById('messages-list');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
    typingDiv.className = 'flex items-start space-x-4';
    typingDiv.innerHTML = `
                <div class="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-lg font-bold flex-shrink-0">
                    AU
                </div>
                <div class="glass-effect px-5 py-4 rounded-2xl rounded-tl-md border border-white/10">
                    <div class="flex space-x-1">
                        <div class="w-2 h-2 bg-white/60 rounded-full typing-dots"></div>
                        <div class="w-2 h-2 bg-white/60 rounded-full typing-dots"></div>
                        <div class="w-2 h-2 bg-white/60 rounded-full typing-dots"></div>
                    </div>
                </div>
            `;
    messagesList.appendChild(typingDiv);

    const messagesContainer = document.getElementById('messages-container');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Send message
function sendMessage() {
    const input = document.getElementById('message-input');
    const content = input.value.trim();

    if (content) {
        addMessage(content, true);
        input.value = '';
        input.style.height = 'auto';

        // Simulate response
        setTimeout(() => {
            const responses = [
                "That's really interesting! Tell me more 🤔",
                "Awesome! I love anonymous conversations 🚀",
                "That's so cool! Privacy-first chatting is the best 💪",
                "Nice! How are you finding this platform? ⚡",
                "I totally agree! Anonymous chats are refreshing ✨",
                "That's fascinating! Keep the conversation going 🔥"
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResponse, false);
        }, Math.random() * 2000 + 1000);
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');

    const bgColor = type === 'success' ? 'bg-green-600' :
        type === 'info' ? 'bg-blue-600' : 'bg-red-600';

    notification.className = `notification glass-effect ${bgColor} text-white px-6 py-4 rounded-xl border border-white/20 glow-primary`;
    notification.innerHTML = `
                <div class="flex items-center space-x-3">
                    <i class="fas fa-${type === 'success' ? 'check' : type === 'info' ? 'info' : 'exclamation'}-circle"></i>
                    <span class="font-medium">${message}</span>
                </div>
            `;

    container.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const emojiBtn = document.getElementById('emoji-btn');
    const emojiPicker = document.getElementById('emoji-picker');
    const attachmentBtn = document.getElementById('attachment-btn');
    const videoCallBtn = document.getElementById('video-call-btn');
    const newUserBtn = document.getElementById('new-user-btn');
    const disconnectBtn = document.getElementById('disconnect-btn');

    // Message input events
    messageInput.addEventListener('input', function () {
        autoResize(this);
    });

    messageInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    sendBtn.addEventListener('click', sendMessage);

    // Emoji picker
    emojiBtn.addEventListener('click', function () {
        emojiPicker.classList.toggle('hidden');
    });

    document.addEventListener('click', function (e) {
        if (!emojiBtn.contains(e.target) && !emojiPicker.contains(e.target)) {
            emojiPicker.classList.add('hidden');
        }
    });

    document.querySelectorAll('.emoji-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            messageInput.value += this.textContent;
            messageInput.focus();
            autoResize(messageInput);
            emojiPicker.classList.add('hidden');
        });
    });

    // Action buttons
    attachmentBtn.addEventListener('click', function () {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*,video/*,audio/*,.pdf,.doc,.docx';
        input.onchange = function (e) {
            const file = e.target.files[0];
            if (file) {
                showNotification(`File "${file.name}" ready to send`);
            }
        };
        input.click();
    });

    videoCallBtn.addEventListener('click', function () {
        showNotification('Starting anonymous video call...', 'info');
        setTimeout(() => {
            window.location.href = 'video-call.html';
        }, 1500);
    });

    newUserBtn.addEventListener('click', function () {
        showNotification('Finding a new anonymous user...', 'info');
        setTimeout(() => {
            showNotification('Connected to a new anonymous user!', 'success');
            // Simulate new user connection
            document.getElementById('messages-list').innerHTML = '';
            addMessage('Hey! New anonymous user here! 👋', false);
        }, 2000);
    });

    disconnectBtn.addEventListener('click', function () {
        showNotification('Disconnected from anonymous chat', 'error');
        setTimeout(() => {
            window.location.href = '/';
        }, 1500);
    });

    messageInput.focus();
});