import React, {useState,useRef,useEffect} from 'react';
import AuthService from '../AuthService';


const AddWList = props=>{

    return(
        <div>
            <form onSubmit>
                <h3>Add Wish List</h3>
            
                <label htmlFor="fname" className="sr-only">Name</label>
                <input type="text" 
                       name="fname" 
                       className="form-control" 
                       placeholder="Enter product name"/>
<br></br>
<label htmlFor="fname" className="sr-only">Desc </label>
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
                        type="submit">Add to wish list</button>
            </form>
         

        </div>
    )
}


export default AddWList;
