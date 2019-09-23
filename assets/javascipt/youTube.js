// This js will return youTube array of upcoming events, consisting of data like this:
// youTube[0].date: "2017-05-30T04:25:18.000Z"
// youTube[0].dateFormatted: "Mon May 29 2017"
// youTube[0].info: "All Things Comedy podcast with hosts Felipe Esparza..."
// youTube[0].title: "Mariachi Midnight - Sweet Child Of Mine"
// youTube[0].urlThumbnail: "https://i.ytimg.com/vi/ERVD2UAor5g/default.jpg"
// youTube[0].urlVideo: "https://www.youtube.com/watch?v=ERVD2UAor5g"




function getYouTubeData(artistName) {

console.log("artist name = "+artistName);

    // Performing our AJAX GET request
    // https://www.googleapis.com/youtube/v3/search?part=snippet&q=no%20doubt&key=AIzaSyBquInAOt9guGiS3K47FM44oH9Mn6eYnaY
    // queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=completed&type=video&maxResults=20&q=metalachi&key=AIzaSyBquInAOt9guGiS3K47FM44oH9Mn6eYnaY"
    queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q="+artistName+"&videoEmbeddable=true&type=video&key=AIzaSyBquInAOt9guGiS3K47FM44oH9Mn6eYnaY"
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
                    tempDate = new Date( event.snippet.publishedAt.substr(0,10)+" 00:00:00 GMT -0600" );
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
                    document.getElementById("div2").innerHTML = "Related You Tube Videos";
                    for (var e = 0; e < youTube.length; e++) {
                            var divInfo = ` <h2 style="margin-bottom :0px">${youTube[e].title}</h2>
                            <div class="eventDiv" style="background-color: beige; color:blue;" >
                            <span><img src="${youTube[e].urlThumbnail}" height ="50px;" alt="Cool picture dude!"></span>;
                            <span style="vertical-align:top"> ${youTube[e].date}</span><br>
                            <span style="vertical-align:top"> ${youTube[e].dateFormatted}</span><br>
                            <span style="vertical-align:top"> ${youTube[e].info}</span><br>
                            <a href="${youTube[e].urlVideo}"> YouTube Video</a> 
                            </div> `
                    // stick this data into html test page:
                    document.getElementById("div2").innerHTML += divInfo;
                    };



    }

    )




}// end of function call


// // Add event listener to react when user enters new topic.. Creates button and automatically pull related updated Gif's.
// document.getElementById("button").addEventListener("click", function () {
//     var ItemToSearch = document.getElementById("searchArtist").value;
//     // alert("ItemToSearch = "+ItemToSearch)

//     getYouTubeData(ItemToSearch);
// });