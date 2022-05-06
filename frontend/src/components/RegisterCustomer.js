import React, {useState, useRef, useEffect} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";


const RegisterCustomer = props => {
    const navigation = useNavigate();
    const [customer, setcustomer] = useState({
        name: "", password: "",
    });

    const handleChange = e => {
        setBuyer({...customer, [e.target.cname]: e.target.value});
    };

    useEffect(() => {
        if (localStorage.getItem('koaUserId')) {
            localStorage.removeItem('koaUserId');
        }
    }, []);


    const onSubmit = e => {
        e.preventDefault();

        if (customer.name === "" || customer.password === "") {
            alert("Fill all the fields");
        } else {

            axios.post(`http://localhost:5000/Customer/create-customer/${customer.name}/${customer.password}`)
                .then(res => {
                    localStorage.setItem('koaUserId', res.data.userId);
                    setcustomer({
                        name: "", password: ""
                    });
                    navigation("/products");

                })
                .catch(err => console.log(err));
        }

    }


    return (
        <div>
            <form onSubmit={onSubmit}>
                <h3>Customer Register</h3>

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
                        type="submit">Register
                </button>
            </form>


        </div>)
}


export default RegisterCustomer;
