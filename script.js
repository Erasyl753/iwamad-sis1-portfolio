/* ---------- Theme toggle ---------- */
const html = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');
const themeLabel = document.getElementById('theme-label');

function renderThemeButton() {
  const dark = html.dataset.theme === 'dark';
  themeLabel.textContent = dark ? 'Light' : 'Dark';
  themeBtn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
}

themeBtn.addEventListener('click', () => {
  html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('theme', html.dataset.theme); } catch (e) {}
  renderThemeButton();
});
renderThemeButton();

/* ---------- Mobile nav ---------- */
const navBtn = document.getElementById('nav-toggle');
const navList = document.getElementById('nav-list');

navBtn.addEventListener('click', () => {
  const open = navList.classList.toggle('open');
  navBtn.setAttribute('aria-expanded', String(open));
});
navList.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    navList.classList.remove('open');
    navBtn.setAttribute('aria-expanded', 'false');
  }
});

/* ---------- Contact form validation ---------- */
const form = document.getElementById('contact-form');
const success = document.getElementById('form-success');
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function setError(input, message) {
  const err = document.getElementById(input.id + '-error');
  err.textContent = message;
  if (message) input.setAttribute('aria-invalid', 'true');
  else input.removeAttribute('aria-invalid');
}

function validate() {
  const name = form.elements.name;
  const email = form.elements.email;
  const message = form.elements.message;
  const errors = [];

  setError(name, '');
  setError(email, '');
  setError(message, '');

  if (name.value.trim() === '') {
    setError(name, 'Please enter your name.');
    errors.push(name);
  }

  if (email.value.trim() === '') {
    setError(email, 'Please enter your email address.');
    errors.push(email);
  } else if (!EMAIL_RE.test(email.value.trim())) {
    setError(email, 'This email looks incorrect. Use the format name@example.com.');
    errors.push(email);
  }

  if (message.value.trim() === '') {
    setError(message, 'Please write a message.');
    errors.push(message);
  }
  return errors;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  success.textContent = '';
  const errors = validate();

  if (errors.length > 0) {
    errors[0].focus();
    return;
  }
  success.textContent = 'Thank you! Your message was received.';
  form.reset();
});

/* Clear an error as soon as the user fixes the field */
form.addEventListener('input', (e) => {
  if (e.target.matches('input, textarea')) setError(e.target, '');
});

document.getElementById('year').textContent = new Date().getFullYear();
