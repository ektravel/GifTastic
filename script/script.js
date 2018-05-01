$(document).ready(function () {
    //Topics array to display when page loads
    var topics = ["broccoli", "cake", "muffin", "nachos", "tacos", "pizza", "noodles", "pasta", "potato", "apple", "pie"];

    //Function for displaying food input data
    function displayFoodButton() {
        $("#foodButtons").empty();

        for (i = 0; i < topics.length; i++) {
            var buttonHtml = "<button type='button' class='gifButton'>" + topics[i] + "</button>";
            $("#foodButtons").append(buttonHtml);
        };

        addEventListenerForFoodButtons();
    };

    displayFoodButton();

    //Function to add a new food item to the topics array
    $("#submitButton").on("click", function (event) {
        event.preventDefault();
        var topic = $("#foodItem").val().trim();
        topics.push(topic);
        displayFoodButton();
    });

    //Event listener for Food button
    function addEventListenerForFoodButtons() {

        $(".gifButton").on("click", function () {
            var food = $(this).text();
            console.log(food);

            //Construct a queryURL using the food name
            var queryURL = "https://api.giphy.com//v1/gifs/search?q=" + food + "&api_key=dc6zaTOxFJmzC&rating&limit=10";

            //Performing an AJAX request with the queryURL
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(queryURL)
                console.log(response);

                //Storing data from the AJAX request in the results variable
                var results = response.data;

                //Looping through each result item
                for (i = 0; i < results.length; i++) {
                    var foodDiv = $("<div>");
                    //Creating paragraph tag to display gif rating
                    var p = $("<p>").text("Rating: " + results[i].rating);
                    //Creating image tag to display gifs
                    var foodImage = $("<img>");

                    //Adding image src and data-still attribute to stop animation
                    foodImage.attr("src", results[i].images.fixed_height_still.url);
                    foodImage.attr("data-still", results[i].images.fixed_height_still.url);
                    foodImage.attr("data-animate", results[i].images.fixed_height.url);
                    foodImage.attr("data-state", "still");
                    foodImage.addClass("movGif");

                    //Adding paragraph and image tags to foodGifs div
                    foodDiv.append(p);
                    foodDiv.append(foodImage);
                    //Prepanding the foodGifs to the HTML page in the foodGifs div
                    $("#foodGifs").prepend(foodDiv);
                };

                //When gif img is clicked, the value of the attribute is updated
                $(".movGif").on("click", function () {
                    console.log("privet");
                    var state = $(this).attr("data-state");

                    //If the clicked image is state=still, change the attribute value to animate
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    }
                    else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                });
            });
        });
    };
});