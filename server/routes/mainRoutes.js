const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

/**
 * App routes
 */
router.get('/', mainController.homepage);
router.get('/drinks/:id', mainController.exploreDrinksDetail);
router.get('/order', mainController.exploreOrder);
router.get('/my-cart', mainController.exploreMyCart);
router.get('/add-to-cart/:id', mainController.addToCart); 

// News
router.get('/detail-news', mainController.getDetailNews);
router.get('/detail-news/:id', mainController.getDetailNewsWithId); 
router.get('/news', mainController.getAllNews);

module.exports = router;
