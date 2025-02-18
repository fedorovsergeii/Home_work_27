'use strict';

let currentSlide = 0;
const slideCont = document.getElementsByClassName('content-title').length;
createCircles ();
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const containerElement = document.getElementsByClassName('content-item')[0];
const imageElement = document.querySelector('img') ;
const circleElement = document.getElementsByClassName('circle-control')[0];
const bottomElement = document.getElementsByClassName('slide-control')[0];
let isSlidePlaying = false;
let timerId;
let startX = 0;
let endX = 0;
const threshold = 50;

function updateCircleActive () {
    const activeElement = document.querySelector ('#container .active');
    activeElement.classList.remove('active');
    document.querySelector(`#container div[data-count = "${currentSlide}"]`).classList.add('active');
}

function slideRight() {
    currentSlide ++;
    if(currentSlide === slideCont){
        currentSlide = 0;
    }
    containerElement.style.transform = 'translateX(-'+imageElement.offsetWidth * currentSlide+'px)';
    updateCircleActive ();
}

function slideLeft() {
    currentSlide --;
    if(currentSlide <0){
        currentSlide = 4;
    }
    containerElement.style.transform = 'translateX(-'+imageElement.offsetWidth * currentSlide+'px)';
    updateCircleActive() ;
}

function onCircleClick (event) {
    if (event.target.classList.contains('circle-control')) {
        return;
    }
    currentSlide  = event.target.dataset.count;
    containerElement.style.transform = 'translateX(-'+imageElement.offsetWidth * currentSlide+'px)';
    updateCircleActive();
}

function createCircles () {

    let newBlock = '';
    for (let i = 0; i < slideCont; i++) {
        newBlock += `<div class="circle" data-count="${i}"></div>`;
    }
    document.getElementsByClassName('circle-control')[0].innerHTML = newBlock;
    document.querySelector('#container div[data-count = "0"]').classList.add('active');
}

function startPauseSlide () {
    if(isSlidePlaying){
       clearInterval(timerId);
        bottomElement.innerHTML = '<img src="images/play.svg" alt="">';
        isSlidePlaying = false;
    } else {
        timerId = setInterval(slideRight, 2000);
        bottomElement.innerHTML = '<img src="images/pause.svg" alt="">';
        isSlidePlaying = true;
    }
}

function handleSwipe() {
    if (startX - endX > threshold) {
        slideRight();
    } else if (endX - startX > threshold) {
        slideLeft();
    }
}

nextButton.addEventListener('click', slideRight);
prevButton.addEventListener('click', slideLeft);
circleElement.addEventListener('click', onCircleClick);
window.addEventListener('resize', () => {
    containerElement.style.transform = 'translateX(-'+imageElement.offsetWidth * currentSlide+'px)';
    updateCircleActive ();
    nextButton.style.height = imageElement.offsetHeight + 'px';
    prevButton.style.height = imageElement.offsetHeight + 'px';
});
document.addEventListener('keydown', function (e) {
    if (e.key.toLocaleLowerCase() === 'arrowright') {
        slideRight();
    } else if (e.key.toLocaleLowerCase() === 'arrowleft') {
        slideLeft();
    }
});
bottomElement.addEventListener('click', startPauseSlide);

containerElement.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

containerElement.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

