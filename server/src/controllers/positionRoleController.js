import db from "../models/index";

const readFunc = async (req, res) => {
  try {
    let data
    if (req.query.page && req.query.limit) {
      let { page, limit } = req.query;
      page = parseInt(page, 10) || 1;
      limit = parseInt(limit, 10) || 10;
      let offset = (page - 1) * limit;
      let { count, rows } = await db.Position_Role.findAndCountAll({
        offset: offset,
        limit: limit,
        attributes: ["id", "PositionId", "RoleId", "updatedAt", "createdAt"],
        order: [["PositionId", "ASC"]],
      })
      const totalPages = Math.ceil(count / limit);
      data = { totalRows: count, totalPages: totalPages, positionRole: rows, }
    } else {
      data = await db.Position_Role.findAll({ attributes: ["id", "PositionId", "RoleId", "updatedAt", "createdAt"], order: [["PositionId", "ASC"]] })
    }
    return res.status(200).json({ message: "get position role success", code: 0, data: data });
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const createFunc = async (req, res) => {
  try {
    const { PositionId, RoleId } = req.body.data;
    if (!PositionId || !RoleId) return res.status(200).json({ message: "missing required parameters", code: 1 });
    let data = await db.Position_Role.create({ PositionId: PositionId, RoleId: RoleId });
    return res.status(200).json({ message: "a position role is created successfully", code: 0, data: data });
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const updateFunc = async (req, res) => {
  try {
    let data = req?.body?.data
    let positionRole = await db.Position_Role.findOne({ where: { id: data?.id, }, });
    if (positionRole) {
      await positionRole.update({ PositionId: data.PositionId, RoleId: data.RoleId });
      return res.status(200).json({ message: "update position success", code: 0 });
    } else {
      return res.status(200).json({ message: "position role not exist", code: 1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const deleteFunc = async (req, res) => {
  try {
    let { id } = req.body;
    let positionRole = await db.Position_Role.findOne({ where: { id: id, }, });
    if (positionRole) {
      await positionRole.destroy();
      return res.status(200).json({ message: "delete position role success", code: 0 });
    } else {
      return res.status(200).json({ message: "position role not exist", code: 1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

module.exports = { readFunc, createFunc, updateFunc, deleteFunc };
