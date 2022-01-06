require('../models/database');
const Category = require('../models/Category');
const Drink = require('../models/Drink');
const Cart = require('../models/Cart'); 
/**
 * GET /
 * Homepage
 */
 exports.homepage = async(req, res) => {
    try {
      
        const coffee = await Drink.find({'category':'Cà phê'}); 
        const fruitTea = await Drink.find({'category':'Trà trái cây'});
        const coffeeBean = await Drink.find({'category':'Cà phê bột'});
        const snacks = await Drink.find({'category':'Snacks'});
        const cake = await Drink.find({'category' : 'Bánh'})
        const drinks = { coffee, fruitTea, coffeeBean, snacks, cake }; 


        let count = await Drink.find().countDocuments();
        let random = Math.floor(Math.random() * count);
        let bestSeller = await Drink.findOne().skip(random).exec();
        
        res.render('homepage', {title: 'Urban Coffee', drinks, bestSeller});
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured" });
    }
}


/**
 * GET /
 * Drink detail with ID 
 */

exports.exploreDrinksDetail = async(req, res) => {
    try {
        let drinkID = req.params.id; 
        const drink = await Drink.findById(drinkID);
        const relatedDrink = await Drink.find({}).limit(4);
        res.render('detail-product', {title : drink.name + " - Urban Café ", drink, relatedDrink}); 
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured" });
    }
}

/**
 * GET /
 * Order page with menu
 */

exports.exploreOrder = async(req, res) => {
    try {
      
        const coffee = await Drink.find({'category':'Cà phê'}); 
        const fruitTea = await Drink.find({'category':'Trà trái cây'});
        const coffeeBean = await Drink.find({'category':'Cà phê bột'});
        const snacks = await Drink.find({'category':'Snacks'});
        const cake = await Drink.find({'category' : 'Bánh'})
        const drinks = { coffee, fruitTea, coffeeBean, snacks, cake };


        let count = await Drink.find().countDocuments();
        let random = Math.floor(Math.random() * count);
        let bestSeller = await Drink.findOne().skip(random).exec();
        
        
        res.render('order', {title: 'Urban Coffee', drinks, bestSeller});
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured" });
    }
}

/**
 * GET /
 * My Cart 
 */
exports.exploreMyCart = async(req, res, next) => {
    if(!req.session.cart){
        res.render('my-cart', {title : 'Giỏ hàng', products: undefined, totalPrice: 0, totalQty: 0}); 
    } else{
        var cart = new Cart(req.session.cart); 
        res.render('my-cart', {title : 'Giỏ hàng', products: cart.generateArray(), totalPrice: cart.totalPrice, totalQty: cart.totalQty }); 
    }
}

/**
 * GET /
 * Add to cart  
 */
exports.addToCart = async(req, res, next) => {
   var drinkId = req.params.id; 
   var cart = new Cart(req.session.cart ? req.session.cart : {});

   Drink.findById(drinkId, function(err, drink){
        if(err){
            return res.redirect('/'); 
        }
        cart.add(drink, drink.id); 
        req.session.cart = cart; 
        req.session.reload(function(err){
        }); 
        res.redirect('/'); 
    }); 
}
exports.deleteCart = async(req, res, next) =>{
    var cart = new Cart(req.session.cart);
    cart.delete(req.body.prodID); 
    req.session.cart = cart; 
    req.session.reload(function(err){

    }); 
    console.log(req.session.cart); 
    res.redirect('/my-cart'); 
}

exports.explorePayment = async(req, res) => {
    if(!req.session.cart){
        res.render('payment', {title : 'Thanh toán đơn hàng - Urban Coffee', products: undefined, totalPrice: 0, totalQty: 0}); 
    } else{
        var cart = new Cart(req.session.cart); 
        res.render('payment', {title: 'Thanh toán đơn hàng - Urban Coffee', products: cart.generateArray(), totalPrice: cart.totalPrice, totalQty: cart.totalQty}); 
    }
}

exports.explorePaymentMethods = async(req, res) => {
    res.render('payment-methods', {title: 'Chọn phương thức thanh toán - Urban Coffee'}); 
}

exports.exploreAboutUs = async(req, res, next) => {
    res.render('about-us', {title: 'About Us - Urban Coffee'});
}
