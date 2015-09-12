var $quote;
var quoteCache = [];
var cacheSize = 6;

function initialQuote() {
    
    /*Response format:
    {
      "type": "success",
      "value": {      <-- As list of objects for multiple
        "id": 458,
        "joke": "Chuck Norris can write infinite recursion functions and have them return.",
        "categories": [
          "nerdy"
        ]
      }
    }
    */
    $.ajax({
        url: "http://api.icndb.com/jokes/random?limitTo=[nerdy]" + "&callback=?",
        method: "GET",
        dataType: "jsonp",
        success: function (result) {
            if (result.type == "success") {
                $quote.html(result.value.joke);
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("readyState: " + xhr.readyState);
            console.log("responseText: " + xhr.responseText);
            console.log("status: " + xhr.status);
            console.log("text status: " + textStatus);
            console.log("error: " + errorThrown);
        }
    });
}

function getQuote() {
    if (quoteCache.length > 0) {
        console.log(quoteCache.length);
        $quote.html(quoteCache.shift());
    } else {
        cacheQuotes(cacheSize);
        initialQuote();
    }
    
    if (quoteCache.length < 6) {
        var amountToCache = cacheSize - quoteCache.length;
        cacheQuotes(amountToCache);
    }
}

function cacheQuotes(numQuotes) {
    $.ajax({
        url: "http://api.icndb.com/jokes/random/" + numQuotes + "?limitTo=[nerdy]" + "&callback=?",
        method: "GET",
        dataType: "jsonp",
        success: function (result) {
            if (result.type == "success") {
                for (var i = 0; i < result.value.length; i++) {
                    quoteCache.push(result.value[i].joke);
                }
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
    var $tweetButton = $("#tweet-button");
    
    // Get a quote to start and load a cache for better response.
    initialQuote();
    cacheQuotes(cacheSize);
    
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