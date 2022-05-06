import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Display = () => {


    const [products, setproducts] = useState([]);

    useEffect(() => {

        axios.get('http://localhost:5000/Customer/view-items').then(res => {
            setproducts(res.data.products);
        })

    }, []);


    const addToCartHandler = (productId, sellerId) => {

        if (localStorage.getItem('koaUserId') === null) {
            alert('Please login to add items to cart');
            return;
        }

        const userId = localStorage.getItem('koaUserId');
        axios.post(`http://localhost:5000/Customer/add-to-cart/${userId}/${itemID}/${TraderID}`).then(res => {
            alert(res.data.message);
        })
    }

    const addToWishListHandler = (productId, sellerId) => {
        if (localStorage.getItem('koaUserId') === null) {
            alert('Please login to add items to cart');
            return;
        }

        const userId = localStorage.getItem('koaUserId');
        axios.post(`http://localhost:5000/Customer/add-wishlist/${userId}/${itemID}/${TraderId}`).then(res => {
            alert(res.data.message);
        })

    }


    return (

        <div className="container">

            <table className="table">
                <thead>
                <tr>
                    <th Scope="col"> Product id</th>
                    <th Scope="col"> Name</th>
                    <th Scope="col"> Qty</th>
                    <th Scope="col"> Price</th>

                    <div className="col-lg-9 mt-2 mb-2"></div>

                </tr>
                </thead>
                <tbody>

                {products.map((products, index) => (

                    <tr key={index}>
                        <th scope="row">{products.productId}</th>
                        <td>{products.productName}</td>
                        <td>{products.productStock}</td>
                        <td>{products.productPrice}</td>
                        <td className={``}>
                            <button
                                onClick={() => addToWishListHandler(products.productId, products.sellerId)}
                                className="btn btn-lg btn-primary btn-block"
                                type="button"> 
                            </button>
                            <button
                                onClick={() => addToCartHandler(products.productId, products.sellerId)}
                                className="btn btn-lg btn-primary btn-block"
                                type="button">Add to cart
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};


export default Display;
