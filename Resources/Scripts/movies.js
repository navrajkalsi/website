// ScrollTrigger.create({
//     animation: gsap.from("header", {
//         y: "44vh",
//         scale: 1.5,
//         yPercent: -50,
//     }),
//     scrub: true,
//     trigger: "#movies_list",
//     start: "top bottom",
//     endTrigger: "#movies_list",
//     end: "top center",
// })

ScrollTrigger.create({
    animation: gsap.from("#navigation", {
        background: 'transparent',
    }),
    scrub: true,
    trigger: "#movies_list",
    start: "top bottom",
    endTrigger: "#movies_list",
    end: "top center",
})


let index1 = 0;
displayImages1();
function displayImages1() {
    let i;
    const images1 = document.getElementsByClassName("image");
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
    const images2 = document.getElementsByClassName("image_dune");
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
    const images3 = document.getElementsByClassName("image_tenet");
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
    const images4 = document.getElementsByClassName("image_topgun");
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
    const images5 = document.getElementsByClassName("image_batman");
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

const ulEl = document.querySelector('ul')
var ulBox = ulEl.getBoundingClientRect();
var ulTop = ulBox.top + document.documentElement.scrollTop - window.innerHeight/1.5;

const element7 = document.querySelector('.end_list')
  var rect = element7.getBoundingClientRect();
  var end = rect.top + document.documentElement.scrollTop - window.innerHeight/5;

window.addEventListener("scroll", (event) => {
    let scroll = this.scrollY;
    if (scroll > ulTop && scroll < end) {
      document.querySelector("body").classList.add("addB");
      document.querySelector('html').style.padding = 0;
    } else {
      document.querySelector("body").classList.remove("addB");
      document.querySelector('html').style.padding = '';
    }
  });

const element1 = document.querySelector('#navigation')
window.addEventListener("scroll", (event) => {
    let scroll = this.scrollY;
    if (scroll > ulTop && scroll < end) {
      element1.style.contentVisibility = 'hidden';
    } else {
      element1.style.contentVisibility = 'visible';
    }
  });
window.addEventListener("scroll", (event) => {
  let scroll = this.scrollY;
  if (scroll > end) {
    element1.classList.add("nav_active");
    document.getElementById('navigation2').classList.add('nav2_active')
  } else {
    element1.classList.remove("nav_active");
    document.getElementById('navigation2').classList.remove('nav2_active')
  }
})

const element2 = document.querySelector('#oppie_list')
var oppieBox = element2.getBoundingClientRect();
var oppieTop = oppieBox.top + document.documentElement.scrollTop;
var oppieBottom = oppieBox.bottom + document.documentElement.scrollTop;

window.addEventListener("scroll", (event) => {
    let scroll = this.scrollY;
    if (scroll >= oppieTop) {
      document.querySelector("#oppie_list").classList.add("fixed");
    } else {
      document.querySelector("#oppie_list").classList.remove("fixed");
    }
  });

const element3 = document.querySelector('#dune_list')
  var rect = element3.getBoundingClientRect();
  var dune = rect.top + document.documentElement.scrollTop;
  
  window.addEventListener("scroll", (event) => {
      let scroll = this.scrollY;
      if (scroll >= dune) {
        document.querySelector("#dune_list").classList.add("fixed");
      } else {
        document.querySelector("#dune_list").classList.remove("fixed");
      }
    });

const element4 = document.querySelector('#tenet_list')
    var tenetBox = element4.getBoundingClientRect();
    var tenetTop = tenetBox.top + document.documentElement.scrollTop;
    var tenetBottom = tenetBox.bottom + document.documentElement.scrollTop;
    
    window.addEventListener("scroll", (event) => {
        let scroll = this.scrollY;
        if (scroll >= tenetTop) {
          document.querySelector("#tenet_list").classList.add("fixed");
        } else {
          document.querySelector("#tenet_list").classList.remove("fixed");
        }
      });

const element5 = document.querySelector('#topgun_list')
    var rect = element5.getBoundingClientRect();
    var topgun = rect.top + document.documentElement.scrollTop;
    
    window.addEventListener("scroll", (event) => {
        let scroll = this.scrollY;
        if (scroll >= topgun) {
          document.querySelector("#topgun_list").classList.add("fixed");
        } else {
          document.querySelector("#topgun_list").classList.remove("fixed");
        }
      });

const element6 = document.querySelector('#batman_list')
    var rect = element6.getBoundingClientRect();
    var batman = rect.top + document.documentElement.scrollTop;
    
    window.addEventListener("scroll", (event) => {
        let scroll = this.scrollY;
        if (scroll >= batman) {
          document.querySelector("#batman_list").classList.add("fixed");
        } else {
          document.querySelector("#batman_list").classList.remove("fixed");
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

overlay.addEventListener('click', () => {
  const maps = document.querySelectorAll('#map.active')
  maps.forEach(mapped => {
    closeButton(mapped)
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

const mapButtons = document.querySelectorAll('[data-map-target]')

mapButtons.forEach(button => {
  button.addEventListener('click', () => {
    const mapped = document.querySelector(button.dataset.mapTarget)
    openButton(mapped)
  })
})

closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const mapped = button.closest('#map')
    closeButton(mapped)
  })
})

document.onreadystatechange = function() {
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

var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
               navigator.userAgent &&
               navigator.userAgent.indexOf('CriOS') == -1 &&
               navigator.userAgent.indexOf('FxiOS') == -1;

if (isSafari) {
  const commentDivs = document.getElementById('movies_list').querySelectorAll('div')
  commentDivs.forEach(comment => {
    comment.style.opacity = 0;
  })
  const movieLists = document.getElementById('movies_list').querySelectorAll('li')
  movieLists.forEach(list => {
    list.style.animation = 'none';
    list.style.opacity = 1;
  })
  var newIMG = document.createElement("img");
  document.getElementById('oppie_list').innerHTML = "";
  document.getElementById('oppie_list').appendChild(newIMG);
  document.getElementById('oppie_list').querySelector('img').setAttribute('src', 'Resources/Images/Movies/oppenheimer3.jpg');
  document.getElementById('oppie_list').querySelector('img').style.animation = 'none';
  
  newIMG = document.createElement("img");
  document.getElementById('tenet_list').innerHTML = "";
  document.getElementById('tenet_list').appendChild(newIMG);
  document.getElementById('tenet_list').querySelector('img').setAttribute('src', 'Resources/Images/Movies/tenet1.jpg');
  document.getElementById('tenet_list').querySelector('img').style.animation = 'none';
  
  newIMG = document.createElement("img");
  document.getElementById('topgun_list').innerHTML = "";
  document.getElementById('topgun_list').appendChild(newIMG);
  document.getElementById('topgun_list').querySelector('img').setAttribute('src', 'Resources/Images/Movies/topgun1.jpg');
  document.getElementById('topgun_list').querySelector('img').style.animation = 'none';
  
  newIMG = document.createElement("img");
  document.getElementById('dune_list').innerHTML = "";
  document.getElementById('dune_list').appendChild(newIMG);
  document.getElementById('dune_list').querySelector('img').setAttribute('src', 'Resources/Images/Movies/dune1.jpg');
  document.getElementById('dune_list').querySelector('img').style.animation = 'none';
  
  newIMG = document.createElement("img");
  document.getElementById('batman_list').innerHTML = "";
  document.getElementById('batman_list').appendChild(newIMG);
  document.getElementById('batman_list').querySelector('img').setAttribute('src', 'Resources/Images/Movies/batman4.jpg');
  document.getElementById('batman_list').querySelector('img').style.animation = 'none';
}