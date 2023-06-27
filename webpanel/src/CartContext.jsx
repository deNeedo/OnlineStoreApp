import { createContext, useState } from "react";
import Home from "./components/Home";

export const CartContext = createContext({
    items: [], 
    getProductQuantity: () => {},
    AddOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {}
});

export function CartProvider({children}) {
    const [cartProducts, setCartProducts] =  useState([]);

    function getProductQuantity(item_id){
        const quantity = cartProducts.find(product => product.item_id === item_id)?.quantity;
        
        if(quantity === undefined){
            return 0;
        }
    return quantity;
    }

    function AddOneToCart(item_id) {
        const quantity = getProductQuantity(item_id);

        if (quantity === 0) {
            setCartProducts(
                [
                    ...cartProducts,
                    {
                        item_id: item_id,
                        quantity: 1
                    }
                ]
            )
        } else {
            setCartProducts(
                cartProducts.map(
                product => 
                product.item_id === item_id
                ? { ...product, quantity: product.quantity + 1} 
                : product 
                )
            )
        }
    }

    function removeOneFromCart(item_id) {
        const quantity = getProductQuantity(item_id);

        if(quantity == 1){
             deleteFromCart(item_id);
        } else {
            setCartProducts(
                cartProducts.map(
                    product => 
                    product.item_id === item_id
                    ? { ...product, quantity: product.quantity - 1} 
                    : product 
                    )
            )
        }
    }

    function deleteFromCart(item_id) {
        setCartProducts(
            cartProducts => 
            cartProducts.filter(currnetProduct => {
                return currnetProduct.item_id != item_id;
            })
        )
    }

    function getTotalCost() {
        let totalCost = 0;
        cartProducts.map((cartItem) => {
            //const productData = items(cartItem.item_id);
            const productData =cartItem.item_id;
            totalCost += (productData.price * cartItem.quantity);
            console.log(cartItem.price);
        });
        return totalCost;
    }

    const contextValue = {
        items: cartProducts, 
        getProductQuantity,
        AddOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost
    } 

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;