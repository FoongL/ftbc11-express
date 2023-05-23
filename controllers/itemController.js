const BaseController = require("./baseController");

class ItemController extends BaseController {
  constructor(model) {
    super(model);
  }

  itemTest(req, res) {
    return res.json({ success: true, msg: "i am in the item controller" });
  }

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
}

module.exports = ItemController;
