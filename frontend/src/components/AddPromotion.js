import React, {useState, useRef, useEffect} from 'react';
import AuthService from '../AuthService';
import axios from "axios";
import {useNavigate} from "react-router-dom";


const AddPromotion = props => {
    const navigation = useNavigate();

    const [coupon, setCoupon] = useState({
        promoCode: '',
        amount: '',
    });


    const addPromotion = (e) => {
        e.preventDefault()

        const userId = localStorage.getItem('koaUserId')

        axios
            .post(`http://localhost:5000/Trader/add-promotion/${userId}/${coupon.promoCode}/${coupon.amount}`)
            .then(res => alert('promo added'))
            .then(() => {
                setCoupon({promoCode: '', amount: ''})
            })
            .then(() => {
                navigation("/products")
            })
            .catch(error => console.log(error));
    }

    return (
        <div>
            <form onSubmit={addPromotion}>
                <h3>Add promotion</h3>


                <label htmlFor="promoCode" className="sr-only">PromCode </label>
                <input type="text"
                       onChange={e => setCoupon({...coupon, promoCode: e.target.value})}
                       name="promoCode"
                       className="form-control"
                       placeholder="Enter Code"/>
                <br></br>

                <label htmlFor="amount" className="sr-only">amount</label>
                <input type="text"
                       onChange={e => setCoupon({...coupon, amount: e.target.value})}
                       name="amount"
                       className="form-control"
                       placeholder="Enter quantity"/>
                <br></br>

                <button className="btn btn-lg btn-primary btn-block"
                        type="submit">Add promotion
                </button>
            </form>


        </div>
    )
}


export default AddPromotion;
