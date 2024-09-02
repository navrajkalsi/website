const cursor = document.getElementById("circularCursor"),
    opening = document.getElementById('opening'),
    header = document.querySelector('header'),
    loader = document.getElementById('loader'),
    scrollAnimatesTexts = [...document.getElementsByClassName('scrollAnimateText')],
    scrollAnimatesElms = [...document.getElementsByClassName('scrollAnimateElm')],
    pages = document.getElementById('pages'),
    about = document.getElementById('about'),
    learning = document.getElementById('learning'),
    wallpaper = document.getElementById('wallpaper'),
    learningDialog = learning.nextElementSibling,
    overlay = learningDialog.nextElementSibling;

document.addEventListener('DOMContentLoaded', init);

function init() {
    loader.classList.add('hide');
    cursor.style.visibility = 'hidden';
    document.querySelectorAll('.wallpapers').forEach(wall => {
        wall.firstElementChild.pause();
    });
    document.querySelector('main').classList.remove('hide');

    // <------ CURSOR ------->
    document.body.onmousemove = function (e) {
        cursor.style.setProperty(
            '--x', (
                e.clientX + window.scrollX
            )
        + 'px'
        );
        cursor.style.setProperty(
            '--y', (
                e.clientY + window.scrollY
            )
        + 'px'
        );
        cursor.style.visibility = 'visible';
    }

    document.body.onmouseenter = () => {
        cursor.style.visibility = 'visible'
    }

    document.body.onmouseleave = () => {
        cursor.style.visibility = 'hidden'
    }

    document.querySelectorAll('.hideCursor').forEach(element => {
        element.onmouseenter = () => { cursor.style.opacity = 0 }
        element.onmouseleave = () => { cursor.style.opacity = 1 }
        element.addEventListener('mousedown', () => {
            element.style.scale = 1;
        });
        element.addEventListener('mouseup', () => {
            element.style.scale = '';
        });
    });

    document.addEventListener('mousedown', () => {
        cursor.style.scale = '70%';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.scale = '';
    });

    // <-------- OPENING SCROLLING HORIZONTAL ------->
    let widthHeight = '';

    if (window.innerHeight < window.innerWidth) {
        widthHeight = (opening.offsetWidth + window.innerWidth) / header.offsetHeight;
    }
    else {
        widthHeight = (opening.offsetWidth + window.innerHeight) / header.offsetHeight;
    }

    // <-------- TEXT REVEAL -------->
    let spans = [];

    scrollAnimatesTexts.forEach(scrollAmnimateText => {
        let str = '';
        let array = scrollAmnimateText.textContent.split('');
        for (let i = 0; i < array.length; i++) {
            str += `<span>${array[i]}</span>`;
        }

        scrollAmnimateText.innerHTML = str;
        spans = [...scrollAmnimateText.children];
    });

    // <-------- PAGES -------->
    pages.style.height = `${pages.firstElementChild.offsetWidth}px`;
    pages.firstElementChild.querySelectorAll('li').forEach(div => {
        div.firstElementChild.firstElementChild.onmouseover = () => {
            // cursor.style.visibility = 'hidden';
            cursor.classList.add('hidingCursor');
            changeBG(div.firstElementChild.firstElementChild);
        }
        div.firstElementChild.firstElementChild.onmouseout = () => {
            // cursor.style.visibility = 'visible';
            cursor.classList.remove('hidingCursor');
            document.querySelectorAll('.wallpapers').forEach(wall => {
                wall.style.opacity = 0;
                wall.firstElementChild.pause();

                // setTimeout(() => {
                //     wall.firstElementChild.pause();
                // }, '1000');
            })
        }
    });

    // <-------- DIALOGS --------->
    learning.onclick = () => {
        learningDialog.style.visibility = 'visible';
        learningDialog.style.marginTop = 0;
        document.body.style.overflowY = 'hidden';
        overlay.style.visibility = 'visible';
        document.addEventListener('keyup', escKey);
    };
    overlay.onclick = closeDialog;
    learningDialog.querySelector('button').onclick = closeDialog;

    // <-------- ON SCROLL ---------->
    window.onscroll = () => {
        opening.style.left = `-${window.scrollY * widthHeight}px`;
        cursor.style.visibility = 'hidden';
        revealText(spans);
        revealElm(scrollAnimatesElms);
        if (pages.getBoundingClientRect().top <= 0 && learning.getBoundingClientRect().top - window.innerHeight > 0) {
            showPages();
            wallpaper.style.opacity = 0.5;

        } else if (about.getBoundingClientRect().bottom > 0 || learning.getBoundingClientRect().top - window.innerHeight <= 0) {
            wallpaper.style.opacity = 1;
            pages.firstElementChild.classList.remove('fix');
            pages.firstElementChild.style.left = 0;

            if (learning.getBoundingClientRect().top - window.innerHeight <= 0) {
                wallpaper.style.opacity = 0;
            }
        }
    }
}

// <-------- REVEAL TEXT LEFT TO RIGHT ---------->
function revealText(elms) {
    for (let elm of elms) {
        if (elm.parentElement.getBoundingClientRect().top < window.innerHeight) {
            let { left, top } = elm.getBoundingClientRect();
            top -= (window.innerHeight * 0.4);
            let opacityVal = 1 - ((top * 0.01) + (left * 0.001)) < 0.1 ? 0.1 : 1 - ((top * 0.01) + (left * 0.001));
            opacityVal = opacityVal > 1 ? 1 : opacityVal.toFixed(3);
            elm.style.opacity = opacityVal;
        }
    }
}

// <-------- REVEAL ELEMENT RIGHT TO LEFT --------->
function revealElm(elms) {
    for (let elm of elms) {
        if (elm.parentElement.getBoundingClientRect().top < window.innerHeight) {
            let { left, top } = elm.getBoundingClientRect();
            top -= window.innerHeight * 0.2;
            let opacityVal = 1 - ((top * 0.01) + (left * 0.001)) < 0 ? 0 : 1 - ((top * 0.01) + (left * 0.001));
            opacityVal = opacityVal > 1 ? 1 : opacityVal.toFixed(3);
            elm.style.opacity = opacityVal;
            elm.style.marginRight = `${opacityVal}vmax`;
        }
    }
}

function showPages() {
    pages.firstElementChild.classList.add('fix');
    pages.firstElementChild.style.left = `${pages.getBoundingClientRect().top}px`;
}

function changeBG(elm) {
    if (elm.innerText == 'My Favourite Movies') {
        const moviesWall = document.getElementById('moviesWallpaper');
        moviesWall.firstElementChild.play();
        moviesWall.style.opacity = 1;
    } else if (elm.innerText == 'My Favourite Series') {
        const seriesWall = document.getElementById('seriesWallpaper');
        seriesWall.firstElementChild.play();
        seriesWall.style.opacity = 1;
    } else if (elm.innerText == 'My Favourite Music') {
        const musicWall = document.getElementById('musicWallpaper');
        musicWall.firstElementChild.play();
        musicWall.style.opacity = 1;
    } else if (elm.innerText == 'About Me') {
        const aboutWall = document.getElementById('aboutWallpaper');
        aboutWall.firstElementChild.play();
        aboutWall.style.opacity = 1;
    }
}

function closeDialog() {
    learningDialog.style.marginTop = '';
    setTimeout(() => {
        learningDialog.style.visibility = '';
        document.body.style.overflowY = '';
        overlay.style.visibility = '';
    }, 400);
    document.removeEventListener('keyup', escKey);
}

function escKey(key) {
    if (key.code == 'Escape') closeDialog();
}