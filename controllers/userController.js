const BaseController = require("./baseController");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController extends BaseController {
  constructor({ users, db }) {
    super(users);
    this.items = db.items;
    this.categories = db.categories;
  }

  userTest(req, res) {
    return res.json({ success: true, msg: "i am in the user controller" });
  }

  getAllUsers = async (req, res) => {
    try {
      const data = await this.model.findAll();
      return res.json({ success: true, data });
    } catch (err) {
      return res.status(400).json({ success: false, msg: err });
    }
  };

  insertUser = async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .json({ success: false, msg: "missing information" });
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      console.log("hashed Password:", hashedPassword);

      const newUser = await this.model.create({
        email,
        password: hashedPassword,
        name,
      });

      const payload = {
        id: newUser.id,
        email: newUser.email,
      };

      const token = jwt.sign(payload, "mySuperDuperSecret", {expiresIn:'1hour'});

      // basic Auth
      // return res.json({ success: true, user: newUser });

      // JWT auth
      return res.json({ success: true, token });
    } catch (err) {
      return res.status(400).json({ success: false, msg: err });
    }
  };

  signin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .json({ success: false, msg: "missing information" });
    }
    try {
      const user = await this.model.findOne({ where: { email } });
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

      const payload = {
        id: user.id,
        email: user.email,
      };

      const token = jwt.sign(payload, "mySuperDuperSecret", {expiresIn:'1hour'});
      // basic Auth
      //return res.json({ success: true, user })

      // JWT auth
      return res.json({ success: true, token });
    } catch (err) {
      return res.status(400).json({ success: false, msg: err });
    }
  };

  getUsersItems = async (req, res) => {
    const { id } = req.params;
    try {
      // Eager Loading (true join statement)
      const data = await this.model.findOne({
        where: { id },
        include: {
          model: this.items,
          include: {
            model: this.categories,
            where: { id: 5 },
          },
        },
      });

      // Lazy Loading (2 seperate statements)
      const data2 = await this.model.findOne({
        where: { id },
      });
      const items = await data2.getItems(); // SELECT FROM items WHERE user_id = {data2.id}

      return res.json({
        success: true,
        eager: data,
        lazyUser: data2,
        lazyItems: items,
      });
    } catch (err) {
      return res.status(400).json({ success: false, msg: err });
    }
  };

  // getAllUsers = async (req, res) => {
  //   console.log("pool inside controller", this.pool);
  //   const data = await this.pool.query("SELECT * FROM students");
  //   return res.json({ success: true, data: data.rows });
  // };

  // getUser = async(req,res)=>{
  //   const {id} = req.body
  //   const data = await this.pool.query(`SELECT first_name FROM students WHERE id = ${id};`)
  //   return res.json({ success: true, data: data.rows });
  // }

  tokenTest = (req,res) =>{
    return res.json({success: true, msg: 'valid token'})
  }
}

module.exports = UserController;

//SELECT * FROM students WHERE id = 1; SELECT * FROM st ;
