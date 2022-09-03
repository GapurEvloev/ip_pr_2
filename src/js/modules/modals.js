const modals = () => {
  let isOpened = false;

  function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
    const trigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector),
      windows = document.querySelectorAll('[data-modal]'),
      scroll = calcScroll();

    trigger.forEach(item => {
      item.addEventListener('click', (e) => {
        if (e.target) {
          e.preventDefault();
        }

        if(destroy) {
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

    modal.addEventListener('click', (e) => {
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
    setTimeout(function() {
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

      if (!isOpened && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight - 1)) {
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

export default modals;