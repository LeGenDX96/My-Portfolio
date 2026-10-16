/* ═══════════════════════════════════════════════
   WASEEEM TECHX — Portfolio Script
   ═══════════════════════════════════════════════ */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ═══════ LOADER ═══════ */
window.addEventListener('load', () => {
  setTimeout(() => {
    $('#loader').classList.add('hidden');
    initReveal();
  }, 900);
});

/* ═══════ CUSTOM CURSOR ═══════ */
const cursor = $('#cursor');
const cursorFollower = $('#cursorFollower');
let mx = 0, my = 0, fx = 0, fy = 0;

if (window.matchMedia('(hover: hover)').matches) {
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    cursor.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
  });

  const animateFollower = () => {
    fx += (mx - fx) * 0.15;
    fy += (my - fy) * 0.15;
    cursorFollower.style.transform = `translate(${fx - 18}px, ${fy - 18}px)`;
    requestAnimationFrame(animateFollower);
  };
  animateFollower();

  document.querySelectorAll('a, button, input, textarea, .skill-card, .project-card, .service-card').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      cursorFollower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      cursorFollower.classList.remove('hover');
    });
  });
}

/* ═══════ SCROLL PROGRESS ═══════ */
const scrollProgress = $('#scrollProgress');
const navbar = $('#navbar');
const backTop = $('.back-top');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = pct + '%';

  if (scrollTop > 40) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');

  if (backTop) {
    backTop.style.opacity = scrollTop > 400 ? '1' : '0.4';
  }
});

/* ═══════ NAV TOGGLE ═══════ */
const navToggle = $('#navToggle');
const navLinks = $('#navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});

$$('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

/* ═══════ ACTIVE LINK ON SCROLL ═══════ */
const sections = $$('section[id]');
const navItems = $$('.nav-link');

const setActiveLink = () => {
  const scrollPos = window.scrollY + 120;
  let current = 'home';
  sections.forEach((sec) => {
    if (scrollPos >= sec.offsetTop) current = sec.id;
  });
  navItems.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
};
window.addEventListener('scroll', setActiveLink);

/* ═══════ ROLE TYPING EFFECT ═══════ */
const roles = [
  'Full Stack Developer',
  'WhatsApp Bot Creator',
  'Node.js Developer',
  'UI/UX Enthusiast',
  'Open Source Contributor'
];
const roleEl = $('#roleText');
let roleIndex = 0, charIndex = 0, deleting = false;

function typeRole() {
  const current = roles[roleIndex];
  if (deleting) {
    roleEl.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, 400);
      return;
    }
  } else {
    roleEl.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) {
      deleting = true;
      setTimeout(typeRole, 1600);
      return;
    }
  }
  setTimeout(typeRole, deleting ? 50 : 90);
}
typeRole();

/* ═══════ COUNTER ANIMATION ═══════ */
const counters = $$('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.dataset.count;
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const tick = () => {
        current += step;
        if (current >= target) {
          el.textContent = target;
          return;
        }
        el.textContent = current;
        requestAnimationFrame(tick);
      };
      tick();
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach((c) => counterObserver.observe(c));

/* ═══════ REVEAL ON SCROLL ═══════ */
function initReveal() {
  const reveals = $$('.section-header, .about-text, .about-cards, .skill-card, .project-card, .service-card, .contact-info, .contact-form, .info-card, .highlight');

  reveals.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in-view'), i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach((el) => observer.observe(el));

  // Skill bars
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  $$('.skill-card').forEach((c) => skillObserver.observe(c));
}

/* ═══════ STARS CANVAS ═══════ */
const starsCanvas = $('#stars');
if (starsCanvas) {
  const ctx = starsCanvas.getContext('2d');
  let w, h, stars = [];

  const resize = () => {
    w = starsCanvas.width = window.innerWidth;
    h = starsCanvas.height = window.innerHeight;
    const count = Math.min(100, Math.floor((w * h) / 16000));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 + 0.3,
      a: Math.random() * 0.6 + 0.2,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
    }));
  };

  const animate = () => {
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      s.x += s.vx;
      s.y += s.vy;
      if (s.x < 0 || s.x > w) s.vx *= -1;
      if (s.y < 0 || s.y > h) s.vy *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 92, 124, ${s.a})`;
      ctx.fill();
    }
    // Connect nearby stars
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;
        const d = Math.hypot(dx, dy);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(stars[j].x, stars[j].y);
          ctx.strokeStyle = `rgba(255, 31, 75, ${0.06 * (1 - d / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  };

  resize();
  window.addEventListener('resize', resize);
  animate();
}

/* ═══════ TOAST ═══════ */
function toast(msg, type = 'success') {
  const t = $('#toast');
  const icons = {
    success: '<i class="fa-solid fa-circle-check" style="color:#22d47b"></i>',
    error: '<i class="fa-solid fa-circle-xmark" style="color:#ff1f4b"></i>',
  };
  t.innerHTML = (icons[type] || icons.success) + '<span>' + msg + '</span>';
  t.className = 'toast show ' + type;
  clearTimeout(t._t);
  t._t = setTimeout(() => (t.className = 'toast ' + type), 3200);
}

/* ═══════ CONTACT FORM ═══════ */
$('#contactForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = $('#name').value.trim();
  const email = $('#email').value.trim();
  const subject = $('#subject').value.trim();
  const message = $('#message').value.trim();

  if (!name || !email || !subject || !message) {
    toast('Please fill all fields', 'error');
    return;
  }

  // Send to WhatsApp instead (no backend needed!)
  const wa = `https://wa.me/923447861706?text=${encodeURIComponent(
    `*New Contact — Waseem TechX Portfolio*\n\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n📌 *Subject:* ${subject}\n\n💬 *Message:*\n${message}`
  )}`;
  window.open(wa, '_blank');
  toast('Opening WhatsApp… 🚀', 'success');
  e.target.reset();
});

/* ═══════ YEAR ═══════ */
$('#year').textContent = new Date().getFullYear();

/* ═══════ SMOOTH SCROLL FOR ANCHORS ═══════ */
$$('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const target = a.getAttribute('href');
    if (target === '#') return;
    const el = document.querySelector(target);
    if (el) {
      e.preventDefault();
      window.scrollTo({
        top: el.offsetTop - 70,
        behavior: 'smooth',
      });
    }
  });
});

/* ═══════ TILT EFFECT ON CARDS ═══════ */
if (window.matchMedia('(hover: hover)').matches) {
  $$('.project-card, .service-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rx = ((y / rect.height) - 0.5) * -6;
      const ry = ((x / rect.width) - 0.5) * 6;
      card.style.transform = `translateY(-8px) perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
