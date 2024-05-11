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
  
  if(window.innerWidth <= 600) {
    mobile()
  }
  else {
    desktop()
  }
  
  window.addEventListener("resize", (event) => {
    if(window.innerWidth <= 600) {
      mobile()
    }
    else {
      desktop()
    }
  })

// window.onbeforeunload = function () {
//     window.scrollTo(0, 0);
// }

// Source: https://www.youtube.com/watch?v=MBaw_6cPmAw

const openButtons = document.querySelectorAll('[data-learnt-target]')
const codeButtons = document.querySelectorAll('[data-code-target]')
const closeButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')
const element9 = document.querySelector('html')

openButtons.forEach(button => {
    button.addEventListener('click', () => {
        const learnt = document.querySelector(button.dataset.learntTarget)
        openButton(learnt)
    })
})

codeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const code = document.querySelector(button.dataset.codeTarget)
        openButton(code)
    })
})

overlay.addEventListener('click', () => {
    const learnts = document.querySelectorAll('#learnt.active')
    element9.style.overflowY = 'scroll';
    learnts.forEach(learnt => {
        closeButton(learnt)
    })
})

overlay.addEventListener('click', () => {
    const codes = document.querySelectorAll('#code.active')
    codes.forEach(code => {
        closeButton(code)
    })
})

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const learnt = button.closest('#learnt')
        closeButton(learnt)
    })
})

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const code = button.closest('#code')
        closeButton(code)
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

const cards = document.querySelectorAll('.card>div')
cards.forEach(card => {
    card.addEventListener('mouseover', function () {
        card.addEventListener('click', () => {
            document.getElementById(card.id + '_code').classList.add('active')
            document.getElementById('overlay').classList.add('active')
            element9.style.overflowY = 'hidden'

            document.getElementById('overlay').addEventListener('click', () => {
                document.getElementById('overlay').classList.remove('active')
                document.getElementById(card.id + '_code').classList.remove('active')
                element9.style.overflowY = 'scroll'
            })
        })
    })
    card.addEventListener('mouseout', function () {
        card.removeEventListener('click', () => {
            document.getElementById(card.id + '_code').classList.add('active')
            document.getElementById('overlay').classList.add('active')
        })
    })
    document.getElementById(card.id + '_code').querySelector('.close_code').addEventListener('click', () => {
        document.getElementById(card.id + '_code').classList.remove('active')
        document.getElementById('overlay').classList.remove('active')
        element9.style.overflowY = 'scroll';
    })
})

function readTextFile(file) { 
    var rawFile = new XMLHttpRequest(); 
    rawFile.open("GET", file, false); 
    rawFile.onreadystatechange = function () { 
      if (rawFile.readyState === 4) { 
        if (rawFile.status === 200 || rawFile.status == 0) { 
          var allText = rawFile.responseText; 
          document.getElementById('code_file').querySelector('pre').innerHTML = '';
          document.getElementById('code_file').querySelector('pre').innerHTML = allText;
        } 
      } 
    } 
    rawFile.send(null); 
  }

  function readTextFileHTML(file) { 
    var rawFile = new XMLHttpRequest(); 
    rawFile.open("GET", file, false); 
    rawFile.onreadystatechange = function () { 
      if (rawFile.readyState === 4) { 
        if (rawFile.status === 200 || rawFile.status == 0) {
          var allText = rawFile.responseText;
          allText = allText.replace(/[<>&\n]/g, function(x) {
            return {
                '<': '&lt;',
                '>': '&gt;',
                '&': '&amp;',
               '\n': '<br />'
            }[x];
        });
          document.getElementById('site_file').querySelector('pre').innerHTML = '';
          document.getElementById('site_file').querySelector('pre').innerHTML = allText.replace('<', '&lt;');
        } 
      } 
    } 
    rawFile.send(null); 
  }

divs = document.getElementById('python_code').querySelector('.code_body').querySelectorAll('div')
divs.forEach(div => {
    div.addEventListener('click', () => {
        var data = div.querySelector('span').innerHTML.trim()
        code_f = document.getElementById('code_file')
        code_f.classList.add('active')
        code_f.querySelector('.code_title').innerHTML = data
        readTextFile('/Resources/python/' + data + '.py')
        code_f.querySelector('.close_code').addEventListener('click', () => {
            code_f.classList.remove('active')
        })
        overlay.addEventListener('click', () => {
            code_f.classList.remove('active')
        })
    })
})

divs = document.getElementById('sql_code').querySelector('.code_body').querySelectorAll('div')
divs.forEach(div => {
    div.addEventListener('click', () => {
        var data = div.querySelector('span').innerHTML.trim()
        code_f = document.getElementById('code_file')
        code_f.classList.add('active')
        code_f.querySelector('.code_title').innerHTML = data
        readTextFile('/Resources/sql/' + data + '.sql')
        code_f.querySelector('.close_code').addEventListener('click', () => {
            code_f.classList.remove('active')
        })
        overlay.addEventListener('click', () => {
            code_f.classList.remove('active')
        })
    })
})



// adding code files

// PYTHON
// var python = document.getElementById('python_code').querySelector('.code_body');
// var python_num = 9;

// function createDivs(element, num) {
//     for (let i = 0; i < num;) {
//         element.appendChild(document.createElement('div'))
//         i += 1;
//     }
// }

// createDivs(python, 9);

const cards_site = document.querySelectorAll('#site_card>div')
cards_site.forEach(card => {
    card.addEventListener('mouseover', function () {
        card.addEventListener('click', () => {
            document.getElementById(card.id + '_code').classList.add('active')
            document.getElementById('overlay').classList.add('active')
            element9.style.overflowY = 'hidden'

            document.getElementById('overlay').addEventListener('click', () => {
                document.getElementById('overlay').classList.remove('active')
                document.getElementById(card.id + '_code').classList.remove('active')
                element9.style.overflowY = 'scroll'
            })
        })
    })
    card.addEventListener('mouseout', function () {
        card.removeEventListener('click', () => {
            document.getElementById(card.id + '_code').classList.add('active')
            document.getElementById('overlay').classList.add('active')
        })
    })
    document.getElementById(card.id + '_code').querySelector('.close_code').addEventListener('click', () => {
        document.getElementById(card.id + '_code').classList.remove('active')
        element9.style.overflowY = 'scroll';
    })
})

divs = document.getElementById('html_code').querySelector('.code_body').querySelectorAll('div')
divs.forEach(div => {
    div.addEventListener('click', () => {
        var data = div.querySelector('span').innerHTML.trim()
        code_s = document.getElementById('site_file')
        code_s.classList.add('active')
        code_s.querySelector('.code_title').innerHTML = data
        readTextFileHTML('/' + data + '.html')
        code_s.querySelector('.close_code').addEventListener('click', () => {
            code_s.classList.remove('active')
        })
        overlay.addEventListener('click', () => {
            code_s.classList.remove('active')
        })
    })
})

divs = document.getElementById('css_code').querySelector('.code_body').querySelectorAll('div')
divs.forEach(div => {
    div.addEventListener('click', () => {
        var data = div.querySelector('span').innerHTML.trim()
        code_s = document.getElementById('site_file')
        code_s.classList.add('active')
        code_s.querySelector('.code_title').innerHTML = data
        readTextFileHTML('/Resources/Styles/' + data + '.css')
        code_s.querySelector('.close_code').addEventListener('click', () => {
            code_s.classList.remove('active')
        })
        overlay.addEventListener('click', () => {
            code_s.classList.remove('active')
        })
    })
})

divs = document.getElementById('js_code').querySelector('.code_body').querySelectorAll('div')
divs.forEach(div => {
    div.addEventListener('click', () => {
        var data = div.querySelector('span').innerHTML.trim()
        code_s = document.getElementById('site_file')
        code_s.classList.add('active')
        code_s.querySelector('.code_title').innerHTML = data
        readTextFileHTML('/Resources/Scripts/' + data + '.js')
        code_s.querySelector('.close_code').addEventListener('click', () => {
            code_s.classList.remove('active')
        })
        overlay.addEventListener('click', () => {
            code_s.classList.remove('active')
        })
    })
})

const resume_button = document.getElementById('resume_button')
resume_button.addEventListener('click', () => {
    resume.classList.add('active')
    overlay.classList.add('active')
    element9.style.overflowY = 'hidden'
})

const resume = document.getElementById('resume')
resume.querySelector('.close_code').addEventListener('click', () => {
    resume.classList.remove('active')
    overlay.classList.remove('active')
    element9.style.overflowY = 'scroll'
})
overlay.addEventListener('click', () => {
    resume.classList.remove('active')
    overlay.classList.remove('active')
    element9.style.overflowY = 'scroll'
})

const certificate_button = document.getElementById('certificate_button')
certificate_button.addEventListener('click', () => {
    certificate.classList.add('active')
    overlay.classList.add('active')
    element9.style.overflowY = 'hidden'
})

const certificate = document.getElementById('certificate')
certificate.querySelector('.close_code').addEventListener('click', () => {
    certificate.classList.remove('active')
    overlay.classList.remove('active')
    element9.style.overflowY = 'scroll'
})
overlay.addEventListener('click', () => {
    certificate.classList.remove('active')
    overlay.classList.remove('active')
    element9.style.overflowY = 'scroll'
})

const models_button = document.getElementById('models_button')
models_button.addEventListener('click', () => {
    models.classList.add('active')
    overlay.classList.add('active')
    element9.style.overflowY = 'hidden'
})

const models = document.getElementById('models')
models.querySelector('.close_code').addEventListener('click', () => {
    models.classList.remove('active')
    overlay.classList.remove('active')
    element9.style.overflowY = 'scroll'
})
overlay.addEventListener('click', () => {
    models.classList.remove('active')
    overlay.classList.remove('active')
    element9.style.overflowY = 'scroll'
})

const div_m = document.getElementById('models').querySelector('.code_body').querySelectorAll('div')

visualViewport.onresize = () => {
    div_m.forEach(model => {
        model.querySelector('model-viewer').style.width = document.body.offsetWidth/3.26 + 'px'
        model.querySelector('model-viewer').style.height = document.body.offsetWidth/3 + 'px'
    })
}

window.onload = () => {
    div_m.forEach(model => {
        model.querySelector('model-viewer').style.width = document.body.offsetWidth/3.26 + 'px'
        model.querySelector('model-viewer').style.height = document.body.offsetWidth/3 + 'px'
    })
}

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