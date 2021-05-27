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
let menuBody = document.querySelector('.menu__body');
let iconMenu = document.querySelector('.icon-menu');
if (iconMenu) {
    iconMenu.addEventListener('click', function () {
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
        document.body.classList.toggle('_lock');
    })
};
// *Прокрутка при клике
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
    for (let index = 0; index < menuLinks.length; index++) {
        const menuLink = menuLinks[index];
        menuLink.addEventListener('click', function (e) {
            const menuLink = e.target;
            // ept В условии if мы смотрим является ли menuLink.dataset.goto не false(тоесть не пустой и не со значением 0 ). Смотрим  существуют ли элементы названия классов которых внутри menuLink.dataset.goto
            if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
                const goToBlock = document.querySelector(menuLink.dataset.goto);
                const goToBlockValue = goToBlock.getBoundingClientRect().top + pageYOffset - (document.querySelector('.header').offsetHeight - 0.5);
                if (iconMenu.classList.contains('_active')) {
                    iconMenu.classList.remove('_active');
                    menuBody.classList.remove('_active');
                    document.body.classList.remove('_lock');
                }
                window.scrollTo({
                    top: goToBlockValue,
                    behavior: "smooth"
                });
                e.preventDefault();
            }
        });
    }
}

// *Подсветка активного пункта меню
const blocks = document.querySelectorAll('.block');
const scrollLinks = document.querySelectorAll('.menu__link[data-scroll]');
window.addEventListener('scroll', () => {
    let current;
    for (let index = 0; index < blocks.length; index++) {
        const block = blocks[index];
        const blockTop = block.getBoundingClientRect().top + window.pageYOffset - (document.querySelector('.header').offsetHeight + 80);
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
});
