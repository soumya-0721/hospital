/* ==================================================
   AYURVENA — Premium Healthcare UI
   JavaScript — All Interactivity & Animations
   ================================================== */

'use strict';

// ==========================================
// 1. LOADER
// ==========================================
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2200);
});

// ==========================================
// 2. CUSTOM CURSOR
// ==========================================
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  cursorRing.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, input, select, textarea, .tilt-card, .feature-card, .doctor-card, .medicine-card, .lab-card, .package-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
});

// ==========================================
// 3. SCROLL PROGRESS BAR
// ==========================================
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = scrollPercent + '%';
});

// ==========================================
// 4. BACK TO TOP
// ==========================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 600) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==========================================
// 5. NAVBAR SCROLL EFFECT
// ==========================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ==========================================
// 6. MOBILE HAMBURGER MENU
// ==========================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// ==========================================
// 7. NAV LINK ACTIVE ON SCROLL + SMOOTH SCROLL
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const sections = document.querySelectorAll('.section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinkEls.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// ==========================================
// 8. THEME TOGGLE
// ==========================================
const themeToggle = document.getElementById('themeToggle');
let darkMode = false;

themeToggle.addEventListener('click', () => {
  darkMode = !darkMode;
  document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  themeToggle.innerHTML = darkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// ==========================================
// 9. PARTICLES
// ==========================================
const canvas = document.getElementById('particlesCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let particleCount = 80;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5 ? '#2563EB' : '#06B6D4';
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

initParticles();

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 150) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = '#2563EB';
        ctx.globalAlpha = 0.08 * (1 - dist / 150);
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  connectParticles();
  requestAnimationFrame(animateParticles);
}

animateParticles();

// ==========================================
// 10. SKELETON LOADING FOR DOCTORS SECTION
// ==========================================
function showSkeletons(container, count, template) {
  for (let i = 0; i < count; i++) {
    const skeleton = document.createElement('div');
    skeleton.className = 'skeleton-card fade-in';
    skeleton.innerHTML = template || `
      <div class="skeleton skeleton-img" style="margin:0 auto 16px"></div>
      <div class="skeleton skeleton-text w-60" style="margin:0 auto 10px"></div>
      <div class="skeleton skeleton-text w-40" style="margin:0 auto 10px"></div>
      <div class="skeleton skeleton-text w-80" style="margin:0 auto 10px"></div>
      <div class="skeleton skeleton-btn" style="margin:12px auto 0"></div>
    `;
    container.appendChild(skeleton);
    setTimeout(() => skeleton.classList.add('visible'), 50);
  }
}

// ==========================================
// 11. SCROLL FADE-IN ANIMATIONS (Intersection Observer)
// ==========================================
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(el => fadeObserver.observe(el));

// ==========================================
// 11. ANIMATED COUNTERS
// ==========================================
const counters = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = parseInt(counter.getAttribute('data-target'));
      animateCounter(counter, target);
      counterObserver.unobserve(counter);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

function animateCounter(element, target) {
  let current = 0;
  const increment = Math.ceil(target / 80);
  const duration = 2000;
  const stepTime = Math.floor(duration / 80);

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = current.toLocaleString();
  }, stepTime);
}

// ==========================================
// 12. FLOATING LABELS FOR SELECT ELEMENTS
// ==========================================
document.querySelectorAll('.form-select').forEach(select => {
  const checkFilled = () => {
    if (select.value && select.value !== 'Select Department' && select.value !== 'Select Doctor') {
      select.classList.add('filled');
    } else {
      select.classList.remove('filled');
    }
  };
  select.addEventListener('change', checkFilled);
  checkFilled();
});

// Also watch text inputs for floating labels
document.querySelectorAll('.form-group.floating .form-input').forEach(input => {
  const checkFilled = () => {
    if (input.value) {
      input.classList.add('filled');
    } else {
      input.classList.remove('filled');
    }
  };
  input.addEventListener('input', checkFilled);
  checkFilled();
});

// ==========================================
// 13. TILT EFFECT ON CARDS
// ==========================================
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  });
});

// ==========================================
// 13. MAGNETIC BUTTONS
// ==========================================
document.querySelectorAll('.magnetic-btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const strength = parseInt(btn.getAttribute('data-strength')) || 20;
    btn.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
  });
});

// ==========================================
// 14. RIPPLE EFFECT ON BUTTONS
// ==========================================
document.querySelectorAll('.ripple-btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
    ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// ==========================================
// 15. DOCTOR DATA
// ==========================================
const doctorsData = [
  { name: 'Dr. Arjun Mehra', spec: 'Cardiologist', exp: '15 years', rating: 4.9, img: 'https://img.freepik.com/free-photo/young-handsome-physician-medical-robe-with-stethoscope_1303-17818.jpg?w=300', available: true },
  { name: 'Dr. Priya Sharma', spec: 'Neurologist', exp: '12 years', rating: 4.8, img: 'https://img.freepik.com/free-photo/female-doctor-hospital-with-stethoscope_23-2148827761.jpg?w=300', available: true },
  { name: 'Dr. Vikram Patel', spec: 'Orthopedic', exp: '18 years', rating: 4.9, img: 'https://img.freepik.com/free-photo/doctor-with-stethoscope-2023-11-27-05-18-04-utc.jpg?w=300', available: true },
  { name: 'Dr. Ananya Gupta', spec: 'Dentist', exp: '8 years', rating: 4.7, img: 'https://img.freepik.com/free-photo/dentist-with-medical-team_53876-148358.jpg?w=300', available: true },
  { name: 'Dr. Rajesh Kumar', spec: 'Pediatrician', exp: '14 years', rating: 4.8, img: 'https://img.freepik.com/free-photo/happy-doctor-with-stethoscope_1098-16165.jpg?w=300', available: true },
  { name: 'Dr. Sneha Reddy', spec: 'Dermatologist', exp: '10 years', rating: 4.9, img: 'https://img.freepik.com/free-photo/doctor-with-stethoscope-handsome-hospital_1303-28122.jpg?w=300', available: true },
  { name: 'Dr. Amit Verma', spec: 'Gynecologist', exp: '16 years', rating: 4.8, img: 'https://img.freepik.com/free-photo/smiling-doctor-with-folded-arms_1098-19015.jpg?w=300', available: true },
  { name: 'Dr. Kavita Nair', spec: 'Cardiologist', exp: '11 years', rating: 4.7, img: 'https://img.freepik.com/free-photo/portrait-doctor_144627-39369.jpg?w=300', available: true },
];

const doctorsGrid = document.getElementById('doctorsGrid');

function renderDoctors(filter = 'all') {
  doctorsGrid.innerHTML = '';
  const filtered = filter === 'all' ? doctorsData : doctorsData.filter(d => d.spec === filter);

  filtered.forEach(doc => {
    const stars = '★'.repeat(Math.floor(doc.rating)) + (doc.rating % 1 >= 0.5 ? '½' : '');
    const card = document.createElement('div');
    card.className = 'doctor-card fade-in';
    card.innerHTML = `
      <img src="${doc.img}" alt="${doc.name}" class="doctor-img" loading="lazy" />
      <div class="doctor-name">${doc.name}</div>
      <div class="doctor-spec">${doc.spec}</div>
      <div class="doctor-exp">${doc.exp} experience</div>
      <div class="doctor-rating">${stars} ${doc.rating}</div>
      ${doc.available ? '<div class="doctor-badge">✓ Available Today</div>' : ''}
      <button class="btn btn-primary doctor-btn ripple-btn magnetic-btn" data-strength="20">Consult Now</button>
    `;
    doctorsGrid.appendChild(card);
    setTimeout(() => card.classList.add('visible'), 100);
    fadeObserver.observe(card);

    // Add ripple and magnetic to new buttons
    const btn = card.querySelector('.ripple-btn');
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
      ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

renderDoctors();

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderDoctors(btn.getAttribute('data-filter'));
  });
});

// ==========================================
// 16. MEDICINE DATA
// ==========================================
const medicinesData = [
  { name: 'Paracetamol 500mg', category: 'Pain Relief', price: '₹49', uses: 'Fever, headache, body pain', img: 'images/paracetamol.jpg', inStock: true },
  { name: 'Amoxicillin 250mg', category: 'Antibiotic', price: '₹129', uses: 'Bacterial infections, UTI, tonsillitis', img: 'images/amoxicillin.jpg', inStock: true },
  { name: 'Vitamin C 500mg', category: 'Supplements', price: '₹299', uses: 'Immunity boost, antioxidant', img: 'images/vitamin-c.jpg', inStock: true },
  { name: 'Omeprazole 20mg', category: 'Gastric', price: '₹89', uses: 'Acidity, GERD, ulcer treatment', img: 'images/omeprazole.jpg', inStock: true },
  { name: 'Cetirizine 10mg', category: 'Allergy', price: '₹39', uses: 'Allergies, hay fever, hives', img: 'images/cetirizine.jpg', inStock: true },
  { name: 'Metformin 500mg', category: 'Diabetes', price: '₹79', uses: 'Type 2 diabetes management', img: 'images/metformin.jpg', inStock: true },
  { name: 'Azithromycin 500mg', category: 'Antibiotic', price: '₹159', uses: 'Respiratory infections, skin infections', img: 'images/azithromycin.jpg', inStock: true },
  { name: 'Ibuprofen 400mg', category: 'Pain Relief', price: '₹59', uses: 'Inflammation, muscle pain, arthritis', img: 'images/ibuprofen.jpg', inStock: false },
];

const medicinesGrid = document.getElementById('medicinesGrid');

function renderMedicines() {
  medicinesGrid.innerHTML = '';
  medicinesData.forEach(med => {
    const card = document.createElement('div');
    card.className = 'medicine-card fade-in';
    card.innerHTML = `
      <img src="${med.img}" alt="${med.name}" class="medicine-img" loading="lazy" />
      <div class="medicine-name">${med.name}</div>
      <div class="medicine-category">${med.category}</div>
      <div class="medicine-uses">${med.uses}</div>
      <div class="medicine-footer">
        <div class="medicine-price">${med.price}</div>
        <div class="medicine-availability ${med.inStock ? 'in-stock' : 'out-of-stock'}">
          ${med.inStock ? '✓ In Stock' : '✗ Out of Stock'}
        </div>
      </div>
    `;
    card.addEventListener('click', () => openMedicineModal(med));
    medicinesGrid.appendChild(card);
    setTimeout(() => card.classList.add('visible'), 100);
    fadeObserver.observe(card);
  });
}

renderMedicines();

// ==========================================
// 17. MEDICINE MODAL
// ==========================================
const medicineModal = document.getElementById('medicineModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

function openMedicineModal(med) {
  modalBody.innerHTML = `
    <img src="${med.img}" alt="${med.name}" />
    <div class="modal-info">
      <h3>${med.name}</h3>
      <p><strong>Category:</strong> ${med.category}</p>
      <p><strong>Uses:</strong> ${med.uses}</p>
      <p><strong>Dosage:</strong> As directed by physician</p>
      <p><strong>Side Effects:</strong> Nausea, dizziness (consult doctor if persists)</p>
      <p><strong>Manufacturer:</strong> AyurVena Pharma Ltd.</p>
      <p><strong>MRP:</strong> <span style="text-decoration:line-through;color:#94A3B8;">${med.inStock ? (parseInt(med.price.replace('₹', '')) + 30) : ''}</span></p>
      <p><strong>Our Price:</strong> <span style="color:#2563EB;font-size:1.5rem;font-weight:800;">${med.price}</span></p>
      <p><strong>Discount:</strong> <span style="color:#10B981;font-weight:600;">30% OFF</span></p>
    </div>
  `;
  medicineModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

modalClose.addEventListener('click', () => {
  medicineModal.classList.remove('active');
  document.body.style.overflow = '';
});

medicineModal.addEventListener('click', (e) => {
  if (e.target === medicineModal) {
    medicineModal.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ==========================================
// 18. APPOINTMENT FORM
// ==========================================
const deptSelect = document.getElementById('deptSelect');
const doctorSelect = document.getElementById('doctorSelect');
const appointmentForm = document.getElementById('appointmentForm');
const successModal = document.getElementById('successModal');
const successClose = document.getElementById('successClose');

// Populate doctors based on department
const deptDoctors = {
  'Cardiology': ['Dr. Arjun Mehra', 'Dr. Kavita Nair'],
  'Neurology': ['Dr. Priya Sharma'],
  'Orthopedics': ['Dr. Vikram Patel'],
  'ENT': ['Dr. Rajesh Kumar'],
  'Pediatrics': ['Dr. Rajesh Kumar'],
  'Radiology': ['Dr. Sneha Reddy'],
  'Dermatology': ['Dr. Sneha Reddy'],
  'Gynecology': ['Dr. Amit Verma', 'Dr. Kavita Nair']
};

deptSelect.addEventListener('change', () => {
  const dept = deptSelect.value;
  doctorSelect.innerHTML = '<option value="">Select Doctor</option>';
  if (deptDoctors[dept]) {
    deptDoctors[dept].forEach(doc => {
      const opt = document.createElement('option');
      opt.value = doc;
      opt.textContent = doc;
      doctorSelect.appendChild(opt);
    });
  }
});

appointmentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Show success modal
  successModal.classList.add('active');
  document.body.style.overflow = 'hidden';
});

successClose.addEventListener('click', () => {
  successModal.classList.remove('active');
  document.body.style.overflow = '';
  appointmentForm.reset();
});

// ==========================================
// 19. GALLERY LIGHTBOX
// ==========================================
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.querySelector('.lightbox-close');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    lightboxImg.src = img.src;
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

lightboxClose.addEventListener('click', () => {
  lightboxModal.classList.remove('active');
  document.body.style.overflow = '';
});

lightboxModal.addEventListener('click', (e) => {
  if (e.target === lightboxModal) {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ==========================================
// 20. FAQ ACCORDION
// ==========================================
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const item = question.parentElement;
    const isActive = item.classList.contains('active');

    // Close all
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

    // Toggle current
    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// ==========================================
// 21. REVIEWS AUTO-SLIDER
// ==========================================
const reviewsData = [
  { name: 'Rahul Sharma', rating: 5, comment: 'Excellent hospital with world-class facilities. The doctors are very knowledgeable and caring.', img: 'https://img.freepik.com/free-photo/indian-man-smiling_23-2148110234.jpg?w=200' },
  { name: 'Priya Patel', rating: 5, comment: 'I had a wonderful experience. The online booking made everything so convenient and the staff was extremely helpful.', img: 'https://img.freepik.com/free-photo/indian-woman-smiling_23-2148110248.jpg?w=200' },
  { name: 'Amit Verma', rating: 4, comment: 'Great medical facility! The doctors took time to explain everything clearly. Highly recommended.', img: 'https://img.freepik.com/free-photo/handsome-young-indian-man_23-2148110206.jpg?w=200' },
  { name: 'Sunita Gupta', rating: 5, comment: 'The health package was comprehensive and affordable. The staff made me feel very comfortable throughout.', img: 'https://img.freepik.com/free-photo/indian-lady-smiling_23-2148110252.jpg?w=200' },
];

const reviewsTrack = document.getElementById('reviewsTrack');
const reviewsDots = document.getElementById('reviewsDots');
let reviewIndex = 0;
let reviewInterval;

function renderReviews() {
  reviewsTrack.innerHTML = '';
  reviewsDots.innerHTML = '';
  reviewsData.forEach((review, i) => {
    const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
    const card = document.createElement('div');
    card.className = 'review-card';
    card.innerHTML = `
      <img src="${review.img}" alt="${review.name}" class="review-img" loading="lazy" />
      <div class="review-name">${review.name}</div>
      <div class="review-stars">${stars}</div>
      <div class="review-comment">"${review.comment}"</div>
    `;
    reviewsTrack.appendChild(card);

    const dot = document.createElement('div');
    dot.className = 'review-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToReview(i));
    reviewsDots.appendChild(dot);
  });
}

function goToReview(index) {
  reviewIndex = index;
  reviewsTrack.style.transform = `translateX(-${index * 100}%)`;
  document.querySelectorAll('.review-dot').forEach((d, i) => {
    d.classList.toggle('active', i === index);
  });
  resetReviewInterval();
}

function nextReview() {
  reviewIndex = (reviewIndex + 1) % reviewsData.length;
  goToReview(reviewIndex);
}

function resetReviewInterval() {
  clearInterval(reviewInterval);
  reviewInterval = setInterval(nextReview, 3000);
}

renderReviews();
reviewInterval = setInterval(nextReview, 3000);

// ==========================================
// 23. PARALLAX EFFECT ON HERO
// ==========================================
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (hero) {
    const scrollY = window.scrollY;
    const heroLeft = hero.querySelector('.hero-left');
    const heroRight = hero.querySelector('.hero-right');
    if (heroLeft && scrollY < hero.offsetHeight) {
      heroLeft.style.transform = `translateY(${scrollY * 0.1}px)`;
    }
    if (heroRight && scrollY < hero.offsetHeight) {
      heroRight.style.transform = `translateY(${scrollY * 0.05}px)`;
    }
  }
});

// ==========================================
// 24. APPEND TOAST / NOTIFICATION (Optional)
// ==========================================
function showNotification(msg) {
  const notif = document.createElement('div');
  notif.style.cssText = `
    position: fixed; bottom: 100px; right: 40px;
    padding: 16px 24px; background: var(--gradient-primary);
    color: white; border-radius: 12px;
    box-shadow: 0 8px 30px rgba(37,99,235,0.3);
    font-weight: 500; z-index: 99999;
    transform: translateX(120%);
    transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
    font-family: 'Inter', sans-serif;
  `;
  notif.textContent = msg;
  document.body.appendChild(notif);
  requestAnimationFrame(() => { notif.style.transform = 'translateX(0)'; });
  setTimeout(() => {
    notif.style.transform = 'translateX(120%)';
    setTimeout(() => notif.remove(), 400);
  }, 3000);
}

// Demo: Show a welcome notification
setTimeout(() => {
  showNotification('👋 Welcome to AyurVena Healthcare!');
}, 3000);

// ==========================================
// 25. NEWSLETTER FORM
// ==========================================
document.querySelector('.newsletter-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = e.target.querySelector('input');
  if (input.value) {
    showNotification('✅ Subscribed successfully!');
    input.value = '';
  }
});

// ==========================================
// 26. BOOK APPOINTMENT NAV CTA
// ==========================================
document.querySelector('.nav-cta')?.addEventListener('click', () => {
  document.getElementById('appointment').scrollIntoView({ behavior: 'smooth' });
});
