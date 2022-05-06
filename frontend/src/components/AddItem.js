import React, {useState, useRef, useEffect} from 'react';
import AuthService from '../AuthService';
import axios from "axios";
import {useNavigate} from "react-router-dom";


const AddItem = props => {
    const navigation = useNavigate();

    const [item, setItem] = useState({
        name: '',
        itemId: '',
        itemsStock: '',
        itemPrice: '',
        userId: localStorage.getItem('koaUserId')
    });

    const handleAddProducts = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/Trader/item-add/${item.userId}/${item.itemId}/${item.itemName}/${item.itemsStock}/${item.itemPrice}`)
            .then(res => {
                navigation("/products");
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div>
            <form onSubmit={handleAddProducts}>
                <h3>Add Products</h3>

                <label htmlFor="name" className="sr-only">Product Name</label>
                <input type="text"
                       onChange={e => setItem({...item, name: e.target.value})}
                       name="name"
                       className="form-control"
                       placeholder="product name"/>
                <br></br>
                <label htmlFor="ProductID" className="sr-only">Product ID </label>
                <input type="text"
                       onChange={e => setItem({...item, itemId: e.target.value})}
                       name="ProductID"
                       className="form-control"
                       placeholder=" product id"/>
                <br></br>

                <label htmlFor="email" className="sr-only">Qty</label>
                <input type="text"
                       onChange={e => setItem({...item, itemsStock: e.target.value})}
                       name="Qty"
                       className="form-control"
                       placeholder="qty"/>
                <br></br>
                <label htmlFor="role" className="sr-only">Price </label>
                <input type="text"
                       onChange={e => setItem({...item, itemPrice: e.target.value})}
                       name="Price"
                       className="form-control"
                       placeholder=" price"/>
                <br></br>

                <button className="btn btn-lg btn-primary btn-block"
                        type="submit">Add Item
                </button>
            </form>


        </div>
    )
}


export default AddItem;
