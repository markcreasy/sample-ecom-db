const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({include:Product})
    .then((categoryData) => {
      res.status(200).json(categoryData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {id: req.params.id},
    include: Product
  })
  .then((categoryData) => {
    if(!categoryData){
      res.status(404).json({message:"no category for id provided"});
    }else{
      res.status(200).json(categoryData);
    }
  })
  .catch((err) => {
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then((categoryData) => {
    res.status(200).json(categoryData);
  })
  .catch((err) => {
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {id:req.params.id},
    }
  )
  .then((categoryData) => {
    if(!categoryData){
      res.status(404).json({message:"no category for id provided"});
    }else{
      res.status(200).json({message:"category updated"});
    }
  })
  .catch((err) => {
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({where:{id:req.params.id}})
    .then((success) => {
      if(!success){
        res.status(404).json({message:"no category for given id"});
      }else{
        res.status(200).json({message:"category deleted"});
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    })
});

module.exports = router;
