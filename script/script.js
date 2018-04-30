//Topics array to display when page loads
var topics = ["broccoli", "cake", "muffin", "nachos", "tacos", "pizza", "noodles", "pasta", "potato", "apple", "pie"];
//For loop to generate buttons for each array element
for (i = 0; i <= topics.length; i++){
    var buttonHtml = "<button type='button'>" + topics[i] + "</button>";
    $("#foodButtons").append(buttonHtml);
}

//QueryURL for GIPHY API
var queryURL = "https://api.giphy.com//v1/gifs/search?api_key=DRcqsS5iFZbtajCgoYlo4inNakv4wCTy&q&limit=10&rating";
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });