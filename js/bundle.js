/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    //Calc

    const result = document.querySelector('.calculating__result span');

    let sex, height, age, weight, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    const initLocalStorage = (selector, activeClass) => {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalStorage('#gender div', 'calculating__choose-item_active');
    initLocalStorage('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcToResult() {

        if (!sex || !height || !age || !weight || !ratio) {
            result.textContent = '';
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }

    };

    calcToResult();


    function getStaticInfo(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);
            });



            calcToResult();
        });
    };

    getStaticInfo('#gender div', 'calculating__choose-item_active');
    getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');


    function getDynamicInfo(selector) {
        const input = document.querySelector(selector);



        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            };

            calcToResult();
        });
    };

    getDynamicInfo('#height');
    getDynamicInfo('#weight');
    getDynamicInfo('#age');

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    // Classes Card

    class Card {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.transfer = 27;
            this.parentSelector = document.querySelector(parentSelector);
            this.changeToUAH();
        }


        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element1 = 'menu__item';
                element.classList.add(this.element1);
            } else {
                this.classes.forEach(classList => element.classList.add(classList));
            }
            element.innerHTML = `
                
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
                        
            `;
            this.parentSelector.append(element);
        }
    }


    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({ img, altimg, title, descr, price }) => {
                new Card(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function form(modalSelector, modalTimerId, formSelector) {
    //Forms

    const forms = document.querySelectorAll(formSelector);

    forms.forEach(item => {
        postingData(item);
    });


    const messages = {
        load: 'img/spinner.svg',
        done: 'Спасибо! Скоро мы с вами свяжемся',
        fail: 'Ой, что то пошло не так'
    };

    function postingData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formMessage = document.createElement('img');
            formMessage.src = messages.load;
            formMessage.style.cssText = `
                display:block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', formMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData));

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
                .then(data => {
                    showThanksModal(messages.done);
                    formMessage.remove();
                })
                .catch(() => {
                    showThanksModal(messages.fail);
                })
                .finally(() => {
                    form.reset();
                });
        });
    }


    function showThanksModal(message) {
        const modalWindow = document.querySelector('.modal__dialog');

        modalWindow.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(modalSelector, modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');

        thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">×</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            modalWindow.classList.add('show');
            modalWindow.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(modalSelector);
        }, 4000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalTimerId) {
    const modalWindow = document.querySelector(modalSelector);
    
    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if(modalTimerId) {
        clearInterval(modalTimerId);
    }
    
}

function closeModal(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    // Modal

    const btnModal = document.querySelectorAll(triggerSelector);
    const modalWindow = document.querySelector(modalSelector);

    btnModal.forEach(item => {
        item.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow || e.target.getAttribute('data-close') === '') {
            closeModal(modalSelector);
        }
    });

    

    function showModal() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModal);
        }
    }

    window.addEventListener('scroll', showModal);

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, prevSlide, nextSlide, slidesCounter, slidesCurrent, innerWrapper, sliderWrapper, slideAll}) {
    // Slider
    const slides = document.querySelectorAll(slideAll);
    const prev = document.querySelector(prevSlide);
    const next = document.querySelector(nextSlide);
    const total = document.querySelector(slidesCounter);
    const current = document.querySelector(slidesCurrent);
    const wrapperSlider = document.querySelector(sliderWrapper);
    const innerSlider = document.querySelector(innerWrapper);
    const width = window.getComputedStyle(wrapperSlider).width;
    const slider = document.querySelector(container);

    let slideIndex = 1;
    let offset = 0;
    const dots = [];

    const indicators = document.createElement('ol');
    indicators.classList.add('carousel-indicators');
    slider.style.position = 'relative';
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide', i + 1);
        dot.classList.add('dot');
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }


    if (slides.length < 10) {
        total.innerHTML = '0' + slides.length;
        current.innerHTML = '0' + slideIndex;
    } else {
        total.innerHTML = slides.length;
        current.innerHTML = slideIndex;
    }

    innerSlider.style.width = 100 * slides.length + '%';
    innerSlider.style.display = 'flex';
    innerSlider.style.transition = '0.5s all';
    wrapperSlider.style.overflow = 'hidden';
    slides.forEach(slide => {
        slide.style.width = width;
    });

    const checkSlide = (slide) => {
        if (slide < 10) {
            current.innerHTML = '0' + slide;
        } else {
            current.innerHTML = slide;
        }
    };

    const dotOpacity = () => {
        dots.forEach(item => item.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    };

    next.addEventListener('click', () => {
        if (offset == +width.replace(/\D/g, '') * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.replace(/\D/g, '');
        }

        innerSlider.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        checkSlide(slideIndex);

        dotOpacity();

    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.replace(/\D/g, '') * (slides.length - 1);
        } else {
            offset -= +width.replace(/\D/g, '');
        }

        innerSlider.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        checkSlide(slideIndex);

        dotOpacity();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide');

            slideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);
            innerSlider.style.transform = `translateX(-${offset}px)`;

            checkSlide(slideIndex);

            dotOpacity();
        });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabParentSelector, activeClass) {
    //Tabs

    const tabs = document.querySelectorAll(tabsSelector);
    const tabsContent = document.querySelectorAll(tabsContentSelector);
    const tabParent = document.querySelector(tabParentSelector);


    function hideTab() {

        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTab(i = 0) {

        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTab();
    showTab();

    tabParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains(activeClass.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTab();
                    showTab(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(deadline, id) {
    // Timer

    function getTime(endtime) {
        let days, hours, minutes, seconds
        const t = Date.parse(endtime) - Date.parse(new Date());

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            hours = Math.floor((t / (1000 * 60 * 60) % 24));
            minutes = Math.floor((t / 1000 / 60) % 60);
            seconds = Math.floor((t / 1000) % 60);
        }


        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds

        };
    }

    function checkZero(num) {

        if (num >= 0 && num < 10) {
            return "0" + num;
        } else {
            return num;
        }
    }

    function setClock(endtime, selector) {
        const timer = document.querySelector(`.${selector}`);
        const days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTime(endtime);

            days.innerHTML = checkZero(t.days);
            hours.innerHTML = checkZero(t.hours);
            minutes.innerHTML = checkZero(t.minutes);
            seconds.innerHTML = checkZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(deadline, id);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, obj) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: obj
    })

    return await res.json();
};

const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");









document.addEventListener('DOMContentLoaded', ()=> {

   const modalTimer = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)('.modal', modalTimer), 50000);


   (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])();
   (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
   (0,_modules_form__WEBPACK_IMPORTED_MODULE_2__["default"])('.modal', modalTimer, 'form');
   (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal]', '.modal', modalTimer);
   (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
   (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('2022-12-31', 'timer');
   (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
      container: '.offer__slider',
      prevSlide: '.offer__slider-prev',
      nextSlide: '.offer__slider-next',
      slidesCounter: '#total',
      slidesCurrent: '#current',
      sliderWrapper: '.offer__slider-wrapper',
      innerWrapper: '.offer__slider-inner',
      slideAll: '.offer__slide' 
   });

});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map