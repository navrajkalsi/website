// Source: https://www.youtube.com/watch?v=MBaw_6cPmAw

const openButtons = document.querySelectorAll('[data-learnt-target]')
const closeButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

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
}

function closeButton(learnt) {
  if (learnt == null) return
  learnt.classList.remove('active')
  overlay.classList.remove('active')
}