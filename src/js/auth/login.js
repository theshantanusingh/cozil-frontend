
let currentStep = 1;
let currentUsername = '';

const registeredUsers = [
    'john_doe', 'jane_smith', 'alex_wilson', 'sarah_jones', 'mike_brown',
    'john@example.com', 'jane@example.com', 'alex@example.com'
];

function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    const inputElement = document.getElementById(fieldId);
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
    inputElement.classList.add('border-red-500', 'ring-2', 'ring-red-200');
}

function hideError(fieldId) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    const inputElement = document.getElementById(fieldId);
    errorElement.classList.add('hidden');
    inputElement.classList.remove('border-red-500', 'ring-red-200');
}

function updateProgress() {
    const progress1 = document.getElementById('progress-1');
    const progress2 = document.getElementById('progress-2');

    if (currentStep === 1) {
        progress1.classList.add('bg-indigo-600');
        progress1.classList.remove('bg-gray-300', 'dark:bg-gray-600');
        progress2.classList.add('bg-gray-300', 'dark:bg-gray-600');
        progress2.classList.remove('bg-indigo-600');
    } else {
        progress1.classList.add('bg-indigo-600');
        progress1.classList.remove('bg-gray-300', 'dark:bg-gray-600');
        progress2.classList.add('bg-indigo-600');
        progress2.classList.remove('bg-gray-300', 'dark:bg-gray-600');
    }
}

function showStep(step) {
    document.querySelectorAll('.step').forEach(el => el.classList.add('hidden'));
    document.getElementById(`step-${step}`).classList.remove('hidden');

    const backBtn = document.getElementById('back-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');

    if (step === 1) {
        backBtn.classList.add('hidden');
        nextBtn.classList.remove('hidden');
        submitBtn.classList.add('hidden');
    } else {
        backBtn.classList.remove('hidden');
        nextBtn.classList.add('hidden');
        submitBtn.classList.remove('hidden');
    }

    updateProgress();

    const currentInput = document.querySelector(`#step-${step} input`);
    if (currentInput) {
        setTimeout(() => currentInput.focus(), 100);
    }
}

function checkUserExists(username) {
    return registeredUsers.includes(username.toLowerCase());
}

function validateStep1() {
    const username = document.getElementById('username').value.trim();

    if (!username) {
        showError('username', 'Username or email is required');
        return false;
    }

    if (username.length < 3) {
        showError('username', 'Username or email must be at least 3 characters');
        return false;
    }

    if (!checkUserExists(username)) {
        showError('username', 'No account found with this username or email. Please check your credentials or sign up.');
        return false;
    }

    hideError('username');
    return true;
}

function validateStep2() {
    const password = document.getElementById('password').value;

    if (!password) {
        showError('password', 'Password is required');
        return false;
    }

    if (password.length < 5) {
        showError('password', 'Password must be at least 5 characters');
        return false;
    }

    hideError('password');
    return true;
}

function nextStep() {
    if (currentStep === 1 && validateStep1()) {
        currentUsername = document.getElementById('username').value.trim();

        const displayName = currentUsername.includes('@') ?
            currentUsername.split('@')[0] : currentUsername;

        document.getElementById('user-greeting').textContent = `Hi ${displayName}!`;

        currentStep = 2;
        showStep(currentStep);
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep = 1;
        showStep(currentStep);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    showStep(1);

    document.getElementById('next-btn').addEventListener('click', nextStep);
    document.getElementById('back-btn').addEventListener('click', prevStep);

    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (currentStep === 1) {
                    nextStep();
                } else {
                    document.getElementById('login-form').dispatchEvent(new Event('submit'));
                }
            }
        });
    });

    document.getElementById('login-form').addEventListener('submit', function (e) {
        e.preventDefault();

        if (validateStep2()) {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            console.log('Login data:', { username, password });
            alert('Logged in successfully! Welcome to Cozil dashboard.');
            window.location.href = "/profile";
        }
    });

    document.getElementById('username').focus();
});

console.log("hello")
