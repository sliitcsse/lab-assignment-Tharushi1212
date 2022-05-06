import React, {useState, useRef, useEffect} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";


const SellerRegister = props => {
    const navigation = useNavigate();

    const onSubmit = e => {
        e.preventDefault();
        let userId = localStorage.getItem('koaUserId');

        axios.post(`http://localhost:5000/Trader/make-trader/${userId}`).then(res => {
            alert('You are registered as a seller.');
            navigation("/products");
        }).catch(err => {
            console.log(err);
        })
    }


    return (
        <div>
            <form onSubmit={onSubmit}>
                <h3> Register a Seller</h3>

                <button className="btn btn-lg btn-primary btn-block"
                        type="submit">Become a Seller
                </button>
            </form>


        </div>)
}


export default SellerRegister;
