var giphyArray = [];

$("#submit").on("click", function(event) {
   event.preventDefault();

   //create a variable to hold user input
   var userInput = $("#giphy-search").val().trim();
   var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=7kLHfanO6U5efm8hQz8f1qYF3UqVv6lv&q=" + userInput + "&limit=10";

    //ajax request
    $.ajax({
        url: queryURL,
        method: "GET"
    }) .then(function(response) {
        // console.log(response);
        console.log(response.data);

        for (var i = 0; i < response.data.length; i++) {
            // console.log(response.data[i].images.original.url);
        
        //create a div to hold imageURL
        var imageURL = response.data[i].images.fixed_height_still.url;
        console.log(imageURL);

        //create an image tag dynamically and add attribute source
        var image = $("<img>");
        image.attr("src", imageURL);

        //prepend all giphy on top of seaches
        $("#images").prepend(image);
        }        
    })

   


})

