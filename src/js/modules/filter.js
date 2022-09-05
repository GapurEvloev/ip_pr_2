const filter = () => {
  const menu = document.querySelector('.portfolio-menu'),
        items = menu.querySelectorAll('li'),
        wrapper = document.querySelector('.portfolio-wrapper'),
        markAll = wrapper.querySelectorAll('.all'),
        no = document.querySelector('.portfolio-no');

  const typeFilter = (markType) => {
    markAll.forEach(mark => {
      mark.style.display = 'none';
      mark.classList.remove('animated', 'fadeIn');
    });

    no.style.display = "none";
    no.classList.remove('animated', 'fadeIn');

    if (markType) {
      markType.forEach(mark => {
        mark.style.display = 'block';
        mark.classList.add('animated', 'fadeIn');
      });
    } else {
      no.style.display = 'block';
      no.classList.add('animated', 'fadeIn');
    }
  };

  items.forEach((item, i) => {
    item.addEventListener('click', (e) => {
      const markType = wrapper.querySelectorAll(`.${e.target.classList[0]}`);
      if (e.target.classList.contains("grandmother") || e.target.classList.contains("granddad")) {
        typeFilter();
      } else {
        typeFilter(markType);
      }
    });
  });

  menu.addEventListener('click', (e) => {
    let target = e.target;

    if (target && target.tagName == "LI") {
      items.forEach(btn => btn.classList.remove('active'));
      target.classList.add('active');
    }
  });
};

export default filter;