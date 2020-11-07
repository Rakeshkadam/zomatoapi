/** @format */
var city_no = 0;
const city_names = [
  "Mumbai",
  "Pune",
  "Central Delhi",
  "East Delhi",
  "New Delhi",
  "Ahmedabad",
  "Amreli district",
  "Anand",
  "Banaskantha",
  "Bharuch",
  "Ambala",
  "Bhiwani",
  "Faridabad",
  "Fatehabad",
  "Gurgaon",
  "Bagalkot",
  "Bangalore Rural",
  "Bangalore Urban",
  "Belgaum",
  "Bellary",
  "Bidar",
];

function getdata(city) {
  if (city.trim() !== "") {
    fetch("https://developers.zomato.com/api/v2.1/cities?q=" + city, {
      method: "GET",
      headers: {
        "user-key": "218ebce6c8676111c9b49b8096b2f4ca",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return fetch(
          "https://developers.zomato.com/api/v2.1/search?entity_id=" +
            data.location_suggestions[0]["id"] +
            "&entity_type=city",
          {
            method: "GET",
            headers: {
              "user-key": "218ebce6c8676111c9b49b8096b2f4ca",
            },
          }
        );
      })
      .then((response) => response.json())
      .then((r) => {
        let output = "";
        for (let i = 0; i < r.restaurants.length; i++) {
          var list = r.restaurants[i];
          output += `
                    <div class="card m-2" style="max-width: 554px;">
                    <div class="row no-gutters">
                        <div class="col-md-6 col-sm-12">
                            <img class="card-img-top" width="256px" height="256px" id="image" src="${list.restaurant["featured_image"]}" alt="Card image cap">
                        </div>
                        <div class="col-md-6 col-sm-12">
                        <div class="card-body">
                            <h5 class="card-title">${list.restaurant["name"]}</h5>
                            <p class="card-text"><b>Rating:</b> ${list.restaurant["user_rating"]["aggregate_rating"]} (${list.restaurant["all_reviews_count"]} Reviews)</p>
                            <p class="card-text text-muted">${list.restaurant["cuisines"]}</p>
                            <p class="card-text ">Average cost for two ₹${list.restaurant["average_cost_for_two"]}</p>
                            <p class="card-text">${list.restaurant["location"]["locality"]}</p>
                            <small class="btn"><a href="${list.restaurant["url"]}" class="btn btn-outline-success" id="share">Order Now</a></small>
                        </div>
                        </div>
                    </div>
                </div>
                `; 
        }
        document.getElementById("row").innerHTML += `<div class="row m-2 text-light bg-dark border border-info rounded col-md-12 p-5 text-center"><b>Total Restaurant in&nbsp${city}: ${r.results_found}</b></div>`;
        document.getElementById("row").innerHTML += output;
      })
      .catch((r) => {
        alert(r);
      });
  }
}

window.onscroll = function() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        city_no++;
        getdata(city_names[city_no]);
    }
};

window.onload = function() { getdata(city_names[0]);}

// {
//     name: "Rakesh",
//     dob: "09/0",
//     address: {
//         "houseNO" : "124",
//         "area": "avsd",
//         "city": "Pune"
//     }
// }

// function getdata() {
//     const city = document.getElementById("city-search").value;

//     if(city.trim() !== ""){
//         fetch(
//             'https://developers.zomato.com/api/v2.1/locations?query='+ city,
//             {
//                 method: "GET",
//                 headers: {
//                     "user-key": "218ebce6c8676111c9b49b8096b2f4ca"
//                 }
//             })
//             .then((response) => response.json())
//             .then(r => {
//                 const location = r.location_suggestions.length > 0 ?
//                 r.location_suggestions[0] : {
//                     enity_type: "",
//                     title: "Not found",
//                     city_name: "For Query:" + city,
//                     country_name: ""
//                 };
//                 document.getElementById("city-title").innerText = location.title;
//                 document.getElementById("city-name").innerText = location.city_name;
//                 document.getElementById("entity-type").innerText = location.entity_type;
//            }).catch(r =>
//                {alert(r);}
//            );
//     }
// }
