const router = require('express').Router()
const { Tag, Product, ProductTag } = require('../../models')

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const TagData = await Tag.findAll({
      attributes: ['id', 'tag_name'],
      include: {
        model: Product,
        attributes: ['product_name', 'price', 'stock']
      }
    })
    res.status(200).json(TagData)
  } catch (err) {
    res.status(500).json(err)
  }
})

// find all tags
// be sure to include its associated Product data

router.get('/:id', async (req, res) => {
  try {
    const TagByOneData = await Tag.findByPk(req.params.id, {
      include: {
        model: Product,
        attributes: ['product_name', 'price', 'stock']
      }
    })

    if (!TagByOneData) {
      res.status(404).json({ message: 'No Tag by that id number' })
      return
    }

    res.status(200).json(TagByOneData)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const createdATag = await Tag.create({
      tag_name: req.body.tag_name
    })
    res.status(200).json(createdATag)
  } catch (err) {
    res.status(400).json(err)
  }
})

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(
      { tag_name: req.body.tag_name },
      { where: { id: req.params.id } }
    )
    res.status(200).send(updateTag)
  } catch (err) {
    res.status(400).json(err)
  }
})

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy(
      { where: { id: req.params.id } }
    )
    if (!deleteTag) {
      res.status(404).json({ message: 'No tag with this id!' })
      return
    }
    res.status(200).json(deleteTag)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
