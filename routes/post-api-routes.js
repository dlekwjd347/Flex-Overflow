// Requiring our models
// API Routes to only post questions 
var db = require("../models");

module.exports = function(app) {

    // GET route for getting all of the posts
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
        db.UserQuestion.create({
            title: req.body.title,
            question: req.body.title
        }).then(function(dbPost) {
            res.json(dbPost);
        });
    });

    app.post("/api/answer/", function(req, res) {
        console.log("/api/answer call made");
        var query = connection.query("Select id FROM fof_db.UserQuestion;", function(err, results) {
            if (err) throw err;
        db.UserAnswer.create({
            where: {
                UserId: req.params.id
            },
            questionId: req.body.query,
            body: req.body.body,
            UserId: req.body.userId
        }).then(function(results) {
            console.log("Answer added!")
            res.json(results);
        });
    })
});

app.post("/api/answer/", function(req, res) {
    db.UserAnswer.create(req.body).then(function(dbAnswer) {
      res.json(dbAnswer);
    });
  });


};
