var $quote;
var $tweetButton;

function getQuote() {
    
    /*Response format:
    {
      "type": "success",
      "value": {
        "id": 458,
        "joke": "Chuck Norris can write infinite recursion functions and have them return.",
        "categories": [
          "nerdy"
        ]
      }
    }
    */
    $.ajax({
        url: "http://api.icndb.com/jokes/random?limitTo=[nerdy]"+"&callback=?",
        method: "GET",
        dataType: "jsonp",
        success: function (result) {
            if (result.type == "success") {
                $quote.html(result.value.joke);
            }
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log("readyState: " + xhr.readyState);
            console.log("responseText: "+ xhr.responseText);
            console.log("status: " + xhr.status);
            console.log("text status: " + textStatus);
            console.log("error: " + errorThrown);
        }
    });
}

$(document).ready(function() {
    $quote = $("#quote-box");
    $tweetButton = $("#tweet-button");
    
    // Get a quote to start.
    getQuote();
    
    $("#generate").click(function () {
        getQuote();
    });
    
    $tweetButton.click(function () {
        var currentQuote = encodeURIComponent($quote.html());
        var url = "http://twitter.com/share?text=" + currentQuote;
        var width = 575,
            height = 500,
            left = ($(window).width() - width) / 2,
            top = ($(window).height() - height) / 2,
            opts = 'status=1,width=' + width + ',height=' + height + ',top=' + top + 'left=' + left;
        window.open(url, 'twitter', opts);
    });
});