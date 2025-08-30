// public/js/main.js
// Handles nav active state, contact form, and small UX touches.

// Active link
(function(){
  const path = window.location.pathname.replace('/','') || 'index.html';
  document.querySelectorAll('.menu a').forEach(a=>{
    const href = a.getAttribute('href');
    if ((path === 'index.html' && href === 'index.html') || (href && path.includes(href))) {
      a.classList.add('active');
    }
  });
})();

// Contact form submission
async function submitContactForm(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  const status = form.querySelector('.status');
  btn.disabled = true;
  status.textContent = 'Sending...';

  const payload = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    service: form.service.value,
    message: form.message.value.trim()
  };
  try {
    const res = await fetch('/api/contact', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (data.ok){
      status.textContent = 'Thanks! Your message was received.';
      form.reset();
    } else {
      status.textContent = data.error || 'Something went wrong. Try again.';
    }
  } catch (err){
    console.error(err);
    status.textContent = 'Network error. Please try again.';
  } finally {
    btn.disabled = false;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('#contact-form');
  if (contactForm){
    contactForm.addEventListener('submit', submitContactForm);
  }
});
