let searchItems = JSON.parse(localStorage.getItem("info"));
document.getElementById("locationname").innerText =
  searchItems.location.toUpperCase();
document.getElementById(
  "checkIndetails"
).innerText = `CHECKIN: ${searchItems.checkInDate} ;   `;
document.getElementById(
  "checkOutdetails"
).innerText = `CHECKOUT: ${searchItems.checkOutDate}`;
document.getElementById(
  "numberOfQuests"
).innerText = `QUESTS:${searchItems.NoOfPeople}`;
  

let cardsContanier=document.getElementById("cards");
let spanElement=document.getElementById("displayNoOfStays");

async function gettingData() {
  const url =
    `https://airbnb13.p.rapidapi.com/search-location?location=${searchItems.location}&checkin=${searchItems.checkInDate}&checkout=${searchItems.checkOutDate}&adults=${searchItems.NoOfPeople}&children=0&infants=0&pets=0&page=1&currency=USD`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "1e6eb57873msha49e00124f9ac10p15a8d8jsn68cc170ffa2b",
      "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    createHotelCards(result.results);
  } catch (error) {
    console.error(error);
  }
}

gettingData();

function createHotelCards(hotelsArr){
    
    spanElement.innerText=`${hotelsArr.length}+Stays in ${searchItems.location.toUpperCase()}`
    for(let i=0;i<hotelsArr.length;i++)
    {
        let hotel=hotelsArr[i];
        console.log(hotel);
        let div=document.createElement("div");
        div.className="card";
        div.innerHTML=`<img src="${hotel.images[0]}">
        <div id="middlediv">
           <div>
               <p>Entire home in ${searchItems.location.toUpperCase()}</p>
               <h2>${hotel.name}</h2>
           </div>
           <div>
              <p>Quests${hotel.persons}.Entire Home .${hotel.bedrooms}.${hotel.bathrooms}<br>${hotel.previewAmenities[0]}.${hotel.previewAmenities[1]}</p>
           </div>
           <div class="three">
               <span>${hotel.rating}</span>
               <img src="./assets/star.png">
               <span>(${hotel.reviewsCount} reviews)</span>
               <span>${hotel.price.total}${hotel.price.currency}/Nigth</span> 
           </div>
        </div> `
        cardsContanier.appendChild(div);
    }
}
