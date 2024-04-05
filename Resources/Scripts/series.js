ScrollTrigger.create({
    animation: gsap.from("header", {
        y: "44vh",
        scale: 1.5,
        yPercent: -50,
    }),
    scrub: true,
    trigger: "#series_list",
    start: "top bottom",
    endTrigger: "#series_list",
    end: "top center",
})

let index1 = 0;
displayImages1();
function displayImages1() {
    let i;
    const images1 = document.getElementsByClassName("image_breakingbad");
    for (i = 0; i < images1.length; i++) {
        images1[i].style.display = "none";
    }    
    index1++;
    if (index1 > images1.length) {
        index1 = 1;
    }
    images1[index1-1].style.display = "block";
    setTimeout(displayImages1, 8000);
}

index2 = 0;
displayImages2();
function displayImages2() {
    let i;
    const images2 = document.getElementsByClassName("image_succession");
    for (i = 0; i < images2.length; i++) {
        images2[i].style.display = "none";
    }    
    index2++;
    if (index2 > images2.length) {
        index2 = 1;
    }
    images2[index2-1].style.display = "block";
    setTimeout(displayImages2, 8000);
}

index3 = 0;
displayImages3();
function displayImages3() {
    let i;
    const images3 = document.getElementsByClassName("image_dark");
    for (i = 0; i < images3.length; i++) {
        images3[i].style.display = "none";
    }    
    index3++;
    if (index3 > images3.length) {
        index3 = 1;
    }
    images3[index3-1].style.display = "block";
    setTimeout(displayImages3, 8000);
}

index4 = 0;
displayImages4();
function displayImages4() {
    let i;
    const images4 = document.getElementsByClassName("image_ted");
    for (i = 0; i < images4.length; i++) {
        images4[i].style.display = "none";
    }    
    index4++;
    if (index4 > images4.length) {
        index4 = 1;
    }
    images4[index4-1].style.display = "block";
    setTimeout(displayImages4, 8000);
}

index5 = 0;
displayImages5();
function displayImages5() {
    let i;
    const images5 = document.getElementsByClassName("image_black");
    for (i = 0; i < images5.length; i++) {
        images5[i].style.display = "none";
    }    
    index5++;
    if (index5 > images5.length) {
        index5 = 1;
    }
    images5[index5-1].style.display = "block";
    setTimeout(displayImages5, 8000);
}

//Source: https://www.shecodes.io/athena/43030-how-to-add-hover-effects-to-a-button-in-javascript#:~:text=To%20add%20hover%20effects%20to%20a%20button%20in%20JavaScript%2C%20you,or%20exits%20the%20button's%20area.&text=%2F%2F%20Get%20the%20button%20element,a%20mouseover%20event%20listener%20button.
const button = document.querySelector('.head');

const element = document.querySelector('p')
var rect = element.getBoundingClientRect();
console.log(rect.top, rect.right, rect.bottom, rect.left);
var adb = rect.top + document.documentElement.scrollTop;

const element7 = document.querySelector('.end_list')
  var rect = element7.getBoundingClientRect();
  console.log(rect.top, rect.right, rect.bottom, rect.left);
  var end = rect.top + document.documentElement.scrollTop - 125;

window.addEventListener("scroll", (event) => {
    let scroll = this.scrollY;
    if (scroll > adb && scroll < end) {
      document.querySelector("body").classList.add("addB");
    } else {
      document.querySelector("body").classList.remove("addB");
    }
  });


const element1 = document.querySelector('#navigation')
window.addEventListener("scroll", (event) => {
    let scroll = this.scrollY;
    if (scroll > adb && scroll < end) {
      element1.style.contentVisibility = 'hidden';
    } else {
      element1.style.contentVisibility = 'visible';
    }
  });
window.addEventListener("scroll", (event) => {
  let scroll = this.scrollY;
  if (scroll > end) {
    element1.classList.add("nav_active");
    element1.style.background = 'black';
  } else {
    element1.classList.remove("nav_active");
    element1.style.background = 'transparent';
  }
})

const element8 = document.querySelector('header')
window.addEventListener("scroll", (event) => {
  let scroll = this.scrollY;
  if (scroll > end) {
    element8.classList.add("head_active");
  } else {
    element8.classList.remove("head_active")
  }
})

const element2 = document.querySelector('#breakingbad_list')
var rect = element2.getBoundingClientRect();
console.log(rect.top, rect.right, rect.bottom, rect.left);
var breakingbad = rect.top + document.documentElement.scrollTop;

window.addEventListener("scroll", (event) => {
    let scroll = this.scrollY;
    if (scroll > breakingbad) {
      document.querySelector("#breakingbad_list").classList.add("fixed");
    } else {
      document.querySelector("#breakingbad_list").classList.remove("fixed");
    }
  });

const element3 = document.querySelector('#succession_list')
  var rect = element3.getBoundingClientRect();
  console.log(rect.top, rect.right, rect.bottom, rect.left);
  var succession = rect.top + document.documentElement.scrollTop;
  
  window.addEventListener("scroll", (event) => {
      let scroll = this.scrollY;
      if (scroll > succession) {
        document.querySelector("#succession_list").classList.add("fixed");
      } else {
        document.querySelector("#succession_list").classList.remove("fixed");
      }
    });

const element4 = document.querySelector('#dark_list')
    var rect = element4.getBoundingClientRect();
    console.log(rect.top, rect.right, rect.bottom, rect.left);
    var dark = rect.top + document.documentElement.scrollTop;
    
    window.addEventListener("scroll", (event) => {
        let scroll = this.scrollY;
        if (scroll > dark) {
          document.querySelector("#dark_list").classList.add("fixed");
        } else {
          document.querySelector("#dark_list").classList.remove("fixed");
        }
      });

const element5 = document.querySelector('#ted_list')
    var rect = element5.getBoundingClientRect();
    console.log(rect.top, rect.right, rect.bottom, rect.left);
    var ted = rect.top + document.documentElement.scrollTop;
    
    window.addEventListener("scroll", (event) => {
        let scroll = this.scrollY;
        if (scroll > ted) {
          document.querySelector("#ted_list").classList.add("fixed");
        } else {
          document.querySelector("#ted_list").classList.remove("fixed");
        }
      });

const element6 = document.querySelector('#black_list')
    var rect = element6.getBoundingClientRect();
    console.log(rect.top, rect.right, rect.bottom, rect.left);
    var black = rect.top + document.documentElement.scrollTop;
    
    window.addEventListener("scroll", (event) => {
        let scroll = this.scrollY;
        if (scroll > black) {
          document.querySelector("#black_list").classList.add("fixed");
        } else {
          document.querySelector("#black_list").classList.remove("fixed");
        }
      });

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