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

module.exports = function (app) {
	app.get("/", function (req, res) {
		res.render("landing", { layout: "landing" });
	});

	app.get("/questions", function (req, res) {
		res.sendFile(path.join(__dirname, "../public/q-n-a.html"));
	});

	app.get("/aboutus", function (req, res) {
		res.sendFile(path.join(__dirname, "../public/aboutus.html"));
	});

	app.get("/index", function (req, res) {
		console.log("Before the get attempt");
		db.UserQuestion.findAll({
			include: [
				db.User, 
				db.UserAnswer,
				{
					model: db.UserAnswer,
					include: [db.User],
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
			console.log('does it work', indexObject);
			res.render("index", indexObject);

		});
	});

	app.get("/landing/:id", function (req, res) {
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
					include: [db.User]
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
	app.get("/assets/images/wireframe1-1.JPG", function (req, res) {
		res.writeHead(200, { 'Content-Type': 'image/jpeg' });
		res.end("wireframe1-1.JPG");
	});
	app.get("/assets/images/wireframe1.JPG", function (req, res) {
		res.writeHead(200, { 'Content-Type': 'image/jpeg' });
		res.end("wireframe1.JPG");
	});
	app.get("/assets/images/wireframe2-2.JPG", function (req, res) {
		res.writeHead(200, { 'Content-Type': 'image/jpeg' });
		res.end("wireframe2-2.JPG");
	});
	app.get("/assets/images/wireframe2.JPG", function (req, res) {
		res.writeHead(200, { 'Content-Type': 'image/jpeg' });
		res.end("wireframe2.JPG");
	});
	app.get("/assets/images/wireframe3-3.JPG", function (req, res) {
		res.writeHead(200, { 'Content-Type': 'image/jpeg' });
		res.end("wireframe1-3.JPG");
	});
	app.get("/assets/images/wireframe3.JPG", function (req, res) {
		res.writeHead(200, { 'Content-Type': 'image/jpeg' });
		res.end("wireframe3.JPG");
	});


	// This is to keep track of the user's current log in status and authenticate 
	app.get("/mainblog", isAuthenticated, (req, res) => {
		console.log("Before the get attempt");
		db.UserQuestion.findAll({
			include: [
				db.User,
				db.UserAnswer,
			],
			order: [
				['createdAt', 'DESC'],
				// [db.UserAnswer, 'createdAt', 'ASC']
			]
		}).then(posts => {
			var indexObject = {
				QuestionsArr: posts,
				user: req.user
			}
			console.log('does it work', indexObject);
			res.render("index", indexObject);
		});
		// const handlebarsObject = {
		// 	userName: "Charlie",
		// };
		// console.log("in route get / ");
		// db.UserQuestion.findAll({
		// }).then(function (dbPost) {
		// 	//res.json(dbPost);
		// 	 console.log(dbPost)
		// 	var qArray= []
		// 	for (var i=0; i< dbPost.length;i++){
		// 		qArray.push({
		// 		id: dbPost[i].id,
		// 		title:  dbPost[i].title,
		// 		question:  dbPost[i].question,
		// 		createdAt:  dbPost[i].createdAt,
		// 		updatedAt:  dbPost[i].updatedAt
		// 		})
		// 	}
		// 	const handlebarsObject = {
		// 		questions: qArray
		// 	};
		// 	console.log(handlebarsObject)
		// 	// get the info from the db and pass the question in the object
		// 	res.render("index", handlebarsObject);
		// })
	})
}















