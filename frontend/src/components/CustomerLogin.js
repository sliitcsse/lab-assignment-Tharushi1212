import React, {useState, useContext, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const CustomerLogin = (props) => {
    const navigation = useNavigate();

    const [customer, setcustomer] = useState({
        name: "", password: "",
    });

    useEffect(() => {
        if (localStorage.getItem('koaUserId')) {
            localStorage.removeItem('koaUserId');
        }
    }, []);

    const handleChange = e => {
        setcustomer({...customer, [e.target.name]: e.target.value});
    };


    const onSubmit = (e) => {
        e.preventDefault();
        if (customer.name === "" || customer.password === "") {
            alert("Please fill in all fields");
        } else {

            axios.post(`http://localhost:5000/Customer/customer-login/${customer.name}/${customer.password}`)
                .then(res => {
                    localStorage.setItem('koaUserId', res.data.userId);
                    setBuyer({
                        name: "", password: ""
                    });
                    navigation("/products");

                })
                .catch(err => console.log(err));
        }

    };

    return (
        <div className="container">
            <form onSubmit={onSubmit}>
                <h3>Customer Login</h3>

                <br></br>
                <label htmlFor="name" className="sr-only">name: </label>
                <input type="text"
                       name="name"
                       value={customer.name}
                       onChange={(e) => handleChange(e)}
                       className="form-control"
                       placeholder="Enter Username"/>
                <br></br>
                <label htmlFor="password" className="sr-only">password: </label>
                <input type="password"
                       name="password"
                       value={customer.password}
                       onChange={(e) => handleChange(e)}
                       className="form-control"
                       placeholder="Enter Password"/>


                <button className="btn btn-lg btn-primary btn-block mt-3"
                        type="submit">Login
                </button>
            </form>
        </div>
    );
};

export default CustomerLogin;
