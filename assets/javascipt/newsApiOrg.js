// This js will return data array of upcoming events, consisting of:
//example:
// returnData.name: "Metallachi"
// returnDat.info: "2 drink minumum"




function getData(topic) {
    var returnData = [];
   returnData.length = 0;

 var url = 'https://newsapi.org/v2/everything?q=' + topic + '&sortBy=popularity&apiKey=5dcec5d762154df793285080fa58a3dc'
      //var url="https://newsapi.org/v2/top-headlines?country=us&apiKey=5dcec5d762154df793285080fa58a3dc"

fetch(url).then(function (fetchedData) {
    // fetch returns a promise of "fetchedData"..
var promisedData = fetchedData.json();
// the following "then" will complete when the "Promise" is fulfilled.
      promisedData.then(function(response){
            //---------------------OR The AJAX method--------------------
            // $.ajax({ url: url,  method: "GET"  }).then(function (response) {  console.log(response); })

        console.log("response", response);
        //anything you need in here
      
// Start a for loop to create giph diplay div's with onclick events to start and stop motion.
var newsApi = [];


for (var i = 0; i < response.articles.length; i++) {
   // set all newsApi fields to at least blank..   
newsApi[i] = {};
newsApi[i].title = "";
newsApi[i].date="";
newsApi[i].dateFormatted="";
newsApi[i].photoLink = "";
newsApi[i].source="";
newsApi[i].description="";
newsApi[i].content="";
newsApi[i].articleLink="";

// Now to set all the newsAPI fields..
// First, shorten+ simplify the link with a variable:
incoming=response.articles[i];
output=newsApi[i];

// now for each field, check to make sure it exists, and if so, copy it to the proper output field
if (incoming.title) {output.title = incoming.title;}
if (incoming.content) {output.content = incoming.content;}
if (incoming.description) {output.description = incoming.description;}
if (incoming.url) {output.articleLink = incoming.url;}
if (incoming.urlToImage) {output.photoLink = incoming.urlToImage;}

// check to see if .source has a field named .name.. if so, get the source name..
if (incoming.source){
    if (incoming.source.name){output.source = incoming.source.name;}
}

if (incoming.publishedAt) {
output.date = incoming.publishedAt;
// compute formatted date
var tempDate = new Date(incoming.publishedAt.substr(0,10) + "GMT -0600");
var tempDateString = tempDate.toString();
var tempDateFormatted = tempDateString.substr(0, 15);
output.dateFormatted=tempDateFormatted;
}



} // end of "for (var i = 0; i < response._embedded.events.length; i++) {"
console.log("newsApi array",newsApi);



// Now put the data on the page:
document.getElementById("div4").innerHTML = "<div class='divTitle'>In The News</div>";
for (var e = 0; e < newsApi.length; e++) {
// insert into html page (remove this for final use..)

var divInfo = ` <div class="eventDiv">
<div class='articleTitle'>${newsApi[e].title}</div>
<div><img class="articlePhoto" src="${newsApi[e].photoLink}" alt="Ticket Master Photo"></div>
<div class="articleShortText" >  ${newsApi[e].dateFormatted}</div>
<div class="articleLongText" >  ${newsApi[e].description}</div>
<a class="articleLink" href="${newsApi[e].articleLink}">Link to Article</a>
<div class="articleLongText">Source: ${newsApi[e].source}</div>
</div>
`
// newsApi[i].content="";
document.getElementById("div4").innerHTML += divInfo;
} // end of forloop to put articles onto page





}) // end of "tempData.then(function(data){"
}) // end of   "fetch(url).then(function (response) {"

}// end of "function getData(topic) {"




// //  Event listener to react when user enters new topic.. Creates button and automatically pull related updated Gif's.
// document.getElementById("button").addEventListener("click", function () {
//     var ItemToSearch = document.getElementById("searchArtist").value;
//    // alert("ItemToSearch = "+ItemToSearch)

//     getData(ItemToSearch);
// }); 


//**********************************************  end ***************************************
