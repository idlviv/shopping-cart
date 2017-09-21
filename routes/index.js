let express = require('express');
let router = express.Router();
let Product = require('../models/product');

let csrf = require('csurf');

let csrfProtection = csrf();
router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('get - /', req.csrfToken());
  Product.find(function(err, docs) {
    let productChunks = [];
    let chunkSize = 3;
    for (let i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    res.render('shop/index', {title: 'Shopping Cart', products: productChunks});
  });
});

// Коли йде запит на user/signup генерую сторінку user/signup.hbs
// сервер передає токен (req.csrfToken()) в запиті
// коли форма відправляється, сервер звіряє надісланий токен req.csrfToken()
// з отриманим в прихованому полі форми
// якщо співпадає то пускає
// !!використовувати в формі тільки GET і POST
router.get('/user/signup', function(req, res, next) {
  console.log('get - /user/signup', req.csrfToken());

  res.render('user/signup', {csrfToken: req.csrfToken()});
});

router.post('/user/signup', function(req, res, next) {
  res.redirect('/');
});

module.exports = router;