
// Multi-step form logic
let currentStep = 1;
const totalSteps = 3;

// Password validation function
function validatePassword(password) {
    const minLength = 5;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
        isValid: password.length >= minLength && hasLetter && hasNumber && hasSpecial,
        length: password.length >= minLength,
        hasLetter: hasLetter,
        hasNumber: hasNumber,
        hasSpecial: hasSpecial
    };
}

// Update password strength indicator
function updatePasswordStrength(password) {
    const validation = validatePassword(password);
    const strengthIndicator = document.getElementById('password-strength');
    const strengthText = document.getElementById('strength-text');

    if (password.length > 0) {
        strengthIndicator.classList.remove('hidden');

        // Reset all bars
        for (let i = 1; i <= 4; i++) {
            const bar = document.getElementById(`strength-bar-${i}`);
            bar.className = 'h-1 flex-1 bg-gray-200 rounded';
        }

        let strength = 0;
        if (validation.length) strength++;
        if (validation.hasLetter) strength++;
        if (validation.hasNumber) strength++;
        if (validation.hasSpecial) strength++;

        // Update bars based on strength
        const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
        for (let i = 0; i < strength; i++) {
            const bar = document.getElementById(`strength-bar-${i + 1}`);
            bar.className = `h-1 flex-1 ${colors[Math.min(strength - 1, 3)]} rounded`;
        }

        // Update text
        const strengthTexts = ['Very Weak', 'Weak', 'Fair', 'Strong'];
        strengthText.textContent = strengthTexts[Math.min(strength - 1, 3)] || 'Very Weak';
    } else {
        strengthIndicator.classList.add('hidden');
    }
}

// Show error message
function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    const inputElement = document.getElementById(fieldId);

    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
    inputElement.classList.add('border-red-500', 'ring-2', 'ring-red-200');
}

// Hide error message
function hideError(fieldId) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    const inputElement = document.getElementById(fieldId);

    errorElement.classList.add('hidden');
    inputElement.classList.remove('border-red-500', 'ring-red-200');
}

// Update progress indicators based on current step
function updateProgress() {
    for (let i = 1; i <= totalSteps; i++) {
        const progress = document.getElementById(`progress-${i}`);
        if (i <= currentStep) {
            progress.classList.remove('bg-gray-300', 'dark:bg-gray-600');
            progress.classList.add('bg-indigo-600');
        } else {
            progress.classList.remove('bg-indigo-600');
            progress.classList.add('bg-gray-300', 'dark:bg-gray-600');
        }
    }
}

// Show the specified step and update navigation buttons
function showStep(step) {
    // Hide all steps
    document.querySelectorAll('.step').forEach(el => el.classList.add('hidden'));

    // Show current step
    document.getElementById(`step-${step}`).classList.remove('hidden');

    // Get button references
    const backBtn = document.getElementById('back-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');

    // Update button visibility based on current step
    if (step === 1) {
        backBtn.classList.add('hidden');
    } else {
        backBtn.classList.remove('hidden');
    }

    if (step === totalSteps) {
        nextBtn.classList.add('hidden');
        submitBtn.classList.remove('hidden');
    } else {
        nextBtn.classList.remove('hidden');
        submitBtn.classList.add('hidden');
    }

    // Update progress indicators
    updateProgress();

    // Focus on the input field of the current step
    const currentInput = document.querySelector(`#step-${step} input`);
    if (currentInput) {
        setTimeout(() => currentInput.focus(), 100);
    }
}

// Validate current step
function validateCurrentStep() {
    if (currentStep === 1) {
        const username = document.getElementById('username').value.trim();
        if (!username) {
            showError('username', 'Username is required');
            return false;
        } else if (username.length < 3) {
            showError('username', 'Username must be at least 3 characters');
            return false;
        } else {
            hideError('username');
            return true;
        }
    } else if (currentStep === 2) {
        const password = document.getElementById('password').value;
        const validation = validatePassword(password);

        if (!validation.isValid) {
            let message = 'Password must have: ';
            const requirements = [];
            if (!validation.length) requirements.push('at least 5 characters');
            if (!validation.hasLetter) requirements.push('letters');
            if (!validation.hasNumber) requirements.push('numbers');
            if (!validation.hasSpecial) requirements.push('special characters');

            message += requirements.join(', ');
            showError('password', message);
            return false;
        } else {
            hideError('password');
            return true;
        }
    } else if (currentStep === 3) {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            showError('confirm-password', 'Passwords do not match');
            return false;
        } else {
            hideError('confirm-password');
            return true;
        }
    }
    return true;
}

// Move to the next step if validation passes
function nextStep() {
    if (validateCurrentStep()) {
        if (currentStep < totalSteps) {
            currentStep++;
            showStep(currentStep);
        }
    }
}

// Move to the previous step
function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Show first step
    showStep(1);

    // Set up event listeners
    document.getElementById('next-btn').addEventListener('click', nextStep);
    document.getElementById('back-btn').addEventListener('click', prevStep);

    // Password strength indicator
    document.getElementById('password').addEventListener('input', function (e) {
        updatePasswordStrength(e.target.value);
    });

    // Handle Enter key on inputs
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (currentStep < totalSteps) {
                    nextStep();
                } else {
                    document.getElementById('signup-form').dispatchEvent(new Event('submit'));
                }
            }
        });
    });

    // Form submission handler
    document.getElementById('signup-form').addEventListener('submit', function (e) {
        e.preventDefault();

        if (validateCurrentStep()) {
            // Get form values
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // In a real application, you would send this data to your server
            console.log('Signup data:', { username, password });
            alert('Account created successfully!');
            window.location.href = "/profile";
        }
    });
});
