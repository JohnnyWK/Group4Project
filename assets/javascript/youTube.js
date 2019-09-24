// This js will return youTube array of upcoming events, consisting of data like this:
// youTube[0].date: "2017-05-30T04:25:18.000Z"
// youTube[0].dateFormatted: "Mon May 29 2017"
// youTube[0].info: "All Things Comedy podcast with hosts Felipe Esparza..."
// youTube[0].title: "Mariachi Midnight - Sweet Child Of Mine"
// youTube[0].urlThumbnail: "https://i.ytimg.com/vi/ERVD2UAor5g/default.jpg"
// youTube[0].urlVideo: "https://www.youtube.com/watch?v=ERVD2UAor5g"




function getYouTubeData(artistName) {

    console.log("artist name = " + artistName);

    // Performing our AJAX GET request
    // perrys api key:
    queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + artistName + "&videoEmbeddable=true&type=video&key=AIzaSyBquInAOt9guGiS3K47FM44oH9Mn6eYnaY"
    // daniels api key:
    // queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + artistName + "&videoEmbeddable=true&type=video&key=AIzaSyCyZbwUI-oq91OAEz_ZT80p7api9cQqQsU"
    var response = [];
    var youTube = [];
    response.length = 0;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(response.items);

        for (var i = 0; i < response.items.length; i++) {
            // set fields to blank so nothing comes back undefined..
            youTube[i] = {};
            youTube[i].title = "";
            youTube[i].urlVideo = "";
            youTube[i].urlThumbnail = "";
            youTube[i].info = "";
            youTube[i].date = "";
            youTube[i].dateFormatted = "";

            var event = response.items[i]

            // if event.snippet property exists
            if (event.snippet) {
                // if title field exists..
                if (event.snippet.title) { youTube[i].title = event.snippet.title; }

                // if description field exists..
                if (event.snippet.description) { youTube[i].info = event.snippet.description; }

                // if thumbnails property exists..
                if (event.snippet.thumbnails) {

                    // if default property exists..
                    if (event.snippet.thumbnails.default) {

                        // if url field exists..
                        if (event.snippet.thumbnails.default.url) {
                            youTube[i].urlThumbnail = event.snippet.thumbnails.default.url;
                        }
                    }
                }

                // if publishedAt field exists..  Convert to regular date like : "Wed Dec 04 2019" 
                if (event.snippet.publishedAt) {
                    youTube[i].date = event.snippet.publishedAt;
                    //offset time 
                    tempDate = new Date(event.snippet.publishedAt.substr(0, 10) + " 00:00:00 GMT -0600");
                    var tempDateString = tempDate.toString();
                    var tempDateFormatted = tempDateString.substr(0, 15);
                    youTube[i].dateFormatted = tempDateFormatted;
                }

            }

            // if id property exists..
            if (event.id) {
                // if videoId field exists..
                if (event.id.videoId) { youTube[i].urlVideo = "https://www.youtube.com/watch?v=" + event.id.videoId; }
            }
        }

        console.log(youTube);


        // insert into html page (remove this for final use..)
        document.getElementById("div2").innerHTML = "<div class='divTitle'>YouTube Videos Related to " + artistName + "</div>";
        for (var e = 0; e < youTube.length; e++) {
            var divInfo = ` <div class="eventDiv">
<div class="articleTitle">${youTube[e].title}</div>
<a class="articleLink" href="${youTube[e].urlVideo}"> 
<div class="articlePhoto"><img src="${youTube[e].urlThumbnail}" alt="Article Photo"></div>
</a> 
<div class="articleShortText"> ${youTube[e].date}</div><br>
<div class="articleShortText"> ${youTube[e].dateFormatted}</div><br>
<div class="articleLongText"> ${youTube[e].info}</div><br>
</div> `
            // stick this data into html test page:
            document.getElementById("div2").innerHTML += divInfo;
        };

{/* <a class="articleLink" href="${youTube[e].urlVideo}"> YouTube Video</a>  */} // made the picture the link

    }

    )




}// end of function call


// // Add event listener to react when user enters new topic.. Creates button and automatically pull related updated Gif's.
// document.getElementById("button").addEventListener("click", function () {
//     var ItemToSearch = document.getElementById("searchArtist").value;
//     // alert("ItemToSearch = "+ItemToSearch)

//     getYouTubeData(ItemToSearch);
// });