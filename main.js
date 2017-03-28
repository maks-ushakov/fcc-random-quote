$(document).ready(function(){
	var quoteSources = {
		heroku : {
			url		: "https://random-quote-generator.herokuapp.com/api/quotes/random",
			handler	: function (data) {
				drawQuote("<p>" + data.quote + "</p>", data.author);
			}
		},
		qdesign	: {
			url		: "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=",
			handler	: function (data) {
				drawQuote(data[0].content, data[0].title);
			}
		}
	};
	$("#quote-get-form").on('submit', randomQuote);

	function randomQuote(event) {
		event.preventDefault();
		var key = $(this).find('input:checked').val();
		$("#wrapper blockquote").remove();
		$.ajax({
      url:    quoteSources[key].url,
      cache: false,
      success: quoteSources[key].handler,
      error: function(err) {
        console.dir("Error:" + err);
        }
    });
	}

	function drawQuote(content, author) {
    $("#wrapper blockquote").remove();
		var quoteContainer = $("<blockquote />");
		quoteContainer.html(content + "<cite>" + author + "</cite>");
		var tweetURI = 'https://twitter.com/intent/tweet?hashtags=quotes&text="' +
				$(content).text() + '" ' + author;
		quoteContainer.append('<a class="tw" href="' + encodeURI(tweetURI) + '" target="_blank"><i class="fa fa-twitter"></i> Tweet me!</a>');
		quoteContainer.appendTo($("#wrapper"));
  }
});
