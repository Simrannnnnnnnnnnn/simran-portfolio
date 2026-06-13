// Typing animation
const roles = [
  "GenAI Applications",
  "AI-Powered Products",
  "Data Pipelines",
  "Full-Stack Apps",
  "ML Solutions"
];
let roleIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typed');

function typeRole() {
  const current = roles[roleIdx];
  if (!deleting) {
    typedEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeRole, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(typeRole, deleting ? 60 : 90);
}
typeRole();

// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Hamburger
document.getElementById('hamburger').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Project expand with bounce
function expandProject(card) {
  const detail = card.querySelector('.project-detail');
  const isExpanded = card.classList.contains('expanded');
  
  // Close all
  document.querySelectorAll('.project-card.expanded').forEach(c => {
    c.classList.remove('expanded');
    const d = c.querySelector('.project-detail');
    d.style.display = 'none';
    d.classList.remove('visible');
    const hint = c.querySelector('.expand-hint');
    if (hint) hint.style.display = '';
  });

  if (!isExpanded) {
    card.classList.add('expanded');
    detail.style.display = 'block';
    requestAnimationFrame(() => detail.classList.add('visible'));
    const hint = card.querySelector('.expand-hint');
    if (hint) hint.style.display = 'none';
    // Smooth scroll into view
    setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
  }
}

// Chat toggle
function toggleChat() {
  const widget = document.getElementById('chatWidget');
  const overlay = document.getElementById('chatOverlay');
  widget.classList.toggle('active');
  overlay.classList.toggle('active');
  if (widget.classList.contains('active')) {
    document.getElementById('chatInput').focus();
  }
}

// Chat send
async function sendMessage() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;

  addMessage(msg, 'user');
  input.value = '';
  
  const typing = addTyping();

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: msg })
    });
    const data = await res.json();
    typing.remove();
    addMessage(data.reply || "Sorry, I couldn't get a response right now.", 'bot');
  } catch {
    typing.remove();
    addMessage("Hmm, something went wrong. Please try again!", 'bot');
  }
}

function addMessage(text, type) {
  const msgs = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = `msg ${type === 'user' ? 'user-msg' : 'bot-msg'}`;
  div.innerHTML = `<p>${text}</p>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return div;
}

function addTyping() {
  const msgs = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'msg bot-msg typing-msg';
  div.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return div;
}

// Smooth active nav highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.getAttribute('id');
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` 
      ? 'var(--text)' : '';
  });
});