$(function (tween) {
    $("#reviewformsubmit").on("click",function (tween) {
       var rating = $(".rating>input:checked").val();
       var review = $("#reviewtext").val();
       var rid = $("#restauranticon").val();
       var aid = $("#usericon").val();
       var date = new Date();

       $.post('/restaurant/review', {rid: rid, aid: aid, rating: rating, review: review},function (response) {
            if(response.status < 200 || response.status > 400) {
                console.log("Post Error: " + response.status);
                alert(response.error.sqlMessage);
            } else {
                var reviewDiv = $("#reviewcardtemplate").clone();
                $("#reviewformrow").after(reviewDiv);
                reviewDiv.find('#reviewdatetemplate').html("<em>" + (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + " " + "just now" + "</em>");
                reviewDiv.find('#ratingtemplate').html("Rating: " + rating + "/5");
                reviewDiv.find('#reviewtemplate').html("\"" + review + "\"");
                reviewDiv.show();
                $('#reviewformrow').fadeOut();
            }
        });
    });
});