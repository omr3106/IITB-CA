const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60));
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
function toggleFaq(button) {
  const item = button.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach((openItem) => openItem.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}
function switchTab(button, panelId) {
  document.querySelectorAll('.schedule-tab').forEach((tab) => tab.classList.toggle('active', tab === button));
  document.querySelectorAll('.schedule-panel').forEach((panel) => panel.classList.toggle('active', panel.id === panelId));
}
function animateCounter(element, target, duration = 1800) {
  const start = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    element.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
document.querySelectorAll('.counter-num').forEach((num) => {
  const suffix = num.querySelector('.counter-suffix');
  const match = num.textContent.trim().match(/^(\d+)/);
  if (!match) return;
  const target = Number(match[1]);
  num.innerHTML = `<span class="count-val">0</span>${suffix ? suffix.outerHTML : ''}`;
  const counterValue = num.querySelector('.count-val');
  new IntersectionObserver(([entry], observer) => {
    if (entry.isIntersecting) {
      animateCounter(counterValue, target);
      observer.disconnect();
    }
  }, { threshold: 0.5 }).observe(num);
});
