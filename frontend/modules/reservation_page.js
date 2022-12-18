import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const res = await fetch(config.backendEndpoint + "/reservations/");
    const data = await res.json(); 
    console.log(data);
    return data;
    
    }
    
    catch(error) {
      return null;
    }
  }

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
   
  if(reservations.length == []) {

      document.getElementById("no-reservation-banner").style.display = "block";
      document.getElementById("reservation-table-parent").style.display = "none";

    }
    else {
      document.getElementById("no-reservation-banner").style.display = "none";
      document.getElementById("reservation-table-parent").style.display = "block";

    }
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
    let parentElement = document.getElementById("reservation-table")
    for(let i = 0; i < reservations.length; i++) {
        let row = document.createElement("tr")
        row.innerHTML = `<td>${reservations[i].id}</td>
        <td>${reservations[i].name}</td>
        <td>${reservations[i].adventureName}</td>
        <td>${reservations[i].person}</td>
        <td>${new Date(reservations[i].date).toLocaleDateString("en-IN")}</td>

        <td>${reservations[i].price}</td>
        <td>${new Date(reservations[i].time).toLocaleString("en-IN", {
          year: "numeric",
          day: "numeric",
          month: "long",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        }).replace(" at",",")}</td>
       
      <td id=${reservations[i].id}><a href=../detail/?adventure=${reservations[i].adventure}
      <button class="reservation-visit-button">Visit Adventure</button></a></td>`
      parentElement.append(row);
    }
 

}

export { fetchReservations, addReservationToTable };
