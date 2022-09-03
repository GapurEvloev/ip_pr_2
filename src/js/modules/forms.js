import {postData} from "../services/requests";

const forms = () => {
  const allForms = document.querySelectorAll("form"),
        allInputs = document.querySelectorAll("input"),
        uploads = document.querySelectorAll('[name="upload"]');

  // checkNumInputs("input[name='user_phone']");

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
  };

  // const postData = async (url, data) => {
  //   let res = await fetch(url, {
  //     method: "POST",
  //     body: data
  //   });
  //
  //   return await res.text();
  // };

  const clearInputs = () => {
    allInputs.forEach((input) => {
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

  allForms.forEach((form) => {
    form.addEventListener("submit", (e) => {
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

      postData(api, formData)
        .then((res) => {
          console.log(res);
          statusImg.setAttribute('src', messages.ok);
          textMessage.textContent = messages.success;
        })
        .catch(() => {
          statusImg.setAttribute("src", messages.fail);
          textMessage.textContent = messages.failure;
        })
        .finally(() => {
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

export default forms;
