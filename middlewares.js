const middleConsoleLogger = (req, res, next) => {
  console.log("I am the middleware");
  const { name, company } = req.body;
  if (!name || !company) {
    console.log('i am triggered in the middleware')
    return res
      .status(400)
      .json({ success: false, msg: "you are missing some info, you moron!" });
  }
  next();
};

module.exports = { middleConsoleLogger };
