function gettasteDiveData(search) {
    var info = 1;
    var APIKey = "346441-Group4-QF40VRWM";
    var queryURL = "https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=" + search + "&info=" + info + "&k=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var resultDiv = $("#results")
        var results = response.Similar.Results
        // console.log(results);
        console.log(search);
        console.log(response);
        resultDiv.empty();
        resultDiv.append("<br><h2 class='text-center'>Search Results</h2><br>");
        resultDiv.append("Name: " + response.Similar.Info[0].Name + "<br>");
        resultDiv.append("Type: " + response.Similar.Info[0].Type + "<br>");
        if (response.Similar.Info[0].wTeaser !== "") {
            resultDiv.append("Info: " + "<p>" + response.Similar.Info[0].wTeaser + "</p>" + "<br>");
        }
        // resultDiv.append("Info: " + "<p>" + response.Similar.Info[0].wTeaser + "</p>" + "<br>");
        if (response.Similar.Info[0].yID !== null) {
            resultDiv.append("<iframe width='250' height='140' src='https://www.youtube.com/embed/" + response.Similar.Info[0].yID
                + "' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'allowfullscreen></iframe><br><hr><br>");
        }
        // resultDiv.append("<iframe width='560' height='315' src='https://www.youtube.com/embed/" + response.Similar.Info[0].yID
        // + "' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'allowfullscreen></iframe><br><hr><br>");
        resultDiv.append("<h2 class='text-center'>Artists Related</h2><br>");
        console.log("https://www.youtube.com/watch?v=" + response.Similar.Info[0].yID);


        //  Put data on div1:

        $("#card").attr("style", "display: visible");

        // remove any html from div1:
        document.getElementById("div1").innerHTML = "<div class='divTitle'>You May Also Like</div>";
        for (var i = 0; i < 6; i++) {
            var headerDiv = $("#card-header" + i);
            var cardP = $("#card-text" + i);
            var headerResultDiv = headerDiv;
            var cardResultDiv = cardP;

            var divInfo = ` <div class="eventDiv">
            <div class="articleTitle">${results[i].Name}</div>
            
            <div class="articleLongText">${results[i].wTeaser}</div>
            </div> `

            document.getElementById("div1").innerHTML += divInfo;



            // headerDiv.text("Name: " + results[i].Name);
            // cardP.html("Type: " + results[i].Type);
            // cardP.append("<p>Info: " + results[i].wTeaser + "</p>");
            // // console.log("Card: " + results[i]);

            // <div class="card bg-light mb-3 float-left" style="max-width: 18rem;">
            //     <div class="card-header" id="card-header5">Header</div>
            //     <div class="card-body">
            //         <p class="card-text" id="card-text5">Some quick example text to build on the card title
            //             and make up the bulk of the card's content.</p>
            //     </div>

        }
    }
    )
}