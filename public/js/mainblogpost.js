$(document).ready(function () {
    // Set global variables to store form data
    var postBodyInput = $("#post-body");
    var postTypeInput = "status-update";

    $("#post-submit").on("click", function () {
        event.preventDefault();
        console.log("CLICKed")
        // Wont submit the post if we are missing a body
        if (!postBodyInput.val().trim()) {
            return;
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
        if (!commentBodyInput.val().trim()) {
            return;
        }
        var newComment = {
            answer: commentBodyInput.val().trim(),
            UserQuestionId: postId
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
        $.post("/api/answer/", UserAnswer, function () {
            location.reload();
        });
    }

    $(".comment-delete").on("click", function (UserQuestion) {
        $.post("/api/posts/", UserQuestion, function () {
            var id = $(this).data("id");
            $.ajax({
              method: "DELETE",
              url: "/api/todos/" + id
            }).then(getTodos);
        });


    })
})
var slider = tns({
    container: '.my-slider',
    items: 3,
    slideBy: 'page',
    autoplay: true
  });