// This js will return ticketMaster array of upcoming events, consisting of:
// ticketMaster.name: "Metallachi"
// ticketMaster.eventDate: "2019-09-28"
// ticketMaster.eventDateFormatted: Sat Sep 28 2019 00:00:00 GMT-0500 (Central Daylight Time) {}
// ticketMaster.eventInfo: "All VIP Sections utilize a GA STANDING configuration. VIP PACKAGE DISCLAIMERS All package purchasers..."
// ticketMaster.eventVenue: "Great Lawn at Central Park in New York New York United States Of America"
// ticketMaster.image: "https://s1.ticketm.net/dam/a/b32/42e23b32_11/. ./_TABLET_LANDSCAPE_LARGE_16_9.jpg" (sample shortened)
// ticketMaster.buyTicketLink: "https://www.ticketMaster.com/global-/. ./.html"     (sample shortened)




function getticketMasterData(artistName) {
    var ticketMaster = [];
    ticketMaster.length = 0;

    // Performing our AJAX GET request
    // queryURL = "https://app.ticketMaster.com/discovery/v2/attractions.json?apikey=mTEygy6LqzguOiGcxe4nsIaFBEQTdwN3&keyword=metallica";
    queryURL = "https://app.ticketMaster.com/discovery/v2/events?apikey=mTEygy6LqzguOiGcxe4nsIaFBEQTdwN3&keyword=" + artistName + "&preferredCountry=us"
    var response = [];
    response.length = 0;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
 if(response){console.log(response);}else{alert("No Response from ticketmaster..");}
        document.getElementById("eventsHere").innerHTML = "";
        // Start a for loop to create giph diplay div's with onclick events to start and stop motion.
        var ticketMaster = [];

        for (var i = 0; i < response._embedded.events.length; i++) {
            // set all ticketMaster fields to at least blank..            
            ticketMaster[i] = {};
            ticketMaster[i].name = "";
            ticketMaster[i].eventDate;
            ticketMaster[i].eventDateFormatted = "";
            ticketMaster[i].eventInfo = "";
            ticketMaster[i].eventVenue = "";
            ticketMaster[i].image = "";
            ticketMaster[i].buyTicketLink = "";

            var event = response._embedded.events[i];

            if (event.name) { ticketMaster[i].name = event.name; }


            if (event.images[1].url) { ticketMaster[i].image = event.images[1].url; }




            if (event.dates || event.dates.start || event.dates.start.localDate) { ticketMaster[i].eventDate = event.dates.start.localDate; }


            var tempDate = new Date(event.dates.start.localDate + "GMT -0600");
            var tempDateString = tempDate.toString();
            var tempDateFormatted = tempDateString.substr(0, 15);

            if (event.dates || event.dates.start || event.dates.start.localDate) { ticketMaster[i].eventDateFormatted = tempDateFormatted; }




            if (event.info) { ticketMaster[i].eventInfo = event.info; } else { ticketMaster[i].eventInfo = ""; }

            ticketMaster[i].eventVenue = "";


            // the event venue caused a lot of random errors because some events didn't have states, or cities etc.. So I have to put in checks 
            // to make sure the property exists, and then check to see if the field exists before trying to add it to ticketMaster property!


            // does the event have an _embedded property?
            if (event._embedded) {

                //Does that property have a venue[0]?
                if (event._embedded.venues[0]) {

                    //set eventVenue to the venues[0] property for ease of use
                    eventVenue = event._embedded.venues[0];

                    // does this venue have a name field? is so, add it to the ticketMaster array
                    if (eventVenue.name) { ticketMaster[i].eventVenue = eventVenue.name; }

                    // does this venue have a city property?
                    if (eventVenue.city) {
                        // does this city property have a name field? is so, add it to the ticketMaster array
                        if (eventVenue.city.name) { ticketMaster[i].eventVenue += " in " + eventVenue.city.name; }
                    }

                    // does this venue have a state property?
                    if (eventVenue.state) {

                        // does this state property have a name field? is so, add it to the ticketMaster array
                        if (eventVenue.state.name) { ticketMaster[i].eventVenue += " " + eventVenue.state.name; }
                    }

                    // does this venue have a country property?
                    if (eventVenue.country) {

                        // does this country property have a name field? is so, add it to the ticketMaster array
                        if (eventVenue.country.name) { ticketMaster[i].eventVenue += " " + eventVenue.country.name; }
                    }
                }


                if (event.url) { ticketMaster[i].buyTicketLink = event.url; }
            }
        }
        console.log(ticketMaster);

        // to sort by event date

        ticketMaster.sort((a, b) => {
            if (a.eventDate > b.eventDate) { return 1 } else { return -1 }
        }
        )

        console.log(ticketMaster);

        for (var e = 0; e < ticketMaster.length; e++) {
            // insert into html page (remove this for final use..)

            var divInfo = `<h2 style="margin-bottom :0px">${ticketMaster[e].name}</h2>
         <div class="eventDiv" style="background-color: beige; color:blue;" >
 <span><img src="${ticketMaster[e].image}" height ="50px;" alt="Cool picture dude!"></span>;
 <span style="vertical-align:top"> ${ticketMaster[e].eventDateFormatted}</span><br>
 <span style="vertical-align:top"> ${ticketMaster[e].eventInfo}</span><br>
 <span style="vertical-align:top">LOCATION: ${ticketMaster[e].eventVenue} Date= ${ticketMaster[e].eventDateFormatted}</span><br>
 <a href="${ticketMaster[e].buyTicketLink}">Buy Tickets on ticketMaster</a> 
           </div>
 `

            document.getElementById("eventsHere").innerHTML += divInfo;
        }


    });

}// end of function call


// Add event listener to react when user enters new topic.. Creates button and automatically pull related updated Gif's.
document.getElementById("button").addEventListener("click", function () {
    var ItemToSearch = document.getElementById("searchArtist").value;
    // alert("ItemToSearch = "+ItemToSearch)

    getticketMasterData(ItemToSearch);
});



getticketMasterData("metalachi");