// Requiring our models
var db = require("../models");

module.exports = function(app) {

    // GET route for getting all of the posts
    app.get("/api/userQuestions/", function(req, res) {
        console.log("/api/question call made");
        var query = {};
        db.UserQuestions.findAll({
            where: query,
            order: [
				['createdAt', 'DESC'],
				[db.UserAnswers, 'createdAt', 'ASC']	
            ],
            // include: [
            //     db.User, 
            //     {
            //         model: db.UserAnswers,
            //         include: [ db.User],
            //     }
            // ]
            }).then(function(dbPost) {
            res.json(dbPost);
        });
    });

    app.get("/api/userQuestions/:id", function(req, res) {
        // GET route for only getting a specific question.
        db.UserQuestions.findOne({
            where: {
            UserIs: req.params.id
            },
            order: [
				['createdAt', 'DESC'],
				[db.UserAnswers, 'createdAt', 'ASC']	
            ],
            include: [
                db.User,
                {
                    model: db.UserAnswers,
                    // order: [
                    //     [model.Comment, 'createdAt', 'DESC']
                    // ],
                    include: [ db.User],
                }
            ]
        }).then(function(dbUserQuestions) {
            res.json(dbUserQuestions);
        });
    });

    app.post("/api/userQuestions/", function(req, res) {
        console.log("/api/questions call made");
        db.UserQuestions.create({
            question: req.body.question,
            
        }).then(function(dbUserQuestions) {
            res.json(dbUserQuestions);
        });
    });

    app.post("/api/userAnswers/", function(req, res) {
        console.log("/api/userAnswers call made");
        db.UserAnswers.create({
            where: {
                UserId: req.params.id
            },
            UserQuestionsId: req.body.postId,
            body: req.body.body,
        }).then(function(dbUserAnswers) {
            console.log("Comment created!")
            res.json(dbUserAnswers);
        });
    });
}