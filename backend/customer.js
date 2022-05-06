import {Customer, Trader} from "./storage";

export const createProfile = (ctx, next) => {
    const {Cname, Cpassword} = ctx.params;

    for (const singleCus of Customer) {
        if (singleCus.name === Cname) {
            ctx.body = {
                message: 'This customer already has a profile.',
                status: 'error'
            }
            return;
        }
    }

    const newCustomer = {
        userId: Customer.length + 1,
        Cname,
        Cpassword,
        wishListItemIds: [],
        cartItemIds: [],
        purchaseItemIds: [],
        role: 'customer'
    };

    Customer.push(newCustomer);

    ctx.status = 201;
    ctx.response.body = {
        message: 'Customer profile created.',
        status: 'success',
        userId: JSON.stringify(newCustomer.userId)
    }

    next();
}

export const customerLogin = (ctx, next) => {
    const {Cname, Cpassword} = ctx.params;

    for (const singleCus of Customer) {
        if (singleCus.name === Cname && singleCus.password === Cpassword) {
            ctx.status = 200;
            ctx.response.body = {
                message: 'Login Done.',
                status: 'success',
                userId: JSON.stringify(singleCus.userId)
            }
            next();
            return;
        }
    }

}




export const addToCart = (ctx, next) => {
    const {userId, itemID, TraderID} = ctx.params;


    const customerId = Customer.findIndex(singleCus => parseInt(singleCus.userId) === parseInt(userId));


    if (customerId === -1) {
        ctx.response.body = {
            message: 'Invalid Customer',
            status: 'error'
        }
        return;
    }


    const SellerId = Trader.findIndex(
        singleTrader => {
            return parseInt(singleTrader.userId) === parseInt(TraderID);
        }
    );

    if (SellerId === -1) {
        ctx.response.body = {
            message: 'Find traderId',
            status: 'error'
        }
        return;
    }

    const productId = Trader[SellerId].items.findIndex(
        singlePro => {
            return parseInt(singlePro.itemID) === parseInt(itemID);
        }
    );

    if (productId === -1) {
        ctx.response.body = {
            message: 'Find product ID',
            status: 'error'
        }
        return;
    }

    Customer[customerId].cartItemIds.push({
        itemID,
        TraderID
    });

    ctx.response.body = {
        message: 'Seccessfully added to cart',
        status: 'success',
        cartItemIds: Customer[customerId].cartItemIds
    };
    next();
}

export const viewItems = (ctx, next) => {
    const productItems = [];

    for (const singleTrader of Trader) {
        for (const singlePro of singleTrader.items) {
            productItems.push({
                ...singlePro,
                TraderId: singleTrader.userId
            });
        }
    }

    ctx.response.body = JSON.stringify({
        message: 'productItems finding successful',
        status: 'success',
        productItems: productItems
    });
    next();
}

export const addToWishList = (ctx, next) => {
    const {userId, itemID, TraderId} = ctx.params;

    const customerId = Customer.findIndex(singleCus => parseInt(singleCus.userId) === parseInt(userId));

    if (customerId === -1) {
        ctx.response.body = {
            message: 'Invalid customer',
            status: 'error'
        }

        return;
    }

    const SellerId = Trader.findIndex(
        singleTrader => {
            return parseInt(singleTrader.userId) === parseInt(TraderId);
        }
    );

    if (SellerId === -1) {
        ctx.response.body = {
            message: 'Invalid TraderId',
            status: 'error'
        }
        return;
    }

    const productId = Trader[SellerId].items.findIndex(
        singlePro => {
            return parseInt(singlePro.itemID) === parseInt(itemID);
        }
    );

    if (productId === -1) {
        ctx.response.body = {
            message: 'Invalid product ID',
            status: 'error'
        }
        return;
    }

    Customer[customerId].wishListItemIds.push({
        itemID,
        TraderId
    });

    ctx.response.body = {
        message: 'Product added to Wishlist successfully',
        status: 'success',
        wishListItemIds: Customer[customerId].wishListItemIds
    };
    next();

}

export const viewCart = (ctx, next) => {
    const {userId} = ctx.params;

    const customerId = Customer.findIndex(singleCus => parseInt(singleCus.userId) === parseInt(userId));

    if (customerId === -1) {
        ctx.response.body = {
            message: 'Invalid customer',
            status: 'error'
        }

        return;
    }
    const cart  = [];

    for (const cartItems of Customer[customerId].cartItemIds) {

        const allTraderItems = (Trader[Trader.findIndex(singleTrader =>
            parseInt(singleTrader.userId) === parseInt(cartItems.TraderID))].items);

        const cartProducts = allTraderItems.find(singlePro =>
            parseInt(singlePro.itemID) === parseInt(cartItems.itemID));

        cartList.push(cartProducts);
    }

    ctx.response.body = {
        message: 'Cart details got successfully',
        status: 'success',
        cartList: cart
    };
    next();
}


export const viewWishList = (ctx, next) => {
    const {userId} = ctx.params;


    const customerId = Customer.findIndex(singleCus => parseInt(singleCus.userId) === parseInt(userId));

    if (customerId === -1) {
        ctx.response.body = {
            message: 'Invalid Customer',
            status: 'error'
        }

        return;
    }

    const wishList = [];


    for (const wish of Customer[customerId].wishListItemIds) {

        const allTraderItems = (Trader[Trader.findIndex(singleTrader =>
            parseInt(singleTrader.userId) === parseInt(wish.TraderID))].items);

        const wishListItem = allTraderItems.find(singlePro =>
            parseInt(singlePro.itemID) === parseInt(wish.itemID));

        wishList.push(wishListItem);
    }

    ctx.response.body = {
        message: 'Wishlist data successfully found',
        status: 'success',
        wishListItemIds: wishList
    };
    next();

}

export const purchase = (ctx, next) => {
    const {userId, itemID} = ctx.params;

    const customerId = Customer.findIndex(singleCus => parseInt(singleCus.userId) === parseInt(userId));

    if (customerId === -1) {
        ctx.response.body = {
            message: 'Invalid Customer ',
            status: 'error'
        }

        return;
    }

    const cartItemIds = Customer[userId].cartItemIds;

    const cartproductId = cartItemIds.findIndex(singlePro => parseInt(singlePro.itemID) === parseInt(itemID));

    if (cartproductId === -1) {
        ctx.response.body = {
            message: 'Invalid cart product id',
            status: 'error'
        }

        return;
    }

    const cartProduct = cartItemIds[cartproductId];

    Customer[customerId].cartItemIds.splice(cartproductId, 1);

    const SellerId = Trader.findIndex(singleTrader => parseInt(singleTrader.userId) === parseInt(cartProduct.sellerId));

    if (SellerId === -1) {
        ctx.response.body = {
            message: 'Invalid Trader',
            status: 'error'
        }

        return;
    }


    const traderproductId = Trader[SellerId].items.findIndex(singlePro => parseInt(singlePro.itemID) === parseInt(itemID));

    if (traderproductId === -1) {
        ctx.response.body = {
            message: 'Invalid product in trader',
            status: 'error'
        }

        return;
    }


    const traderProduct = Trader[SellerId].items[traderproductId];

    Trader[SellerId].customers.push({
        userId: Customer[customerId].userId,
        name: Customer[customerId].name,
    });


    ctx.response.body = {
        message: 'Product purchased done',
        status: 'success',
        product: traderProduct
    };
    next();


}
