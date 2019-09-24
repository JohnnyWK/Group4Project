$("#submitbtn").on("click", function(){
    var search = $("#user-input").val();
    var info = 1;
    var APIKey = "346441-Group4-QF40VRWM";
    var queryURL = "https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=" + search + "&info=" + info + "&k=" + APIKey;

    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
       
    })
})