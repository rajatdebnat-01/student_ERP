// Get the form and error message element
const form = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

// Add form submit event listener
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting by default

    const studentId = document.getElementById('student-id').value.trim();
    const password = document.getElementById('password').value.trim();

    // Simple validation for demonstration purposes
    if (studentId === '' || password === '') {
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Both fields are required!';
    } else if (password.length < 6) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Password must be at least 6 characters!';
    } else {
        errorMessage.style.display = 'none';
        // Submit the form (you can also perform an AJAX request here)
        alert('Login successful!');
        // form.submit(); // Uncomment this when you want to actually submit
    }
});
