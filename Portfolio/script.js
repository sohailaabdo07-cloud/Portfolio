const yearElement = document.getElementById('year');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealElements.forEach((element) => revealObserver.observe(element));

const counters = document.querySelectorAll('.count-up');
const animateCounter = (element) => {
  const target = Number(element.dataset.target || 0);
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 80));

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = current;
  }, 18);
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => counterObserver.observe(counter));

const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    const isValid = name && email && message && name.value.trim() && email.value.trim() && message.value.trim();

    if (!isValid) {
      status.textContent = 'Please fill in all fields before sending.';
      status.classList.add('error');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      status.textContent = 'Please enter a valid email address.';
      status.classList.add('error');
      return;
    }

    status.classList.remove('error');
    status.textContent = 'Thank you! Your message has been sent successfully.';
    form.reset();
  });
}
