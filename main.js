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

	$("#quote-get-form").on('submit', getQuote);

	function getQuote(event) {
		event.preventDefault();
		var key = $(this).find('input:checked').val();

		$.ajax({
		  url:    quoteSources[key].url,
		  cache: false,
		  success: quoteSources[key].handler,
		  error: function(xhr, errStatus, errThrown) {
				console.log (errStatus, errThrown);
			}
		});
	}

	function drawQuote(content, author) {
		clearQuote();
		var quoteContainer = $("<blockquote />");
		quoteContainer.html(content + "<cite>" + author + "</cite>");
		var tweetURI = 'https://twitter.com/intent/tweet?hashtags=quotes&text="' +
			$(content).text() + '" ' + author;
		quoteContainer.append('<a class="tw" href="' + encodeURI(tweetURI) + '" target="_blank"><i class="fa fa-twitter"></i> Tweet me!</a>');
		quoteContainer.appendTo($("#wrapper"));
	}

	function clearQuote() {
		$("#wrapper blockquote").remove();
	}

	function AppError (errContainer) {
		this.container = errContainer;
	}

	AppError.prototype.showError = function (errMessage) {
		this.container.html('This source do not allow, Try another source');
		console.log(errMessage);
	};
	AppError.prototype.showTimeout = function () {
		this.container.html('Quote source has a problem, try another source');
	};

	AppError.prototype.showAbort = function () {
		
	};

	AppError.prototype.showParseError = function () {
		
	};
});
