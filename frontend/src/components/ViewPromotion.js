import React, {useState, useEffect} from 'react';
import axios, {Axios} from 'axios';
import {Link} from 'react-router-dom';

const ViewPromotion = () => {


    const [products, setproducts] = useState([]);

    useEffect(() => {

        const userId = localStorage.getItem('koaUserId')

        axios
            .get(`http://localhost:5000/Trader/view-promo/${userId}`)
            .then(res => {
                setproducts(res.data.promotions)
            })
            .catch(error => console.log(error));

    }, []);

    return (

        <div className="container">

            <table className="table">
                <thead>
                <tr>
                    <th Scope="col"> PromoCode</th>
                    <th Scope="col"> amount</th>

                    <div className="col-lg-9 mt-2 mb-2">

                    </div>

                </tr>
                </thead>

                <tbody>

                {products.map((products, index) => (

                    <tr key={index}>
                        <td>{products.couponCode}</td>
                        <td>{products.percentage}</td>

                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};


export default ViewPromotion;
