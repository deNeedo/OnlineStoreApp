import { createContext, useState } from "react";

export const ListContext = createContext({
    items: [],
    getProductQuantity: () => {},
    AddOneToCart: () => {},
    deleteFromCart: () => {}
});

export function ListProvider({children}) {
    const [cartProducts, setCartProducts] =  useState([]);

    function getProductQuantity(id_item) {
        const quantity = cartProducts.find(product => product.item.id_item === id_item)?.quantity;
        if (quantity === undefined) {
            return 0;
        } else {
            return quantity;
        }
    }

    function AddOneToCart(item) {
        const quantity = getProductQuantity(item.id_item);
        if (quantity == 0) {
            setCartProducts(
                [
                    ...cartProducts,
                    {
                        item: item,
                        quantity: 1
                    }
                ]
            )
        }
    }
    function deleteFromCart(id_item) {
        setCartProducts(
            cartProducts => 
            cartProducts.filter(currentProduct => {
                return currentProduct.item.id_item != id_item;
            })
        )
    }
    const contextValue = {
        items: cartProducts, 
        getProductQuantity,
        AddOneToCart,
        deleteFromCart
    } 

    return (
        <ListContext.Provider value={contextValue}>
            {children}
        </ListContext.Provider>
    )
}

export default ListProvider;