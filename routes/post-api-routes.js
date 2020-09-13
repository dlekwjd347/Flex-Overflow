// Requiring our models
var db = require("../models");

module.exports = function(app) {

    // GET route for getting all of the posts
    app.get("/api/userQuestions/", function(req, res) {
        console.log("/api/question call made");
        var query = {};
        if (req.query.user_id) {
          query.UserId = req.query.user_id;
        }
        db.UserQuestions.findAll({
            where: query,
            order: [
				['createdAt', 'DESC'],
				[db.UserAnswers, 'createdAt', 'ASC']	
            ],
            include: [
                db.User, 
                {
                    model: db.UserAnswers,
                    include: [ db.User],
                }
            ]
            }).then(function(dbPost) {
            res.json(dbPost);
        });
    });

    app.get("/api/userQuestions/:id", function(req, res) {
        // GET route for only getting a specific userId's posts.
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
        }).then(function(dbPost) {
            res.json(dbPost);
        });
    });

    app.post("/api/userQuestions/", function(req, res) {
        console.log("/api/questions call made");
        db.UserQuestions.create({
            body: req.body.body,
            postType: req.body.postType,
            UserId: req.body.userId
        }).then(function(dbPost) {
            res.json(dbPost);
        });
    });

    app.post("/api/userAnswer/", function(req, res) {
        console.log("/api/userAnswer call made");
        db.UserAnswer.create({
            where: {
                UserIs: req.params.id
            },
            UserQuestionId: req.body.postId,
            body: req.body.body,
            UserId: req.body.userId
        }).then(function(dbComment) {
            console.log("Comment created!")
            res.json(dbComment);
        });
    });
}