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
router.post('/delete-cart', mainController.deleteCart); 
router.get('/about-us', mainController.exploreAboutUs); 
router.get('/payment', mainController.explorePayment); 
router.get('/payment/methods', mainController.explorePaymentMethods); 
module.exports = router;
