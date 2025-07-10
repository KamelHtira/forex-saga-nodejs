const jwt = require("jsonwebtoken");
const authService = require("../services/authService");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }
  try {

    const user = await authService.findUserByUsername(username);

    if (!user || !(await authService.validatePassword(user, password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
