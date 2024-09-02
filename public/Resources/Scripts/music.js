ScrollTrigger.create({
  animation: gsap.from("header", {
    y: "42vh",
    scale: 1.6,
    yPercent: -50,
  }),
  scrub: true,
  trigger: "#spacer",
  start: "top bottom",
  endTrigger: "#spacer",
  end: "top center",
})

ScrollTrigger.create({
  animation: gsap.from("a", {
    color: "#141414",
  }),
  scrub: true,
  trigger: "#spacer",
  start: "top bottom",
  endTrigger: "#spacer",
  end: "top center",
})

function desktop() {
  ScrollTrigger.create({
    animation: gsap.from("#navigation", {
      backgroundColor: "transparent",
      height: '8vmax',
      top: 'auto',
      left: 'auto',
      width: '98.5vw',
    }),
    scrub: true,
    trigger: "#spacer",
    start: "top bottom",
    endTrigger: "#spacer",
    end: "top center",
  })
}

function mobile() {
  ScrollTrigger.create({
    animation: gsap.from("#navigation", {
      backgroundColor: "transparent",
      height: '8vmax',
    }),
    scrub: true,
    trigger: "#spacer",
    start: "top bottom",
    endTrigger: "#spacer",
    end: "top center",
  })

  ScrollTrigger.create({
    animation: gsap.from("#navigation", {
      paddingTop: '1vh',
    }),
    scrub: true,
    trigger: "#spacer",
    start: "top bottom",
    endTrigger: "#spacer",
    end: "top center",
  })
}

if (window.innerWidth <= 600) {
  mobile()
}
else {
  desktop()
}

window.addEventListener("resize", (event) => {
  if (window.innerWidth <= 600) {
    mobile();
  }
  else {
    window.location.reload();
    desktop();
  }
})

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


// var Sbox = document.querySelector('p').getBoundingClientRect()
// var topS = Sbox.top

// console.log(topS/2 + (0.014*window.innerHeight))

// window.addEventListener('scroll', () => {
//     console.log(this.scrollY)
// })

document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
    document.querySelector('body').style.visibility = 'hidden';
    document.getElementById('loader').style.visibility = 'visible';
    element9.style.overflowY = "hidden";
  }

  else {
    document.querySelector('body').style.visibility = 'visible';
    document.getElementById('loader').style.visibility = 'hidden';
    element9.style.overflowY = "scroll";
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}