$(document).ready(function() {

    $("#clear").click(function() {
        $("#figure").attr("value","");
        $("#min_year").attr("value","");
        $("#max_year").attr("value","");
        $("#figure").val("");
        $("#min_year").val("");
        $("#max_year").val("");
    });

    $("#figure").click(function(){
        $("#figure").attr("value","");
    });

    $("#min_year").click(function(){
        $("#min_year").attr("value","");
    });

    $("#max_year").click(function(){
        $("#max_year").attr("value","");
    });


    $("#submit").click(function() {


        var parameters = {
            'api-key' : "AIzaSyBTaTIP0pf27QBpsg3ofYZcc3ZLhv1RMeU",
        };


        if( $("#keyword").val() == "Enter Keyword" || $("#keyword").val() == "" ) {
            return
        } else {
            parameters['q'] =  $("#keyword").val();
        }

        
        if( $("location").val() == "zipcode or city" || $("#location").val() == "") {
            return
        } else {
            parameters['location'] =  $("#location").val();
        }


       if( $("#radius").val() == "miles" || $("#radius").val() == "") {
            return
        } else {
            parameters['radius'] =  $("#radius").val();
        }

        console.log(parameters)


        var queryURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/output?parameters";
        queryURL += '?' + $.param(parameters);

        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(result) {
            console.log(result);

            // DOM modifiers
            print(result);

        });     
    });

    
    function print(result){
    // console.log(docsdisplayed);
    var articles = "";
    for (var i=0; i< 10; i++){
        articles += "<a class='m-1 p-1 text-primary' href=" + result.response.docs[i].web_url + ">" +
                    "<p><b>" + result.response.docs[i].headline.main + "</b> <br>" +
                     result.response.docs[i].snippet + "<br>" +
                    "Publication date: " + result.response.docs[i].pub_date.substring(0,10) + "</p></a><br>" ;      
    }

    $("#results").html(articles);
    }




})