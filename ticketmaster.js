// Performing AJAX GET request

// this is a slightly different request, didn't contain venue information.
// queryURL = "https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=mTEygy6LqzguOiGcxe4nsIaFBEQTdwN3&keyword=metallica";

// function getEventData(artistToSearch){

console.log("getEventData(artistToSearch) functin called");

queryURL = "https://app.ticketmaster.com/discovery/v2/events?apikey=mTEygy6LqzguOiGcxe4nsIaFBEQTdwN3&keyword="+artistToSearch+"&preferredCountry=us&includeSpellcheck=yes"

var response = [];
response.length = 0;
      $.ajax({
      url: queryURL,
      method: "GET"
      }).then(function (response) {
          console.log(response);
          document.getElementById("eventsHere").innerHTML = "";

          // Start a for loop to create giph diplay div's with onclick events to start and stop motion.
          for (var i = 0; i < response._embedded.events.length; i++) {
                  var divInfo = `<h2 style="margin-bottom :0px">${response._embedded.events[i].name}</h2>
                  <div class="eventDiv" style="background-color: beige; color:blue;" >
                  <span><img src="${response._embedded.events[i].images[1].url}" height ="50px;" alt="Cool picture dude!"></span>;
                  <span style="vertical-align:top"> ${response._embedded.events[i].dates.start.localDate}</span><br>
                  <span style="vertical-align:top"> ${response._embedded.events[i].info}</span><br>
                  <span style="vertical-align:top">LOCATION: 
                  ${response._embedded.events[i]._embedded.venues[0].name},
                  ${response._embedded.events[i]._embedded.venues[0].city.name} 
                  ${response._embedded.events[i]._embedded.venues[0].state.name} 
                  ${response._embedded.events[i]._embedded.venues[0].country.name}  
                  </span><br>
                  <a href="${response._embedded.events[i].url}">Buy Tickets</a> 
                  </div>
                  `
                  document.getElementById("eventsHere").innerHTML += divInfo;
              }
          });
        // }