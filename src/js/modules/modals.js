export function hideModal(modal) {
  document.body.classList.remove("modal-open");
  modal.classList.remove("show");
  modal.classList.add("hide");
}

export function calcScroll() {
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
  function bindModal(triggerSelector, modalSelector, closeClickOverlay = true) {
    let triggers = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      allModals = document.querySelectorAll("[data-modal]"),
      scrollWidth = calcScroll();

    function showModal(modal) {
      document.body.classList.add("modal-open");
      modal.classList.add("show");
      modal.classList.remove("hide");
      document.body.style.marginRight = `${scrollWidth}px`;
    }

    triggers.forEach((item) => {
      item.addEventListener("click", (e) => {
        if (e.target) {
          e.preventDefault();
        }

        allModals.forEach((item) => {
          hideModal(item);
          document.body.style.marginRight = `0px`;
        });

        showModal(modal);
      });
    });

    modal.addEventListener("click", (e) => {
      if ((e.target === modal && closeClickOverlay) || e.target.classList.contains("popup-close")) {
        hideModal(modal);
        document.body.style.marginRight = `0px`;
        allModals.forEach((item) => {
          hideModal(item);
        });
      }
    });
  }

  function showModalByTime(selector, time) {
    setTimeout(() => {
      let display;

      document.querySelectorAll("[data-modal").forEach((item) => {
        if (item.classList.contains("show")) {
          display = true;
        }
      });

      if(!display) {
        document.body.classList.add("modal-open");
        document.querySelector(selector).classList.add("show");
        document.querySelector(selector).classList.remove("hide");
        document.body.style.marginRight = `${calcScroll()}px`;
      }

    }, time);
  }

  bindModal(".button-design", ".popup-design");
  bindModal(".button-consultation", ".popup-consultation");
  showModalByTime(".popup-consultation", 5000);
  // bindModal(".phone_link", ".popup");
  // bindModal(".popup_calc_btn", ".popup_calc", false);
  // bindModal(".popup_calc_button", ".popup_calc_profile", false);
  // bindModal(".popup_calc_profile_button", ".popup_calc_end", false);
};

export default modals;
