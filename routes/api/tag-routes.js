const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({ include: Product })
    .then((tagData) => {
      res.status(200).json(tagData);
    }).catch((err) => {
      res.status(500).json(err);
    })
});

// the `/api/tags/1` endpoint
router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne(
    {
      where: {
        id: req.params.id
      },
      include: Product
    }
  )
  .then((tagData) => {
    if(!tagData){
      res.status(404).json({message:'No tags found with this id'});
      return;
    }else{
      res.status(200).json(tagData);
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  })
});

// POST: /api/tags
router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then(tagData => res.json(tagData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(tagData => {
    if (!tagData[0]) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }else{
      res.json(tagData);
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({ where: {
    id: req.params.id
  }})
  .then((tagData) => {
    console.log(tagData);
    if(!tagData){
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }else{
      res.json(tagData);
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
