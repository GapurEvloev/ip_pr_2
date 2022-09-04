import {getResource} from "../services/requests";

const showMoreFetch = (trigger, wrapper) => {
  const btn = document.querySelector(trigger);

  btn.addEventListener("click", function () {
    // // вариант с json-server
    // getResource("http://localhost:3000/styles")
    //   .then(res => createCard(res))
    //   .catch(error => console.log(error));

    //вариант с прямой подгрузкой из файла
    getResource("./assets/db.json")
      .then(res => createCard(res.styles))
      .catch(error => console.log(error));
  });

  function createCard(response) {

    response.forEach(({src, link, title}) => {
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

export default showMoreFetch;