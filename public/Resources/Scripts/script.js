const overlay = document.getElementById('overlay'),
  html = document.firstElementChild,
  loader = document.getElementById('loader'),
  header = document.getElementById('first').firstElementChild;

document.querySelector('button:first-of-type').onclick = toggleLearning;
overlay.onclick = toggleLearning;
document.getElementById('learnt_close').onclick = toggleLearning;

function toggleLearning() {
  document.getElementById('learnt').classList.toggle('active');
  overlay.classList.toggle('active');
  if (html.style.overflowY == 'hidden') {
    html.style.overflowY = 'scroll';
  } else { html.style.overflowY = 'hidden' }
  if (overlay.className == 'active') {
    document.addEventListener('keyup', escKey);
  } else { document.removeEventListener('keyup', escKey) };
};

function escKey(key) {
  if (key.code == 'Escape') toggleLearning()
}

loader.style.visibility = 'visible';
loader.style.opacity = 1;
document.body.style.visibility = 'hidden';
document.documentElement.style.setProperty('--pseudo', "paused");
html.style.overflowY = 'hidden';

header.onanimationend = () => {
  html.style.overflowY = 'scroll';
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.style.visibility = 'visible';
  loader.style.visibility = 'hidden';
  loader.style.opacity = 0;
  document.documentElement.style.setProperty('--pseudo', "running");
});