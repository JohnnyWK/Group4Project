$("#submitbtn").on("click", function(){
    var search = $("#user-input").val();
    var info = 1;
    var APIKey = "346441-Group4-QF40VRWM";
    var queryURL = "https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=" + search + "&info=" + info + "&k=" + APIKey;

    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
        var results = response.Similar.Results
        // console.log(results);
        console.log(search);
        console.log(response);
        $("#results").empty()

        for (var i = 0; i < results.length; i++) {
            var infoDiv = $("<div>");
            infoDiv.append("Name: " + results[i].Name + "<br>");
            infoDiv.append("Type: " + results[i].Type + "<br><br>");
            $("#results").append(infoDiv);
            // console.log(response);
        }
    });
})