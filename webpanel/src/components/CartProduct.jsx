import { Button } from "@mui/base";
import { CartContext } from "./CartContext";
import { useContext } from "react";
//import {GetProduxtData} from ...


function CartProduct(props) {
    const cart = useContext(CartContext);

    const item_id = props.item_id;
    const quantity = props.quantity
    //const productData = getProductData(id);


    return (
        <>
            <h3>{item_id} ID</h3>
            {/* <h3>{ProductData.title}</h3> */}
            <p>{quantity} total</p>
            {/* <p>${(quantity * ProductData.price).toFixed(2)}</p> */}
            <Button variant='contained' onClick={() => cart.deleteFromCart(item_id)}> Remove </Button>
            <Button variant='contained' onClick={() => cart.AddOneToCart(item_id)}> + </Button>
            <Button variant='contained' onClick={() => cart.removeOneFromCart(item_id)}> - </Button>
            <hr></hr>
        </>
    )
}

export default CartProduct;