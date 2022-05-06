import React, {useState, useEffect} from 'react';
import axios, {Axios} from 'axios';
import {Link, useNavigate} from 'react-router-dom';

const viewItm = () => {

    const navigation = useNavigate();

    const [products, setproducts] = useState([]);
    const userId = localStorage.getItem('koaUserId')

    useEffect(() => {


        axios
            .get(`http://localhost:5000/Customer/view-cart-items/${userId}`)
            .then(res => setproducts(res.data.cartList))
            .catch(error => console.log(error));


    }, []);


    const handlePurchase = (ProductId) => {

        axios
            .post(`http://localhost:5000/Customer/product-purchase/${userId}/${itemID} `)
            .then(res => alert(res.data.message))
            .then(() => navigation('/products'))
            .catch(error => console.log(error));
    }

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
                        <td>
                            <button
                                onClick={() => handlePurchase(products.productId)}
                                className="btn btn-success">
                                Purchase
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};


export default viewItm;
