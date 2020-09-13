// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
// =============================================================

module.exports = function(app) {
	app.get("/", function(req, res) {
	    res.render("landing", {layout: "landing"});
	});

	app.get("/questions", function(req, res) {
	    res.sendFile(path.join(__dirname, "../public/q-n-a.html"));
	});

	app.get("/aboutus", function(req, res) {
	    res.sendFile(path.join(__dirname, "../public/aboutus.html"));
	});

	app.get("/index", function(req, res) {
		console.log("Before the get attempt");
		var query = {};
		db.UserQuestion.findAll({
			where: query,
			include: [
                db.User, 
                {
                    model: db.UserAnswer,
					include: [ db.User],
                }
			],
			order: [
				['createdAt', 'DESC'],
				[db.UserAnswer, 'createdAt', 'ASC']	
            ]
			}).then(posts => {
			var indexObject = {
				indexPosts: posts,
				user: req.user
			}
			res.render("index", indexObject);		
		});
	});

	app.get("/landing/:id", function(req, res) {
		console.log("Before the get attempt");
		// console.log(req.user);
		var query = {};
		db.UserQuestion.findAll({
			where: { 
				id: req.params.id
			},
			order: [
				['createdAt', 'DESC'],
				[db.UserAnswer, 'createdAt', 'ASC']	
            ],
			include: [
                db.User, 
                {
					model: db.UserAnswer,
					include: [ db.User]
                }
			]
			}).then(posts => {
			var indexObject = {
				indexPosts: posts,
				user: req.user
			}

			res.render("landing", indexObject);	
		});
	});

//johnson's


	app.get("/", (req, res) => {
		// If the user already has an account send them to the main blog page
		if (req.user) {
		  res.redirect("/index");
		}
		res.sendFile(path.join(__dirname, "landing.html"));
	  });
	
	  app.get("/login", (req, res) => {
		// If the user already has an account send them to the main blog page
		if (req.user) {
		  res.redirect("/index");
		}
		res.sendFile(path.join(__dirname, "signup.html"));
	  });


 // This is to keep track of the user's current log in status and authenticate 
	app.get("/mainblog", isAuthenticated, (req, res) => {
	  const handlebarsObject = {
		userName: "Charlie",
	  };
	  console.log("in route get / ");
	  res.render("index", handlebarsObject);
	});
  }; 



	











