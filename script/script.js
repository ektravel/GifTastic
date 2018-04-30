//Topics array to display when page loads
var topics = ["broccoli", "cake", "muffin", "nachos", "tacos", "pizza", "noodles", "pasta", "potato", "apple", "pie"];
//For loop to generate buttons for each array element
for (i = 0; i < topics.length; i++) {
    var buttonHtml = "<button type='button' class='gifButton'>" + topics[i] + "</button>";
    $("#foodButtons").append(buttonHtml);
};
  
//Event listener for Food button
$(".gifButton").on("click", function() {
    var food = $(this).text();
    console.log(food);
    
    //Construction a queryURL using the food name
    var queryURL = "https://api.giphy.com//v1/gifs/search?q=" + food + "&api_key=DRcqsS5iFZbtajCgoYlo4inNakv4wCTy&limit=10";
    //Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(queryURL)
        console.log(response);

        //Storing dta from the AJAX request in the results variable
        var results = response.data;

        //Looping through each result item
        for (i = 0; i < results.length; i++) {
            //Creating div to hold individual gifs
            var foodDiv = $("<div>");
            //Creating paragraph tag to display gif rating
            var p = $("<p>").text("Rating: " + results[i].rating);
            //Creating image tag to display gifs
            var foodImage = $("<img>");
            foodImage.attr("src", results[i].images.fixed_height.url);
            //Adding paragraph and image tags to foodGifs div
            foodDiv.append(p);
            foodDiv.append(foodImage);
            //Prepanding the foodGifs to the HTML page in the foodGifs div
            $("#foodGifs").prepend(foodDiv);
        }
      });
      
  }
);
