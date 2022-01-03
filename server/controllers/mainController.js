require('../models/database');
const Category = require('../models/Category');
const Drink = require('../models/Drink');
const Cart = require('../models/Cart'); 
const News = require('../models/News')
/**
 * GET /
 * Homepage
 */
 exports.homepage = async(req, res) => {
    try {
      
        const coffee = await Drink.find({'category':'Cà phê'}); 
        const fruitTea = await Drink.find({'category':'Trà trái cây'});
        const coffeeBean = await Drink.find({'category':'Cà phê bột'});
        const cakeAndSnack = await Drink.find({'category':'Bánh-Snacks'});
        const drinks = { coffee, fruitTea, coffeeBean, cakeAndSnack }; 

        const newsArticles = await News.find({});
        let count = await Drink.find().countDocuments();
        let random = Math.floor(Math.random() * count);
        let bestSeller = await Drink.findOne().skip(random).exec();
        
        res.render('homepage', {title: 'Urban Coffee', drinks, bestSeller, newsArticles});
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
        const cakeAndSnack = await Drink.find({'category':'Bánh-Snacks'});
        const drinks = { coffee, fruitTea, coffeeBean, cakeAndSnack }; 


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
exports.exploreMyCart = async(req, res) => {
    try {
        res.render('my-cart', {title : 'Giỏ hàng'}); 
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured" });
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
      console.log(req.session.cart);
    })
}

/**
 * GET /
 * News detail
 */
 exports.getDetailNews = async(req, res) => {
    try {
      
        // const coffee = await Drink.find({'category':'Cà phê'}); 
        // const fruitTea = await Drink.find({'category':'Trà trái cây'});
        // const coffeeBean = await Drink.find({'category':'Cà phê bột'});
        // const cakeAndSnack = await Drink.find({'category':'Bánh-Snacks'});
        // const drinks = { coffee, fruitTea, coffeeBean, cakeAndSnack }; 

        // const newsArticles = await News.find({});
        // let count = await Drink.find().countDocuments();
        // let random = Math.floor(Math.random() * count);
        // let bestSeller = await Drink.findOne().skip(random).exec();
        
        res.render('detail-news', {});
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured" });
    }
}