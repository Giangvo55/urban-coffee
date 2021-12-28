/**
 * GET /
 * Homepage
 */
 exports.homepage = async(req, res) => {
    res.render('home', {title: 'Urban Coffee'});
    
}