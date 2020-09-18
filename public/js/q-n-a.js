
$(document).ready(function(){

    $("#new-question").on("click", function(){
        $.get("/api/randomquestion").then(function(question){
            $("#question").html(question.question)
            $("#answer").empty()
            $("#example").empty()
        })
    })

    $("#answer-button").on("click", function(){
        $.get("/api/randomquestion").then(function(question){
        console.log(question.answer);
        console.log(question.example);
        $("#answer").html(question.answer)
        $("#example").html(question.example)
        })
    })     
})