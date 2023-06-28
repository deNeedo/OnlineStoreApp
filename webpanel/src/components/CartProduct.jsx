import { Button } from "@mui/base";
import { CartContext } from "./CartContext";
import { useContext } from "react";

function CartProduct(props) {
    const cart = useContext(CartContext);
    const item = props.item;
    const quantity = props.quantity;
    return (
        <>
            <h3>{item.item.id_item} ID </h3>
            <p>{item.item.item_name} Name </p>
            <p>{quantity} total </p>
            <p>{(item.item.price * quantity).toFixed(2)} price </p>
            <img src={item.item.photo} width="50" height="50"/>
            <Button variant='contained' onClick={() => cart.deleteFromCart(item.item.id_item)}> Remove </Button>
            <Button variant='contained' onClick={() => cart.AddOneToCart(item.item)}> + </Button>
            <Button variant='contained' onClick={() => cart.removeOneFromCart(item.item.id_item)}> - </Button>
            <hr></hr>
        </>
    )
}

export default CartProduct;