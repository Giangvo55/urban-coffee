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
        const snacks = await Drink.find({'category':'Snacks'});
        const cake = await Drink.find({'category' : 'Bánh'})
        const drinks = { coffee, fruitTea, coffeeBean, snacks, cake }; 

        const newsLimit = 6
        const newsArticles = await News.find({}).sort({_id: -1}).limit(newsLimit);
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
        res.render('my-cart', {title : 'Giỏ hàng', products : null}); 
    }
    var cart = new Cart(req.session.cart); 
    res.render('my-cart', {title : 'Giỏ hàng', products: cart.generateArray(), totalPrice: cart.totalPrice }); 
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
 * All news
 */
 exports.getAllNews = async(req, res) => {
    try {
        const newsArticles = await News.find({}).sort({_id: -1});

        res.render('news', {newsArticles});
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured" });
    }
}

/**
 * GET /
 * News detail
 */
 exports.getDetailNews = async(req, res) => {
    try {
        
        res.render('detail-news', {});
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured" });
    }
}

/**
 * GET /
 * A news article with Id
 */
 exports.getDetailNewsWithId = async(req, res) => {
    try {
        let newsId = req.params.id; 
        const newsArticle = await News.findById(newsId);

        // res.render('order', {title: 'Urban Coffee', drinks, bestSeller});
        res.render('detail-news', {newsArticle});
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured" });
    }
}
