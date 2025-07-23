
// Auto-resize textarea
function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 100) + 'px';
}

// Add message to chat
function addMessage(content, isSent = true) {
    const messagesList = document.getElementById('messages-list');
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const messageDiv = document.createElement('div');

    if (isSent) {
        messageDiv.className = 'flex justify-end';
        messageDiv.innerHTML = `
                    <div class="flex flex-col items-end">
                        <div class="message-sent px-4 py-3 shadow-lg">
                            <p class="font-medium">${content}</p>
                        </div>
                        <span class="text-xs text-gray-500 mt-1 mr-2">${timeString}</span>
                    </div>
                `;
    } else {
        messageDiv.className = 'flex items-start space-x-3';
        messageDiv.innerHTML = `
                    <div class="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span class="text-white font-bold text-sm">AS</span>
                    </div>
                    <div class="flex flex-col">
                        <div class="message-received px-4 py-3 shadow-sm">
                            <p class="text-gray-900 font-medium">${content}</p>
                        </div>
                        <span class="text-xs text-gray-500 mt-1 ml-2">${timeString}</span>
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
    typingDiv.className = 'flex items-start space-x-3';
    typingDiv.innerHTML = `
                <div class="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span class="text-white font-bold text-sm">AS</span>
                </div>
                <div class="bg-white px-4 py-3 rounded-2xl rounded-tl-md shadow-sm border border-gray-200">
                    <div class="flex space-x-1">
                        <div class="w-2 h-2 bg-gray-400 rounded-full typing-animation"></div>
                        <div class="w-2 h-2 bg-gray-400 rounded-full typing-animation"></div>
                        <div class="w-2 h-2 bg-gray-400 rounded-full typing-animation"></div>
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
                "That's really interesting! Tell me more about it 🤔",
                "Awesome! I love hearing about new projects 🚀",
                "Sounds like you're doing amazing work! 💪",
                "That's so cool! How long have you been working on it? ⚡",
                "I'd love to see it in action sometime! ✨"
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
    notification.className = `p-4 rounded-xl shadow-lg transition-all duration-300 transform translate-x-full opacity-0 ${type === 'success' ? 'bg-green-500 text-white' :
            type === 'info' ? 'bg-blue-500 text-white' : 'bg-red-500 text-white'
        }`;

    notification.innerHTML = `
                <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 bg-white/80 rounded-full"></div>
                    <span class="font-medium">${message}</span>
                </div>
            `;

    container.appendChild(notification);

    setTimeout(() => {
        notification.classList.remove('translate-x-full', 'opacity-0');
    }, 100);

    setTimeout(() => {
        notification.classList.add('translate-x-full', 'opacity-0');
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
        showNotification('Starting video call with Alex...', 'info');
    });

    newUserBtn.addEventListener('click', function () {
        showNotification('Finding a new user to chat with...', 'info');
        // Simulate finding new user
        setTimeout(() => {
            showNotification('Connected to a new user!', 'success');
            // Here you would typically reload the chat with new user
        }, 2000);
    });

    disconnectBtn.addEventListener('click', function () {
        showNotification('Disconnected from chat', 'error');
        // Simulate disconnect
        setTimeout(() => {
            window.location.href = '/profile';
        }, 1500);
    });

    messageInput.focus();
});