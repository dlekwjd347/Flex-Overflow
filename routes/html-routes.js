// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the blog-post page
    if (req.user) {
      res.redirect("/blog-post");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the blog-post page
    if (req.user) {
      res.redirect("/blog-post");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/blog-post", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/blog-post.html"));
  });

  app.get("/q&a", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/q&a.html"));
  });

  // blog route loads blog.html
  app.get("/blog-post", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/blog-post.html"));
  });

   // blog route loads blog.html
   app.get("/aboutus", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/aboutus.html"));
  });


};
