
document.addEventListener('DOMContentLoaded', function () {
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
    const faqButtons = document.querySelectorAll('#help-form + div button');
    faqButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const answer = this.nextElementSibling;
            answer.classList.toggle('hidden');
        });
    });

    // Form submissions
    document.getElementById('report-form').addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Report submitted successfully. Our team will review it shortly.');
        this.reset();
    });

    document.getElementById('help-form').addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Help request received. We\'ll contact you soon at the email provided.');
        this.reset();
    });
});
