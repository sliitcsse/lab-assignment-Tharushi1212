import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const ViewWishList = () => {


    const [products, setproducts] = useState([]);

    useEffect(() => {

        const userId = localStorage.getItem('koaUserId')

        axios
            .get(`http://localhost:5000/Customer/view-wishlist-items/${userId}`)
            .then(res => setproducts(res.data.wishListProductIds))
            .catch(error => console.log(error));


    }, []);

    return (

        <div className="container">

            <table className="table">
                <thead>
                <tr>
                    <th Scope="col"> ProductID</th>
                    <th Scope="col"> Name</th>
                    <th Scope="col"> Qty</th>
                    <th Scope="col"> Price</th>
                    <div className="col-lg-9 mt-2 mb-2">

                    </div>

                </tr>
                </thead>

                <tbody>

                {products.map((products, index) => (

                    <tr key={index}>
                        <th scope="row">{products.productId}</th>
                        <td>{products.productName}</td>
                        <td>{products.productStock}</td>
                        <td>{products.productPrice}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};


export default ViewWishList;
