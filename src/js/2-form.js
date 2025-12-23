// Feedback Form with validation
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.feedback-form');
  const emailInput = form?.querySelector('input[name="email"]');
  const messageInput = form?.querySelector('textarea[name="message"]');

  if (!form || !emailInput || !messageInput) return;

  const formData = {
    email: '',
    message: '',
  };

  // Load from localStorage
  const savedData = localStorage.getItem('feedback-form-state');
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      formData.email = parsedData.email || '';
      formData.message = parsedData.message || '';

      emailInput.value = formData.email;
      messageInput.value = formData.message;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }

  // Save to localStorage on input
  const saveToStorage = () => {
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  };

  // Email validation
  const validateEmail = email => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Update email field state
  const updateEmailState = () => {
    const email = formData.email.trim();
    emailInput.classList.remove('valid', 'invalid');

    if (email === '') return;

    if (validateEmail(email)) {
      emailInput.classList.add('valid');
    } else {
      emailInput.classList.add('invalid');
    }
  };

  // Event listeners
  emailInput.addEventListener('input', e => {
    formData.email = e.target.value;
    updateEmailState();
    saveToStorage();
  });

  messageInput.addEventListener('input', e => {
    formData.message = e.target.value;
    saveToStorage();
  });

  // Form submit
  form.addEventListener('submit', e => {
    e.preventDefault();

    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!email || !message) {
      alert('Fill please all fields');
      return;
    }

    if (!validateEmail(email)) {
      alert('Please enter a valid email address');
      emailInput.focus();
      return;
    }

    console.log({ email, message });

    // Clear form
    form.reset();
    formData.email = '';
    formData.message = '';
    localStorage.removeItem('feedback-form-state');
    emailInput.classList.remove('valid', 'invalid');
  });
});
