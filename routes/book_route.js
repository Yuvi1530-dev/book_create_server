var express = require('express');
var router = express.Router();
var BookController = require('../controllers/book');

router.get('/test', BookController.test);
router.post('/bookList', BookController.bookList);
router.post('/addBook', BookController.addBookDetail);
router.post('/findBook', BookController.bookGet);
router.post('/updateBook', BookController.bookUpdate);
router.post('/bookDelete', BookController.bookDelete);
module.exports = router;