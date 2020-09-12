$(document).ready(function(){
    var currentQuestion 
    $("#new-question").on("click", function(){
        $.get("/api/randomquestion").then(function(question){
            currentQuestion = question
            $("#question").html(question.question)
            $("#answer").empty()
        })
    })

    $("#answer-button").on("click", function(){
        console.log(currentQuestion.answer);
        console.log(currentQuestion.example);
        $("#answer").html(currentQuestion.answer)
        $("#example").html(currentQuestion.example)
    })

    
       
})