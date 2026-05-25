import mysqlpool from "../config/db.js";

export const adminMiddleware = async (req, res, next) => {
  try {

    const [user] = await mysqlpool.query(
      "SELECT usertype FROM users WHERE id = ?",
      [req.user.id]
    );

    if (user.length === 0) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    if (user[0].usertype !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Only admin can access",
      });
    }

    next();

  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "UN-Authorized ACCESS",
      error,
    });
  }
};