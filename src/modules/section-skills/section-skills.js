let withinViewport = (function() {

    'use strict';

    // Cutting the mustard
    // http://webfieldmanual.com/guides/cutting-the-mustard.html

    if (window.requestAnimationFrame && document.documentElement.classList) {

        // Passes the test so add enhanced class to HTML tag
        document.documentElement.classList.add('enhanced');

        // Throttle
        // https://underscorejs.org/#throttle
        let throttle = function(func, wait, options) {
            let _ = {
                now: Date.now || function() {
                    return new Date().getTime();
                }
            };
            let context, args, result;
            let timeout = null;
            let previous = 0;
            if (!options) {
                options = {};
            }
            let later = function() {
                previous = options.leading === false ? 0 : _.now();
                timeout = null;
                result = func.apply(context, args);
                if (!timeout) {
                    context = args = null;
                }
            };
            return function() {
                let now = _.now();
                if (!previous && options.leading === false) {
                    previous = now;
                }
                let remaining = wait - (now - previous);
                context = this;
                args = arguments;
                if (remaining <= 0 || remaining > wait) {
                    if (timeout) {
                        clearTimeout(timeout);
                        timeout = null;
                    }
                    previous = now;
                    result = func.apply(context, args);
                    if (!timeout) {
                        context = args = null;
                    }
                } else if (!timeout && options.trailing !== false) {
                    timeout = setTimeout(later, remaining);
                }
                return result;
            };
        };

        // requestAnimationFrame
        // http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
        let _requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;

        // Global class for revealing element
        let revealer = document.querySelectorAll('.progress__bar');
        let revealer2 = document.querySelectorAll('.roadmap__item');

        // Get the viewport (window) dimensions
        let getViewportSize = function() {
            return {
                width: window.document.documentElement.clientWidth,
                height: window.document.documentElement.clientHeight
            };
        };

        // Get the current scoll position
        let getCurrentScroll = function() {
            return {
                x: window.pageXOffset,
                y: window.pageYOffset
            };
        };

        // Get element dimensions and position
        let getElemInfo = function(elem) {
            let offsetTop = 0;
            let offsetLeft = 0;
            let offsetHeight = elem.offsetHeight;
            let offsetWidth = elem.offsetWidth;

            do {
                if (!isNaN(elem.offsetTop)) {
                    offsetTop += elem.offsetTop;
                }
                if (!isNaN(elem.offsetLeft)) {
                    offsetLeft += elem.offsetLeft;
                }
            } while ((elem = elem.offsetParent) !== null);

            return {
                top: offsetTop,
                left: offsetLeft,
                height: offsetHeight,
                width: offsetWidth
            };
        };

        // Check visibility of the element in the viewport
        let checkVisibility = function(elem) {
            let viewportSize = getViewportSize();
            let currentScroll = getCurrentScroll();
            let elemInfo = getElemInfo(elem);
            let spaceOffset = 0.2;
            let elemHeight = elemInfo.height;
            let elemWidth = elemInfo.width;
            let elemTop = elemInfo.top;
            let elemLeft = elemInfo.left;
            let elemBottom = elemTop + elemHeight;
            let elemRight = elemLeft + elemWidth;

            let checkBoundaries = function() {
                // Defining the element boundaries and extra space offset
                let top = elemTop + elemHeight * spaceOffset;
                let left = elemLeft + elemWidth * spaceOffset;
                let bottom = elemBottom - elemHeight * spaceOffset;
                let right = elemRight - elemWidth * spaceOffset;

                // Defining the window boundaries and window offset
                let wTop = currentScroll.y + 0;
                let wLeft = currentScroll.x + 0;
                let wBottom = currentScroll.y - 0 + viewportSize.height;
                let wRight = currentScroll.x - 0 + viewportSize.width;

                // Check if the element is within boundary
                return (top < wBottom) && (bottom > wTop) && (left > wLeft) && (right < wRight);
            };

            return checkBoundaries();
        };


        // Run a loop with checkVisibility() and add / remove classes to the elements
        let toggleElement = function() {
            for (let i = 0; i < revealer.length; i++) {
                if (checkVisibility(revealer[i])) {
                    revealer[i].classList.add('active__percentage');
                } else {
                   // revealer[i].classList.remove('active__percentage');
                }
            }
        };



        // Run a loop with checkVisibility() and add / remove classes to the elements
        let toggleElement2 = function() {
            for (let i = 0; i < revealer2.length; i++) {
                if (checkVisibility(revealer2[i])) {
                    revealer2[i].classList.add('active__item');
                } else {
                    // revealer2[i].classList.remove('active__item');
                }
            }
        };



        // Throttle events and requestAnimationFrame
        let scrollHandler = throttle(function() {
            _requestAnimationFrame(toggleElement);
            _requestAnimationFrame(toggleElement2);
        }, 300);

        let resizeHandler = throttle(function() {
            _requestAnimationFrame(toggleElement);
            _requestAnimationFrame(toggleElement2);
        }, 300);

        scrollHandler();

        // Listening for events
        if (window.addEventListener) {
            addEventListener('scroll', scrollHandler, false);
            addEventListener('resize', resizeHandler, false);
        } else if (window.attachEvent) {
            window.attachEvent('onscroll', scrollHandler);
            window.attachEvent('onresize', resizeHandler);
        } else {
            window.onscroll = scrollHandler;
            window.onresize = resizeHandler;
        }

    }



}());



let lastScrollTop = 0;
window.onscroll = onScroll;

function onScroll (e) {
    var top = window.pageYOffset;
    if (lastScrollTop > top) {
        document.querySelector('.roadmap').classList.add('scroll__top')
    } else if (lastScrollTop < top) {
        // document.querySelector('.roadmap').classList.remove('scroll__top')
    }
    lastScrollTop = top;
}
