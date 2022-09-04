/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/checkTextInputs.js":
/*!*******************************************!*\
  !*** ./src/js/modules/checkTextInputs.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const checkTextInputs = selector => {
  const txtInputs = document.querySelectorAll(selector);
  txtInputs.forEach(input => {
    input.addEventListener("keypress", e => {
      if (e.key.match(/[^а-яё \d]/ig)) {
        e.preventDefault();
      }
    });
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (checkTextInputs);

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_requests__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/requests */ "./src/js/services/requests.js");


const forms = () => {
  const allForms = document.querySelectorAll("form"),
        allInputs = document.querySelectorAll("input"),
        uploads = document.querySelectorAll('[name="upload"]'); // checkNumInputs("input[name='user_phone']");

  const messages = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...',
    spinner: 'assets/img/spinner.gif',
    ok: 'assets/img/ok.png',
    fail: 'assets/img/fail.png'
  };
  const path = {
    designer: 'assets/server.php',
    question: 'assets/question.php'
  }; // const postData = async (url, data) => {
  //   let res = await fetch(url, {
  //     method: "POST",
  //     body: data
  //   });
  //
  //   return await res.text();
  // };

  const clearInputs = () => {
    allInputs.forEach(input => {
      input.value = "";
    });
    uploads.forEach(item => {
      item.previousElementSibling.textContent = "Файл не выбран";
    });
  };

  uploads.forEach(upload => {
    upload.addEventListener("input", () => {
      const arr = upload.files[0].name.split(".");
      let dots = arr[0].length > 6 ? "..." : ".";
      upload.previousElementSibling.textContent = arr[0].substr(0, 6) + dots + arr[1];
    });
  });
  allForms.forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();
      let statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      form.parentNode.appendChild(statusMessage);
      form.classList.add("animated", "fadeOut");
      setTimeout(() => {
        form.style.display = "none";
      }, 400);
      let statusImg = document.createElement('img');
      statusImg.setAttribute('src', messages.spinner);
      statusImg.classList.add('animated', 'fadeIn');
      statusMessage.appendChild(statusImg);
      let textMessage = document.createElement('div');
      textMessage.textContent = messages.loading;
      statusMessage.appendChild(textMessage);
      const formData = new FormData(form);
      let api;
      form.closest(".popup-design") || form.classList.contains("calc_form") ? api = path.designer : api = path.question;
      console.log(api);
      (0,_services_requests__WEBPACK_IMPORTED_MODULE_0__.postData)(api, formData).then(res => {
        console.log(res);
        statusImg.setAttribute('src', messages.ok);
        textMessage.textContent = messages.success;
      }).catch(() => {
        statusImg.setAttribute("src", messages.fail);
        textMessage.textContent = messages.failure;
      }).finally(() => {
        clearInputs();
        setTimeout(() => {
          statusMessage.remove();
          form.style.display = "block";
          form.classList.remove("fadeOut");
          form.classList.add("fadeIn");
        }, 3000);
      });
    });
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./src/js/modules/mask.js":
/*!********************************!*\
  !*** ./src/js/modules/mask.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const mask = selector => {
  const setCursorPosition = (pos, elem) => {
    elem.focus();

    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
      let range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd("character", pos);
      range.moveStart("character", pos);
      range.select();
    }
  };

  function createMask(event) {
    let matrix = "+7 (___) ___ __ __",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        value = this.value.replace(/\D/g, "");

    if (def.length >= value.length) {
      value = def;
    }

    this.value = matrix.replace(/./g, symbol => {
      return /[_\d]/.test(symbol) && i < value.length ? value.charAt(i++) : i >= value.length ? "" : symbol;
    });

    if (event.type === "blur") {
      if (this.value.length === 2) {
        this.value = "";
      }
    } else {
      setCursorPosition(this.value.length, this);
    }
  }

  let inputs = document.querySelectorAll(selector);
  inputs.forEach(input => {
    input.addEventListener("input", createMask);
    input.addEventListener("focus", createMask);
    input.addEventListener("blur", createMask);
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mask);

/***/ }),

/***/ "./src/js/modules/modals.js":
/*!**********************************!*\
  !*** ./src/js/modules/modals.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const modals = () => {
  let isOpened = false;

  function bindModal(triggerSelector, modalSelector, closeSelector) {
    let destroy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    const trigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector),
          close = document.querySelector(closeSelector),
          windows = document.querySelectorAll('[data-modal]'),
          scroll = calcScroll();
    trigger.forEach(item => {
      item.addEventListener('click', e => {
        if (e.target) {
          e.preventDefault();
        }

        if (destroy) {
          item.style.display = "none";
        }

        windows.forEach(item => {
          item.style.display = 'none';
          item.classList.add('animated', 'fadeIn');
        });
        isOpened = true;
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
        document.body.style.marginRight = `${scroll}px`;
        document.querySelector(".fixed-gift").style.transform = `translateX(${-scroll}px)`;
      });
    });
    close.addEventListener('click', () => {
      windows.forEach(item => {
        item.style.display = 'none';
      });
      modal.style.display = "none";
      document.body.style.overflow = "";
      document.body.style.marginRight = `0px`;
      document.querySelector(".fixed-gift").style.transform = `translateX(0)`;
    });
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        windows.forEach(item => {
          item.style.display = 'none';
        });
        modal.style.display = "none";
        document.body.style.overflow = "";
        document.body.style.marginRight = `0px`;
        document.querySelector(".fixed-gift").style.transform = `translateX(0)`;
      }
    });
  }

  function showModalByTime(selector, time) {
    setTimeout(function () {
      let display;
      document.querySelectorAll('[data-modal]').forEach(modal => {
        if (getComputedStyle(modal).display !== 'none') {
          display = "block";
        }
      });

      if (!display && !isOpened) {
        document.querySelector(selector).style.display = 'block';
        document.body.style.overflow = "hidden";
        document.body.style.marginRight = `${calcScroll()}px`;
      }
    }, time);
  }

  function calcScroll() {
    let div = document.createElement('div');
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';
    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();
    return scrollWidth;
  }

  function openByScroll(selector) {
    window.addEventListener('scroll', () => {
      let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

      if (!isOpened && window.pageYOffset + document.documentElement.clientHeight >= scrollHeight - 1) {
        document.querySelector(selector).click();
      }
    });
  }

  bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
  bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
  bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
  openByScroll('.fixed-gift');
  showModalByTime('.popup-consultation', 5000);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modals);

/***/ }),

/***/ "./src/js/modules/showMoreFetch.js":
/*!*****************************************!*\
  !*** ./src/js/modules/showMoreFetch.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_requests__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/requests */ "./src/js/services/requests.js");


const showMoreFetch = (trigger, wrapper) => {
  const btn = document.querySelector(trigger);
  btn.addEventListener("click", function () {
    // // вариант с json-server
    // getResource("http://localhost:3000/styles")
    //   .then(res => createCard(res))
    //   .catch(error => console.log(error));
    //вариант с прямой подгрузкой из файла
    (0,_services_requests__WEBPACK_IMPORTED_MODULE_0__.getResource)("./assets/db.json").then(res => createCard(res.styles)).catch(error => console.log(error));
  });

  function createCard(response) {
    response.forEach(_ref => {
      let {
        src,
        link,
        title
      } = _ref;
      let card = document.createElement("div");
      card.classList.add("col-sm-3", "col-sm-offset-0", "col-xs-10", "col-xs-offset-1");
      console.log(src);
      card.innerHTML = `
        <div class=styles-block>
          <img src=${src} alt=${title}/>
          <h4>${title}</h4>
          <a href=${link}>Подробнее</a>
        </div>
      `;
      document.querySelector(wrapper).appendChild(card);
    });
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (showMoreFetch);

/***/ }),

/***/ "./src/js/modules/showMoreStyles.js":
/*!******************************************!*\
  !*** ./src/js/modules/showMoreStyles.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const showMoreStyles = (trigger, styles) => {
  const cards = document.querySelectorAll(styles),
        btn = document.querySelector(trigger);
  cards.forEach(card => {
    card.classList.add("animated", "fadeIn");
  });
  btn.addEventListener("click", () => {
    cards.forEach(card => {
      card.classList.remove("hidden-lg", "hidden-md", "hidden-sm", "hidden-xs");
      card.classList.add("col-sm-3", "col-sm-offset-0", "col-xs-10", "col-xs-offset-1");
    });
    btn.style.display = "none";
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (showMoreStyles);

/***/ }),

/***/ "./src/js/modules/sliders.js":
/*!***********************************!*\
  !*** ./src/js/modules/sliders.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const sliders = (slides, dir, prev, next) => {
  let slideIndex = 1,
      paused;
  const items = document.querySelectorAll(slides);

  function showSlides(n) {
    if (n > items.length) {
      slideIndex = 1;
    }

    if (n < 1) {
      slideIndex = items.length;
    }

    items.forEach(item => {
      item.classList.add("animated");
      item.style.display = "none";
    });
    items[slideIndex - 1].style.display = "block";
  }

  showSlides(slideIndex);

  function changeSlide(n) {
    showSlides(slideIndex += n);
  }

  try {
    const prevBtn = document.querySelector(prev),
          nextBtn = document.querySelector(next);
    prevBtn.addEventListener("click", () => {
      changeSlide(-1);
      items[slideIndex - 1].classList.remove("slideInRight");
      items[slideIndex - 1].classList.add("slideInLeft");
    });
    nextBtn.addEventListener("click", () => {
      changeSlide(1);
      items[slideIndex - 1].classList.remove("slideInLeft");
      items[slideIndex - 1].classList.add("slideInRight");
    });
  } catch (e) {
    console.log(e);
  }

  function activateAnimation() {
    if (dir === "vertical") {
      paused = setInterval(() => {
        changeSlide(1);
        items[slideIndex - 1].classList.add("slideInDown");
      }, 3000);
    } else {
      paused = setInterval(() => {
        changeSlide(1);
        items[slideIndex - 1].classList.remove("slideInLeft");
        items[slideIndex - 1].classList.add("slideInRight");
      }, 3000);
    }
  }

  activateAnimation();
  items[0].parentNode.addEventListener("mouseenter", () => {
    clearInterval(paused);
  });
  items[0].parentNode.addEventListener("mouseleave", () => {
    activateAnimation();
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sliders);

/***/ }),

/***/ "./src/js/services/requests.js":
/*!*************************************!*\
  !*** ./src/js/services/requests.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
  let res = await fetch(url, {
    method: "POST",
    body: data
  });
  return await res.text();
};
const getResource = async url => {
  let res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
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
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_modals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/modals */ "./src/js/modules/modals.js");
/* harmony import */ var _modules_sliders__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/sliders */ "./src/js/modules/sliders.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_mask__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/mask */ "./src/js/modules/mask.js");
/* harmony import */ var _modules_checkTextInputs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/checkTextInputs */ "./src/js/modules/checkTextInputs.js");
/* harmony import */ var _modules_showMoreStyles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/showMoreStyles */ "./src/js/modules/showMoreStyles.js");
/* harmony import */ var _modules_showMoreFetch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/showMoreFetch */ "./src/js/modules/showMoreFetch.js");







window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  (0,_modules_modals__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_sliders__WEBPACK_IMPORTED_MODULE_1__["default"])(".feedback-slider-item", "horizontal", ".main-prev-btn", ".main-next-btn");
  (0,_modules_sliders__WEBPACK_IMPORTED_MODULE_1__["default"])(".main-slider-item", "vertical", ".main-prev-btn", ".main-next-btn");
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_mask__WEBPACK_IMPORTED_MODULE_3__["default"])("[name='phone']");
  (0,_modules_checkTextInputs__WEBPACK_IMPORTED_MODULE_4__["default"])('[name="name"]');
  (0,_modules_checkTextInputs__WEBPACK_IMPORTED_MODULE_4__["default"])('[name="message"]');
  (0,_modules_showMoreStyles__WEBPACK_IMPORTED_MODULE_5__["default"])(".button-styles", ".styles-2");
  (0,_modules_showMoreFetch__WEBPACK_IMPORTED_MODULE_6__["default"])(".button-styles", ".styles .row");
  ;
});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map