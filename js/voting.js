$(document).ready(function(){
    $('#modal1').modal({
        dismissible: false
  })
    $('#modal1').modal('open')
    $("")

    var sessionId = "LA-y8Fkh7G-OwiIUft0";
    var locationsURL = "https://letshavelunchserver.herokuapp.com/api/-" + sessionId + "/load_location_data";
    var imagesURL = "https://letshavelunchserver.herokuapp.com/api/-" + sessionId + "/load_images";
    var card;
    var cardImageDiv;
    var cardImage;
    var cardTitle;
    var titleString;
    var cardContent;
    var cardAddress;
    var cardAction;
    var upVote;
    var downVote;
    var ratingOuter;
    var ratingInner;
    var starsTotal=5;

    
    $.ajax({
        url: locationsURL,
        method: "GET"
    }).then(function(locations){
        $.ajax({
            url: imagesURL,
            method: "GET"
        }).then(function(images){
            console.log(locations);
            console.log(images);

            for (var i=0; i<locations.length; i++){
                console.log(locations[i].place_id);
                card= $("<div class='card medium' id='card"+i+"'>");
                cardImageDiv = $("<div class='card-image'>");
                cardImage= $("<img src='images/placeHolder.png' class='cardImg'>");
                cardTitle= $("<span class='card-title'>");
                titleString= locations[i].name;
                cardContent= $("<div class='card-content'>");
                ratingOuter= $("<div class='stars-outer'>");
                ratingInner= $("<div class='stars-inner'>");
                cardAddress= $("<p>"+locations[i].address+"</p>");
                cardAction= $("<div class='card-action'>")

                upVote= $("<a class='waves-effect waves-light btn right btn-large green accent-4'id='"+locations[i].place_id+"'>  <i class='material-icons'>thumb_up</i></a>");
                downVote= $("<a class='waves-effect waves-light btn left btn-large red accent-4'id='"+locations[i].place_id+"negative'>  <i class='material-icons'>thumb_down</i></a>");
                var starPercentage = (locations[i].rating/starsTotal) * 100;
                var starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
                console.log(starPercentageRounded);
                $("#resCol").prepend(card);
                $(card).append(cardImageDiv);
                $(cardImageDiv).append(cardImage);
                $(card).append(cardContent);
                $(cardContent).append(ratingOuter);
                $(ratingOuter).append(ratingInner);
                $(cardContent).append(cardAddress);
                $(card).append(cardAction);
                $(cardAction).append(upVote);
                $(cardAction).append(downVote);
                $(".stars-inner").css("width", starPercentageRounded);

                for (var j=0; j<images.length; j++){

                    var image =Object.keys(images[j]);
                    console.log(image);
                    console.log(images[j][image]);

                    if (image==locations[i].place_id){

                        var cardImageReal=$("<img src='"+ images[j][image] +"' class='cardImg'>");
                        $(cardImage).remove();
                        $(cardImageDiv).append(cardImageReal);
                        
                        

                    }
                    
                }

                $(cardImageDiv).append(cardTitle);
                $(cardTitle).append(titleString);
    
                
            }

            $(".green").on("click",function(){

                var actionSection= $(this).parent();
                var card= $(actionSection).parent();
                var voteId= $(this).attr("id");
                var voteURL= "https://letshavelunchserver.herokuapp.com/api/-" + sessionId + "/vote/" + voteId;
                $(card).slideUp();
                $.ajax({
                  url:voteURL,
                  method:"POST"
               }).then(function(response){
                    console.log(response);
               })


            })
             
            $(".red").on("click",function(){

                console.log(this)

                var actionSection= $(this).parent();
                var card= $(actionSection).parent();
                $(card).slideUp();
               })

        })

    })


});
