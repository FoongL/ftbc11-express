const BaseController = require("./baseController");

class ItemController extends BaseController {
  constructor({items, db}) {
    super(items);
    this.users = db.users;
    this.categories = db.categories;
  }

  itemTest(req, res) {
    return res.json({ success: true, msg: "i am in the item controller" });
  }

  getAllItems = async (req, res) => {
    const data = await this.model.findAll({
      include: {
        model: this.users,
      },
    });

    const data2 = await this.model.findAll();

    const users = await data2.getUser();

    res.json({ success: true, data, data2, users });
  };

  insertItem = async (req, res) => {
    const { name, userId } = req.body;
    if (!name || !userId) {
      return res
        .status(401)
        .json({ success: false, msg: "missing information" });
    }
    try {
      const newItem = await this.model.create({
        name,
        userId,
      });
      return res.json({ success: true, item: newItem });
    } catch (err) {
      return res.status(400).json({ success: false, msg: err });
    }
  };

  addCategory = async (req, res) => {
    const { itemId, categoryId } = req.body;

    const item = await this.model.findOne({ where: { id: itemId } });
    const category = await this.categories.findOne({
      where: { id: categoryId },
    });
    await item.addCategory(category);
    res.json({ item, category });
  };

  getItem = async (req, res) => {
    const { id } = req.params;
    const item = await this.model.findOne({
      where: {
        id,
      },
      include:{
        model: this.categories
      }
    });

    return res.json({success: true, item})
  };
}

module.exports = ItemController;
