import React, {useState, useEffect} from 'react';
import axios from 'axios';

const ViewCustomer = () => {


    const [customer, setCustomer] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem('koaUserId')

        axios
            .get(`http://localhost:5000/Trader/view-customers/${userId}`)
            .then(res => setCustomer(res.data.customers))
            .catch(error => console.log(error));


    },[]);

    return (

        <div className="container">


            <table className="table">
                <thead>
                <tr>
                    <th Scope="col"> CustomerID</th>
                    <th Scope="col"> Name</th>


                    <div className="col-lg-9 mt-2 mb-2">


                    </div>

                </tr>
                </thead>

                <tbody>

                {customer.map((customer, index) => (

                    <tr key={index}>
                        <th scope="row">{customer.userId}</th>
                        <td>{customer.name}</td>

                    </tr>

                ))}

                </tbody>


            </table>


        </div>
    );

};


export default ViewCustomer;
