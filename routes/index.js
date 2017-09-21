var express = require('express');
var router = express.Router();
var Product = require('../models/product');

let csrf = require('csurf');

let csrfProtection = csrf();

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function(err, docs) {
    var productChunks = [];
    var chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    res.render('shop/index', { title: 'Shopping Cart', products: productChunks });
  });
});

// Коли йде запит на user/signup генерую сторінку user/signup.hbs
// і передаю токен, що прийшов в запиті
// ? csrf добавляє токен в запит
router.get('user/signup', function(req, res, next) {
  res.render('user/signup', {csrfToken: req.csrfToken()});
  console.log(req);
});

module.exports = router;