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

export default sliders;