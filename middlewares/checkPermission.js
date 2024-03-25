const { TOKEN_SECRET } = process.env;

export const checkPermission = async (req, res, next) => {
  try {
    /**
     * B1: Lấy thông tin user từ req.user và kiểm tra xem có token hay không?
     * B2: Verify token và find user từ database
     * B3: Kiểm tra xem user có quyền admin hay không?
     * B4: Nếu có thì next(), không thì trả về lỗi 403
     */
    // B1: Lấy thông tin user từ req.user và kiểm tra xem có token hay không?
    const authorization = req.headers?.authorization;
    if (!authorization) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }
    // B2: Verify token và find user từ database
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, TOKEN_SECRET);
    if (!decoded) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    // B3: Kiểm tra xem user có quyền admin hay không?
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    // B4: Nếu có thì next(), không thì trả về lỗi 403
    next();
  } catch (error) {
    next(error);
  }
};