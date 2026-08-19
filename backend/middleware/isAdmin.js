import userModel from "../models/userModels.js";

// Must run AFTER authUser (which sets req.user.id from the JWT).
// Allows access only if the authenticated user has role "admin"
// OR their email matches the configured ADMIN_EMAIL.
const isAdmin = async (req, res, next) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const user = await userModel.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const isAdminUser =
      user.role === "admin" ||
      (process.env.ADMIN_EMAIL && user.email === process.env.ADMIN_EMAIL);

    if (!isAdminUser) {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }

    // make the full admin user available to downstream handlers
    req.adminUser = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default isAdmin;
