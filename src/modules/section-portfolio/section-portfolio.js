let hash = location.hash.substr(1);
hash && document.getElementById(hash).classList.add('is_active-project');


let tab = function tab() {
    let tabNav = document.querySelectorAll('.projects__button'),
        tabNav2 = document.querySelectorAll('.filter__button'),
        tabContent = document.querySelectorAll('.portfolio__item'),
        tabName, tabName2;
    tabNav.forEach(function(item) {
        item.addEventListener('click', selectTabNav);
    });
    tabNav2.forEach(function(item) {
        item.addEventListener('click', selectTabNav2);
    });

    function selectTabNav() {
        tabNav.forEach(function(item) {
            item.classList.remove('is_active-project');
        });
        this.classList.add('is_active-project');
        tabName = this.getAttribute('data-tab-name');
        selectTabContent(tabName);
    }


    function selectTabNav2() {
        tabNav2.forEach(function(item) {
            item.classList.remove('is_active-type');
        });
        this.classList.add('is_active-type');
        tabName2 = this.getAttribute('data-tab-name2');
        selectTabContent2(tabName2);

    }


    function selectTabContent(tabName) {
        tabContent.forEach(function(item) {
            if (item.classList.contains(tabName)) {
                item.classList.add('is_active-project');
            } else {
                item.classList.remove('is_active-project');
            }
        });
    }

    function selectTabContent2(tabName2) {
        tabContent.forEach(function(item) {

            if (item.classList.contains(tabName2)) {
                item.classList.add('is_active-type');


                // let ul = document.querySelector('.portfolio__inner');
                // for (let i = ul.children.length; i >= 0; i--) {
                //     ul.appendChild(ul.children[Math.random() * i | 0]);
                // }


                let parent = document.querySelector('.portfolio__inner');
                let frag = document.createDocumentFragment();
                while (parent.children.length) {
                    frag.appendChild(parent.children[Math.floor(Math.random() * parent.children.length)]);
                }
                parent.appendChild(frag);



            } else {
                item.classList.remove('is_active-type');
            }

            let selectTabToggle = document.querySelectorAll('.portfolio__item');
            for (let elem of selectTabToggle) {
                elem.classList.add('no__show');
            }


        });
    }


};

tab();



// class LazyLoad {
//     constructor(items, options) {
//         this.options = {
//             root: null,
//             rootMargin: '0px 0px 0px 0px',
//             thresholds: 0.1,
//             loadedClass: 'loaded',
//             throttleTime: 300,
//             ...options,
//         };
//         this.items = document.querySelectorAll(items);
//         this.lazyLoadThrottle = null;
//         this.notSupportedHandler = this.notSupported.bind(this);
//     }
//
//     init() {
//         return 'IntersectionObserver' in window ? this.onIntersection() : this.notSupportedHandlers();
//     }
//
//     notSupportedHandlers() {
//         document.addEventListener('scroll', this.notSupportedHandler);
//         window.addEventListener('resize', this.notSupportedHandler);
//         window.addEventListener('orientationchange', this.notSupportedHandler);
//     }
//
//     notSupported() {
//         const lazyItems = [...this.items];
//         this.lazyLoadThrottle = setTimeout(() => {
//             lazyItems
//                 .filter(item => !item.classList.contains(this.options.loadedClass))
//                 .forEach(item => {
//                     if (
//                         item.getBoundingClientRect().top <= window.innerHeight &&
//                         item.getBoundingClientRect().bottom >= 0 &&
//                         getComputedStyle(item).display !== 'none'
//                     ) {
//                         this.lazyImage(item);
//                         if (lazyItems.every(image => image.classList.contains(this.options.loadedClass))) {
//                             document.removeEventListener('scroll', this.notSupportedHandler);
//                             window.removeEventListener('resize', this.notSupportedHandler);
//                             window.removeEventListener('orientationchange', this.notSupportedHandler);
//                         }
//                     }
//                 });
//         }, this.options.throttleTime);
//     }
//
//     onIntersection() {
//         const imagesObserver = new IntersectionObserver((entries, self) => {
//             entries
//                 .filter(entry => entry.isIntersecting)
//                 .forEach(entry => {
//                     this.lazyImage(entry.target);
//                     self.unobserve(entry.target);
//                 });
//         }, this.options);
//         this.items.forEach(image => {
//             imagesObserver.observe(image);
//         });
//     }
//
//     lazyImage(asset) {
//         const image = asset;
//         image.src = image.dataset.src;
//         image.removeAttribute('data-src');
//         image.classList.add(this.options.loadedClass);
//     }
// }
//
// const lazy = new LazyLoad('.portfolio__img');
//
// document.addEventListener('DOMContentLoaded', () => {
//     lazy.init();
// });




$(window).scroll(function() {
    let scroll = $(window).scrollTop();

    if (scroll >= 270) {
        $(".portfolio__ui-group").addClass("portfolio__ui-group_fixed");

    } else {
        $(".portfolio__ui-group").removeClass("portfolio__ui-group_fixed");

    }
});




$(".projects__button").click(function() {
    $('html, body').animate({
        scrollTop: $("body").offset().top
    }, 400);
});

$(".filter__button").click(function() {
    $('html, body').animate({
        scrollTop: $("body").offset().top
    }, 400);
});


