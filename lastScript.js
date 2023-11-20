console.log(localStorage.getItem("idofclickedcard"));
console.log(JSON.parse(localStorage.getItem("RequiredInfoforThirdPage")));

let requiredCardInfo=0;
for(let i=0;i<JSON.parse(localStorage.getItem("RequiredInfoforThirdPage")).length;i++)
{
    // console.log(JSON.parse(localStorage.getItem("RequiredInfoforThirdPage"))[i].id,localStorage.getItem("idofclickedcard"))
    if(JSON.parse(localStorage.getItem("RequiredInfoforThirdPage"))[i].id==localStorage.getItem("idofclickedcard"))
    {   
        
        requiredCardInfo=JSON.parse(localStorage.getItem("RequiredInfoforThirdPage"))[i];
    }
}
console.log(requiredCardInfo);

document.getElementById("hotelname").innerText=requiredCardInfo.name;
document.getElementById("rating").innerText=`${requiredCardInfo.rating}`
document.getElementById("reviews").innerText=`${requiredCardInfo.reviewsCount} Reviews`


let firstimage=document.getElementById("firstImage");

firstimage.innerHTML=`<img src="${requiredCardInfo.images[0]}"> `

let lastimages=document.getElementById("lastfourImages");
lastimages.innerHTML=`<img src="${requiredCardInfo.images[1]}"> 
<img src="${requiredCardInfo.images[2]}">
<img src="${requiredCardInfo.images[3]}">
<img src="${requiredCardInfo.images[4]}">
`

document.getElementById("hotelnamerequired").innerText=`${requiredCardInfo.name}`
document.getElementById("hotelinfo").innerText=`${requiredCardInfo.persons} Quests .${requiredCardInfo.bedrooms} bedroom .${requiredCardInfo.beds} bed .${requiredCardInfo.bathrooms} bath`
document.getElementById("cancellationPolicy").innerText=`${requiredCardInfo.cancelPolicy}`


document.getElementById("stayimg").innerHTML=`<img src="${requiredCardInfo.images[5]}">`

document.getElementById("displayiframehere").innerHTML=`<iframe src="https://maps.google.com/maps?q=${requiredCardInfo.lat},${requiredCardInfo.lng} &z=15&output=embed" width="100%" height="400px" frameborder="0" style="border:0"></iframe>`

document.getElementById("hotel").innerHTML=`<b>${requiredCardInfo.name}</b>`
document.getElementById("price").innerHTML=`<b>$${requiredCardInfo.price.rate}/night</b>`
document.getElementById("ratingandreview").innerHTML=`<img src="./assets/star.png">
<b>${requiredCardInfo.rating} <u>reviews</u> <b>${requiredCardInfo.reviewsCount}</b>
`
let info=JSON.parse(localStorage.getItem("info"));
console.log(info);
document.getElementById("checkIn").innerHTML=`<b>CHECKIN <div>${info.checkInDate}</div></b>`
document.getElementById("checkout").innerHTML=`<b>CHECKOUT <div>${info.checkOutDate}</div></b>`
document.getElementById("quests").innerHTML=`<b>GUESTS <span>${info.NoOfPeople}</span></b>`

document.getElementById("x").innerText=`${requiredCardInfo.price.priceItems[0].title}`
document.getElementById("y").innerText=`$${requiredCardInfo.price.priceItems[0].amount}`

document.getElementById("a").innerText=`${requiredCardInfo.price.priceItems[1].title}`
document.getElementById("b").innerText=`$${requiredCardInfo.price.priceItems[1].amount}`

document.getElementById("d").innerText=`$${requiredCardInfo.price.total}`