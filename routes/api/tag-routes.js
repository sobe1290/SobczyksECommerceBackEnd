const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const TagData = await Tag.findAll({
      attributes: ['id', 'tag_name'],
      include: {
        model: Product,
        attributes: ['product_name', 'price', 'stock']
    },
    });
    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find all tags
  // be sure to include its associated Product data

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
