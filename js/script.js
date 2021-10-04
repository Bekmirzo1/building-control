'use strict';
// *ibg
function ibg() {
    let ibg = document.querySelectorAll(".ibg");
    for (var i = 0; i < ibg.length; i++) {
        if (ibg[i].querySelector('img')) {
            ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
        }
    }
}
ibg();
// *Эта функция проверяет поддерживается ли браузером формат изображения webp и если поддерживается, то эта функция добавляет из css-документа внутрь html-документа класс с изобажением формата webp
function testWebP(callback) {

    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

    if (support == true) {
        document.querySelector('body').classList.add('webp');
    } else {
        document.querySelector('body').classList.add('no-webp');
    }
});
// *Burger
const iconMenu = document.querySelector('.icon-menu');
const menuBody = document.querySelector('.menu__body');
function transitionEnd(e) {
    e.addEventListener('transitionend', function () {
        e.classList.remove('_transition')
    });
}
if (iconMenu) {
    iconMenu.addEventListener('click', function () {
        iconMenu.classList.add('_transition');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
        document.body.classList.toggle('_lock');
        transitionEnd(iconMenu);
    })
};
const menuMedia = window.matchMedia('(max-width: 1068px) and (min-width: 767.98px)');
document.addEventListener('click', function (e) {
    const target = e.target;
    if (document.querySelector('.icon-menu._active') && !target.closest('.menu')) {
        iconMenu.classList.add('_transition');
        iconMenu.classList.remove('_active');
        menuBody.classList.remove('_active');
        document.body.classList.remove('_lock');
        transitionEnd(iconMenu);
    }
});

// *Прокрутка при клике
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
let view = 10;
function viewValue(e) {
    if (e.matches) {
        view = 4;
    }
}

const heightMedia = window.matchMedia('(max-height: 520px)');
heightMedia.addListener(viewValue);
viewValue(heightMedia);
if (menuLinks.length > 0) {
    for (let index = 0; index < menuLinks.length; index++) {
        const menuLink = menuLinks[index];
        menuLink.addEventListener('click', function (e) {
            const menuLink = e.target;
            if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
                const goToBlock = document.querySelector(menuLink.dataset.goto);
                if (iconMenu.classList.contains('_active') && !menuMedia.matches) {
                    iconMenu.classList.add('_transition');
                    iconMenu.classList.remove('_active');
                    menuBody.classList.remove('_active');
                    document.body.classList.remove('_lock');
                    transitionEnd(iconMenu);
                }
                const moveTo = new MoveTo({
                    tolerance: (document.querySelector('.header').offsetHeight) + (document.documentElement.clientHeight / view) ,
                    duration: 800,
                    easing: 'easeOutQuart'
                });
                moveTo.move(goToBlock);
                e.preventDefault();
            }
        });
    }
}

// *Подсветка активного пункта меню
const blocks = document.querySelectorAll('.block');
const scrollLinks = document.querySelectorAll('.menu__link[data-scroll]');
window.addEventListener('scroll', scrollColor);
function scrollColor() {
    let current;
    for (let index = 0; index < blocks.length; index++) {
        const block = blocks[index];
        let blockTop = block.getBoundingClientRect().top + pageYOffset - (document.querySelector('.header').offsetHeight + (document.documentElement.clientHeight / (view - 0.2)));
        if (pageYOffset >= blockTop) {
            current = block.getAttribute('id');
        }
    }
    for (let index = 0; index < scrollLinks.length; index++) {
        const scrollLink = scrollLinks[index];
        scrollLink.classList.remove('opened');
        if (scrollLink.dataset.scroll == current) {
            scrollLink.classList.add('opened')
        }
    }
}
scrollColor();