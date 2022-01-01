require('../models/database');
const Category = require('../models/Category');
const Drink = require('../models/Drink');
 
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
