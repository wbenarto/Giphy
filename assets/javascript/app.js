var giphyArray = ["Allen Iverson", "Stephen Curry", "Kobe Bryant", "Kyrie Irving", "Jeremy Lin"];

$("#submit").on("click", function (event) {
    event.preventDefault();

    //create a variable to hold user input
    var userInput = $("#giphy-search").val().trim();
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=7kLHfanO6U5efm8hQz8f1qYF3UqVv6lv&q=" + userInput + "&limit=10";
    var giphyButton = 
    //ajax request
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        // console.log(response);
        console.log(response.data);
        var result = response.data;

        for (var i = 0; i < result.length; i++) {
            // console.log(response.data[i].images.original.url);

            //create a div to hold a gif and contains imageURL
            var stillURL = result[i].images.fixed_height_still.url;
            var animateURL = result[i].images.fixed_height.url;
            // console.log(stillURL);

            //create a div per gif
            var giphyDiv = $("<div>");
            giphyDiv.attr("id", "giphy-container");

            //create an image tag dynamically and add attribute source
            var giphyImg = $("<img>");
            giphyImg.attr("src", stillURL);
            giphyImg.addClass("gif");
            giphyImg.attr("data-state", "still");
            giphyImg.attr("data-still", stillURL);
            giphyImg.attr("data-animate", animateURL);

            //append giphyImg to giphyDiv
            giphyDiv.prepend(giphyImg)

            //append rating onto giphy div
            var rating = result[i].rating;
            console.log(rating);
            var ratingP = $("<p>").text("Rating: " + rating);
            giphyDiv.append(ratingP)

            //appending download button
            // var download = $("<a href='" + result[i].images.original.url + "' download>")
            // var downloadBtn = 
            // $(downloadBtn).attr("href", animateURL)
            // downloadBtn.text("Click to download")
            // // download.append(downloadBtn);
            // giphyDiv.append(downloadBtn);

            //prepend all giphy on top of seaches
            $("#images").prepend(giphyDiv);

        }

        //animate gif on click
        $(".gif").on("click", function () {
            var state = $(this).attr("data-state");

            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            };
        });
    });

});

// Function for displaying players giphy
function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < giphyArray.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of movie-btn to our button
        a.addClass("giphy-btn");
        // Adding a data-attribute
        a.attr("data-name", giphyArray[i]);
        // Providing the initial button text
        a.text(giphyArray[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
};

renderButtons();

