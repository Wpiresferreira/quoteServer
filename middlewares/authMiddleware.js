import dotenv from 'dotenv' // To protect your sensible data

// Middleware to verify if a user is authenticated
export function authenticateToken(req, res, next) {
  const token = req.query.token;


  // If no token is provided, return unauthorized error
  if (!token) {
    console.log("No token received");
    return res.status(300).json({ message: "No user logged" });
  }

  // Verify the token using the secret key
    if (token !=process.env.SECRET) return res.status(500).json({ error: "Invalid token" }); // If invalid, send error
    console.log("User Authenticated");
    next(); // Move to the next middleware or route handler
}