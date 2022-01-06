module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    // if (this.items) {
    //     for (var key in this.items) {
    //         this.totalQty += this.items[key].qty;
    //         this.totalPrice += this.items[key].qty * this.items[key].item.price;
    //     }
    // }

    this.add = function (item, id) {
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = {qty: 0, item: item, price: 0};
        } 
        storedItem.qty++;
        storedItem.price += storedItem.item.price ;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
        
    };

    this.generateArray = function () {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
    this.delete = function (productId) { 
        if(this.items[productId].qty > 1){
            this.items[productId].qty --; 
            this.totalQty--; 
            this.items[productId].price -= this.items[productId].item.price; 
            this.totalPrice -= this.items[productId].item.price; 
        } 
        else {
            this.totalQty--; 
            this.totalPrice -= this.items[productId].price; 
            delete this.items[productId]; 
        }
    };
};