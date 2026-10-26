document.documentElement.classList.add('js');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const hero = document.querySelector('.hero');
const sceneToggles = document.querySelectorAll('.scene-toggle');
let sceneTransitionId = 0;
const setScene = (scene, userInitiated = false) => {
  if (!hero) return;
  hero.classList.add('hero-interactive');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const currentScene = hero.dataset.scene || 'day';
  const changed = currentScene !== scene;
  const transitionId = ++sceneTransitionId;
  sceneToggles.forEach((toggle) => {
    const active = toggle.dataset.scene === scene;
    toggle.classList.toggle('is-active', active);
    toggle.setAttribute('aria-pressed', String(active));
  });
  if (userInitiated) hero.dataset.userSelected = 'true';
  if (!changed || reducedMotion) {
    hero.dataset.scene = scene;
    hero.classList.remove('is-scene-transitioning');
    return;
  }
  hero.classList.add('is-scene-transitioning');
  window.setTimeout(() => {
    if (transitionId !== sceneTransitionId) return;
    hero.dataset.scene = scene;
    hero.classList.remove('is-scene-transitioning');
  }, 1350);
};
sceneToggles.forEach((toggle) => toggle.addEventListener('click', () => setScene(toggle.dataset.scene, true)));
if (hero) {
  setScene('day');
  window.setTimeout(() => { if (!hero.dataset.userSelected && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) setScene('night'); }, 1200);
}
