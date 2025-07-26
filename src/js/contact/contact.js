document.addEventListener('DOMContentLoaded', function () {
    // Trigger fade-in animations
    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
        }, index * 200);
    });

    // Report type selection
    const reportTypeBtns = document.querySelectorAll('.report-type-btn');
    const reportTypeInput = document.getElementById('report-type');

    reportTypeBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            reportTypeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            reportTypeInput.value = this.dataset.type;
        });
    });

    // FAQ accordion
    const faqToggles = document.querySelectorAll('.faq-toggle');
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i:last-child');

            // Close all other FAQs
            faqToggles.forEach(otherToggle => {
                if (otherToggle !== this) {
                    const otherAnswer = otherToggle.nextElementSibling;
                    const otherIcon = otherToggle.querySelector('i:last-child');
                    otherAnswer.classList.remove('open');
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            });

            // Toggle current FAQ
            answer.classList.toggle('open');
            icon.style.transform = answer.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
        });
    });

    // Form submissions with better notifications
    document.getElementById('report-form').addEventListener('submit', function (e) {
        e.preventDefault();
        showNotification('Report submitted successfully! Our team will review it within 24 hours.', 'success');
        this.reset();
        // Reset active button
        reportTypeBtns.forEach(b => b.classList.remove('active'));
        reportTypeBtns[0].classList.add('active');
        reportTypeInput.value = 'inappropriate-content';
    });

    document.getElementById('help-form').addEventListener('submit', function (e) {
        e.preventDefault();
        showNotification('Help request received! We\'ll contact you soon at the email provided.', 'success');
        this.reset();
    });

    // Notification system
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        const bgColor = type === 'success' ? 'bg-green-600' : 'bg-red-600';
        const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';

        notification.className = `fixed top-6 right-6 ${bgColor} text-white px-6 py-4 rounded-xl shadow-lg z-50 flex items-center space-x-3 transform translate-x-full transition-transform duration-300`;
        notification.innerHTML = `
                    <i class="fas ${icon}"></i>
                    <span class="font-medium">${message}</span>
                `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
});