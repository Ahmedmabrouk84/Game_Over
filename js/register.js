"use strict";
//  ====================== elements =======================
const INPUTS = document.querySelectorAll("input");
const FORM = document.getElementById("form");
const userMsg = document.getElementById("userMsg");
const mood = document.getElementById("mode");

// ==================== Events   ======================

FORM.addEventListener("submit", function (e) {
  e.preventDefault();
  setFormInput();
  clearForm();
});

// >>>>>>>>>>>>>>>>>>>>>   FUNCTIONS  <<<<<<<<<<<<<<<<<<<<<

// ===================== setFormInput =====================
function setFormInput() {
  if (
    validationInputs(INPUTS[0]) &&
    validationInputs(INPUTS[1]) &&
    validationInputs(INPUTS[2]) &&
    validationInputs(INPUTS[3]) &&
    validationInputs(INPUTS[4])
  ) {
    let user = {
      first_name: INPUTS[0].value,
      last_name: INPUTS[1].value,
      email: INPUTS[2].value,
      password: INPUTS[3].value,
      age: INPUTS[4].value,
    };
    registerForm(user);
    console.log("everythig is ok");
  }
}
// ===================== clearForm =====================

function clearForm() {
  for (let i = 0; i < INPUTS.length; i++) {
    INPUTS[i].value = null;
    INPUTS[i].classList.remove("is-valid");
  }
}
// ===================== registerForm =====================

async function registerForm(userInfo) {
  const api = await fetch(`https://movies-api.routemisr.com/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });
  const response = await api.json();
  console.log(response);

  if (response.message == "success") {
    userMsg.innerHTML = "Success";
    userMsg.classList.add("text-success");
    userMsg.classList.remove("text-danger");
    window.location = "./index.html";
  }
  // ============
  else {
    userMsg.innerHTML = response.errors?.email.message;
    userMsg.classList.add("text-danger");
    userMsg.classList.remove("text-success");
  }
}
// >>>>>>>>>>>>>>>>>>>>>   validation  <<<<<<<<<<<<<<<<<<<<<

function validationInputs(element) {
  let input = element.value;
  const regex = {
    fristName:
      /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/,
    LastName:
      /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/,
    email:
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    age: /^([1-7][0-9]|80)$/,
  };
  if (regex[element.id].test(input)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}
// ======================= inputsLoopValidation ====================
function setInputsValidation() {
  for (let i = 0; i < INPUTS.length; i++) {
    INPUTS[i].addEventListener("input", function () {
      validationInputs(INPUTS[i]);
    });
  }
}
setInputsValidation();

if (localStorage.getItem("dataThem") != null) {
  const theme = localStorage.getItem("dataThem");

  if (theme == "light") {
    mood.classList.replace("fa-sun", "fa-moon");
  } else {
    mood.classList.replace("fa-moon", "fa-sun");
  }

  document.querySelector("html").setAttribute("data-theme", theme);
}

mood.addEventListener("click", function () {
  if (mood.classList.contains("fa-sun")) {
    document.querySelector("html").setAttribute("data-theme", "light");
    mood.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("dataThem", "light");
  } else {
    document.querySelector("html").setAttribute("data-theme", "dark");
    mood.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("dataThem", "dark");
  }
});
