// Source: https://www.youtube.com/watch?v=MBaw_6cPmAw

const openButtons = document.querySelectorAll('[data-learnt-target]')
const closeButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')
const element9 = document.querySelector('html')

openButtons.forEach(button => {
  button.addEventListener('click', () => {
    const learnt = document.querySelector(button.dataset.learntTarget)
    openButton(learnt)
  })
})

overlay.addEventListener('click', () => {
  const learnts = document.querySelectorAll('#learnt.active')
  learnts.forEach(learnt => {
    closeButton(learnt)
  })
})

closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const learnt = button.closest('#learnt')
    closeButton(learnt)
  })
})

function openButton(learnt) {
  if (learnt == null) return
  learnt.classList.add('active')
  overlay.classList.add('active')
  element9.style.overflowY = 'hidden'
}

function closeButton(learnt) {
  if (learnt == null) return
  learnt.classList.remove('active')
  overlay.classList.remove('active')
  element9.style.overflowY = 'scroll'
}

// window.addEventListener("load", (event) => {
//   console.log("page is fully loaded");
// });

document.onreadystatechange = function() {
  if (document.readyState !== "complete") {
    document.querySelector('body').style.visibility = 'hidden';
    document.getElementById('loader').style.visibility = 'visible';
    document.querySelector('header').style.animationPlayState = 'paused';
    document.documentElement.style.setProperty('--pseudo', "paused");
    element9.style.overflowY = "hidden";
  }

  else {
    document.querySelector('body').style.visibility = 'visible';
    document.getElementById('loader').style.visibility = 'hidden';
    document.querySelector('header').style.animationPlayState = 'running';
    document.documentElement.style.setProperty('--pseudo', "running");
    element9.style.overflowY = "scroll";
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}