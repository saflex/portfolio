function funonload() {
const hamburger = document.querySelector('.menu__burger');
const menu = document.querySelector('.menu__nav');
const toggleMenu = function toggleMenu() {
    menu.classList.toggle('menu__nav_active');
    hamburger.classList.toggle('menu__burger_active');
};

const menuLink = document.querySelectorAll('.menu__link');

for (let elem of menuLink) {
    elem.onclick = function(event) {
        event.preventDefault();
        document.querySelector('body').classList.remove('open__menu');
        document.querySelector('.menu__burger').classList.remove('menu__burger_active');
        document.querySelector('.menu__nav').classList.remove('menu__nav_active');
        window.scrollTo(0,0);
    }
}


hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    document.querySelector('body').classList.toggle('open__menu');
    const x = document.getElementsByClassName('menu__toggle_dropdown');
    [].forEach.call(x, function(el) {
        el.classList.remove('open__menu-active');
    });
    toggleMenu();
});

document.addEventListener('click', function (e) {
    const target = e.target;
    const its_menu = target == menu || menu.contains(target);
    const its_hamburger = target == hamburger;
    const menu_is_active = menu.classList.contains('open__menu-active');

    if (!its_menu && !its_hamburger && menu_is_active) {
        toggleMenu();
    }
});

let submenuToggle = document.querySelectorAll('.menu__toggle_dropdown');

for (let elem of submenuToggle) {
    elem.onclick = function(event) {
        event.preventDefault();
        let xv = document.querySelectorAll('.menu__toggle_dropdown');
        for (let es of xv) {
            if(es !== this) {
                es.classList.remove('open__menu-active');
            }
        }
        this.classList.toggle('open__menu-active');
    }
}


let specifiedElement = document.querySelector('.menu__list');

document.addEventListener('click', function(evel) {
    let isClickInside = specifiedElement.contains(evel.target);

    if (!isClickInside) {
        let xv = document.querySelectorAll('.menu__toggle_dropdown');
        for (let es of xv) {
            if(es !== this) {
                es.classList.remove('open__menu-active');
            }
        }
    }
});


document.querySelector('.menu__nav').classList.remove('nav_no-show');

}

window.onload = funonload;





