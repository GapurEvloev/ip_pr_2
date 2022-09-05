// js + css
const accordion = (triggersSelector, itemsSelector) => {
  const buttons = document.querySelectorAll(triggersSelector);
  const blocks = document.querySelectorAll(itemsSelector);

  blocks.forEach(block => {
      block.classList.add('animated', 'fadeInDown');
  });

  buttons.forEach(btn => {
      btn.addEventListener('click', function() {
          if (!this.classList.contains('active')) {
            buttons.forEach(btn => {
                  btn.classList.remove('active', 'active-style');
              });
              this.classList.add('active', 'active-style');
          }
      });
  });
};

export default accordion;