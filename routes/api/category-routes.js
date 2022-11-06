const router = require('express').Router();
const sequelize = require('sequelize');
const { Category, Product } = require('../../models');


// Route to get all categories with its associated products
router.get('/', async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product }],
      
    });
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

 // find one category by its `id` value
  // be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const categoryById = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(categoryById);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name
    });
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
