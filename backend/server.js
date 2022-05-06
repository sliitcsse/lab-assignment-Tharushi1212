const Koa = require('koa');
const Router = require('@koa/router');
const json = require('koa-json')()
const bodyParser = require('koa-bodyparser')();
const cors = require('@koa/cors')();

const {createProfile, customerLogin, addToCart, viewItems, addToWishList, viewCart, viewWishList, purchase  } = require("./customer");
const {traderRegistration, viewPromotions, addItem, editItem, ViewInventory, viewCustomer, addPromotion} = require("./trader");


const app = new Koa();
const router = new Router();

router

    //Customer
    .post('/Customer/create-customer/:Cname/:Cpassword', createProfile)
    .post('/Customer/customer-login/:Cname/:Cpassword', customerLogin)
    .post('/Customer/add-to-cart/:userId/:itemID/:TraderID', addToCart)
    .get('/Customer/view-items', viewItems)
    .post('/Customer/add-wishlist/:userId/:itemID/:TraderId', addToWishList)
    .get('/Customer/view-cart-items/:userId', viewCart)
    .get('/Customer/view-wishlist-items/:userId', viewWishList)
    .post('/Customer/product-purchase/:userId/:itemID', purchase)

    //Trader
    .post('/Trader/make-trader/:userId', traderRegistration)
    .get('/Trader/view-promo/:userId', viewPromotions)
    .post('/Trader/add-promotion/:userId/:amount/:promoCode', addPromotion)
    .post('/Trader/item-add/:userId/:itemId/:itemName/:itemsStock/:itemPrice', addItem)
    .put('/Trader/edit-item-to-inventory/:userId/:itemId/:itemName/:itemsStock/:itemPrice', editItem)
    .get('/Trader/view-customers/:userId', viewCustomer)
    .get('/Trader/get-items/:userId', ViewInventory)
    
    
    


    app.use(router.routes())
    .use(router.allowedMethods())
    .use(json)
    .use(bodyParser)
    .use(cors);


app.listen(5000);
