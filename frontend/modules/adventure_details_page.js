import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const searchParams = new URLSearchParams(search);
  const adventureId = searchParams.get("adventure");
  return adventureId;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call

  try {
    const res = await fetch(config.backendEndpoint+`/adventures/detail?adventure=${adventureId}`);
    const data = await res.json(); 
    return data;
    
    }
    
    catch(error) {
      return null;
    }
   
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  document.getElementById("adventure-name").textContent = adventure.name;
  document.getElementById("adventure-subtitle").textContent = adventure.subtitle;

  let imgGallery = document.getElementById("photo-gallery");

  adventure.images.forEach((image) => {
   let divElement = document.createElement("div");
   let imgElement = document.createElement("img");
   imgElement.src = image;
   imgElement.alt = adventure.name;
   imgElement.className = 'activity-card-image';
   divElement.append(imgElement);
   imgGallery.append(divElement);
  });
  document.getElementById("adventure-content").innerText = adventure.content;
 
}




//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photoGallery = document.getElementById("photo-gallery")
   photoGallery.innerHTML=`
   <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
   <div class="carousel-indicators">
     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true"></button>
     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="slide 2"></button>
     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="slide 3"></button>
   </div>
   <div class="carousel-inner"  id="carousel-inner">
   </div>
   <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
     <span class="visually-hidden">Previous</span>
   </button>
   <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
     <span class="carousel-control-next-icon" aria-hidden="true"></span>
     <span class="visually-hidden">Next</span>
   </button>
 </div>
   `

   for(let i= 0; i < images.length; i++) {
    let imageDiv = document.createElement('div');
    if(i == 0) {
      imageDiv.className = 'carousel-item activity-card-image active';
    }
    else {
      imageDiv.className = 'carousel-item activity-card-image';
    }
    let imgElement = document.createElement("img");
    imgElement.src = images[i];
    imgElement.className = "d-block w-100 h-100 img-fluid";
    imageDiv.appendChild(imgElement);
    
    document.getElementById("carousel-inner").appendChild(imageDiv);
  }


}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  
  if(adventure.available) {
    document.getElementById("reservation-panel-sold-out").style.display ="none";
    document.getElementById("reservation-panel-available").style.display ="block";
    document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead;

  }
  else {
    document.getElementById("reservation-panel-sold-out").style.display ="block";
    document.getElementById("reservation-panel-available").style.display = "none";
  }
  
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let costPerHead = adventure.costPerHead;
  let reservationCost = costPerHead*persons;
  document.getElementById("reservation-cost").innerHTML = reservationCost;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form = document.getElementById("myForm");
  form.addEventListener("submit",async(e)=>{
   e.preventDefault();

  const data = {
    name: form.elements["name"].value,
    person: form.elements["person"].value,
    date:new Date(form.elements["date"].value),
    adventure:adventure["id"]
  }
  console.log(data);

  try {
    const url = config.backendEndpoint + "/reservations/new";
    const res = await fetch(url, {
      method:"POST",
      headers: {'Content-Type': 'application/json'},
       body:JSON.stringify(data)
    });
    const result = await res.json();
    console.log(result);
    alert("Success");
    location.reload();
  }
    catch(error) {
      console.log(error);
      alert("Failed!");
    }
  });
    
}


//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  console.log(adventure)
  if (adventure.reserved) {
    document.getElementById("reserved-banner").style.display = "block";
  }
  else {
    document.getElementById("reserved-banner").style.display = "none";
  }
  
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
