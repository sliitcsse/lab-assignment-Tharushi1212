import React from 'react'
import {Link} from 'react-router-dom';


const navbar = () => {
    return (
        <div>
            <table className="table">
                <thead>
                <tr>
                    <th Scope="col"><Link to="/login">Customer Login</Link></th>
                    <th Scope="col"><Link to="/add">Customer Register</Link></th>
                    <th Scope="col"><Link to="/products">Products</Link></th>
                    <th Scope="col"><Link to="/addseller">Seller Registration</Link></th>
                    <th Scope="col"><Link to="/Additem">Add Items</Link></th>
                    <th Scope="col"><Link to="/viewList">View wish list</Link></th>


                    <th Scope="col"><Link to="/AllCustomer">Customer List</Link></th>


                    <th Scope="col"><Link to="/Addpro">Add promotion</Link></th>
                    <th Scope="col"><Link to="/viewPromo">View promotion</Link></th>
                    <th Scope="col"><Link to="/viewItems">Cart</Link></th>


                    <div className="col-lg-9 mt-2 mb-2"></div>
                </tr>
                </thead>
            </table>
        </div>


    )
}
export default navbar;





