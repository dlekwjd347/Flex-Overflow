// Requiring our models
var db = require("../models");

module.exports = function(app) {

    // GET route for getting all of the posts
    app.get("/api/posts/", function(req, res) {
        console.log("/api/posts call made");
        var query = {};
        if (req.query.user_id) {
          query.UserId = req.query.user_id;
        }
        db.Post.findAll({
            where: query,
            order: [
				['createdAt', 'DESC'],
				[db.Comment, 'createdAt', 'ASC']	
            ],
            include: [
                db.User, 
                {
                    model: db.Comment,
                    include: [ db.User],
                }
            ]
            }).then(function(dbPost) {
            res.json(dbPost);
        });
    });

    app.get("/api/posts/:id", function(req, res) {
        // GET route for only getting a specific userId's posts.
        db.Post.findOne({
            where: {
            UserIs: req.params.id
            },
            order: [
				['createdAt', 'DESC'],
				[db.Comment, 'createdAt', 'ASC']	
            ],
            include: [
                db.User,
                {
                    model: db.Comment,
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

    app.post("/api/posts/", function(req, res) {
        console.log("/api/posts call made");
        db.Post.create({
            body: req.body.body,
            postType: req.body.postType,
            UserId: req.body.userId
        }).then(function(dbPost) {
            res.json(dbPost);
        });
    });

    app.post("/api/comment/", function(req, res) {
        console.log("/api/comment call made");
        db.Comment.create({
            where: {
                UserIs: req.params.id
            },
            PostId: req.body.postId,
            body: req.body.body,
            UserId: req.body.userId
        }).then(function(dbComment) {
            console.log("Comment created!")
            res.json(dbComment);
        });
    });
}
