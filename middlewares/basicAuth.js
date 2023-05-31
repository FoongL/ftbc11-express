const bcrypt = require('bcrypt')

const basicAuth = (users) => async (req, res, next) => {
  console.log(req.headers)
  // console.log(JSON.parse(req.headers.authorization))
  const authData = req.headers.authorization.split(" ")[1];
  const [email, password] = Buffer.from(authData, "base64")
    .toString()
    .split(":");
  const user = await users.findOne({ where: { email } });
  if (!user) {
    return res
      .status(403)
      .json({ success: false, msg: "user does not exist!" });
  }
  const compare = await bcrypt.compare(password, user.password);
  if (!compare) {
    return res
      .status(403)
      .json({ success: false, msg: "Password does not match!" });
  }
  console.log('this user may proceed')
  next();
};

module.exports = basicAuth;
