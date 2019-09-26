const ItemModal = require('../models/mongoose/Item');


const getAll = async () => ItemModal.find({})
  .sort({ createdAt: -1 });

const getOne = async itemId => ItemModal.findOne({ _id: itemId });

const create = async (data) => {
  const item = new ItemModal(data);
  return item.save();
};

const update = async (itemId, data) => {
  const item = await getOne(itemId);
  if (!item) {
    throw new Error('Could not find the requested item');
  }
  Object.keys(data)
    .forEach((key) => {
      item[key] = data[key];
    });
  return item.save();
};

const remove = async (query) => {
  const result = await ItemModal.remove(query);
  return result.result.n;
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
