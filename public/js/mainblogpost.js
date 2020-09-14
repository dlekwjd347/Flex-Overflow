$(document).ready(function () {
    // Set global variables to store form data
    var postBodyInput = $("#post-body");
    var postTypeInput = "status-update";



    $("#post-submit").on("click", function () {
     event.preventDefault();
     console.log("CLICKed")
        // Wont submit the post if we are missing a body
        if (!postBodyInput.val().trim()) {
            return ;
        }



    var newPost = {
        question: postBodyInput.val().trim(),
    }

    console.log(newPost);
    submitPost(newPost);
});

$("#post-body").keydown(function (e) {
    if (e.keyCode == 13) {
      //  $("#post-submit").click();
    }
});

$(".comment-submit").on("click", function () {
    event.preventDefault();
    // Wont submit the comment if we are missing a body
    var postId = $(this).attr('id');
    var commentBodyInput = $("#post-" + postId);
    // var commentPostId = $("#post-" + postId).data('postid');
    if (!commentBodyInput.val().trim()) {
        return;
    }
    var newComment = {
        body: commentBodyInput.val().trim(),
        postId: postId
      
    }
    console.log(newComment);
    submitComment(newComment);
});
$(".comment-body").keydown(function (e) {
    if (e.keyCode == 13) {
        $(".comment-submit").click();
    }
});
function submitPost(UserQuestion) {
    $.post("/api/posts/", UserQuestion, function () {
        location.reload();
    });
}
function submitComment(UserAnswer) {
    $.post("/api/comment/", UserAnswer, function () {
        location.reload();
    });
}

})