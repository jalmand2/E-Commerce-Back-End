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

 // Route to find one category by its `id` value with associated products
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

  // Route to create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name
    });
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});
  // Route to update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updateCategoryById = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({updateCategoryById});
  } catch (err) {
    res.status(400).json(err);
  }
});
 // Route to delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  const deletedCategory = await Category.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((deletedCategory) => {
    res.json(deletedCategory);
  })
  .catch((err) => res.json(err));
});

module.exports = router;
