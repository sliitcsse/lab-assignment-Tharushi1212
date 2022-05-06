import React, {useState, useRef, useEffect} from 'react';
import AuthService from '../AuthService';


const AddTocart = props => {

    const navigation = useNavigate();

    const [cart, setCart] = useState({
        itemID: '',
        TraderID: '',
    });

    const addtocart = (e) => {
        e.preventDefault()

        const userId = localStorage.getItem('koaUserId')

        axios
            .post(`http://localhost:5000/Trader/add-to-cart/${userId}/${coupon.itemID}/${coupon.TraderID}`)
            .then(res => alert('promo added'))
            .then(() => {
                setCart({itemID: '', itemID: ''})
            })
            .then(() => {
                navigation("/products")
            })
            .catch(error => console.log(error));
    }

    return (
        <div>
            <form onSubmit={addtocart}>
                <h3>Add to cart</h3>

                <label htmlFor="fname" className="sr-only">Product Name</label>
                <input type="text"
                       name="fname"
                       className="form-control"
                       placeholder="Enter product name"/>
                <br></br>
                <label htmlFor="fname" className="sr-only">Product desc </label>
                <input type="text"
                       name="description"
                       className="form-control"
                       placeholder="Enter description"/>
                <br></br>

                <label htmlFor="email" className="sr-only">Qty</label>
                <input type="text"
                       name="quantity"
                       className="form-control"
                       placeholder="Enter quantity"/>
                <br></br>
                <label htmlFor="role" className="sr-only">Price </label>
                <input type="text"
                       name="price"
                       className="form-control"
                       placeholder="Enter price"/>

                <br></br>

                <button className="btn btn-lg btn-primary btn-block"
                        type="submit">Add to cart
                </button>
            </form>


        </div>
    )
}


export default AddTocart;
