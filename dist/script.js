/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/modals.js":
/*!**********************************!*\
  !*** ./src/js/modules/modals.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "calcScroll": () => (/* binding */ calcScroll),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "hideModal": () => (/* binding */ hideModal)
/* harmony export */ });
function hideModal(modal) {
  document.body.classList.remove("modal-open");
  modal.classList.remove("show", "animated", "fadeIn");
  modal.classList.add("hide");
}
function calcScroll() {
  let div = document.createElement("div");
  div.style.width = "50px";
  div.style.height = "50px";
  div.style.overflowY = "scroll";
  div.style.visibility = "hidden";
  document.body.appendChild(div);
  let scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();
  return scrollWidth;
}

const modals = () => {
  let btnPressed = false;

  function bindModal(triggerSelector, modalSelector) {
    let destroy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    let triggers = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector),
        allModals = document.querySelectorAll("[data-modal]"),
        scrollWidth = calcScroll();

    function showModal(modal) {
      document.body.classList.add("modal-open");
      modal.classList.add("show", "animated", "fadeIn");
      modal.classList.remove("hide");
      document.body.style.marginRight = `${scrollWidth}px`;
    }

    triggers.forEach(item => {
      item.addEventListener("click", e => {
        if (e.target) {
          e.preventDefault();
        }

        btnPressed = true;

        if (destroy) {
          item.remove();
        }

        allModals.forEach(item => {
          hideModal(item);
          document.body.style.marginRight = `0px`;
        });
        showModal(modal);
      });
    });
    modal.addEventListener("click", e => {
      if (e.target === modal || e.target.classList.contains("popup-close")) {
        hideModal(modal);
        document.body.style.marginRight = `0px`;
        allModals.forEach(item => {
          hideModal(item);
        });
      }
    });
  }

  function showModalByTime(selector, time) {
    setTimeout(() => {
      let display;
      document.querySelectorAll("[data-modal").forEach(item => {
        if (item.classList.contains("show")) {
          display = true;
        }
      });

      if (!display) {
        document.body.classList.add("modal-open");
        document.querySelector(selector).classList.add("show");
        document.querySelector(selector).classList.remove("hide");
        document.body.style.marginRight = `${calcScroll()}px`;
      }
    }, time);
  }

  function openByScroll(selector) {
    window.addEventListener("scroll", () => {
      let scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);

      if (!btnPressed && window.pageYOffset + document.documentElement.clientHeight >= scrollHeight - 1) {
        document.querySelector(selector).click();
        console.log(btnPressed);
      }
    });
  }

  bindModal(".button-design", ".popup-design");
  bindModal(".button-consultation", ".popup-consultation");
  bindModal(".fixed-gift", ".popup-gift", true);
  openByScroll(".fixed-gift");
  showModalByTime(".popup-consultation", 5000); // bindModal(".phone_link", ".popup");
  // bindModal(".popup_calc_btn", ".popup_calc", false);
  // bindModal(".popup_calc_button", ".popup_calc_profile", false);
  // bindModal(".popup_calc_profile_button", ".popup_calc_end", false);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modals);

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

window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  (0,_modules_modals__WEBPACK_IMPORTED_MODULE_0__["default"])();
});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map