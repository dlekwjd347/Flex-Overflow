// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/"); // go back to home 
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
  // GET route for getting all of the posts
  app.get("/api/UserQuesion/", (req, res) => {
    db.UserQuestion.findAll({}).then(dbPost => {
      res.json(dbPost);
    });
  });

  app.get("/api/randomquestion/", (req, res) => {
    db.questionSet
      .findOne({
        order: db.sequelize.random()
      })
      .then(dbquestion => {
        res.json(dbquestion);
      });
  });

  // Get route for returning posts of a specific category
  app.get("/api/posts/category/:category", (req, res) => {
    db.Post.findAll({
      where: {
        category: req.params.category
      }
    }).then(dbPost => {
      res.json(dbPost);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/posts/:id", (req, res) => {
    db.Post.findOne({
      where: {
        id: req.params.id
      }
    }).then(dbPost => {
      res.json(dbPost);
    });
  });

  // POST route for saving a new post
  app.post("/api/posts", (req, res) => {
    console.log(req.body);
    db.AskQuestions.create({   // johnson's pham
      title: req.body.title
    }).then(dbPost => {
      res.json(dbPost);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/posts/:id", (req, res) => {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbPost => {
      res.json(dbPost);
    });
  });

  // PUT route for updating posts
  app.put("/api/posts", (req, res) => {
    db.Post.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(dbPost => {
      res.json(dbPost);
    });
  });
  };
