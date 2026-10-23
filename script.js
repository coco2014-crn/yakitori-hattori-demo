document.documentElement.classList.add('js');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const hero = document.querySelector('.hero');
const sceneToggles = document.querySelectorAll('.scene-toggle');
const setScene = (scene, userInitiated = false) => {
  if (!hero) return;
  hero.dataset.scene = scene;
  hero.classList.add('hero-interactive');
  sceneToggles.forEach((toggle) => {
    const active = toggle.dataset.scene === scene;
    toggle.classList.toggle('is-active', active);
    toggle.setAttribute('aria-pressed', String(active));
  });
  if (userInitiated) hero.dataset.userSelected = 'true';
};
sceneToggles.forEach((toggle) => toggle.addEventListener('click', () => setScene(toggle.dataset.scene, true)));
if (hero) {
  setScene('day');
  window.setTimeout(() => { if (!hero.dataset.userSelected && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) setScene('night'); }, 1200);
}
