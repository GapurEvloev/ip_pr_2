import {getResource} from "../services/requests";

const calc = (size, material, options, promoCode, result) => {
  const sizeBlock = document.querySelector(size),
    materialBlock = document.querySelector(material),
    optionsBlock = document.querySelector(options),
    promoCodeBlock = document.querySelector(promoCode),
    resultBlock = document.querySelector(result);

  let sum = 0;

  const renderSelects = (block) => {
    getResource('assets/calc.json')
      .then(res => {

        const dataKey = block.getAttribute("id");
        for (let key in res[dataKey]) {
          const option = document.createElement("option");
          option.setAttribute("value", res[dataKey][key]);
          option.textContent = key;
          block.appendChild(option);
        }

      })
      .catch(e => console.log(e));
  };
  renderSelects(sizeBlock);
  renderSelects(materialBlock);
  renderSelects(optionsBlock);


  const calcFunc = () => {
    sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));

    if (sizeBlock.value == "" || materialBlock.value == "") {
      resultBlock.textContent = "Пожалуйста выберите размер и материал картины";
    } else if (promoCodeBlock.value === "IWANIMPORTANT") {
      resultBlock.textContent = Math.round(sum * 0.7);
    } else {
      resultBlock.textContent = sum;
    }
  };

  sizeBlock.addEventListener("change", calcFunc);
  materialBlock.addEventListener("change", calcFunc);
  optionsBlock.addEventListener("change", calcFunc);
  promoCodeBlock.addEventListener("input", calcFunc);
};

export default calc;