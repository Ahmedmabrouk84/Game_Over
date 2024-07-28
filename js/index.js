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
  if (validationInputs(INPUTS[0]) && validationInputs(INPUTS[1])) {
    let user = {
      email: INPUTS[0].value,
      password: INPUTS[1].value,
    };
    loginForm(user);
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
// ===================== loginForm =====================

async function loginForm(userInfo) {
  const api = await fetch(`https://movies-api.routemisr.com/signin`, {
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
    localStorage.setItem("userToken", response.token);
    window.location = "./home.html";
  }
  // ============
  else {
    userMsg.innerHTML = response.message;
    userMsg.classList.add("text-danger");
    userMsg.classList.remove("text-success");
  }
}
// >>>>>>>>>>>>>>>>>>>>>   validation  <<<<<<<<<<<<<<<<<<<<<

function validationInputs(element) {
  let input = element.value;
  const regex = {
    email:
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
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

if (theme == 'light') {

  mood.classList.replace('fa-sun','fa-moon')
}
else {
  mood.classList.replace('fa-moon','fa-sun')
}


document.querySelector('html').setAttribute('data-theme',theme) 
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