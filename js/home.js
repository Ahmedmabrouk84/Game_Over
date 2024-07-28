" use strict";

const looding = document.querySelector(".looding");

// ======================
document.getElementById("logout-btn").addEventListener("click", function () {
  localStorage.removeItem("userToken");
  window.location = "./index.html";
});

const mood = document.getElementById("mode");
if (localStorage.getItem("dataThem") != null) {
  const theme = localStorage.getItem("dataThem");
  document.querySelector('html').setAttribute('data-theme',theme) 
if (theme == 'light') {

  mood.classList.replace('fa-sun','fa-moon')
}
else {
  mood.classList.replace('fa-moon','fa-sun')
}


} 
mood.addEventListener("click", function () {
  if (mood.classList.contains("fa-sun")) {
    document.querySelector("html").setAttribute("data-theme", "light");
    mood.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("dataThem", "light");
  } 
  else {
    document.querySelector("html").setAttribute("data-theme", "dark");
    mood.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("dataThem", "dark");
  }
});


// ================
function setLinkAchtive() {
  const links = document.querySelectorAll("ul .nav-link");

  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function (e) {
      document.querySelector(".active").classList.remove("active");
      this.classList.add("active");
      const dataCategory = this.getAttribute("data-category");
      // console.log(dataCategory);
      getGames(dataCategory);
    });
  }
}
setLinkAchtive();
getGames("MMORPG");

async function getGames(categoryName) {
  looding.classList.remove("d-none");
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  try {
    const ApiResponse = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categoryName}`,
      options
    );
    const data = await ApiResponse.json();
    // console.log(data);
    displayData(data);
    looding.classList.add("d-none");
  } catch (error) {
    // =============
    console.error("Error From API", error);
  }
}

function displayData(gamesData) {
  let boxData = ``;
  for (let i = 0; i < gamesData.length; i++) {
    const vedioPath = gamesData[i].thumbnail.replace(
      "thumbnail.jpg",
      "videoplayback.webm"
    ); //videoplayback.webm
    boxData += `
     <div class="col-md-6 col-lg-4 col-xl-3">
              <div onmouseenter="playVideo(event)" onclick="showDetails(${gamesData[i].id})" onmouseleave="stopVideo(event)" class="card h-100 my-2">
                <div class="card-img  position-relative">
                  <img
                    src="${gamesData[i].thumbnail}"
                    class="card-img-top "
                    alt="${gamesData[i].title}"
                  />
                  <video muted="true" preload="none" loop src="${vedioPath}" class=" p-0 m-0 d-none w-100 h-100 position-absolute top-0 start-0 z-3 "></video>
                </div>
                <div class="card-body px-2">
                  <div
                    class="lead p-1 d-flex align-items-center justify-content-between"
                  >
                    <h5 class="card-title"> ${gamesData[i].title}</h5>
                    <span class="badge text-bg-primary">Free</span>
                  </div>
                  <p>
                  ${gamesData[i].short_description}
                  </p>
                </div>
                <div
                  class="card-footer d-flex align-items-center justify-content-between"
                >
                  <p class="rounded"> ${gamesData[i].genre}</p>
                  <p class="rounded"> ${gamesData[i].platform}</p>
                </div>
              </div>
            </div>
    `;
  }
  document.getElementById("rowData").innerHTML = boxData;
}

function playVideo(event) {
  const videoElement = event.target.querySelector("video");
  videoElement.muted = true;
  videoElement.classList.remove("d-none");
  videoElement.play();
}

function stopVideo(event) {
  const videoElement = event.target.querySelector("video");
  videoElement.muted = true;
  videoElement.classList.add("d-none");
  videoElement.pause();
}

function showDetails(gameId) {
  looding.classList.remove("d-none");
  window.location = `./details.html?id=${gameId}`;
  // console.log('Card Id ===> ',gameId);
}
