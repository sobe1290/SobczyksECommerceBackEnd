const router = require('express').Router()
const sequelize = require('sequelize')
const { Category, Product } = require('../../models')

router.get('/', async (req, res) => {
  try {
    const CategoryData = await Category.findAll({
      attributes: ['id', 'category_name'],
      include: {
        model: Product,
        attributes: ['product_name']
      }
    })
    res.status(200).json(CategoryData)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const CategoryByOneData = await Category.findByPk(req.params.id, {
      include: {
        model: Product,
        attributes: ['product_name']
      }
    })

    if (!CategoryByOneData) {
      res.status(404).json({ message: 'No Category by that id number' })
      return
    }

    res.status(200).json(CategoryByOneData)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', async (req, res) => {
  try {
    const createdACategory = await Category.create({
      category_name: req.body.category_name
    })
    res.status(200).json(createdACategory)
  } catch (err) {
    res.status(400).json(err)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update(
      { category_name: req.body.category_name },
      { where: { id: req.params.id } }
    )
    res.status(200).send(updateCategory)
  } catch (err) {
    res.status(400).json(err)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const deleteCategory = await Category.destroy(
      { where: { id: req.params.id } }
    )
    if (!deleteCategory) {
      res.status(404).json({ message: 'No category with this id!' })
      return
    }
    res.status(200).json(deleteCategory)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
