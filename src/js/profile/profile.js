
// Fake user data simulation
let userData = {
    username: "johndoe123",
    name: "John Doe",
    bio: "Love connecting with new people! Always up for a good conversation.",
    gender: "male",
    address: "New York, USA",
    occupation: "Software Developer",
    email: "john@example.com",
    mobile: "+1 (555) 123-4567",
    emailVerified: true,
    mobileVerified: false,
    profilePicture: null
};

// Update display elements
function updateDisplay() {
    document.getElementById('display-name').textContent = userData.name || userData.username;
    document.getElementById('username-display').textContent = `@${userData.username}`;
    document.getElementById('bio-display').textContent = userData.bio || "No bio added yet.";

    // Update profile initials
    const initials = userData.name ?
        userData.name.split(' ').map(n => n[0]).join('').toUpperCase() :
        userData.username.substring(0, 2).toUpperCase();
    document.getElementById('profile-initials').textContent = initials;
}

// Personal info editing
let personalInfoEditing = false;

function togglePersonalEdit() {
    const fields = ['name-input', 'bio-input', 'gender-input', 'address-input', 'occupation-input'];
    const editBtn = document.getElementById('edit-personal-btn');
    const actions = document.getElementById('personal-info-actions');

    personalInfoEditing = !personalInfoEditing;

    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        field.disabled = !personalInfoEditing;
    });

    if (personalInfoEditing) {
        editBtn.textContent = 'Cancel';
        editBtn.classList.remove('bg-indigo-600', 'hover:bg-indigo-700');
        editBtn.classList.add('bg-gray-500', 'hover:bg-gray-600');
        actions.classList.remove('hidden');
    } else {
        editBtn.textContent = 'Edit';
        editBtn.classList.remove('bg-gray-500', 'hover:bg-gray-600');
        editBtn.classList.add('bg-indigo-600', 'hover:bg-indigo-700');
        actions.classList.add('hidden');
        // Reset values
        document.getElementById('name-input').value = userData.name;
        document.getElementById('bio-input').value = userData.bio;
        document.getElementById('gender-input').value = userData.gender;
        document.getElementById('address-input').value = userData.address;
        document.getElementById('occupation-input').value = userData.occupation;
    }
}

function savePersonalInfo() {
    // Simulate API call
    userData.name = document.getElementById('name-input').value;
    userData.bio = document.getElementById('bio-input').value;
    userData.gender = document.getElementById('gender-input').value;
    userData.address = document.getElementById('address-input').value;
    userData.occupation = document.getElementById('occupation-input').value;

    updateDisplay();
    togglePersonalEdit();

    // Show success message
    showNotification('Personal information updated successfully!', 'success');
}

// Contact info editing
let contactInfoEditing = false;

function toggleContactEdit() {
    const fields = ['email-input', 'mobile-input'];
    const editBtn = document.getElementById('edit-contact-btn');
    const actions = document.getElementById('contact-info-actions');
    const verifyButtons = ['verify-email-btn', 'verify-mobile-btn'];

    contactInfoEditing = !contactInfoEditing;

    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        field.disabled = !contactInfoEditing;
    });

    verifyButtons.forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (contactInfoEditing) {
            btn.classList.remove('hidden');
        } else {
            btn.classList.add('hidden');
        }
    });

    if (contactInfoEditing) {
        editBtn.textContent = 'Cancel';
        actions.classList.remove('hidden');
    } else {
        editBtn.textContent = 'Edit';
        actions.classList.add('hidden');
        // Reset values
        document.getElementById('email-input').value = userData.email;
        document.getElementById('mobile-input').value = userData.mobile;
    }
}

function saveContactInfo() {
    // Simulate API call
    const oldEmail = userData.email;
    const oldMobile = userData.mobile;

    userData.email = document.getElementById('email-input').value;
    userData.mobile = document.getElementById('mobile-input').value;

    // If email/mobile changed, mark as unverified
    if (oldEmail !== userData.email) {
        userData.emailVerified = false;
    }
    if (oldMobile !== userData.mobile) {
        userData.mobileVerified = false;
    }

    updateVerificationStatus();
    toggleContactEdit();

    showNotification('Contact information updated successfully!', 'success');
}

function updateVerificationStatus() {
    const emailStatus = document.getElementById('email-verified');
    const mobileStatus = document.getElementById('mobile-verified');

    if (userData.emailVerified) {
        emailStatus.innerHTML = '<span class="text-green-600 text-xs font-semibold">Verified</span><div class="w-2 h-2 bg-green-500 rounded-full"></div>';
    } else {
        emailStatus.innerHTML = '<span class="text-orange-600 text-xs font-semibold">Pending</span><div class="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>';
    }

    if (userData.mobileVerified) {
        mobileStatus.innerHTML = '<span class="text-green-600 text-xs font-semibold">Verified</span><div class="w-2 h-2 bg-green-500 rounded-full"></div>';
    } else {
        mobileStatus.innerHTML = '<span class="text-orange-600 text-xs font-semibold">Pending</span><div class="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>';
    }
}

// Notification system
function showNotification(message, type) {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = `p-4 rounded-xl shadow-lg transition-all duration-300 transform translate-x-full opacity-0 ${type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`;

    notification.innerHTML = `
                <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 ${type === 'success' ? 'bg-green-200' : 'bg-red-200'} rounded-full"></div>
                    <span class="font-medium">${message}</span>
                </div>
            `;

    container.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full', 'opacity-0');
    }, 100);

    // Auto dismiss after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full', 'opacity-0');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Profile picture handling
function handleProfilePictureChange(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            userData.profilePicture = e.target.result;
            const profileImage = document.getElementById('profile-image');
            profileImage.src = userData.profilePicture;
            profileImage.classList.remove('hidden');
            document.getElementById('profile-initials').classList.add('hidden');
            showNotification('Profile picture updated successfully!', 'success');
        };
        reader.readAsDataURL(file);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    updateDisplay();
    updateVerificationStatus();

    // Event Listeners
    document.getElementById('edit-personal-btn').addEventListener('click', togglePersonalEdit);
    document.getElementById('cancel-personal-btn').addEventListener('click', togglePersonalEdit);
    document.getElementById('save-personal-btn').addEventListener('click', savePersonalInfo);

    document.getElementById('edit-contact-btn').addEventListener('click', toggleContactEdit);
    document.getElementById('cancel-contact-btn').addEventListener('click', toggleContactEdit);
    document.getElementById('save-contact-btn').addEventListener('click', saveContactInfo);

    document.getElementById('verify-email-btn').addEventListener('click', () => {
        userData.emailVerified = true;
        updateVerificationStatus();
        showNotification('Verification email sent!', 'success');
    });

    document.getElementById('verify-mobile-btn').addEventListener('click', () => {
        userData.mobileVerified = true;
        updateVerificationStatus();
        showNotification('Verification SMS sent!', 'success');
    });

    document.getElementById('reset-password-btn').addEventListener('click', () => {
        if (!userData.emailVerified) {
            document.getElementById('password-reset-note').classList.remove('hidden');
            showNotification('Please verify your email first.', 'error');
        } else {
            document.getElementById('password-reset-note').classList.add('hidden');
            showNotification('Password reset link sent to your email!', 'success');
        }
    });

    document.getElementById('change-photo-btn').addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = handleProfilePictureChange;
        input.click();
    });

    document.getElementById('logout-btn').addEventListener('click', () => {
        showNotification('Logged out successfully!', 'success');
        // Simulate logout
        setTimeout(() => {
            window.location.href = '/login';
        }, 1000);
    });

    document.getElementById('start-video-call').addEventListener('click', () => {
        showNotification('Starting random video chat...', 'success');
        // Simulate video call start
    });

    document.getElementById('start-chat').addEventListener('click', () => {
        showNotification('Finding random chat partner...', 'success');
        // Simulate chat start
    });
});
