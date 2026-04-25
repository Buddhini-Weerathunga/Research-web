/* ============================================================
   AyurAI – aboutus.js
   About Us page specific animations & interactions
   ============================================================ */

// ── Scroll-reveal for team cards ─────────────────────────────
(function initCardReveal() {
  const cards = document.querySelectorAll('.team-card, .supervisor-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting && !entry.target.dataset.revealed) {
        entry.target.dataset.revealed = 'true';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0) scale(1)';
      }
    });
  }, { threshold: 0.12 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(35px) scale(0.97)';
    card.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
    observer.observe(card);
  });
})();

// ── Mission strip items staggered reveal ─────────────────────
(function initMissionReveal() {
  const items = document.querySelectorAll('.mission-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting && !entry.target.dataset.revealed) {
        entry.target.dataset.revealed = 'true';
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 150);
      }
    });
  }, { threshold: 0.4 });

  items.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
  });
})();

// ── Touch support for flip cards on mobile ───────────────────
(function initMobileFlip() {
  const cards = document.querySelectorAll('.team-card');

  cards.forEach(card => {
    let tapped = false;

    card.addEventListener('touchstart', (e) => {
      e.preventDefault();
      if (tapped) {
        // second tap = flip back
        card.querySelector('.team-card-inner').style.transform = '';
        tapped = false;
      } else {
        // first tap = flip
        card.querySelector('.team-card-inner').style.transform = 'rotateY(180deg)';
        tapped = true;
        // auto-flip back after 4 seconds
        setTimeout(() => {
          if (tapped) {
            card.querySelector('.team-card-inner').style.transform = '';
            tapped = false;
          }
        }, 4000);
      }
    }, { passive: false });
  });
})();

// ── Gold shimmer on supervisor card hover ────────────────────
(function initSupervisorGlow() {
  const card = document.querySelector('.supervisor-card');
  if (!card) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
    const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
    card.style.background =
      `radial-gradient(circle at ${x}% ${y}%, rgba(200,169,81,0.08), rgba(10,28,10,0.9) 60%)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
})();

// ── Floating chat ────────────────────────────────────────────
const chatBubble = document.getElementById('chatBubble');
if (chatBubble) {
  chatBubble.addEventListener('click', () => {
    chatBubble.style.transform = 'scale(0.88) rotate(-10deg)';
    setTimeout(() => { chatBubble.style.transform = ''; }, 250);
    alert('AyurAI Chat coming soon! 🌿');
  });
}