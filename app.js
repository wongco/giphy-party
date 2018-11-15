$(document).ready(function() {
  function createGiph(event) {
    event.preventDefault();

    // get user content
    const userSearch = $('#searchText').val(); // Example: dog

    const baseUrl = 'http://api.giphy.com/v1/gifs/search';

    // config apiKey stored separately
    const queryStringforRequest = {
      q: userSearch,
      api_key: config.apiKey
    };

    // get image from Giphy and add to DOM
    $.getJSON(baseUrl, queryStringforRequest, function(result) {
      // do nothing if there are no results
      if (result.data.length === 0) {
        return;
      }

      // grab Random Img from Results and append to DOM
      const randomImgIdx = Math.floor(Math.random() * result.data.length);
      const gifurl = result.data[randomImgIdx].images.fixed_width.url;
      $('#picContainer').append(
        $('<div>')
          .addClass('col-3')
          .append(
            $('<img>')
              .attr('src', gifurl)
              .addClass('pl-3 pr-3 py-2 img-responsive')
          )
      );

      // clear user input
      $('#searchText').val('');
    });
  }
  // event listener for search giphy search
  $('#searchButton').on('click', createGiph);

  // event listen for remove images
  $('#removeButton').on('click', function(event) {
    event.preventDefault();
    $('#picContainer').empty();
  });
});
