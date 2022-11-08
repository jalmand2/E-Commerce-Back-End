const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


// Route to get all tags with its associated product data 
router.get('/', async (req, res) => {
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to find a single tag by its 'id' with its associated product data 
router.get('/:id', async (req, res) => {
  try {
    const tagById = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tagById);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // Route to create a new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name
    });
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

  // Route to update a tag's name by its 'id' value
router.put('/:id', async (req, res) => {
  try {
    const updateTagById = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({updateTagById});
  } catch (err) {
    res.status(400).json(err);
  }
});
// Route to delete a tag by its 'id' value
router.delete('/:id', async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(deletedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
