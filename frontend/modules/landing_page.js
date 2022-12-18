import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
 
  try {
  const res = await fetch(config.backendEndpoint+"/cities");
  const data = await res.json();
  return data;
  }
  
  catch(error) {
    return null;
  }
  
}



//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let parentDiv = document.getElementById("data");

  let container = document.createElement("div");
  container.className ="col-6 col-lg-3 mb-4";

  let idElement = document.createElement("a");

  idElement.setAttribute("id",id);
  idElement.setAttribute("href","pages/adventures/?city=" +id);

  let divTile = document.createElement("div");
  divTile.className = "tile";
  let imgElement = document.createElement("img");
  imgElement.src = image;
 

  let divTileText = document.createElement("div");
  divTileText.className = "tile-text text-center";
  let cityElement = document.createElement("h5");
  cityElement.innerText = city;
  let descElement = document.createElement("p");
  descElement.innerText = description;

  divTileText.append(cityElement);
  divTileText.append(descElement);
  divTile.append(imgElement);
  divTile.append(divTileText);
  idElement.append(divTile);
  container.append(idElement);
  parentDiv.append(container);
}

export { init, fetchCities, addCityToDOM };
