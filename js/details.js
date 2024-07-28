"use strict";

const searchId = location.search;
const URLParams = new URLSearchParams(searchId);
let UrlId = URLParams.get("id");
let contanierDetalis = {};

// ====================== get data from api =============================

(async function () {
  const options = {
    method: "GET",
    headers: {
      //   "x-rapidapi-key": "3d09b976ecmshf84cf7335437188p1a4f0bjsn18610495d3a3",
      //   "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",

      "X-RapidAPI-Key": "761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  try {
    const ApiResponse = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${UrlId}`,
      options
    );
    const data = await ApiResponse.json();
    contanierDetalis = data;
    console.log(contanierDetalis);
    displayData();
  } catch (error) {
    console.error(error);
  }
})();

// ================ displayData =================
function displayData() {
  let boxData = `
   
    <div class="col-md-4">
              <div class="card my-5">
                <div class="card-img w-100">
                  <img
                    src="${contanierDetalis.thumbnail}"
                    class="card-img-top h-25"
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div class="col-md-8">
              <div class="card card-p my-5">
                <div class="w-100">
                  <nav aria-label="breadcrumb ">
                    <ol class="breadcrumb">
                      <li class="breadcrumb-item">
                        <a href="home.html">Home</a>
                      </li>
                      <li class="breadcrumb-item li-2" li-2aria-current="page">
                       ${contanierDetalis.title}
                      </li>
                    </ol>
                  </nav>
                  
                  <div class="p-2 caption">
                    <h1> ${contanierDetalis.title} </h1>
                    <h3> About ${contanierDetalis.title}</h3>
                    <p class="game-caption">
                    ${contanierDetalis.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
   
   
   `;
  document.getElementById("rowData").innerHTML = boxData;

  const backGround = contanierDetalis.thumbnail.replace(
    "thumbnail",
    "background"
  );
  // background-image:linear-gradient( rgba(39,43,48,0.5) 0% 100%),url('${backGround}');
  // color: rgba(39, 43, 48, 0.66);
  document.body.style.cssText = `
  background-image:linear-gradient( rgba(39,43,48,0.8) 0% 100%),url('${backGround}');
  background-size:cover;
  background-position:center; 
  `;
}

const mood = document.getElementById("mode");

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
// // let  contanierDetalis

// function detalis() {

// const backgroundImage = contanierDetalis.thumbnail.replace("thumbnail", "background");

//   document.body.style.cssText = `
//   background-image:url('${backgroundImage}') ;
//   background-size:cover;
//   background-position:center; `;
// }
