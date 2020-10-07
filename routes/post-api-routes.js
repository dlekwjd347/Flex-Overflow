// Requiring our models
// API Routes to only post questions 
var db = require("../models");

module.exports = function(app) {

    // GET route for getting all of the questions
    app.get("/api/posts/", function(req, res) {
        console.log("/api/posts call made");
        var query = {};
        db.UserQuestion.findAll({
            where: query,
            order: [
				['createdAt', 'DESC'],
				[db.UserAnswer, 'createdAt', 'ASC']	
            ],
            include: [
                db.UserQuestion, 
                {
                    model: db.UserAnswer
                }
            ]
            }).then(function(dbPost) {
            res.json(dbPost);
        });
    });

    app.get("/api/posts/:id", function(req, res) {
        // GET route for only getting a specific userId's posts.
        db.UserQuestion.findOne({
            order: [
				['createdAt', 'DESC'],
				[db.UserAnswer, 'createdAt', 'ASC']	
            ],
            include: [
                db.UserQuestion,
                {
                    model: db.UserAnswer,
                    // order: [
                    //     [model.Comment, 'createdAt', 'DESC']
                    // ],
                    include: [ db.UserQuestion],
                }
            ]
        }).then(function(dbPost) {
            res.json(dbPost);
        });
    });

    app.post("/api/posts/", function(req, res) {
        console.log("/api/posts call made:", req.body);
        if (req.user){db.UserQuestion.create({
            question: req.body.question,
            UserId: req.user.id
        }).then(function(dbPost) {
            res.json(dbPost);
        });
    }
    });

    // app.delete("/api/posts/:id", function(req, res) {
    //     db.UserQuestion.destroy({
    //       where: {
    //         id: req.params.id,
    //       }
    //     }).then( dbPost => {
    //       res.json(dbPost);
    //     });
    //   });

app.post("/api/answer/", function(req, res) {
    db.UserAnswer.create(req.body).then(function(dbAnswer) {
      res.json(dbAnswer);
    });
  });


};
