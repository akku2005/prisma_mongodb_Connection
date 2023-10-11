const prisma = require("../prisma/index");
const cookieToken = require("../utils/cookieToken");
const bcrypt = require("bcrypt");

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

    if (!name || !email || !password || !phoneNumber) {
      return res.status(400).json({ error: "Please provide all details" });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name:name,
        email:email,
        password:hashedPassword,
        phoneNumber:phoneNumber,
      },
    });

    // Send user token
    cookieToken(user, res);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password, phoneNumber } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please provide email and password" });
    }

    // Find a user based on email and phoneNumber
    const user = await prisma.user.findUnique({
      where: {
        OR: [
          {
            email,
          },
          {
            phoneNumber, // Include phoneNumber in the search
          },
        ],
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the hashed password using bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // User is authenticated, send token
    cookieToken(user, res);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Logout user
exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
