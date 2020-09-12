// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");

//var router = require("express").Router();

// Adding a little piece of middleware to check if a user is logged in
var authCheck = function(req, res, next) {
	if (!req.user) {
		res.redirect('/landing');
	}
	else {
		next();
	}
}


// Routes
// =============================================================
module.exports = function(app) {
	app.get("/", function(req, res) {
	    res.render("landing");
	});

	app.get("/questions", function(req, res) {
	    res.sendFile(path.join(__dirname, "../public/q-n-a.html"));
	});

	app.get("/aboutus", function(req, res) {
	    res.sendFile(path.join(__dirname, "../public/aboutus.html"));
	});

	app.get("/main", function(req, res) {
		console.log("Before the get attempt");
		var query = {};
		db.Post.findAll({
			where: query,
			include: [
                db.User, 
                {
                    model: db.Comment,
					include: [ db.User],
                }
			],
			order: [
				['createdAt', 'DESC'],
				[db.Comment, 'createdAt', 'ASC']	
            ]
			}).then(posts => {
			var hbsObject = {
				hbPosts: posts,
				user: req.user
			}
			res.render("main", hbsObject);		
		});
	});

	app.get("/landing/:id", function(req, res) {
		console.log("Before the get attempt");
		// console.log(req.user);
		var query = {};
        // if (req.query.user_id) {
        //   query.UserId = req.query.user_id;
        // }
		db.Post.findAll({
			where: {
				id: req.params.id
			},
			order: [
				['createdAt', 'DESC'],
				[db.Comment, 'createdAt', 'ASC']	
            ],
			include: [
                db.User, 
                {
					model: db.Comment,
					include: [ db.User]
                }
			]
			}).then(posts => {
			var hbsObject = {
				hbPosts: posts,
				user: req.user
			}

			res.render("landing", hbsObject);		
		});
	});

	
};











