import jwt from "jsonwebtoken";

// Like authUser, but never blocks the request.
// If a valid Bearer token is present the user is attached to req.user so the
// record can be linked to their account; otherwise the request continues as a
// guest. Used by public endpoints (e.g. consultation booking) that must work
// without login but should still credit a logged-in user when possible.
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { id: decoded.id };
    }
  } catch (error) {
    // Bad/expired token on a public route is not fatal — treat as a guest.
    console.log("optionalAuth: ignoring invalid token —", error.message);
  }

  next();
};

export default optionalAuth;
