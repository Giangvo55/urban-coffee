require('../models/database');
const Category = require('../models/Category');
const Drink = require('../models/Drink');
const Cart = require('../models/Cart');
const News = require('../models/News')
/**
 * GET /
 * Homepage
 */
exports.homepage = async (req, res) => {
    try {

        const coffee = await Drink.find({ 'category': 'Cà phê' });
        const fruitTea = await Drink.find({ 'category': 'Trà trái cây' });
        const coffeeBean = await Drink.find({ 'category': 'Cà phê bột' });
        const cake = await Drink.find({ 'category': 'Bánh' });
        const snacks = await Drink.find({ 'category': 'Snacks' });
        const drinks = { coffee, fruitTea, coffeeBean, cake, snacks };

        const newsLimit = 6
        const newsArticles = await News.find({}).sort({ _id: -1 }).limit(newsLimit);
        let count = await Drink.find().countDocuments();
        let random = Math.floor(Math.random() * count);
        let bestSeller = await Drink.findOne().skip(random).exec();

        res.render('homepage', { title: 'Urban Café', drinks, bestSeller, newsArticles });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}


/**
 * GET /
 * Drink detail with ID 
 */

exports.exploreDrinksDetail = async (req, res) => {
    try {
        let drinkID = req.params.id;
        const drink = await Drink.findById(drinkID);
        const relatedDrink = await Drink.find({}).limit(4);
        res.render('detail-product', { title: drink.name + " - Urban Café ", drink, relatedDrink });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}

/**
 * GET /
 * Order page with menu
 */

exports.exploreOrder = async (req, res) => {
    try {

        const coffee = await Drink.find({ 'category': 'Cà phê' });
        const fruitTea = await Drink.find({ 'category': 'Trà trái cây' });
        const coffeeBean = await Drink.find({ 'category': 'Cà phê bột' });
        const cake = await Drink.find({ 'category': 'Bánh' });
        const snacks = await Drink.find({ 'category': 'Snacks' });
        const drinks = { coffee, fruitTea, coffeeBean, cake, snacks };


        let count = await Drink.find().countDocuments();
        let random = Math.floor(Math.random() * count);
        let bestSeller = await Drink.findOne().skip(random).exec();


        res.render('order', { title: 'Đặt hàng - Urban Café', drinks, bestSeller });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}

/**
 * GET /
 * My Cart 
 */
exports.exploreMyCart = async (req, res, next) => {
    if (!req.session.cart) {
        res.render('my-cart', { title: 'Giỏ hàng', products: undefined, totalPrice: 0, totalQty: 0 });
    } else {
        var cart = new Cart(req.session.cart);
        res.render('my-cart', { title: 'Giỏ hàng', products: cart.generateArray(), totalPrice: cart.totalPrice, totalQty: cart.totalQty });
    }
}

/**
 * GET /
 * Add to cart  
 */
exports.addToCart = async (req, res, next) => {
    var drinkId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Drink.findById(drinkId, function (err, drink) {
        if (err) {
            return res.redirect('/');
        }
        cart.add(drink, drink.id);
        req.session.cart = cart;
        req.session.reload(function (err) {
        });
        res.redirect(req.get('referer'));

    });
}
exports.deleteCart = async (req, res, next) => {
    var cart = new Cart(req.session.cart);
    cart.delete(req.body.prodID);
    req.session.cart = cart;
    req.session.reload(function (err) {

    });
    console.log(req.session.cart);
    res.redirect('/my-cart');
}

/**
 * GET /
 * Explore Payment page  
 */

exports.explorePayment = async (req, res) => {
    if (!req.session.cart) {
        res.render('payment', { title: 'Thanh toán đơn hàng - Urban Café', products: undefined, totalPrice: 0, totalQty: 0 });
    } else {
        var cart = new Cart(req.session.cart);
        res.render('payment', { title: 'Thanh toán đơn hàng - Urban Café', products: cart.generateArray(), totalPrice: cart.totalPrice, totalQty: cart.totalQty });
    }
}
/* All news
*/
exports.getAllNews = async (req, res) => {
    try {
        const newsArticles = await News.find({}).sort({ _id: -1 });

        res.render('news', { title: 'Tin tức - Urban Café', newsArticles });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}

/**
 * GET /
 * Explore Payment method page  
 */

exports.explorePaymentMethods = async (req, res) => {
    const amount = req.params.amount;
    res.render('payment-methods', { title: 'Chọn phương thức thanh toán - Urban Coffee', amount });
}

/* News detail
*/
exports.getDetailNews = async (req, res) => {
    try {

        res.render('detail-news', {});
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}

/**
 * GET /
 * Explore About us page  
 */

exports.exploreAboutUs = async (req, res, next) => {
    var members = [{
        "name": "Nguyễn Bá Thịnh An (Team Lead)",
        "studentID": "K194111517",
        "role": "DESIGNER & FE DEVELOPER",
        "img": "/img/avt1.png",
        "quotes": "Tất cả những gì bạn thấy đều được thực hiện từ tâm huyết của nhóm và mang màu sắc riêng. Khiến bạn say đắm trong lần đầu."
    },
    {
        "name": "Võ Chí Giang",
        "studentID": "K194111533",
        "role": "Full-Stack DEVELOPER",
        "img": "/img/avt2.jpg",
        "quotes": "Mọi thao tác trên trang web rất mượt mà. Trước khi được đưa vào thực tế, trang web đã trải qua các bước thử nghiệm khắt khe của Dev Ly Tran"
    },
    {
        "name": "Trần Thị Thảo Ly",
        "studentID": "K194111546",
        "role": "Full-Stack DEVELOPER",
        "img": "/img/avt3.jpg",
        "quotes": "Sứ mệnh của chúng tôi là khơi dậy trí tưởng tượng và mang đến cho khách hàng những trải nghiệm cảm xúc khác biệt về Việt Nam."
    },
    {
        "name": "Trịnh Thị Tâm Oanh",
        "studentID": "K194111560",
        "role": "BA & FE DEVELOPER, Tester",
        "img": "/img/avt4.jpg",
        "quotes": "Chúng tôi đang không ngừng sáng tạo với mục tiêu là tiến xa hơn để mang Cộng đến với thế giới; lan toả và truyền cảm hứng bằng trái tim của mỗi thành viên."
    },
    {
        "name": "Phạm Minh Đạt",
        "studentID": "K194111530",
        "role": "BA & FE DEVELOPER, Tester",
        "img": "/img/avt5.jpg",
        "quotes": " Urban Café sẽ là nơi mọi người xích lại gần nhau, đề cao giá trị kết nối con người và sẻ chia thân tình bên những tách cà phê, ly trà đượm hương, truyền cảm hứng về lối sống hiện đại."
    },
    ]
    res.render('about-us', { title: 'About Us - Urban Coffee', members: members });
}

/* A news article with Id
*/
exports.getDetailNewsWithId = async (req, res) => {
    try {
        let newsId = req.params.id;
        const newsArticle = await News.findById(newsId);

        const newsArrLimit = 3
        const newsArr = await News.find({}).sort({ _id: -1 }).limit(newsArrLimit);

        res.render('detail-news', { newsArticle, newsArr });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}

/* 
GET Order tracking page
*/
exports.exploreOrderTracking = async (req, res) => {
    try {
        res.render('order-tracking', { title : 'Tra cứu đơn hàng ' });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}

exports.exploreDetailOrder = async (req, res) => {
    try {
        res.render('detail-order-tracking', { title : 'Chi tiết đơn hàng ' });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}
exports.exploreMyProfile = async (req, res) => {
    try {
        res.render('my-profile', {title : 'Thông tin cá nhân'}); 
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}
exports.signIn = async (req, res) => {
    try {
        res.render('signin', {title : 'Thông tin cá nhân'}); 
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}

/**
 * GET /
 * Admin
 */
 exports.admin = async (req, res) => {
    try {
        // res.render('today-orders');
        res.sendFile('admin/today-orders.html')
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}