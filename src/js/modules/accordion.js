const accordion = (triggersSelector) => {
  const buttons = document.querySelectorAll(triggersSelector);

  buttons.forEach(btn => {
    btn.addEventListener('click', function() {

      buttons.forEach(btn => {
        if (btn !== this) {
          btn.classList.remove('active-style');
          btn.nextElementSibling.classList.remove('active-content');
          btn.nextElementSibling.style.maxHeight = '0';
        }
      });

      this.classList.toggle('active-style');
      this.nextElementSibling.classList.toggle('active-content');

      if (this.classList.contains('active-style')) {
        this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + "px";
      } else {
        this.nextElementSibling.style.maxHeight = '0';
      }
    });
  });
};

// // js + css
// const accordion = (triggersSelector, itemsSelector) => {
//   const buttons = document.querySelectorAll(triggersSelector);
//   const blocks = document.querySelectorAll(itemsSelector);
//
//   blocks.forEach(block => {
//       block.classList.add('animated', 'fadeInDown');
//   });
//
//   buttons.forEach(btn => {
//       btn.addEventListener('click', function() {
//           if (!this.classList.contains('active')) {
//             buttons.forEach(btn => {
//                   btn.classList.remove('active', 'active-style');
//               });
//               this.classList.add('active', 'active-style');
//           }
//       });
//   });
// };

export default accordion;