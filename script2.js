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

let cardsContanier = document.getElementById("cards");
let spanElement = document.getElementById("displayNoOfStays");

let globalArr;

// async function gettingData() {
//   const url = `https://airbnb13.p.rapidapi.com/search-location?location=${searchItems.location}&checkin=${searchItems.checkInDate}&checkout=${searchItems.checkOutDate}&adults=${searchItems.NoOfPeople}&children=0&infants=0&pets=0&page=1&currency=USD`;
//   const options = {
//     method: "GET",
//     headers: {
//       "X-RapidAPI-Key": "1e6eb57873msha49e00124f9ac10p15a8d8jsn68cc170ffa2b",
//       "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
//     },
//   };

//   try {
//     const response = await fetch(url, options);
//     const result = await response.json();
//     globalArr=result.results;
//     localStorage.setItem("RequiredInfoforThirdPage",JSON.stringify(result.results));
//        createHotelCards(result.results);
//     initMap(result.results);
//   } catch (error) {
//     console.error(error);
//   }
// }
// async function gettingData() {
//   const url = `https://airbnb13.p.rapidapi.com/search-location?location=${searchItems.location}&checkin=${searchItems.checkInDate}&checkout=${searchItems.checkOutDate}&adults=${searchItems.NoOfPeople}&children=0&infants=0&pets=0&page=1&currency=USD`;
//   const options = {
//     method: "GET",
//     headers: {
//       "X-RapidAPI-Key": "fefa91a059mshae090654265ea30p118531jsnb5ecf872c0be",
//       "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
//     },
//   };

//   try {
//     const response = await fetch(url, options);
//     const result = await response.json();
//     globalArr = result.results;
//     // console.log(result.results);
//     localStorage.setItem("RequiredInfoforThirdPage",JSON.stringify(result.results));
//     createHotelCards(result.results);
//     initMap(result.results);
//   } catch (error) {
//     console.log(error);
//   }
// }
async function gettingData() {
  // const url = `https://airbnb13.p.rapidapi.com/search-location?location=${searchItems.location}&checkin=${searchItems.checkInDate}&checkout=${searchItems.checkOutDate}&adults=${searchItems.NoOfPeople}&children=0&infants=0&pets=0&page=1&currency=USD`;
  const url = `https://airbnb13.p.rapidapi.com/search-location?location=${searchItems.location}&checkin=${searchItems.checkInDate}&checkout=${searchItems.checkOutDate}&adults=${searchItems.NoOfPeople}&children=0&infants=0&pets=0&page=1&currency=USD`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'fbe474f322msh338700f47dd23e4p167176jsnb763f33d6927',
      'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
    }
  };
  
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    globalArr = result.results;
    console.log(result.results);
    localStorage.setItem("RequiredInfoforThirdPage",JSON.stringify(result.results));
    createHotelCards(result.results);
    initMap(result.results);
  } catch (error) {
    console.error(error);
  }
}

// gettingData();

function createHotelCards(hotelsArr) {
  cardsContanier.innerHTML = "";
  spanElement.innerText = `${hotelsArr.length}+Stays in ${searchItems.location.toUpperCase()}`;

  if(hotelsArr.length>0)
  {
    for (let i = 0; i < hotelsArr.length; i++) {
      let hotel = hotelsArr[i];
      let div = document.createElement("div");
      div.addEventListener("click",redirectToThirdpage);
      let hr = document.createElement("hr");
      div.className = "card";
      div.id = `${hotel.id}`;
      // console.log(div.id, hotel);
      div.innerHTML = `<img src="${hotel.images[0]}">
          <div id="middlediv">
             <div>
                 <p>Entire home in ${searchItems.location.toUpperCase()}</p>
                 <h2>${hotel.name}</h2>
             </div>
             <div>
                <p>Quests${hotel.persons}.Entire Home .${hotel.bedrooms}.${hotel.bathrooms}<br>${hotel.previewAmenities[0]}.${hotel.previewAmenities[1]}</p>
             </div>
             <div class="three">
                <div class="insidethree">
                  <span>${hotel.rating}</span>
                  <img src="./assets/star.png">
                  <span>(${hotel.reviewsCount} reviews)</span>
                  <span>${hotel.price.total}${hotel.price.currency}/Nigth</span> 
                </div>
                <div class="insidethree">
                   <button data-lat="${hotel.lat}" data-lng="${hotel.lng}" onclick="ShowDirection(event)">Show Direction</button>
                   <span class="material-symbols-outlined">near_me</span>
                </div>
             </div>
          </div> `;
      cardsContanier.appendChild(hr);
      cardsContanier.appendChild(div);
    }
  }else{
    let NoDataFound=document.createElement("h1");
    h1.innerText="NO DATA FOUND!"
    cardsContanier.appendChild(NoDataFound);
  }
}

function redirectToThirdpage(event)
{
  let id=event.target.id;
  console.log(event.target.id);
  localStorage.setItem("idofclickedcard",event.target.id);
  window.location.href="LastPage.html";
 
}

function ShowDirection(event)
{
  let lat=event.target.getAttribute("data-lat");
  let lng=event.target.getAttribute("data-lng");
  console.log(lat,lng);

    // Open Google Maps directions in a new tab
    const url = `https://www.google.com/maps/dir//${lat},${lng}`;
    window.open(url, "_blank");
  
}

let map;

function initMap(hotels) {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: hotels[0].lat, lng: hotels[0].lng },
    zoom: 10,
  });

  let markerLocations = hotels.map((e) => {
    return {
      position: { lat: e.lat, lng: e.lng },
      title: e.name + " $" + e.price.rate + " /night",
    };
  });
  for (var i = 0; i < markerLocations.length; i++) {
    var marker = new google.maps.Marker({
      position: markerLocations[i].position,
      map: map,
      title: markerLocations[i].title,
    });
  }
}
function Heating() {
  let result = [];
  console.log(globalArr.length);
  for (let i = 0; i < globalArr.length; i++) {
    let arr = globalArr[i].previewAmenities;
    console.log(arr);
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] == "heating") {
        result.push(globalArr[i]);
      }
    }
  }
  createHotelCards(result);
}
function parking() {
  let result = [];
  console.log(globalArr.length);
  for (let i = 0; i < globalArr.length; i++) {
    let arr = globalArr[i].previewAmenities;
    console.log(arr);
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] == "parking") {
        result.push(globalArr[i]);
      }
    }
  }
  createHotelCards(result);
}
function Airconditioning() {
  let result = [];
  console.log(globalArr.length);
  for (let i = 0; i < globalArr.length; i++) {
    let arr = globalArr[i].previewAmenities;
    console.log(arr);
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] == "Air conditioning") {
        result.push(globalArr[i]);
      }
    }
  }
  createHotelCards(result);
}
function Wifi() {
  let result = [];
  console.log(globalArr.length);
  for (let i = 0; i < globalArr.length; i++) {
    let arr = globalArr[i].previewAmenities;
    console.log(arr);
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] == "Wifi") {
        result.push(globalArr[i]);
      }
    }
  }
  createHotelCards(result);
}

function kitchen() {
  let result = [];
  console.log(globalArr.length);
  for (let i = 0; i < globalArr.length; i++) {
    let arr = globalArr[i].previewAmenities;
    console.log(arr);
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] == "Kitchen") {
        result.push(globalArr[i]);
      }
    }
  }
  createHotelCards(result);
}
function Selfcheckin() {
  let result = [];
  console.log(globalArr.length);
  for (let i = 0; i < globalArr.length; i++) {
    let arr = globalArr[i].previewAmenities;
    console.log(arr);
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] == "Self check-in") {
        result.push(globalArr[i]);
      }
    }
  }
  createHotelCards(result);
}
function Ratinggreaterthan4() {
  let result = [];
  console.log(globalArr.length);
  for (let i = 0; i < globalArr.length; i++) {
    let obj = globalArr[i];
    if (obj.rating > 4) {
      result.push(globalArr[i]);
    }
  }
  createHotelCards(result);
}
function Ratinglessthan4() {
  let result = [];
  console.log(globalArr.length);
  for (let i = 0; i < globalArr.length; i++) {
    let obj = globalArr[i];
    if (obj.rating < 4) {
      result.push(globalArr[i]);
    }
  }
  createHotelCards(result);
}
