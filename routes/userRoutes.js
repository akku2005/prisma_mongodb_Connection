const express = require("express");
const router = express.Router();

const { signup, login, logout } = require("../controllers/userControllers");

// Public route for user signup
router.post("/signup", signup);

// Public route for user login
router.post("/login", login);

// Protected route for user logout (requires authentication)
router.get("/logout", (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  logout(req, res, next);
});

module.exports = router;
