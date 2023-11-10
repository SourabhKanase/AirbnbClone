let form = document.getElementById("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let obj = {
    location: event.target.location.value,
    checkInDate: event.target.checkIn.value,
    checkOutDate: event.target.checkout.value,
    NoOfPeople: event.target.Quests.value,
  };
  //    console.log("running");
  localStorage.setItem("info", JSON.stringify(obj));
  //    console.log());
  navigateToSecondPage();
});

function navigateToSecondPage() {
  window.location.href = "secondPage.html";
}
