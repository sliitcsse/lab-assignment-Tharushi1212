import {Customer, Trader} from "./storage";

export const traderRegistration = (ctx, next) => {
    const {userId} = ctx.params;

    for (const customerObject of Customer) {
        if (parseInt(customerObject.userId) === parseInt(userId)) {
            customerObject.role = 'Trader';


            const TraderNew = {
                userId: parseInt(userId),
                products: [],
                promos: [],
                customers: [],
               
            }

            Trader.push(TraderNew);

            ctx.body = JSON.stringify(TraderNew);
            ctx.body = {

                message: 'Trader registered successfully',
                status: 'success'
            }
            next();

            return;
        }
    }

    ctx.body = {
        message: 'Invalid customer',
        status: 'error'
    }
    next();
}

export const viewPromotions = (ctx, next) => {

    const {userId} = ctx.params;

    for (const traderObject of Trader) {
        if (parseInt(traderObject.userId) === parseInt(userId)) {
            ctx.body = {
                
                status: 'success',
                message: 'Promotions displayed successfully',
                promos: [
                    ...traderObject.promos
                ]
            }
            next();

            return;
        }
    }

}

export const addPromotion = (ctx, next) => {

    const {userId, amount, promoCode} = ctx.params;

    for (const traderObject of Trader) {
        if (parseInt(traderObject.userId) === parseInt(userId)) {
            traderObject.promos.push({
                promoCode: promoCode,
                amount: parseInt(amount)
            });
            ctx.body = {
                message: 'Added promotions successfully',
                status: 'success'
            }
            next();
            
            return;
        }
    }

}


export const addItem = (ctx, next) => {
    const {userId, itemId, itemName,itemsStock, itemPrice } = ctx.params;

    for (const traderObject of Trader) {
        if (parseInt(traderObject.userId) === parseInt(userId)) {
            traderObject.products.push({
                itemId: parseInt(itemId),
                itemName: itemName,
                itemsStock: parseInt(itemsStock),
                itemPrice: parseInt(itemPrice)
                
            });
            ctx.body = {
                status: 'success',
                message: 'Items added successfuly'
                
            }
            next();

            return;
        }
    }

    ctx.body = {
        status: 'error',
        message: 'Invalid Trader'
        
    }
    next();
}

export const editItem = (ctx, next) => {
    const {userId, itemId, itemName, itemsStock, itemPrice} = ctx.params;

    for (const traderObject of Trader) {
        if (parseInt(traderObject.userId) === parseInt(userId)) {
            for (const itemObject of traderObject.products) {
                if (parseInt(itemObject.itemId) === parseInt(itemId)) {
                    itemObject.itemName = itemName;
                    itemObject.itemsStock = parseInt(itemsStock);
                    itemObject.itemPrice = parseInt(itemPrice);
                    
                    ctx.body = {
                        message: 'Item edited',
                        status: 'success',
                        item: {
                            ...itemObject
                        }
                    }
                    next();
                    return;
                }
            }
        }
    }

    ctx.body = {
        
        status: 'error',
        message: 'Invalid trader',
    }
    next();
}

export const viewCustomer = (ctx, next) => {
    const {userId} = ctx.params;

    for (const traderObject of Trader) {
        if (parseInt(traderObject.userId) === parseInt(userId)) {
            ctx.body = {
                message: 'Customers viewed',
                status: 'success',
                customers: [
                    ...traderObject.customers
                ]
            }
            next();
            return;
        }
    }

    ctx.body = {
        message: 'Trader not found',
        status: 'error'
    }
    next();
}


export const ViewInventory = (ctx, next) => {
    const {userId} = ctx.params;

    for (const traderObject of Trader) {
        if (parseInt(traderObject.userId) === parseInt(userId)) {
            ctx.body = {
                message: 'Inventory viewed',
                status: 'success',
                inventory: [
                    ...traderObject.products
                ]
            }
            next();
            return;
        }
    }

    ctx.body = {
        message: 'Trader not found',
        status: 'error'
    }
    next();
}





