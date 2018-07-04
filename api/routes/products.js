const express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Product = require('../models/products');

router.get('/', (req, res, next) => {
  Product.find()
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(e => res.status(200).json(e));
});

router.post('/', (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  product.save().then((result) => {
    res.status(201).json({
      message: 'created new product',
      createdProduct: result
    });
  }).catch((e) => res.status(500).json({
    error: e
  }));
});

router.get('/:productID', (req, res, next) => {
  const id = req.params.productID;
  Product.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: 'no valid entry found!!' });
      }
    })
    .catch((e) => res.status(500).json(e));
});

router.patch('/:productID', (req, res, next) => {
  const id = req.params.productID;
  // Product.
  res.status(200).json({
    message: 'updated product!!'
  });
});


router.delete('/:productID', (req, res, next) => {
  const id = req.params.productID;
  Product.findOneAndRemove({_id: id})
    .exec()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({
      error: err
    }));
});

module.exports = router;