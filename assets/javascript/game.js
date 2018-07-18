$(document).ready(function () {
  // Initial array of Disney movies
  var topics = ["The Little Mermaid", "Aladdin", "Mulan", "The Lion King", "Cinderella", "Sleeping Beauty", "Moana", "Frozen", "Tangled", "Inside Out"];

  // Function for displaying movie data
  function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < topics.length; i++) {

      // Then dynamicaly generating buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of movie-btn to our button
      a.addClass("movie-btn");
      // Adding a data-attribute
      a.attr("data-name", topics[i]);
      // Providing the initial button text
      a.text(topics[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }


  // displayMovieInfo function re-renders the HTML to display the appropriate content
  function displayDisneyGif() {
    $('#gif-area').empty();

    var movie = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=MNPfR2d7D2bXbHD7q6rTX5psRgU1qhm8&limit=10";
    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {


      // Gets the results and loops through to get the rating
      var results = response.data;
      //console log shows where the rating is found within the results
      console.log(results);

      for (var i = 0; i < results.length; i++) {

        // Creating a div to hold the rating
        var disneyDiv = $("<div class = 'item'>");

        //creates a var for the rating after looping through results
        var rating = results[i].rating;

        // Creating an element to have the rating displayed
        var pOne = $("<p>").text("Rating: " + rating);

        // The Images can still or animate to call the class "disneyGif" for click.
        var disneyGif = $("<img>");
        disneyGif.attr("src", results[i].images.fixed_height_still.url);
        disneyGif.attr("data-still", results[i].images.fixed_height_still.url);
        disneyGif.attr("data-animate", results[i].images.fixed_height.url);
        disneyGif.attr("data-state", "still");
        disneyGif.addClass('disneyGif');


        // Displaying the rating
        disneyDiv.prepend(pOne);

        // Retrieving the URL for the image
        disneyDiv.prepend(disneyGif)
        $('#gif-area').prepend(disneyDiv);
      }

      $(".disneyGif").on("click", function () {
        var state = $(this).attr("data-state");

        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    });

  }



  // This function handles events where a movie button is clicked
  
  $("#add-movie").on("click", function (event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var movie = $("#disney-search").val();

    // Adding movie from the textbox to our array
   topics.push(movie);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

  // Adding a click event listener to all elements with a class of "movie-btn"
  $(document).on("click", ".movie-btn", displayDisneyGif);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();
});