$(document).ready(function() {
    var appKey = "AIzaSyBTaTIP0pf27QBpsg3ofYZcc3ZLhv1RMeU";
    var queryURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";

    var keyword = "";
    var zipcode = "";
    var zipDB = "";
    var location = "";      //latitude,longitude
    var radius = "";
    var minprice = "";
    var maxprice = "";

    $("#submit").click(function(event) {

        event.preventDefault();
        $("#searchResult").empty();

        //location (required)
        zipcode = $("#zipcode").val().trim();

        function getZipDB() {
            var value = $.ajax({
                url: 'assets/db/codes.json',
                async: false,
            }).responseText;
            return value;
        }

        if (zipcode.length == 5 && Number.isInteger(parseInt(zipcode))){
            zipDB = JSON.parse(getZipDB());
            location = zipDB[zipcode].latitude + ',' + zipDB[zipcode].longitude;
            //queryURL = queryURL + "location=" + location;
            queryURL += "location=" + location;
        } else {
            alert("Please only input a valid zipcode.");
        }
        

        // radius (required)
        radius = parseInt($("#radius").val().trim()) * 1609.344; //convert miles into meters

        var radius_string = radius.toString();
        queryURL += "&radius=" + radius_string; 
        
        // type = restaurant
        queryURL += "&type=restaurant"; 

        // keyword (optional)
        keyword = $("#keyword").val().trim();
        if (keyword) {
            queryURL += "&keyword=" + keyword;
        }

        //min price and max price
        minprice = $("#minPrice").val();
        maxprice = $("#maxPrice").val();
        if (minprice) {
            queryURL += "&minprice=" + minprice; 
        }
        
        if (maxprice) {
            queryURL += "&maxprice=" + maxprice;
        }

        //open now
        var n = $("input:checked").length;
        if(n==1) {
            queryURL += "&opennow"
        }

        //api key
        queryURL += "&key=" + appKey;
        console.log(queryURL);

        //test url
        //queryURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=33.7718,-84.3757&radius=8046.72&type=restaurant&keyword=hamburger&minprice=2&maxprice=4&opennow&key=AIzaSyBTaTIP0pf27QBpsg3ofYZcc3ZLhv1RMeU";

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(result){
            console.log(result);
            
            //display results in panel

            //entire panel group
            var panelGroup = $("<div>");
            panelGroup.addClass("panel-group")
            panelGroup.attr("id","accordion")

            for (var i=0; i<10; i++) {

                //panels
                var panelOne = $("<div>");
                panelOne.addClass("panel panel-default");

                //panel heading
                var panelHeading = $("<div>");
                panelHeading.addClass("panel-heading");

                //panel title
                var panelTitle = $("<h4>");
                panelTitle.addClass("panel-title");
                var restaurantName = $("<a>");
                restaurantName.attr("data-toggle", "collapse");
                restaurantName.attr("data-parent", "#accordion");
                restaurantName.attr("href", "#collapse" + i.toString());
                restaurantName.text(result.results[i].name);
            
                var rating = result.results[i].rating;
                var priceLevel = "$".repeat(result.results[i].price_level);
                var tempInfo = $("<i>").text(priceLevel + "  ·  " + rating );
                tempInfo.attr("style","float:right;");
                restaurantName.append(tempInfo);
                
                //panel body
                var panelBody = $("<div>");
                panelBody.addClass("panel-collapse collapse");
                var tempID = "collapse" + i.toString();
                panelBody.attr("id",tempID);

                //attach search results for panel body
                var panelContents = $("<div>");
                panelContents.addClass("panel-body");

                //search results - picture
                var restaurantImg = $("<img>");
                restaurantImg.attr("align","left");
                restaurantImg.attr("style","margin-right:30px;");
                var imagAddress = "https://maps.googleapis.com/maps/api/place/photo?maxheight=200"
                                    + "&photoreference=" + result.results[i].photos[0].photo_reference
                                    + "&key=" + appKey;
                restaurantImg.attr("src", imagAddress );

                //search results - text
                var restaurantInfo = "<b>" + result.results[i].name + "</b><br>" + result.results[i].vicinity;

                //attach elements to panel
                panelContents.append(restaurantImg);
                panelContents.append(restaurantInfo);
                panelBody.append(panelContents);
                panelTitle.append(restaurantName);
                panelHeading.append(panelTitle);
                panelOne.append(panelHeading);
                panelOne.append(panelBody);
                panelGroup.append(panelOne);
            }

            $("#searchResult").append(panelGroup);
            

        })
         
    });
    
    
    
})