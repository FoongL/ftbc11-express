const BaseController = require("./baseController");

class UserController extends BaseController {
  constructor(model, items) {
    super(model);
    this.items = items;
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
      const newUser = await this.model.create({
        email,
        password,
        name,
      });
      return res.json({ success: true, user: newUser });
    } catch (err) {
      return res.status(400).json({ success: false, msg: err });
    }
  };

  getUsersItems = async (req, res) => {
    const { id } = req.params;
    try {
      const data = await this.model.findOne({
        where: { id },
        // include: {
        //   model: this.items,
        // },
      });
      const items = await data.getItems()
      return res.json({ success: true, data, items });

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
}

module.exports = UserController;

//SELECT * FROM students WHERE id = 1; SELECT * FROM st ;
