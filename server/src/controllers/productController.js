import slugify from "slugify";
import db from "../models/index";

const readFunc = async (req, res) => {
  try {
    let data
    if (req.query.page && req.query.limit) {
      let { page, limit } = req.query;
      let offset = (page - 1) * limit;
      let { count, rows } = await db.Product.findAndCountAll({
        offset: offset,
        limit: limit,
        attributes: ["id", "title", "capacity_id", "color_id", "stock", "discount", "price", "desc", "slug", "category_id", "updatedAt", "createdAt"],
        order: [["title", "ASC"]],
      })
      const totalPages = Math.ceil(count / limit);
      data = { totalRows: count, totalPages: totalPages, product: rows, }
    } else {
      data = await db.Product.findAll({ attributes: ["id", "title", "capacity_id", "color_id", "stock", "discount", "price", "desc", "slug", "category_id", "updatedAt", "createdAt"], order: [["title", "ASC"]] })
    }
    return res.status(200).json({ message: "get product success", code: 0, data: data, });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const createFunc = async (req, res) => {
  try {
    const { title, capacity_id, color_id, stock, discount, price, desc, category_id } = req.body.data;

    let combinedString = `${title}-${capacity_id}-${category_id}`;
    let slug = slugify(combinedString, { lower: true, strict: true, replacement: '-' });
    if (!title || !capacity_id || !color_id || !stock || !discount || !price || !category_id) return res.status(200).json({ message: "missing required parameters", code: 1 });
    let data = await db.Product.create({ title: title, capacity_id: capacity_id, color_id: color_id, stock: stock, discount: discount, price: price, desc: desc, category_id: category_id, slug: slug });
    return res.status(200).json({ message: "a product is created successfully", code: 0, data: data });
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const updateFunc = async (req, res) => {
  try {
    const data = req?.body?.data;
    if (!data || !data.id) {
      return res.status(400).json({ message: "Missing required parameters", code: 1 });
    }

    const product = await db.Product.findOne({ where: { id: data.id } });

    if (!product) { return res.status(404).json({ message: "Sub product not exist", code: 1 }); }

    const combinedString = `${data.title}-${data.capacity_id}-${data.category_id}`;
    const slug = slugify(combinedString, { lower: true, strict: true, replacement: '-' });

    const { title, capacity_id, color_id, stock, discount, price, desc, category_id } = data;
    await product.update({ title, capacity_id, color_id, stock, discount, price, desc, category_id, slug });

    return res.status(200).json({ message: "Update product success", code: 0 });

  } catch (error) {
    return res.status(500).json({ message: "Error from server", code: -1 });
  }
};

const deleteFunc = async (req, res) => {
  try {
    let { id } = req.body;
    let product = await db.Product.findOne({ where: { id: id, }, });
    if (product) {
      await product.destroy();
      return res.status(200).json({ message: "delete product success", code: 0 });
    } else {
      return res.status(200).json({ message: "product not exist", code: 1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

module.exports = { readFunc, createFunc, updateFunc, deleteFunc };
