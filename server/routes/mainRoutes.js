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
router.get('/payment/methods/:amount', mainController.explorePaymentMethods); 
router.get('/order-tracking', mainController.exploreOrderTracking); 
// News
router.get('/detail-news', mainController.getDetailNews);
router.get('/detail-news/:id', mainController.getDetailNewsWithId); 
router.get('/news', mainController.getAllNews);
router.get('/detail-order-tracking', mainController.exploreDetailOrder); 
router.get('/admin', mainController.admin);

router.get('/my-profile', mainController.exploreMyProfile); 
router.get('/sign-in', mainController.signIn); 
module.exports = router;
