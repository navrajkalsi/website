ScrollTrigger.create({
    animation: gsap.from("header", {
        y: "44vh",
        scale: 1.5,
        yPercent: -50,
    }),
    scrub: true,
    trigger: "ul",
    start: "top bottom",
    endTrigger: "ul",
    end: "top center",
})

ScrollTrigger.create({
    animation: gsap.from("nav", {
        background: 'transparent',
    }),
    scrub: true,
    trigger: "ul",
    start: "top bottom",
    endTrigger: "ul",
    end: "top center",
})


let index = 0;
displayImages();
function displayImages() {
    let i;
    const images = document.getElementsByClassName("image");
    for (i = 0; i < images.length; i++) {
        images[i].style.display = "none";
    }    
    index++;
    if (index > images.length) {
        index = 1;
    }
    images[index-1].style.display = "block";
    setTimeout(displayImages, 8000);
}

// index = 0;
// displayImages1();
// function displayImages1() {
//     let i;
//     const images = document.getElementsByClassName("image_dune");
//     for (i = 0; i < images.length; i++) {
//         images[i].style.display = "none";
//     }    
//     index++;
//     if (index > images.length) {
//         index = 1;
//     }
//     images[index-1].style.display = "block";
//     setTimeout(displayImages1, 8000);
// }

// window.addEventListener("scroll", (event) => {
//     let scroll = this.scrollY;
//     if (scroll > 450) {
//       document.querySelector("nav").classList.add("shadow");
//     } else {
//       document.querySelector("nav").classList.remove("shadow");
//     }
//   });

//Source: https://www.shecodes.io/athena/43030-how-to-add-hover-effects-to-a-button-in-javascript#:~:text=To%20add%20hover%20effects%20to%20a%20button%20in%20JavaScript%2C%20you,or%20exits%20the%20button's%20area.&text=%2F%2F%20Get%20the%20button%20element,a%20mouseover%20event%20listener%20button.
const button = document.querySelector('.head');

button.addEventListener('mouseover', () => {
  button.style.color = '#141414';
});

button.addEventListener('mouseout', () => {
  button.style.color = '';
});

const element = document.querySelector('p')
var rect = element.getBoundingClientRect();
console.log(rect.top, rect.right, rect.bottom, rect.left);
var adb = rect.top + document.documentElement.scrollTop;

window.addEventListener("scroll", (event) => {
    let scroll = this.scrollY;
    if (scroll > adb) {
      document.querySelector("body").classList.add("addB");
    } else {
      document.querySelector("body").classList.remove("addB");
    }
  });

const element1 = document.querySelector('nav')
window.addEventListener("scroll", (event) => {
    let scroll = this.scrollY;
    if (scroll > adb) {
      element1.style.contentVisibility = 'hidden';
    } else {
      element1.style.contentVisibility = 'visible';
    }
  });

const element2 = document.querySelector('li')
var rect = element2.getBoundingClientRect();
console.log(rect.top, rect.right, rect.bottom, rect.left);
var oppie = rect.top + document.documentElement.scrollTop;

window.addEventListener("scroll", (event) => {
    let scroll = this.scrollY;
    if (scroll > oppie) {
      document.querySelector("li").classList.add("fixed");
    } else {
      document.querySelector("li").classList.remove("fixed");
    }
  });